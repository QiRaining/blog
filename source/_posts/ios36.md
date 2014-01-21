title: iOS系列教程之常见开发Tips
date: 2014-01-21 00:10:03
tags: [技术]
categories: ios
---
开发技巧和常见错误汇总,不定期更新中,也欢迎大家总结跟帖

##1:ARC下NSNotificationCenter需要remove

```
- (void) dealloc 
{
	//  [super dealloc] 千万不要画蛇添足    
	[[NSNotificationCenter defaultCenter] removeObserver:self]; 
}

```
<!-- more -->
##2:const or #define

下面是大家常见的两种定义优先选择第二种
```
 #define PI 3.14159  //只预处理时进行符号替换,不推荐
 const doulbe Pi=3.14159 //安全性高,和效率上推荐

```

##3:常量字符串声明
Foo.h
```
extern NSString *constXXFooDidBarNotification;

```
Foo.m

```
NSString *const XXFooDidBarNotification =@"XXFooDidBarNotification”;

```
上面是引用的是 http://nshipster.com/nsnotification-and-nsnotificationcenter/中的一段声明

有些童鞋不太理解const 修饰的用法 尝尝写成
```
constNSString *XXFooDidBarNotification =@"XXFooDidBarNotification”;

```
详情可以参看 :http://walkingsmarts.com/correct-way-of-defining-constants-in-objective-c/ 


##4:NSTimer invalidate 错误
之前一直用NSTimer ,这两天再做性能优化的时候 发现了问题,用到NSTimer的ViewControll 一直没有释放. 后来跟踪发现了问题.
```
[scheduledTimerWithTimeInterval :target:selector:userInfo:repeats:]

```
 当target 为self (VC)的时候  因为Timer 强引用了self, 
所以当你的

```
[ timer invalidate ] 

```
写到 dealloc 的时候  是永远无法释放当前VC的


##5:NSTimer并不是一个高精度的定时器


苹果官方文档已经给出了
>>
A timer is not a real-time mechanism; it fires only when one of the run loop modes to which the timer has been added is running and able to check if the timer’s firing time has passed. Because of the various input sources a typical run loop manages, the effective resolution of the time interval for a timer is limited to on the order of 50-100 milliseconds. If a timer’s firing time occurs during a long callout or while the run loop is in a mode that is not monitoring the timer, the timer does not fire until the next time the run loop checks the timer. Therefore, the actual time at which the timer fires potentially can be a significant period of time after the scheduled firing time.

所以当你需要高精度的定时器的时候 请用**dispatch_after **进行替换吧

##6:调试的技巧 

有没有用过下面的log输出呢尝试下吧

```
-(void) buttonPressed :(UIButton *)button
{ 
  NSLog(@"Stack trace: %@", [NSThread callStackSymbols]);
  NSLog(@"Current selector: %@", NSStringFromSelector(_cmd));  
  NSLog(@"Object class: %@", NSStringFromClass([self class])); 
  NSLog(@"Filename: %@", [[NSString stringWithUTF8String:__FILE__] lastPathComponent]); 
  ... 
}

```

##7:注释技巧

   * 在代码中加注释时，如果以 // TODO: 或 // FIXME: 或者 // !!!: 或 // ???: 开头的话，此注释会出现在方法的下列列表里，方便日后跟踪。
   * 利用Xcode4中的自定义代码片段，可以用一个快捷键插入一个预先定义好的注释片段

##8:改变模拟器窗口的大小

   在分辨率比较低的时候，iPad和iPhone模拟器会自动缩小，如果希望保持原始大小，可以修改 /Developer/Platforms/iPhoneSimulator.platform/Developer/Application/iOS Simulator/Contents/Info.plist，添加一个Application UI Presentaion Mode，设成All surpressed，则运行模拟器时自动隐藏菜单条和dock。在此目录下的 Resources/Devices/iPad.deviceinfo/Info.plist 中的chromeImageFile，把值设成空，可以去掉模拟器的边框。
   


##9:enum or NS_ENUM
这是昨天晚上在slack内讨论的话题有必要加进来正好之前唐巧微博分享过的有兴趣的可以去
https://github.com/raywenderlich/objective-c-style-guide









