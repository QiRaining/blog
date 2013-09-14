title: ios笔记--block应该知道的那几件事
date: 2013-09-11 23:32:18
tags: [技术]
categories: ios
---
block 现在已经基本上已经使用非常普遍了,在引用中也又很多坑,下面把block开发中应该知道的那几件事总结下.
<!-- more -->
##:内联(inline)Block
>内联block 说白了就是block被嵌入到一个函数中 
例如:

**typedef void (^HelloBlock)(void);**
```
- (void) BlockTest{
HelloBlock myBlock= ^(void){
NSLog(@"Hello Block");
};
myBlock();
}

```

##注意事项

###1.内联的block中内部定义的变量 自己本身有读写权限

###2.block内部要修改外部变量 需要将外部变量声明__block

###3.Block retain是无效的，要想保留block生命周期，可以通过copy来实现，记得release

###4.被block的应用的对象，retainCount会自动加一，为了打破这种 retain circle，可以在对象前加__block，这样block块就不会维护这个对象了

 下面的写法如果不加上_block a无法dealloc

```

__block A  a =[ [[A alloc] init] withBlock:^{

 [a action];

 [ a release];

}]; //这样A的dealloc方法就会调用

```

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
###5.在独立的block中不能引用self，如果需要访问可以使用参数传递的方法(可以把其考虑成c+中参数传入函数指针对应copy)**

###6.不要随便用.语法

```
#import <UIKit/UIKit.h>   
@interface AppDelegate : NSObject <UIApplicationDelegate>
@property (nonatomic, strong) NSString *stringProperty;  
@end  

```

```
#import "GCDAppDelegate.h" 
@implementation AppDelegate 
@synthesize stringProperty;  
- (void) BlockTestError{
HelloBlock myBlock= ^(void){
	self.stringProperty = @"Block Objects"; 
	NSLog(@"String property = %@", self.stringProperty);//运行错误
};
myBlock();
}}  

- (void) BlockTestCorrect{
	HelloBlock myBlock= ^(void){
		[self setStringProperty:@"Block Objects"];
	    NSLog(@"self.stringProperty = %@", [self stringProperty]); //运行ok
	};
myBlock();
}}  
@end  
```





