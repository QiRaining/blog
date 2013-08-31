title: xcode 5.0 的持续继承
date: 2013-08-31 20:41:27
tags: [技术]
categories: ios
---
>
Xcode的支持持续集成通过Xcode的服务流程。Xcode的服务，可在OS X服务器，自动一体化建设过程中，您的应用程序的分析，测试和归档。<!-- more -->从开发的Mac，您可以创建机器人上运行一个单独的服务器，在那里他们执行这些集成。机器人可以帮助确保您的产品始终处于释放状态，当有故障时，服务会通知你的人或代码变化引起的故障。

{%img left http://img.blog.csdn.net/20130617220248765 400 600%}

---------

##概览

按照本文档中列出的步骤，建立一个持续集成的工作流程，使用Xcode和Xcode服务。
	注：持续集成工作流程通常依赖于一个或多个开发Mac上运行Xcode和一个独立的OS X服务器运行Xcode的服务。但是，您可以安装开发的Mac OS X Server的。这样的配置可以有助于评估如何采用持续集成。之后，你会发现它有一个专门的OSX服务器运行Xcode的托管服务，你的资料库，并远程执行集成更多有用的。

---------

##设置和自定义的Xcode服务
	即使你从来没有架设一台服务器，你会发现OSX服务器上设立了Xcode服务是简单的过程。后服务运行起来，你可以添加开发设备，配置机器人，并指定发布标准。

[有关章节： “采用持续集成工作流”](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/xcode_guide-continuous_integration/200-Adopting_a_Continuous_Integration_Workflow/adopt_continuous_integration.html#//apple_ref/doc/uid/TP40013292-CH3-SW1)

---------

##创建和运行僵尸
	
	机器人的自动化工作流程的心脏。机器人构建和测试产品与您选择的方案。随着Xcode的服务能够访问你的项目的源代码库中，您可以创建并安排定期运行或在每个源代码提交的机器人。您也可以设定机器人发送邮件通知其集成的成功或失败。

[有关章节： “配置机器人执行连续集成”](https://developer.apple.com/library/prerelease/ios/documentation/IDEs/Conceptual/xcode_guide-continuous_integration/ConfigureBots/ConfigureBots.html#//apple_ref/doc/uid/TP40013292-CH9-SW1)


##监控和​​管理集成

	机器人的自动化工作流程的心脏。机器人构建和测试您的产品，您所选择的计划。Xcode的服务提供了日志管理机器人，查看测试结果，并读取整合日志导航。该服务还提供了通过一个网页，在那里您可以查看bot活动的总结以及集成细节的结果。
   
[有关章节： “工作与机器人”](https://daw.apple.com/cgi-bin/WebObjects/DSAuthWeb.woa/wa/login?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2F%2Flibrary%2Fprerelease%2Fios%2Fdocumentation%2FIDEs%2FConceptual%2Fxcode_guide-continuous_integration%2F300-Working_with_Bots%2Fview_integration_results%2Ehtml#//apple_ref/doc/uid/TP40013292-CH4-SW1)






