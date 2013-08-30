title: MQ 笔记之 游标 及其游标优化
date: 2013-08-22 09:38:51
tags: [技术]
categories: MQ
---

##概观 
>在ActiveMQ的Broker中，光标用来持有一批在内存等待发送目标地址的消息。默认情况下这小消息被从存储器取出只想一个cursor(存储光标)  
<!-- more -->
5.0.0版本后，Activemq实现了一种新的内存模型来防止慢消费者阻塞快速生产者。通常消息在未消费或者发送后未收到消费者的确认信息时都会持久保存消息到存储中。当有消费者来消费消息时，broker会分页一批一批的从存储中取出消息，放入消息处理队列。游标就是指向下次批量获取消息时的存储位置。   

ctiveMQ有另一种游标实现，VM cursor，在某些情境下非常快。VM cursor是，进入的消息直接关联cursor，同时存储到消息存储器中。（关联cursor的同时存储到消息存储器中）。如果消费者（consumer）非常快，可以跟的上消息流的话，VM cursor会工作的非常好。但是，对于慢消费者，这个策略就不是那么有效了。VMcursor被积压的消息填满，同时它可能会去调用流控制去抑制producer生产message。

##根据游标的保存方式不同，可分为三种类型：

###Store-based cursors 
broker默认采用的游标。它将游标信息保存在存储中。针对速度不同的消费者，这种游标机制采取的方式不同。对于快速消费者，因为消费速度很快，存储中 的消息数量会很少，所以不需要游标。这时，消息发送到broker时，先保存在持久存储中，然后直接发送给了消费者。而对于慢消费者，消息的持久存储中会 保存大量的消息，所以需要使用游标来指定下一次批量读取消息的位置。  

{% img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1e7v81y31hnj20ip04qaaj.jpg  Store-based实现原理图 300 200 %}
 **图一：**

 	消息接收后，首先完成消息存储的工作，如(1)所示，然后会判断是否有空闲的内存可用，如果有的话，就走路径1，直接把消息存放在内存中的LinkedHashMap，如果没有可用内存，则走路径2，当需要消息的时候，直接从消息存储的介质里每次读取一批消息，然后存入LinkedHashMap。

### VM cursors 
若消费者能跟上生产者生产的速度，这时持久存储中消息虽然不是很多，但是若能也能在内存中保存一些游标，对获取存储中的消息的性能会有很大的提升。 
那么VM Cursors在ActiveMQ4.x中是如何工作的呢？发送消息保存在内存中，并在需要的时候传递给调度队列。这可以是非常快的，但也有不利的一面，不能够处理非常缓慢的消费者或消费者已经很长一段时间处于非活动状态：   
{%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1e7v878r0ahj20iu04tjrr.jpg  file实现原理图 300 200%}
  **图二：**

	消息接收后，首先完成消息存储的工作，如(1)所示，然后会判断是否有空闲的内存可用，如果有的话，就走路径1，直接把消息存放在内存中的LinkedList，如果没有可用内存，则走路径2，把消息写入临时文件中，当需要消息的时候，直接从临时文件中读写一批，然后送入LinkedList。


### File-based cursors 
对VM cursors 的一种改进。当内存中的游标达到一定限额后，就会将一些游标存储到磁盘上的临时文件中。使用这种类型的游标时，消息储存可能会变慢，但消费者处理一般都会更快。通过缓冲到磁盘，它可以让消息代理来处理不受内存限制的大量消息，而生产者发送消息的速度会受到影响：
 **图三**

 {%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1e7v8airx6dj20it04sjrl.jpg vm 实现原理 300 200%}
 	消息接收后，首先完成消息存储的工作，如(1)所示，然后直接把消息存放在内存中的LinkedList。


###Paging for Non-Persistent Messages（非持久性的消息分页调度）
Store based cursor也可以处理非持久性的消息，也就是没有存储在磁盘中的消息，非持久性消息被直接传递给游标，所以Store based cursor也只是嵌入了File based cursor的功能。


## 3种消息cursor的比较
消息cursor类型 | 性能 |稳定性 | 最佳使用场景
---| --- | --- | --- |
Store-based | 当内存不够时，需要进行1次消息存储操作，性能在3种方式中居中 | 最好 | activeMQ默认使用该cursor，因为它能满足大部分场景需要
File | 当内存不够时，需要进行2次消息存储操作，并且在删除消息的时候也就相应的要删除2次，性能在3种方式中最差 | 居中 | 主要用在当消息存储慢(如消息是放在数据库里)，并且消费者相对快的情况下
VM | 在内存够的情况下，3种message cursor性能一样 | 最容易出现内存溢出的问题 | 很快，但不能处理慢消息消费者
 
###基于存储的消息指针_测试结果

测试方法 | 结果说明 | 是否通过 | 备注
--- | --- | --- | --- |
开500个queue 持久化消息/非持久化消息 的发送客户端，一直发送,不接收，因为是默认的，所以不用在服务器端配置。 | 1．对于非持久化消息，一定数量之后，也会产生临时文件。 2．对于持久化的消息，则适用该方式的消息指针，直到达到磁盘空间的设置上限。 |  是 | 

###VM消息指针_测试结果

测试方法 | 结果说明 | 是否通过 | 备注 
--- | --- | --- | --- |
开500个queue 持久化消息/非持久化消息 的发送客户端，一直发送，在Activemq.xml配置文件中配置：cursore 队列中存储到一定量消息的时候，broker不再接收生产者发送过来的消息，56W左右，broker也不报错，客户端也不报错。 |  是  | 若设置producerflowControl=false，则消息数量持续增长，直到broker报错：WARN  AMQMessageStore  - Message could not be added to long term store: Java heap space java.lang.OutOfMemoryError: Java heap space 


###基于文件的消息指针_测试结果

测试方法 | 结果说明 | 是否通过 | 备注
--- | --- | --- | --- |
开500个queue 持久化消息/非持久化消息 的发送客户端，一直发送，在Activemq.xml配置文件中配置：fileQueueCursor | 一段时间之后，broker打印出一信息：INFO MonetStore - Monet Store using data directory "C:\Activemq 5.1\bin\..  \data\localhost\tmp_storage"  临时文件被放置在tmp_storage目录下 | 是 |
 
 
 

 
 
 
 


-----------

##Configuring Cursors
Activemq默认使用store-based游标。当然也可为不同的Destination修改游标策略。通过修改destinationPolicy节点来更改默认配置。  
destinationPolicy节点包含多ge policyMap节点。  
policyMap包含一个policyEntries节点，policyEntries节点包含多个policyEntry 节点。policyEntry就是具体的一个游标策略了。  
Topics的消费者分为持久订阅者和临时订阅者，所以有两套配置。Queues只有一类消费者，所以只有一套配置。
对于持久订阅者可以使用PendingDurableSubscriberMessageStoragePolicy来指定游标策略。可配置的策略有vmDurableCursor和fileDurableSubscriberCursor. 


**对于临时订阅者可以使用pendingSubscriberPolicy 来指定。可配置的策略有vmCursor和fileCursor。下面是关于Topics的一些xml配置：**

```
<beans ... >
<broker ...>
    ...
<destinationPolicy>
<policyMap>
<policyEntries>
<policyEntrytopic="com.iona.>">
            ...
<pendingSubscriberPolicy>
<vmCursor/>
</pendingSubscriberPolicy>
<PendingDurableSubscriberMessageStoragePolicy>
<fileDurableSubscriberPolicy/>
</PendingDurableSubscriberMessageStoragePolicy>
            ...
</policyEntry>
          ...
</policyEntries>
</policyMap>
</destinationPolicy>
    ...
</broker>
  ...
</beans>

```

**Queues 同样也有vm和file两种类型的游标存储策略。pendingQueuePolicy 节点的可配置子节点有vmQueueCursor和fileQueueCursor**

```
<beans ... >
<broker ...>
        ...   
<destinationPolicy>
<policyMap>
<policyEntries>
<policyEntryqueue="com.iona.>">  
                ...   
<pendingQueuePolicy>
<vmQueueCursor/>
</pendingQueuePolicy>
                ...   
</policyEntry>
              ...   
</policyEntries>
</policyMap>
</destinationPolicy>
        ...   
</broker>
      ...   
</beans>

```


### 配置vmcursor：
下面配置了一个borker的所有topic和queue都使用了vmCursor

```
<broker ... >
  ...
  <destinationPolicy>
    <policyMap>
      <policyEntries>
        <policyEntry topic=">">
          <pendingSubscriberPolicy>
            <vmCursor />
          </pendingSubscriberPolicy>
        </policyEntry>
        <policyEntry queue=">">
          <pendingSubscriberPolicy>
            <vmCursor />
          </pendingSubscriberPolicy>
        </policyEntry>
      </policyEntries>
    </policyMap>
  </destinationPolicy>
  ...
</broker>

```
topic和queue都使用了通配符【>】,这个匹配所有的目标名称。你可以根据情况指定一些选择目标的模式。但是VM Cursor仅仅适用于那些消费者可以跟得上目标消息节奏的这种情况。


-------
http://www.cnblogs.com/kaka/archive/2012/07/24/2606699.html
http://netcomm.iteye.com/blog/470585
