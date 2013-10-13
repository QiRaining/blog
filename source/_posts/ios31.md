title: 如何建立基于CocoaPods的ReactiveCocoa工程
date: 2013-10-13 22:23:32
tags: [技术]
categories: ios
---
ReactiveCocoa 和  CocoaPods 一样也是目前很流行的 能方便和提高效率的框架.
<!-- more -->

其实不光ios 学习任何一门语音最快最直接的方法就是上手. 如果单单是看看文档只能是走马观花得到一个感性认识罢了.前两天之前一个公司的测试人员跟我联系说如何学习JAVA,我问他是怎么学的,他说从网上下了好多视频教程,一直在看视频教程,也买了一些书. 我问他敲了多少代码,他说很少. 其实跟他一样的人不少. 我觉得任何事情都不简单,因为看起来简单的事情自己没有实际做过的话 往往会遇到各种各样的问题. 这也是为什么在工作中制定项目进度计划的时候 我尽量给自己和团队中的人多争取时间的最主要的一个因素.  

好了,自己一些啰嗦和感悟. 下面开始正式.

------
##What is Reactive Cocoa?
 RAV is an Object-C framework for Functional Reavtive Programming;
 两个关键点:
 1:framework 既然是framework 那就跟你用的其他framework没什么区别 无非就是加到工程中引用罢了.不做多余解释
 2:Functional Reavtive Programming 实时响应式编程

虾米引用被阿里收购后现在先上的mac版本的虾米音乐就是用Reactive Cocoa开发的.用阿里人自己的话来说就是
>好东西啊，以前我们用 KVO 或 Notification 来自动绑定数据，改用 ReactiveCocoa 写以后，代码结构更佳简单清晰，同时代码行数直接减少 60% 以上


来点直观的对比吧,比如我们想要实现一个需求:当变量中的字符串改变后即时做出相应的反馈 我们用KVO 需要如下这样做
```
// In your viewDidLoad/awakeFromNib/init
[self addObserver:self 
       forKeyPath:@"someString" 
          options:NSKeyValueObservingOptionNew 
          context:&someStringChangeContext];

// In dealloc
[self removeObserver:self 
          forKeyPath:@"someString" 
             context:&someStringChangeContext];

// Elsewhere in your class
- (void)observeValueForKeyPath:(NSString *)keyPath 
                      ofObject:(id)object 
                        change:(NSDictionary *)change 
                       context:(void *)context
{
    if (context == &someStringChangeContext) {
        if ([keyPath isEqualToString:@"someString"]) {        
            // Do a bunch of stuff here
        }
    }
}

```
上面一坨代码 在应用Reactive Cocoa后 只有短短一行

```
[RACObserve(self, someString) distinctUntilChanged] subscribeNext:^(NSString *string) {
    // Do a bunch of things here, just like you would with KVO
}];
```


##开始动手

因为我之前安装了[CocoaPods](http://hufeng825.github.io/2013/10/11/ios30/),所以我这次写的ReactiveCocoaDemo 是基于CocoaPods的.如果没有安装的可以童鞋,可以直接从github上下载[ReactiveCocoa](https://github.com/ReactiveCocoa/ReactiveCocoa)

###前期工作:

1.打开xcode 创建一个工程,我命名的工程名为ReactiveCocoaDemo,

2.终端到工程路径下

	cd ReactiveCocoaDemo/
	pod search ReactiveCocoa

3.配置依赖文件

	vi Podfile
		platform :ios,'5.0'
		pod 'ReactiveCocoa'
	wq

4.下载文件  

 	pod install /update

5:打开"Build Phases" 选中相应的target, 添加 RAC 到 "Link Binary With Libraries".加上libReactiveCocoa-iOS.a

如下图

6:在Header Search Paths 中添加$(BUILD_ROOT)/../IntermediateBuildFilesPath/UninstalledProducts/include" 

7:在  "Other Linker Flags" 添加 -ObjC 

8:在ReactiveCocoaDemo-Prefix.pch 将RAC的头文件加进去 

	#import "ReactiveCocoa.h"


###现在要实现如下功能

两个输入框 一个提示的Lable 一个按钮,
1.当两个输入框的内容相同时 提示文字显示"成功" 按钮可以点击
2.当任意一个输入框没有输入内容时 提示文字显示"请输入"  按钮不可点击
3.当输入框非空且两个输入内容不同时 提示"请重新输入"  按钮不可点击


下面是部分实现代码:

```
@weakify(self);
[[RACObserve(self, warningText)
  filter:^(NSString *newString) {
      self.resultLabel.text = newString;
      return YES;
//          return [newString hasPrefix:@"Success"];
  }]
 subscribeNext:^(NSString *newString) {
     @strongify(self);
     self.bt.enabled = [newString hasPrefix:@"Success"];
 }];


RAC(self,self.warningText) = [RACSignal combineLatest:@[
RACObserve(self,self.input.text),RACObserve(self, self.verifyInput.text)]
reduce:^(NSString *password, NSString *passwordConfirm)
{
    if ([passwordConfirm isEqualToString:password])
    {
        return @"Success";
    }
    else if([password length] == 0 || [passwordConfirm length] ==0 )
    {
        return @"Please Input";
    }
    else
    return @"Input Error";
}
  ];


```
对应关系如下图所示

{%img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e9k2n3lrisj20kf0960ty.jpg %}

学过C++ 的应该觉得这个很类似于Qt中的信号槽机制

**需要说明的是** 因为RAC很大程度上是依赖于Block的.所以在RAC前面我们加上@weakify(my_variable) 避免循环引用,然后在每一个
RAC块中为了防止提前释放我们需要用@strongify(my_variable)来对对象进行持有.[详情点击](https://github.com/jspahrsummers/libextobjc/blob/master/extobjc/EXTScope.h)

运行效果图如下

{%img http://ww1.sinaimg.cn/mw690/a43af4ffjw1e9k2zoesjqj208e069t8m.jpg %}



----

##文档附录

### Subscription

The [-subscribe…][RACSignal] methods give you access to the current and future values in a signal:

```objc
RACSignal *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence.signal;

// Outputs: A B C D
[letters subscribeNext:^(NSString *x) {
    NSLog(@"%@", x);
}];
```

For a cold signal, side effects will be performed once _per subscription_:

```objc
__block unsigned subscriptions = 0;

RACSignal *loggingSignal = [RACSignal createSignal:^ RACDisposable * (id<RACSubscriber> subscriber) {
    subscriptions++;
    [subscriber sendCompleted];
    return nil;
}];

// Outputs:
// subscription 1
[loggingSignal subscribeCompleted:^{
    NSLog(@"subscription %u", subscriptions);
}];

// Outputs:
// subscription 2
[loggingSignal subscribeCompleted:^{
    NSLog(@"subscription %u", subscriptions);
}];
```

This behavior can be changed using a [connection][Connections].

### Injecting effects

The [-do…][RACSignal+Operations] methods add side effects to a signal without actually
subscribing to it:

```objc
__block unsigned subscriptions = 0;

RACSignal *loggingSignal = [RACSignal createSignal:^ RACDisposable * (id<RACSubscriber> subscriber) {
    subscriptions++;
    [subscriber sendCompleted];
    return nil;
}];

// Does not output anything yet
loggingSignal = [loggingSignal doCompleted:^{
    NSLog(@"about to complete subscription %u", subscriptions);
}];

// Outputs:
// about to complete subscription 1
// subscription 1
[loggingSignal subscribeCompleted:^{
    NSLog(@"subscription %u", subscriptions);
}];
```

## Transforming streams

These operators transform a single stream into a new stream.

### Mapping

The [-map:][RACStream] method is used to transform the values in a stream, and
create a new stream with the results:

```objc
RACSequence *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence;

// Contains: AA BB CC DD EE FF GG HH II
RACSequence *mapped = [letters map:^(NSString *value) {
    return [value stringByAppendingString:value];
}];
```

### Filtering

The [-filter:][RACStream] method uses a block to test each value, including it
into the resulting stream only if the test passes:

```objc
RACSequence *numbers = [@"1 2 3 4 5 6 7 8 9" componentsSeparatedByString:@" "].rac_sequence;

// Contains: 2 4 6 8
RACSequence *filtered = [numbers filter:^ BOOL (NSString *value) {
    return (value.intValue % 2) == 0;
}];
```

## Combining streams

These operators combine multiple streams into a single new stream.

### Concatenating

The [-concat:][RACStream] method appends one stream's values to another:

```objc
RACSequence *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence;
RACSequence *numbers = [@"1 2 3 4 5 6 7 8 9" componentsSeparatedByString:@" "].rac_sequence;

// Contains: A B C D E F G H I 1 2 3 4 5 6 7 8 9
RACSequence *concatenated = [letters concat:numbers];
```

### Flattening

The [-flatten][RACStream] operator is applied to a stream-of-streams, and
combines their values into a single new stream.

Sequences are [concatenated](#concatenating):

```objc
RACSequence *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence;
RACSequence *numbers = [@"1 2 3 4 5 6 7 8 9" componentsSeparatedByString:@" "].rac_sequence;
RACSequence *sequenceOfSequences = @[ letters, numbers ].rac_sequence;

// Contains: A B C D E F G H I 1 2 3 4 5 6 7 8 9
RACSequence *flattened = [sequenceOfSequences flatten];
```

Signals are [merged](#merging):

```objc
RACSubject *letters = [RACSubject subject];
RACSubject *numbers = [RACSubject subject];
RACSignal *signalOfSignals = [RACSignal createSignal:^ RACDisposable * (id<RACSubscriber> subscriber) {
    [subscriber sendNext:letters];
    [subscriber sendNext:numbers];
    [subscriber sendCompleted];
    return nil;
}];

RACSignal *flattened = [signalOfSignals flatten];

// Outputs: A 1 B C 2
[flattened subscribeNext:^(NSString *x) {
    NSLog(@"%@", x);
}];

[letters sendNext:@"A"];
[numbers sendNext:@"1"];
[letters sendNext:@"B"];
[letters sendNext:@"C"];
[numbers sendNext:@"2"];
```

### Mapping and flattening

[Flattening](#flattening) isn't that interesting on its own, but understanding
how it works is important for [-flattenMap:][RACStream].

`-flattenMap:` is used to transform each of a stream's values into _a new
stream_. Then, all of the streams returned will be flattened down into a single
stream. In other words, it's [-map:](#mapping) followed by [-flatten](#flattening).

This can be used to extend or edit sequences:

```objc
RACSequence *numbers = [@"1 2 3 4 5 6 7 8 9" componentsSeparatedByString:@" "].rac_sequence;

// Contains: 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9
RACSequence *extended = [numbers flattenMap:^(NSString *num) {
    return @[ num, num ].rac_sequence;
}];

// Contains: 1_ 3_ 5_ 7_ 9_
RACSequence *edited = [numbers flattenMap:^(NSString *num) {
    if (num.intValue % 2 == 0) {
        return [RACSequence empty];
    } else {
        NSString *newNum = [num stringByAppendingString:@"_"];
        return [RACSequence return:newNum]; 
    }
}];
```

Or create multiple signals of work which are automatically recombined:

```objc
RACSignal *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence.signal;

[[letters
    flattenMap:^(NSString *letter) {
        return [database saveEntriesForLetter:letter];
    }]
    subscribeCompleted:^{
        NSLog(@"All database entries saved successfully.");
    }];
```

## Combining signals

These operators combine multiple signals into a single new [RACSignal][].

### Sequencing

[-then:][RACSignal+Operations] starts the original signal,
waits for it to complete, and then only forwards the values from a new signal:

```objc
RACSignal *letters = [@"A B C D E F G H I" componentsSeparatedByString:@" "].rac_sequence.signal;

// The new signal only contains: 1 2 3 4 5 6 7 8 9
//
// But when subscribed to, it also outputs: A B C D E F G H I
RACSignal *sequenced = [[letters
    doNext:^(NSString *letter) {
        NSLog(@"%@", letter);
    }]
    then:^{
        return [@"1 2 3 4 5 6 7 8 9" componentsSeparatedByString:@" "].rac_sequence.signal;
    }];
```

This is most useful for executing all the side effects of one signal, then
starting another, and only returning the second signal's values.

### Merging

The [+merge:][RACSignal+Operations] method will forward the values from many
signals into a single stream, as soon as those values arrive:

```objc
RACSubject *letters = [RACSubject subject];
RACSubject *numbers = [RACSubject subject];
RACSignal *merged = [RACSignal merge:@[ letters, numbers ]];

// Outputs: A 1 B C 2
[merged subscribeNext:^(NSString *x) {
    NSLog(@"%@", x);
}];

[letters sendNext:@"A"];
[numbers sendNext:@"1"];
[letters sendNext:@"B"];
[letters sendNext:@"C"];
[numbers sendNext:@"2"];
```

### Combining latest values

The [+combineLatest:][RACSignal+Operations] and `+combineLatest:reduce:` methods
will watch multiple signals for changes, and then send the latest values from
_all_ of them when a change occurs:

```objc
RACSubject *letters = [RACSubject subject];
RACSubject *numbers = [RACSubject subject];
RACSignal *combined = [RACSignal
    combineLatest:@[ letters, numbers ]
    reduce:^(NSString *letter, NSString *number) {
        return [letter stringByAppendingString:number];
    }];

// Outputs: B1 B2 C2 C3
[combined subscribeNext:^(id x) {
    NSLog(@"%@", x);
}];

[letters sendNext:@"A"];
[letters sendNext:@"B"];
[numbers sendNext:@"1"];
[numbers sendNext:@"2"];
[letters sendNext:@"C"];
[numbers sendNext:@"3"];
```

Note that the combined signal will only send its first value when all of the
inputs have sent at least one. In the example above, `@"A"` was never
forwarded because `numbers` had not sent a value yet.

### Switching

The [-switchToLatest][RACSignal+Operations] operator is applied to
a signal-of-signals, and always forwards the values from the latest signal:

```objc
RACSubject *letters = [RACSubject subject];
RACSubject *numbers = [RACSubject subject];
RACSubject *signalOfSignals = [RACSubject subject];

RACSignal *switched = [signalOfSignals switchToLatest];

// Outputs: A B 1 D
[switched subscribeNext:^(NSString *x) {
    NSLog(@"%@", x);
}];

[signalOfSignals sendNext:letters];
[letters sendNext:@"A"];
[letters sendNext:@"B"];

[signalOfSignals sendNext:numbers];
[letters sendNext:@"C"];
[numbers sendNext:@"1"];

[signalOfSignals sendNext:letters];
[numbers sendNext:@"2"];
[letters sendNext:@"D"];
```











