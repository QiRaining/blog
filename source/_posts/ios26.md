title: 阿里IOS面试题之多线程选用NSOperation or GCD
date: 2013-09-18 13:31:04
tags: [技术]
categories: ios
---
今天早上接到了阿里从杭州打过来的电话面试.虽然近期面试了一些大中型的互联网企业,但是跟素有"IT界的黄浦军校"的阿里面试官接触还是不免紧张.
<!-- more -->
面试持续了三四十分钟吧,期间我手机信号不好的大部分问题都是更加简历上的项目检验而来的,个人感觉问的不算太难但是却很深入,很明显不是能够背几道面试题能够搞定的.而且每个题基本上都跟优化设计和性能相关.

其中有一道是关于是问"你平时上国外的一些网站吗?上那些网站呢?"

我平时大部分时间就是上stackoverflow.和cocoscontrol github 还有apple 的dev论坛.

"你们项目中为什么多线程用GCD 而不用NSOperation呢? 你有没有发现国外的大牛他们多线程都是用NSOperation? 你能告诉我他们这样做的理由吗?"

一下子把我问懵了.我之所以用GCD 是因为GCD用起来比较简单.代码不用分散 比较集中维护度比较高.而且代码的执行效率也要比NSOperation快些. 但是至于国外的大牛们为什么那样做 我还真的不清楚. 后来挂完电话 正好搜狐的家明哥打电话过来 我问了下他.家明哥跟我说他包括他之前在新浪做项目时也是能用GCD的地方就用GCD 尽量减少NSOperation的使用,因为GCD在多核CPU上线程切换的时间比较短 效率相对高些,至于阿里为什么那样,可能每个公司对某个技术有着不同的理解吧.

跟明哥挂了电话 我给对方回过去,到底为什么? 对方笑着问我:"你用GCD在ASI上封装的那层网络请求 为什么后来有创建了自己的一个队列对维护这些请求?NSOperation是建立在GCD之上的 虽然使用起来比较复杂 但是在线程并发管理 优先级 上有着GCD 无法比拟的优势."

但是对我来说 我还是倾向于用GCD,正如家明说的 每个公司对相同的技术有着不同的理解吧.