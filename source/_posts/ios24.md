title: What is the difference between Category and Class Extension?
date: 2013-09-15 13:39:07
tags: [技术]
categories: ios
---
细心的人会发现当我们new 一个文件的时候会发现下图的部分.
{% img http://ww4.sinaimg.cn/mw690/a43af4ffjw1e8n5s8yocrj20km0e1766.jpg 400 300%}
但是这个问题来了Category 和 Extension 就近又什么区别呢?
<!-- more -->

##1:什么是Category?
实现这样一种场景,当我们用我们用NSArray的时候经常会遇到要去重的操作,可是自带的NSArray并没有这个方法,想要用你第一印象是自己写个类继承他,OC 给我们提供了一个方法可以直接在原有的基础上进行扩展.这就Category.分类能够做到的事情主要是：即使在你不知道一个类的源码情况下，向这个类添加扩展的方法。一个类可以有n+个分类,这些分类的实现可以在不同的文件中.

下面是我写的一个分类

NSArray+Unique.h

	@interface NSArray (Unique)
	- (NSArray *) uniqueMembers;
	- (NSArray *) unionWithArray: (NSArray *) array;
	@end

NSArray+Unique.m

	@implementation NSArray (Unique)
	- (NSArray *) uniqueMembers
	{
	    NSMutableArray *copy = [self mutableCopy];
	    for (id object in self)
	    {
	        [copy removeObjectIdenticalTo:object];
	        [copy addObject:object];
	    }
	    return [copy autorelease];
	}

	- (NSArray *) unionWithArray: (NSArray *) anArray
	{
	    if (!anArray) return self;
	    return [[self arrayByAddingObjectsFromArray:anArray] uniqueMembers];
	}

	@end

是不是很简单.但是应用Category还有如下

###需要注意的问题：

1. Category可以访问原始类的实例变量，但不能添加实例变量，如果想添加变量，那就通过继承创建子类来实现。  
 
2. Category的优先级要高,当类中的方法跟原使类中的方法重名的时候是会重载原始类的方法. 

3. 和普通接口有所区别的是，在Category的实现文件中的实例方法只要你不去调用它你可以不用实现所有声明的所有方法。

4. 不要在Category 调用 Super方法


##2:什么是 Extension
 扩展(Extension)人们往往以为就是匿名分类,因为他的语法看起来很像

下面是一个Extension

	@interface ExtensionClass : NSObject  
	@property (retain, readonly) float value;
	@end  
	   
	   
	@interface ExtensionClass () { //注意此处：扩展  
	      
	}  
	@property (retain, readwrite) float value; 
	- (void)setValue:(float)newValue;  
	@end  
	   
	@implementation ExtensionClass  
	   
	- (float)value {  
	    return value;  
	}  
	   
	- (void)setValue:(float)newValue {  
	    value = newValue;  
	}  
	   
	@end 

**虽然它们的语法的确很相似。虽然都可以用来为一个现有的类添加方法和属性，但它们的目的和行为却是不同的。**

##Class extensions注意事项:

1. 可以定义属性(实例变量)

2. 在公共接口(类的声明中)中,开发者可以声明一个属性(实例变量)是只读的,随后在类扩展中声明为可写。这样，对外部代码而言,该属性(实例变量)将是只读的,而内部代码却可以使用它setter方法。

3. 分类必须在第一个@interface中声明方法，并且在@implementation中提供实现，不然运行时出错。而类扩展的声明可以不在第一个@interface中去声明

