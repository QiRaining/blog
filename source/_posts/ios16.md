title: 善用 NSAutoreleasePool 节约宝贵内存
date: 2013-09-02 08:26:20
tags: [技术]
categories: ios
---
autorelease自动释放内存，并不会立即把内存释放掉，而是要等到下一个事件周期才会释放掉。问题是一些资源我们不得不使用autorelease类型，比如作为函数的返回值，而且系统api及项目是的大部分也都是这么做的，如果全都依靠我们手动释放很容易造成内存泄漏。
<!-- more -->

	 	for (int i = 0; i <= 10000; i ++) {
	  
	        //创建一个自动释放池
	  
	         NSAutoreleasePool *pool = [NSAutoreleasePool new];
	  
	         NSString *filePath = [[NSBundle mainBundle] pathForResource:@"hf" ofType:@"PNG"];
	  
	         UIImage *image = [[UIImage alloc] initWithContentsOfFile:filePath];
	  
	         UIImage *scalimage = [image imageByScalingAndCroppingForSize:CGSizeMake(320, 640)];
	  
	         [image release];
	  
	        //将自动释放池内存释放，它会同时释放掉上面代码中产生的临时变量image2
	  
	         [pool drain];
	  
	     }