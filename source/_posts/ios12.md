title: ios 开发之 序列化
date: 2013-08-31 22:26:47
tags: [技术]
categories: ios
---

序列化

参考原始文档：

https://github.com/mystcolor/JTObjectMapping

<!-- more -->
使用方法

========


绝大多数情况下，需要用到的就是一个方法：

[NSObject objectFromJSONObject:stateObject mapping:nil];

其中，把NSObject换成我们想映射成的类的名字。


稍微复杂一点，假设类的属性和JSON里的key名字不是一一对应的，那么就要写一个映射关系表作为mapping参数：

    NSDictionary *mapping = [NSDictionary dictionaryWithObjectsAndKeys:

                             @"myState", @"state",

                             @"movieList", @"movie",

                             nil];

    [NSObject objectFromJSONObject:stateObject mapping:mapping];


如果再复杂一点，我们需要映射一个数组，数组的每个元素映射到一个对象，那么就用到第2个方法：

[NSObject mappingWithKey:@"responseState" mapping:nil]

同样，把NSObject换成数组元素对应的类，key是用来存放整个数组的那个属性。



注意

====

JSON里的字符串，是能自动映射成NSNumber或者int型的，不需要特别写代码。如果想把一个字符串日期，映射成NSDate型，请参考原始文档。



具体举个例子

===========


假设我们有这样一段JSON：


 {

 "state":[

 {

 "respCode":"0000",

 "respMsg":"1"

 }

 ],

 "movie":[

 {

 "body":"    一开始，这只是叶问的故事他生于佛山",

 "pics":"/images/jz/4779-1-20121225133147.jpg,/images/jz/4779-2-20121225133147.jpg",

 "name":"一代宗师",

 "movid":"4779",

 "length":"120",

 "hasplan":"1",

 "trailor":"/4779.m4v",

 "director":"梁朝伟 章子怡 张震 ",

 "type":"动作/传记/剧情/IMAX",

 "url":"http://img.fun-guide.mobi/show?src=http://zhaohang.fun-guide.mobi:8080/tm/images/hb/4779-20121225133147.jpg&w=140",

 "popularity":"6"

 },

 {

 ...

 }

 ]

 }

 

现在，想把它映射到自定义的对象中去。有几种情况：


第一种情况，简单地把state数组里面的第一个元素映射成一个FGStateModel类

那么就是，取出这个节点：

    NSDictionary *stateObject = [[self.json objectForKey:@"state"] objectAtIndex:0];

然后，执行映射：

    self.state = [FGStateModel objectFromJSONObject:stateObject mapping:nil];


第二种情况，把movie这个字典数组映射成一个数组，数组的每个元素是FGMovieModel

    NSArray *movieObject = [self.json objectForKey:@"movie"];

    self.movieList = [FGMovieModel objectFromJSONObject:movieObject mapping:nil];


第三种情况，如果对象的属性和JSON名字不一样，可以使用映射表，例如我们想把上面整个json对象映射成一个 FGResponseModel 对象，其中，state数组映射成 responseState 属性，movie 数组映射成 movieList 属性。那么，我们需要告诉映射器这个数组里的元素要映射成什么对象。


所以，通过 mapping 这个参数告诉它：“请把 JSON 里的 state 数组里的每个元素映射成一个 FGStateModel 对象，并且把最终的数组放到responseState这个属性里。另外，把 movie 这个数组映射成一个 FGMovieModel 数组，并且保存到 movieList 这个属性中。“


    NSDictionary *mapping = [NSDictionary dictionaryWithObjectsAndKeys:

                             [FGStateModel mappingWithKey:@"responseState" mapping:nil], @"state",

                             [FGMovieModel mappingWithKey:@"movieList" mapping:nil], @"movie",

                             nil];

    self.response = [FGResponseModel objectFromJSONObject:self.json mapping:mapping];


```
#import <Foundation/Foundation.h>


@interface FGMovieModel : NSObject


@property (nonatomic, retain) NSString *body;

@property (nonatomic, retain) NSString *pics;

@property (nonatomic, retain) NSString *name;

@property (nonatomic, assign) NSInteger movid;

@property (nonatomic, retain) NSNumber *length;


@end
```


```
#import <Foundation/Foundation.h>


@interface FGResponseModel : NSObject

@property (nonatomic, retain) NSArray *responseState;

@property (nonatomic, retain) NSArray *movieList;

@end

 
#import <Foundation/Foundation.h>


@interface FGStateModel : NSObject


@property (nonatomic, retain) NSString *respCode;

@property (nonatomic, retain) NSString *respMsg;


@end
```