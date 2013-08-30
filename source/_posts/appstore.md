title: ios 笔记之 内购
date: 2013-08-21 09:18:13
tags: [技术]
categories: ios
---
> 昨晚同事拿了一个app 发现其app 内部页面打开了appstore  并没有唤起手机自带的appstore， 刚开始以为是用webview 加载的
<!-- more --> ，可是自己些了一个demo 发现并不是那样一回事 用webview 加载appstore 地址 会被js 自动吊起本地的appstore，
下面是我的发给同事的邮件 直接贴下来

我们都绕了弯路 一直以为是用webview 加载的。 我下班做了测试 发现用webview 加载appstore的地址 ，ios 会根据User-Agent 自动判断 唤起本地的app store，其效果跟用[[UIApplicationsharedApplication] openURL:[NSURL URLWithString:@""]];是一样的。

后来我尝试改写User-Agent  发现打开的页面是电脑打开的页面一样的 并不是我们通过手机 打开app store 看到的页面。

后来我看苹果的文档 发现 他们提供了一个类SKStoreProductViewController专门来干这个事情的

[https://developer.apple.com/library/ios/documentation/StoreKit/Reference/SKITunesProductViewController_Ref/Introduction/Introduction.html](https://developer.apple.com/library/ios/documentation/StoreKit/Reference/SKITunesProductViewController_Ref/Introduction/Introduction.html)


实现效果如下图

{% img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1e7u10xs9nwj20m015c0x9.jpg 250 600  %}

##下面是关键代码

```
需要引入的
#import <StoreKit/StoreKit.h>
delegate 为SKStoreProductViewControllerDelegate


调用方式
    [self openAppWithIdentifier:@"592043421"];



#pragma mark - SKStoreProductViewControllerDelegate
- (void)productViewControllerDidFinish:(SKStoreProductViewController *)viewController {
    [viewController dismissViewControllerAnimated:YES completion:^{
    }];
}






- (void)openAppWithIdentifier:(NSString *)appId {
    SKStoreProductViewController *storeProductVC = [[SKStoreProductViewController alloc] init];
    storeProductVC.delegate = self;
    
    NSDictionary *dict = [NSDictionary dictionaryWithObject:appId forKey:SKStoreProductParameterITunesItemIdentifier];
    [storeProductVC loadProductWithParameters:dict completionBlock:^(BOOL result, NSError *error) {
        if (result) {
            [self presentViewController:storeProductVC animated:YES completion:nil];
        }
    }];
}

```
