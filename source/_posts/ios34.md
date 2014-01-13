title: ARC下block,weak,unsafe_unretained
date: 2013-11-30 20:44:06
tags: [技术]
categories: ios
---

最近把项目转到ARC 下了,之前__block 之前总结过一篇关于 [block](http://blog.csdn.net/hufengvip/article/details/11585537) 的文章,有兴趣的童鞋可以去看下.

<!-- more -->


```
@interface ViewController ： UIViewViewController 
 {
        NSString *_string;
 }

 __block ViewController *controller = self;   
    _block = ^{
         NSLog(@"string %@",controller->_string);
    };
```
ARC 下 __block 依然可用 但是实现发现 __block 在AF 执行异步多线程下 会调用返回后 才会调用dealloc将当前VC 销毁, 如果改为__weak 后
当前的VC 会马上调用dealloc销毁. 而网络请求会以错误error.code  -999 异步取消返回.

__weak UIViewController *vc = self; // OK for iOS 5 only

__unsafe_unretained UIViewController *vc = self; // OK for iOS 4.x and up

__block UIViewController *vc = self; // OK if you aren't using ARC

以上是三个比较接近容易搞混的关键字.

__weak 在释放指针后能够同时将指针置为nil

__unsafe_unretained 只留下一个无效的也指针

__block 打破循环 copy副本 内部修改




