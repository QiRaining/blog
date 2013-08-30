title: ios 通过当前view得到所在的viewcontroller
date: 2013-08-29 18:35:01
tags: [技术]
categories: ios
---
long long ago ，带过的小弟遇到了一个问题，需要从当前的控件（一般是uiview）获取当前所在的viewcontroller
<!-- more -->
当时给出他的解决办法
```
@implementation UIView (GetVCAdditions)
- (UIViewController *)GetiewController {
    Class vcc = [UIViewController class];
    UIResponder *responder = self;
    while ((responder = [responder nextResponder]))
        if ([responder isKindOfClass: vcc])
            return (UIViewController *)responder;
    return nil;
}


```
