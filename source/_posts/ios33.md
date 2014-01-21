title: iOS开发之你真的了解了KVC吗？
date: 2013-09-23 18:51:01
tags: [技术]
categories: ios
---
>之前一直以为自己了解KVC 其实只是井底之蛙啦，真正的要把KVC原原本本的说出来还真的不是一件简单的事情。于是今天写下这边文章，告诫自己要知其然还要知其所以然。
<!-- more -->

##一.KVC的基本概念
Key-value coding,它是一种使用字符串标识符，间接访问对象属性的机制,而不是直接调用getter 和 setter方法。通常我们使用valueForKey 来替代getter 方法，setValue:forKey来代替setter方法。

下面是使用KVC 和 不使用 KVC的代码对比

	Persion *persion =  [ [Persion alloc] init ];

	//不使用KVC
	persion.name = @"hufeng" ;

	//使用KVC的写法
	[persion  setValue:@"hufeng" forKey:@"name"];

看出区别来了吗？你可能会说 你写的太简单了，我们实际用的时候不可能有这样复杂的类，下面我们写个复杂点的：我们有一个人 这个人有一个手机类 这个手机类 有一个电池类 我们要获取这个电池类 比之前复杂了吧。

没有KVC 

	Persion *persion =  [ [Persion alloc] init ];

	Phone *phone = persion.phone;

	Battery *battery = phone.battery;

使用KVC

	Battery *battery = [persion valueForKeyPath: @"phone.battery" ];
**注意- valueForKeyPath 里面的值是区分大小写的，你如果写出Phone.Battery 是不行的 **

说到这里你可能会问 我能不能对 NSArray 调用KVC吗？ 答案是否定的，因为array 没有keys啊，但是你可以对array里面的item 使用KVC。

KVC 最常用的还是在序列化和反序列话对象。我们经常需要把json字符串反序列化成我们想要的对象 下面是一个例子 将字典用NSKeyedArchiver 序列化成对象


	- (id)initWithDictionary:(NSDictionary *)dictionary {

	    self = [self init];

	    if (self){

	        [self setValuesForKeysWithDictionary:dictionary];

	    }

	    return self;

	}

**注意 这里有一个坑 当我们setValue 给一个没有定义的字典值（forUndefinedKey）时 会抛出NSUndefinedKeyException异常的 记的处理此种情况**

还有一个需要注意的是KVC 并没有类型检验，毕竟Object-C 还是动态的啦。 还是看下面的代码吧

	[persion setValue:[NSNumber numberWithInteger:1] forKey:@"name"]; 
	// compiles and runs

	persion.name = [NSNumber numberWithInteger:1]; 
	// won't compile: Incompatible pointer types assigning to 'NSString *' from 'NSNumber *'

setValue forKey 得到的对象是泛型的id， 只有在使用的时候才能确定类型。你可能会问不至于吧 OC 这样弱啊，当然不是 OC 提供了了一个方法validateValue来解决这个问题 

	@property (nonatomic, strong) NSString name;

	- (BOOL)validateName:(id*)ioValue error:(NSError**)error {
	    // Validation logic goes here

	}

	Person *p = [Person new];

	NSString *name = @"Jason Hu";

	NSError *error = nil;
	 

	// This call below actually calls our validateName: error: method

	if ([p validateValue:&name forKey:@"name" error:&error]) {

	    [p setValue:name forKey:@"name"];
	}

你可能会问写这样多代码 才只验证了一个属性 那如果我这个类有n+个属性 难道我要写n+个验证方法吗？

---

##二.KVC 验证

到这里我们对KVC已经有了一个初步印象，到这里其实还只是冰山一角。
下面我们要提高更高的要求，如果让key 支持 不区分大小写

下面我们提到一个方法initialize

initialize是在类或者其子类的第一个方法被调用前调用。所以如果类没有被引用进项目或者类文件被引用进来，但是没有使用，那么initialize也不会被调用 ，到这里 知道我们接下来要干嘛了吧


	+ (void)initialize {
		[super initialize];

		dispatch_once(&onceToken, ^{
			modelProperties = [NSMutableDictionary dictionary];
			propertyTypesArray = @[/* removed for brevity */];
		});
		
		NSMutableDictionary *translateNameDict = [NSMutableDictionary dictionary];
		[self hydrateModelProperties:[self class] translateDictionary:translateNameDict];
		[modelProperties setObject:translateNameDict forKey:[self calculateClassName]];
	}

	+ (void)hydrateModelProperties:(Class)class translateDictionary:(NSMutableDictionary *)translateDictionary {
		if (!class || class == [NSObject class]){
			return;
		}

		unsigned int outCount, i;
		objc_property_t *properties = class_copyPropertyList(class, &outCount);
		
		for (i = 0; i < outCount; i++){
			objc_property_t p = properties[i];
			const char *name = property_getName(p);
			NSString *nsName = [[NSString alloc] initWithCString:name encoding:NSUTF8StringEncoding];
			
			NSString *lowerCaseName = [nsName lowercaseString];
			[translateDictionary setObject:nsName forKey:lowerCaseName];
			//注意此处哦
			NSString *propertyType = [self getPropertyType:p];
			[self addValidatorForProperty:nsName type:propertyType];
		}
		
		free(properties);

		[self hydrateModelProperties:class_getSuperclass(class) translateDictionary:translateDictionary];
	}

