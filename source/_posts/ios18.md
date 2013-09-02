title: 父View禁用touch 如何让子view还能获取touch event
date: 2013-09-02 09:14:30
tags: [技术]
categories: ios
---
{%img left http://ww1.sinaimg.cn/mw690/a43af4ffjw1e87vwh4ocsj20a70dcjrp.jpg 300 400%}
<!-- more -->
如上图 当view2 包含在view1中,默认清空下 view1 的touch事件被禁用掉侯view2 肯定是接收不到touch事件的,那有没有什么办法能够让view2接收到touch事件呢?
其实很简单hitTest 可以帮我们实现这个需求
```
uiview addition
-(id)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
    id hitView = [super hitTest:point withEvent:event];
    if (hitView == self) return nil;
    else return hitView;
}
```