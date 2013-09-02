title: Block 定时器 让我们解放了
date: 2013-09-02 09:28:52
tags: [技术]
categories: hexo
---
Block 没有出现前 ios写个定时器太麻烦了,好在Block的让我们小爽了一把,以后写timer 简单的要命了
<!-- more -->
	dispatch_after(dispatch_time(DISPATCH_TIME_NOW, 0.5 * NSEC_PER_SEC), dispatch_get_current_queue(), ^{

	     [bgColorView removeFromSuperview];

	});


或者

	double delayInSeconds = 2.0;
	dispatch_time_t popTime = dispatch_time(DISPATCH_TIME_NOW, delayInSeconds * NSEC_PER_SEC);
	dispatch_after(popTime, dispatch_get_main_queue(), ^(void){
	    <#code to be executed on the main queue after delay#>
	});