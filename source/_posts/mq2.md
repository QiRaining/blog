title: MQ 笔记之 JMS 简介 （什么是JMS）
date: 2013-08-21 21:22:00
tags: [技术]
categories: MQ
---
##一：JMS基本概念

###1.      JMS的目标

为企业级的应用提供一种智能的消息系统，JMS定义了一整套的企业级的消息概念与工具，
<!-- more -->

尽可能最小化的Java语言概念去构建最大化企业消息应用。统一已经存在的企业级消息系

统功能。

###2.      JMS提供者

JMS提供者是指那些完全完成JMS功能与管理功能的JMS消息厂商，理论上JMS提供者完成 

JMS消息产品必须是100%的纯Java语言实现，可以运行在跨平台的架构与操作系统上，当前

一些JMS厂商包括IBM,Oracle, JBoss社区 (JBoss Community), Apache 社区(ApacheCommunity)。

###3.      JMS应用程序, 一个完整的JMS应用应该实现以下功能：

* JMS 客户端 – Java语言开发的接受与发送消息的程序

* 非JMS客户端 – 基于消息系统的本地API实现而不是JMS

* 消息 – 应用程序用来相互交流信息的载体

* 被管理对象–预先配置的JMS对象，JMS管理员创建，被客户端运用。如链接工厂，主题等

* JMS提供者–完成JMS功能与管理功能的消息系统

##二: JMS 规范


### 连接工厂
连接工厂是GUST用来创建连接的对象，例如ActiveMQ提供的ActiveMQConnectionFactory。

### 连接
JMS Connection封装了客户与JMS提供者之间的一个虚拟的连接。

### 会话
MS Session是生产和消费消息的一个单线程上下文。会话用于创建消息生产者（producer）、消息消费者（consumer）和消息（message）等。会话提供了一个事务性的上下文，在这个上下文中，一组发送和接收被组合到了一个原子操作中。

### 目的地
目的地是客户用来指定它生产的消息的目标和它消费的消息的来源的对象。JMS1.0.2 规范中定义了两种消息传递域

####点对点的消息模式(Point to Point Messaging)
{%img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e7umekfemwj20is06o0tb.jpg  300  200 点对点 %}

***

下面的JMS对象在点对点消息模式中是必须的：

* 队列(Queue) – 一个提供者命名的队列对象，客户端将会使用这个命名的队列对象

* 队列链接工厂(QueueConnectionFactory) – 客户端使用队列链接工厂创建链接队列ConnectionQueue来取得与JMS点对点消息提供者的链接。

* 链接队列(ConnectionQueue) – 一个活动的链接队列存在在客户端与点对点消息提供者之间，客户用它创建一个或者多个JMS队列会话(QueueSession)

* 队列会话(QueueSession) – 用来创建队列消息的发送者与接受者(QueueSenderandQueueReceiver)

* 消息发送者(QueueSender 或者MessageProducer)– 发送消息到已经声明的队列

* 消息接受者(QueueReceiver或者MessageConsumer) – 接受已经被发送到指定队列的消息

**注意如下：**

* 每个消息只能有一个消费者。
* 消息的生产者和消费者之间没有时间上的相关性。无论消费者在生产者发送消息的时候是否处于运行状态，它都可以提取消息。

#### 发布订阅模式(publish – subscribe Mode)

{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1e7umpp9onwj20is0ayjsk.jpg  200  300 发布者 %}
***
* 主题Topic(Destination) – 一个提供者命名的主题对象，客户端将会使用这个命名的主题对象

* 主题链接工厂(TopciConnectionFactory) – 客户端使用主题链接工厂创建链接主题 ConnectionTopic来取得与JMS消息Pub/Sub提供者的链接

* 链接主题(ConnectionTopic) – 一个活动的链接主题存在发布者与订阅者之间

* 会话(TopicSession) – 用来创建主题消息的发布者与订阅者 (TopicPublisher  and TopicSubscribers)

* 消息发送者MessageProducer) – 发送消息到已经声明的主题

* 消息接受者(MessageConsumer) – 接受已经被发送到指定主题的消息

**注意如下：**

* 每个消息可以有多个消费者。
* 生产者和消费者之间有时间上的相关性。订阅一个主题的消费者只能消费自它订阅之后发布的消息。JMS规范允许客户创建持久订阅，这在一定程度上放松了时间上的相关性要求。持久订阅允许消费者消费它在未处于激活状态时发送的消息。

****
>本系列博文参考自whitesock  淮少吧 贾志刚

