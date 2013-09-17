title: 再谈涉及模式
date: 2013-09-17 23:09:18
tags: [技术]
categories: ios
---
某某曰:设计模式这东西,没有好坏之分，只有合适于不合适
<!-- more -->

今天去面试很有意思,技术考官指着最后一道二选一的编程题说,这是昨天晚上专门为你新加的.当时我听后倍感惭愧. 虽然当时在纸上把大概思路和设计说了下.为了感谢主考官的重视程度.我现在也亲自在电脑上把这个设计实现出来.
题目大概是这个意思: 一个咖啡店卖好几种咖啡:摩卡,布列夫,拿铁等等  咖啡有很多搭配:方糖,鲜牛奶,奶油,盐等. 试设计计算出咖啡(+搭配)的单价模型.


下面来谈谈我的想法

##一:虚基类 Coffee
首先 我抽象出了一个虚基类 Coffee, 什么摩卡 布列夫 拿铁都继承这个类

这个类包含什么呢
{
. 咖啡的单价(不含 方糖 奶等 调味料) -->price
. 一个存放调味料的容器 -->ecoratorRelishChain
. 一个可以得到总价的方法 --> getTotalPrices
}

下面是代码

基类咖啡.h

	 //abstract 咖啡基类
	 @class DecoratorChain;

	 @interface  Coffee: NSObject
	 @property ( nonatomic,strong ) DecoratorChain *ecoratorRelishChain;//用来存储 奶 方糖 等等的调料 可以把它想象成一个调味盒 
	 @property ( nonatomic,strong ) NSDecimalNumber *price;//单价 不含配料

	 -(NSDecimalNumber *) getTotalPrices;//得到总价

	 @end

基类咖啡.m

	@interface Coffee()
	@property(nonatomic,strong) NSString * _coffeeName;
	@end

	@implementation Coffee

	@synthesize _coffeeName,price,ecoratorRelishChain;
	- (id)init
	{
	    self = [super init];
	    if (self) {
	        _coffeeName=@"咖啡名称";
	        price = [[NSDecimalNumber alloc] initWithString:@"20"];
	    }
	    return self;
	}

	-(NSDecimalNumber *)getTotalPrices
	{
	    
	    return [self.price decimalNumberByAdding: [ecoratorRelishChain getCountPrice]];
	}

	@end


------

##二: 虚基类 EcoratorRelish
  
EcoratorRelish 是 方糖 奶油  牛奶 盐 等等的抽象类 这个继承在button  点击的时候 可以自动将自己加入到chain (调料盘中)

这个类包含什么呢
{
. 自身的单价 -->price
. 可以修改价钱的策略 --> configPrivilege
}

方糖 等抽象出来的基类EcoratorRelish.h

	@interface  EcoratorRelish: UIButton
	@property(nonatomic,strong)  NSDecimalNumber *price;//单价 
	//Overload
	-(void)configPrivilege;//可以配置优惠策略
	-(DecoratorChain *)getComponentCoffee;
	@end

EcoratorRelish.m


	@implementation  EcoratorRelish
	@synthesize  price;

	- (id)init
	{
	    self = [super init];
	    if (self) {
	        [self addTarget:self action:@selector(addDecoratorChain) forControlEvents:UIControlEventTouchUpInside];
	    }
	    return self;
	}
	//Overload
	-(void)configPrivilege
	{
	    //可以配置优惠策略 
	}

	//获取当前的辅料坐在的ViewController
	- (UIViewController *)getViewController {
	    Class vcc = [UIViewController class];
	    UIResponder *responder = self;
	    while ((responder = [responder nextResponder]))
	        if ([responder isKindOfClass: vcc])
	            return (UIViewController *)responder;
	    return nil;
	}

	//获取要装饰的咖啡的调味盒(chain)
	-(DecoratorChain *)getEcoratorRelishChain
	{
	   return  [self getViewController].coffee.ecoratorRelishChain;
	}

	//将自己加到咖啡的调味盒(chain)
	-(void)addDecoratorChain
	{
	    [[self getEcoratorRelishChain] addDecoratorRelish:self];
	}

	@end

------

##三: 调料盒 DecoratorChain

DecoratorChain.h

	//用于保存配料的chain
	@interface  DecoratorChain: NSMutableArray
	-(void)addDecoratorRelish:(EcoratorRelish*)ecoratorRelish;
	@end


DecoratorChain.m

	@interface DecoratorChain()
	@property(nonatomic,strong) NSDecimalNumber * _countPrice;
	@end

	@implementation DecoratorChain
	@synthesize _countPrice;

	- (id)init
	{
	    self = [super init];
	    if (self) {
	        _countPrice = [[NSDecimalNumber alloc]init];
	    }
	    return self;
	}

	-(void)addDecoratorRelish:(EcoratorRelish*)ecoratorRelish
	{
	    [self addObject:ecoratorRelish];
	}

	//得到当前所有chain 里面的总价
	-(NSDecimalNumber*)getCountPrice
	{
	    for (EcoratorRelish *tmp  in self ) {
	        [_countPrice decimalNumberByAdding:tmp.price];
	    }
	    return _countPrice;
	}

	@end

下面的实现代码大家应该都会写了吧. 其实回头看下 中间应用到的设计模式 最明显的是 装饰 和 组合 策略
