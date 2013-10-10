title: IOS 开发之 CocoaPods讲解
date: 2013-10-11 00:53:01
tags: [技术]
categories: ios
---
## 什么是CocoaPods? 

看看你的项目吧,肯定会用到很多第三方的开源库,比如ASI,SBJson,MBProgressHUD等等.
<!-- more -->

比如下面这款APP

{% img http://ww4.sinaimg.cn/mw690/a43af4ffjw1e9gkhrfkupj207g0bgdgc.jpg 200 300 %}

  
用到的库就包含如下这样多 
   
{% img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e9gki1ovsqj205p09cgm3.jpg 200 300 %}

随着你的工程越来越大,你引入的第三方的开源库可能会越来越多.这些依赖的开源库维护管理越久越来越困难.于是CocoaPods出现了,它可以帮助管理Xcode项目的依赖关系。(说到这做过java的同学应该想到了maven了吧).
你可以定义一个非常简单的文本来管理配置这些依赖 .

------

##安装步骤

###1.前期工作

 因为CocoaPods是基于Ruby的 介于天朝的特殊国情,你如果直接gem install 安装的话 肯定会遇到问题的所以首先你需要吧你的源换下. 换成什么呢?还是感谢下阿里吧.阿里给我们搭建了一个RubyGems 镜像.

>由于国内网络原因（你懂的），导致 rubygems.org 存放在 Amazon S3 上面的资源文件间歇性连接失败。所以你会与遇到 gem install rack 或 bundle install 的时候半天没有响应，具体可以用 gem install rails -V 来查看执行过程。
这是一个完整 rubygems.org 镜像，你可以用此代替官方版本，同步频率目前为15分钟一次以保证尽量与官方服务同步。

	$ gem sources --remove https://rubygems.org/
	$ gem sources -a http://ruby.taobao.org/
	$ gem sources -l
	*** CURRENT SOURCES ***

	http://ruby.taobao.org
	# 请确保只有 ruby.taobao.org

###2.开始安装

	$ [sudo] gem install cocoapods
	$ pod setup	

-----

##如何使用

###1.创建配置文件 
首先在你的工程下(我创建的是CocoaPodsTest)创建一个空的Podfile文件,这个文件就是用来配置依赖的

	$ vi Podfile

###2. 保存退出

	$ wq

###3. 安装 pod

	$ pod install

如果成功后您会看到如下信息
   
{%img http://ww3.sinaimg.cn/mw690/a43af4ffjw1e9gkg71ll2j20dh06cq3y.jpg 300 200%}

并且在你的工程下如多出如下文件
    
    
{%img http://ww4.sinaimg.cn/mw690/a43af4ffjw1e9gkht6s51j205n048mxa.jpg%}

###4. 查询确认你要引用的库 
比如我要引入SBJson 为了确认CocoaPods能不能导入这个库 我需要执行

	$ pod search SBJson

结果返回了如下信息 则证明可以引入
{%img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e9gkftzdavj20i104bq3r.jpg 350 300 %}	

###5. 加入引入的库

打开Podfile配置文件 加上如下内容保存

	platform :ios
	pod 'SBJson'

当然你也可以指定特定的版本 例如 
	pod 'SBJson', '~> 3.2'

###6. 保存更新

	$ pod update

更新成功后出现如下信息

	Analyzing dependencies
	Downloading dependencies
	Installing SBJson (3.2)
	Generating Pods project
	Integrating client project 
打开CocoaPodsTest.xcworkspace  此刻会发现已经把我们想要的库下载好了
如图
{% img http://ww1.sinaimg.cn/mw690/a43af4ffjw1e9gkhxhn3ej207109mwf0.jpg 300 400%}


6:设置Target头文件索引,第一次使用 需要配置下相应的头文件索引,不然他们虽然在一个工作区下 但是不在同一个项目中也无法直接使用 因此您需要
按着下图,进行相应的配置 

{%img  http://ww2.sinaimg.cn/mw690/a43af4ffjw1e9gkjbu1t8j20pu06qwfm.jpg %}

7:ok 大功告成 以后你只要更执行如下命令 就可以更新你引入的所有第三方库了

	$ pod update

-----

更详细的内容可以看下cocoapods的官网哈.
http://docs.cocoapods.org/guides/getting_started.html



