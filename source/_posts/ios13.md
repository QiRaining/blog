title: 复杂页面消退的一个简单实例
date: 2013-08-31 22:42:52
tags: [技术]
categories: ios
---

如图

{% img left http://ww3.sinaimg.cn/mw690/a43af4ffjw1e8680v5hirj20df09qglv.jpg  400 600 %}

<!-- more -->
实现上面的这个又两种实现方式 

* 一种是给页面1 发广播通知 

* 另外一种就是我要介绍的

```
 [(UINavigationController*)self.parentViewController.presentingViewController

     popToRootViewControllerAnimated:YES];

    [self dismissModalViewControllerAnimated:YES];
```
