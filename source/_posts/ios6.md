title: ios iphone5 适配 之 如何是app 适用不通分辨率
date: 2013-08-29 18:44:36
tags: [技术]
categories: ios
---
iphone5适配 有如下集中种思路

<!-- more -->

1：利用自身的autoresize 加上代码实现

2：写两套xib

3：利用ios5+ 以上的autolayout

前两种方式应用比较广泛 ，因为毕竟国内还有部分应用ios4.3的用户

下面给第二种方式应用下的部分代码

```
- (id)init
{

    NSString    *clssName = NSStringFromClass([self class]);
    NSString    *xibName = is4InchScreen() ?[NSString stringWithFormat:@"%@_4inch", clssName] : clssName;
    self = [super initWithNibName:xibName bundle:nil];
    if (self) {}
    return self;

}

```

