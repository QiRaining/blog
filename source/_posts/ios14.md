title: 如何清空 NSUserDefaults 下所有数据
date: 2013-09-02 08:18:20
tags: [技术]
categories: ios
---
每个app 难免要在NSUserDefaults中记一些数据,但这些数据某些清空下药全部清空,比如系统版本升级啦,后台存储数据结构变更啦
<!-- more -->
下面给出的代码端就是清空NSUserDefaults的一个实现
```
  if (![[NSUserDefaults standardUserDefaults] boolForKey:@"dontClearHXCache"])

    {

        NSString *appDomainStr = [[NSBundle mainBundle] bundleIdentifier];

        [[NSUserDefaults standardUserDefaults] removePersistentDomainForName:appDomainStr];

        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"dontClearHXCache"];

       [[NSUserDefaults standardUserDefaults]synchronize];

    }

    else

    {

        [[NSUserDefaults standardUserDefaults] setBool:YES forKey:@"dontClearHXCache"];

        [[NSUserDefaults standardUserDefaults]synchronize];



    }
```