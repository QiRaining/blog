title: 快速清除subviews之 隐私循环
date: 2013-08-29 18:48:47
tags: [技术]
categories: hexo
---

> 问：如何快速把当前view下的所有子view 及其子子view们删除掉
<!-- more -->
解答这个问题前先介绍下 NSArray 

NSArray 类定义的方法

1.  makeObjectsPerformSelector:@select（aMethod）

简介：让数组中的每个元素 都调用 aMethod 

2. makeObjectsPerformSelector:@select（aMethod）

   　　　　              withObject:oneObject

**ps：让数组中的每个元素 都调用 aMethod  并把 withObject 后边的 oneObject 对象做为参数传给方法aMethod**

因此可以利用隐私循环来快速清除subviews

[[self.view subviews] makeObjectsPerformSelector:@selector(removeFromSuperview)];