title: removeFromSuperview添加动画使其更加高雅美观
date: 2013-08-29 18:29:40
tags: [技术]
categories: ios
---
>程序中难免使用removeFromSuperview，但是view控件直接从界面突然消失会显得非常不友好，作为一个高端大气上档次的app细节处处应该注意，
<!-- more -->
添加一个简单的动画给用户的感觉立刻不一样了。废话不说直接上代码
```
   [UIView animateWithDuration:0.2

                     animations:^{_logViewController.view.alpha = 0.0;}

                     completion:^(BOOL finished)

                                { [_logViewController.view removeFromSuperview]; }

     ];



```
