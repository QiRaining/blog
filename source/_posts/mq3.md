title: MQ 笔记之 消息持久化
date: 2013-08-21 23:43:37
tags: [技术]
categories: MQ
---
>在broker中设置属性persistent=”true”(默认是true)，同时发送的消息也应该是persitent类型的。ActiveMQ消息持久化有三种方式：AMQ、KahaDB、JDBC。
配置文件在config/jetty.xml
<!-- more -->

##一、AMQ
AMQ是一种文件存储形式，它具有写入速度快和容易恢复的特点。消息存储在一个个文件中，文件的默认大小为32兆，如果一条消息的大小超过了32兆，那么这个值必须设置大点。当一个存储文件中的消息已经全部被消费，那么这个文件将被标识为可删除，在下一个清除阶段，这个文件被删除。默认配置如下：

```   
<persistenceAdapter>
  <amqPersistenceAdapter directory="activemq-data" maxFileLength="32mb"/>
</persistenceAdapter>

```

属性名称	| 默认值	| 描述
--- | --- | ---
directory	| activemq-data	 | 消息文件和日志的存储目录
useNIO	| true	| 使用NIO协议存储消息
syncOnWrite |	false |	同步写到磁盘，这个选项对性能影响非常大
maxFileLength	| 32mb	| 一个消息文件的大小
persistentIndex	| true	| 消息索引的持久化，如果为false，那么索引保存在内存中
maxCheckpointMessageAddSize	| 4kb	| 一个事务允许的最大消息量
cleanupInterval	| 30000	| 清除操作周期，单位ms
indexBinSize	| 1024	| 索引文件缓存页面数，缺省为1024，当amq扩充或者缩减存储时，会锁定整个broker，导致一定时间的阻塞，所以这个值应该调整到比较大，但是代码中实现会动态伸缩，调整效果并不理想。
indexKeySize	| 96	| 索引key的大小，key是消息ID
indexPageSize	| 16kb	| 索引的页大小
directoryArchive	| archive |	存储被归档的消息文件目录
archiveDataLogs	| false	| 当为true时，归档的消息文件被移到directoryArchive,而不是直接删除

--------

##二、 KahaDB

KahaDB是基于文件的本地数据库储存形式，虽然没有AMQ的速度快，但是它具有强扩展性，恢复的时间比AMQ短，从5.4版本之后KahaDB做为默认的持久化方式。默认配置如下

```
 <persistenceAdapter>
        <kahaDB directory="activemq-data" journalMaxFileLength="32mb"/>
 </persistenceAdapter>

```
KahaDB的属性：

property name	| default value	| Comments
--- | --- | ---
directory	| activemq-data	| 消息文件和日志的存储目录
indexWriteBatchSize	| 1000	| 一批索引的大小，当要更新的索引量到达这个值时，更新到消息文件中
indexCacheSize	| 10000	| 内存中，索引的页大小
enableIndexWriteAsync |	false |	索引是否异步写到消息文件中
journalMaxFileLength	| 32mb	| 一个消息文件的大小
enableJournalDiskSyncs	| true	| 是否讲非事务的消息同步写入到磁盘
cleanupInterval	| 30000	| 清除操作周期，单位ms
checkpointInterval	| 5000	| 索引写入到消息文件的周期，单位ms
ignoreMissingJournalfiles	| false | 	忽略丢失的消息文件，false，当丢失了消息文件，启动异常
checkForCorruptJournalFiles	| false	|检查消息文件是否损坏，true，检查发现损坏会尝试修复
checksumJournalFiles	| false |	产生一个checksum，以便能够检测journal文件是否损坏。
`5.4版本之后有效的属性:`	 | |	
archiveDataLogs	| false	| 当为true时，归档的消息文件被移到directoryArchive,而不是直接删除
directoryArchive	| null	| 存储被归档的消息文件目录
databaseLockedWaitDelay	| 10000	| 在使用负载时，等待获得文件锁的延迟时间，单位ms
maxAsyncJobs	| 10000 |	同个生产者产生等待写入的异步消息最大量
concurrentStoreAndDispatchTopics |	false	| 当写入消息的时候，是否转发主题消息
concurrentStoreAndDispatchQueues | true	| 当写入消息的时候，是否转发队列消息
5.6版本之后有效的属性:	 | |	
archiveCorruptedIndex	| false |	是否归档错误的索引

从5.6版本之后，有可能发布通过多个kahadb持久适配器来实现分布式目标队列存储。什么时候用呢？如果有一个快速的生产者和消费者，当某一个时刻生产者发生了不规范的消费，那么有可能产生一条消息被存储在两个消息文件中，同时，有些目标队列是危险的并且要求访问磁盘。在这种情况下，你应该用通配符来使用mKahaDB。如果目标队列是分布的，事务是可以跨越多个消息文件的。

每个KahaDB的实例都可以配置单独的适配器，如果没有目标队列提交给filteredKahaDB，那么意味着对所有的队列有效。如果一个队列没有对应的适配器，那么将会抛出一个异常。配置如下：

```
<persistenceAdapter>
  <mKahaDB directory="${activemq.base}/data/kahadb">
    <filteredPersistenceAdapters>
      <!-- match all queues -->
      <filteredKahaDB queue=">">
        <persistenceAdapter>
          <kahaDB journalMaxFileLength="32mb"/>
        </persistenceAdapter>
      </filteredKahaDB>
      
      <!-- match all destinations -->
      <filteredKahaDB>
        <persistenceAdapter>
          <kahaDB enableJournalDiskSyncs="false"/>
        </persistenceAdapter>
      </filteredKahaDB>
    </filteredPersistenceAdapters>
  </mKahaDB>
 </persistenceAdapter>

```
如果filteredKahaDB的perDestination属性设置为true，那么匹配的目标队列将会得到自己对应的KahaDB实例。配置如下

```
<persistenceAdapter>
  <mKahaDB directory="${activemq.base}/data/kahadb">
    <filteredPersistenceAdapters>
      <!-- kahaDB per destinations -->
      <filteredKahaDB perDestination="true" >
        <persistenceAdapter>
          <kahaDB journalMaxFileLength="32mb" />
        </persistenceAdapter>
      </filteredKahaDB>
    </filteredPersistenceAdapters>
  </mKahaDB>
 </persistenceAdapter>

```

##三、 JDBC

配置JDBC适配器

```
<persistenceAdapter>
        <jdbcPersistenceAdapter dataSource="#mysql-ds" createTablesOnStartup="false" />
</persistenceAdapter>

```
dataSource指定持久化数据库的bean，createTablesOnStartup是否在启动的时候创建数据表，默认值是true，这样每次启动都会去创建数据表了，一般是第一次启动的时候设置为true，之后改成false。

MYSQL持久化bean

```
<bean id="mysql-ds" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost/activemq?relaxAutoCommit=true"/>
    <property name="username" value="activemq"/>
    <property name="password" value="activemq"/>
    <property name="poolPreparedStatements" value="true"/>
</bean>

```
SQL Server持久化bean

```
 <bean id="mssql-ds" class="net.sourceforge.jtds.jdbcx.JtdsDataSource" destroy-method="close">
   <property name="serverName" value="SERVERNAME"/>
   <property name="portNumber" value="PORTNUMBER"/>
   <property name="databaseName" value="DATABASENAME"/>
   <property name="user" value="USER"/>
   <property name="password" value="PASSWORD"/>
 </bean>

```
Oracle持久化bean

```
<bean id="oracle-ds" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
	<property name="driverClassName" value="oracle.jdbc.driver.OracleDriver"/>
	<property name="url" value="jdbc:oracle:thin:@10.53.132.47:1521:activemq"/>
	<property name="username" value="activemq"/>
	<property name="password" value="activemq"/>
	<property name="maxActive" value="200"/>
	<property name="poolPreparedStatements" value="true"/>
</bean>

```
DB2持久化bean

```
<bean id="db2-ds" class="org.apache.commons.dbcp.BasicDataSource"  destroy-method="close">
      <property name="driverClassName" value="com.ibm.db2.jcc.DB2Driver"/>
      <property name="url" value="jdbc:db2://hndb02.bf.ctc.com:50002/activemq"/>
      <property name="username" value="activemq"/>
      <property name="password" value="activemq"/>
      <property name="maxActive" value="200"/>
      <property name="poolPreparedStatements" value="true"/>
</bean>

```


-----
>本博文from 淮少吧 


