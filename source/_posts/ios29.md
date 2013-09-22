title: ios7之Sprite Kit vs Cocos2D
date: 2013-09-22 19:50:03
tags: [技术]
categories: ios
---
>Xcode5正式版发布了，全新的ui当然带来了全新的功能。今天阿峰就给大家来介绍下Sprite Kit。

{%img center 500 400 http://ww1.sinaimg.cn/mw690/a43af4ffjw1e8vnf9f1k4j20jt0d3abu.jpg %}

<!-- more --> 

##一、什么是Sprite Kit

打开app store 下载最多的的是2D 游戏。比较有名不如 愤怒的小鸟 割绳子啦。 这些游戏之所以能够如此受欢迎跟他们 出色的粒子特效 物理引擎 炫酷的动画 还有漂亮的界面和声音效果离不开。

在ios7 发布之前 想要做出这样的游戏 只能依靠第三方的游戏引擎库，比较有名的就是Cocos2d 以及衍生的Cocos2d-X。现在ios7发布了 我们可以不借助第三方工具就可以实现了。Sprite Kit 提供了 包括 动画精灵，形状，粒子（火焰，烟雾），动画，物理效果，音频 视频等。Xcode5 还提供支持了纹理包和粒子设计哦。

Sprite Kit 可以在逻辑上分为以下的三个部分

###Scenes(场景) 

在cocos2d的游戏场景的视觉层。他提供了物体（如树木，汽车，飞机，头像等）的背景。

###Actions(动作)

流畅的动画是游戏的重要组成部分。苹果设计的Actions非常简洁。他可以让你实现你想要做的任何事情。比如说一些常见的动作:移动 淡入淡出 缩放 旋转 动画纹理 组动画等等。 如果这些你还不满足，你可以自己创建一个代码块来实现自己想要的动作来操控对象。

###Physics(物理引擎)

你想让你一个游戏具有很强的现实感，那物理引擎你一定用的到。 不然射出的子弹永远不会落地，橡胶球落地不会弹起来哈。

---

##二、选择Sprite Kit的理由

###性能

苹果自家推出的东西在自家平台上肯定有着得天独厚的优势（尽管很多游戏开发商需要让他们的游戏在不同的系统上运行）。但是苹果在系统和硬件上累计的经验足够说服开发商选用自家的游戏引擎了。

###平台集成

如上所述。Sprite Kit 跟Xcode 5 集成的天衣无缝。Xcode5 为游戏提供了很多开发组件。


###版本升级

使用第三方库或者游戏引擎编写游戏肯定会有这方面的担忧。我们永远不知道将来的对系统的兼容性如何。不如说已死的Tree20 等等。 ios 每出一个版本都会有API的变动。虽然会有开源社区对其第三方库进行维护 但是这需要时间哈。用苹果自家的东西 就不用担心这方面了。

随着Sprite Kit的退出。苹果已经提供了一套工具，以确保开发的游戏代码能够在任何苹果版本和机型正常运行。 注意的是Sprite Kit 并不只是ios的框架。 开发人员也可以来开发OS X 上的游戏。

###友好的开发接口

cocos2d之所以成功离不开其较低的门槛。相比起OpenGL ES 那些晦涩的接口 恼人的实现来说cocos2d ,简直太方便了。

Sprite Kit遵循了这点。其提供的接口非常简洁方便。另外其文档也非常详细 设计工具也很棒。甚至连cocos2d的首席开发工程师也在”此处和谐 国外被墙聊天工具“上感慨说
>prite Kit is very good. With less features than Cocos2D, but better. I like the physics integration.

---

##三、Sprite Kit & Cocos2D Features


特性  | Sprite Kit | Cocos2D
--- | --- | ---
Open Source | `No` | Yes
Objective-C  Native Support	| Yes |	Yes
Graphics Engine	| Yes |	Yes
Animations	| Yes |	Yes
Physics Simulation	 | Yes (Integrated) |	`No (Requires Box2D or Chipmunk)`
Particle Effects | Yes | Yes
Xcode Native Integration | Yes	| `No`
Automatic Atlas Creation | Yes | `No`
Built-In Particle Editor | Yes | `No`
Shaders	| `No` | Yes
Camera | `No` | Yes


---

##四、项目对比

对比 Sprite Kit  和  Cocos2D 区别 还是看代码比较合适
[Sprite Kit 工程](http://cdn.tutsplus.com/mobile.tutsplus.com/uploads/2013/09/ios7SpriteKit.zip)
[Cocos2D 工程](http://cdn.tutsplus.com/mobile.tutsplus.com/uploads/2013/09/ios7cocos2d.zip)

##五、代码比较

下面我们将从概念上来比较两者的不同

###CClayer vs. SKScene

CCLayer或SkScene 是最主要的对象用来绘制其他的对象。 你可以把他想象成默认的一个view，这个view 可以接收所有的对象，动画或者touch 事件。

在Cocos2d进行场景切换 需要下面几步：

	GameScene* gameScene = [[GameScene alloc] init];
	[ [CCDirector sharedDirector] replaceScene:gameScene ];

注意GameScene.h 中 必须继承CCLayer 且初始化一个CCScene

	@interface GameScene : CCLayer {}
	+(CCScene *) scene;

在 GameScene.m, 初始化:

	+(CCScene *)scene
	{
	    CCScene *scene = [CCScene node];
	    GameScene *layer = [GameScene node];
	    [scene addChild: layer];
	    return scene;
	}
	-(id) init{
	    if( (self=[super init] )) {
	        // Your code here
	    }
	    return self;
	}

在 Sprite Kit 中只需要如下
 
	GameScene* gameScene = [ [GameScene alloc] initWithSize:CGSizeMake(1024, 768) ];
	[ self.scene.view presentScene:gameScene ];
	}

GameScene 必须继承 SKScene , 调用如下 -(id)initWithSize:(CGSize)size 初始化:

	-(id)initWithSize:(CGSize)size
	{
	    if (self = [super initWithSize:size])
	    {
	        // Your code
	    }
	    return self;
	}

###CCSprite vs. SKSpriteNode

精灵对象通常用来显示某种图形。他有如下几种属性：旋转 缩放 位移 框架 等等。Cocos2D 实现如下：

	CCSprite* aSprite;
	aSprite = [CCSprite spriteWithFile:@"player.png"];
	aSprite.scale = .5;
	aSprite.position = ccp(_size.width/1.30, _size.height/1.25);
	[self addChild:aSprite];

Sprite Kit 实现如下：

	SKSpriteNode* planeShadow = [SKSpriteNode spriteNodeWithImageNamed:@"player.png"];
	planeShadow.scale = 0.5;
	planeShadow.position = CGPointMake(CGRectGetMidX(self.frame)+100,CGRectGetMidY(self.frame)+200);
	[self addChild:planeShadow];

###CCLabelTTF vs. SKLabelNode

Label对象用于显示文字。它可以有几个属性，包括文字，文字大小，文字颜色，位置等等。Cocos2D和Sprite Kit是相似的。
Cocos2D：

	CCLabelTTF *label = [CCLabelTTF labelWithString:@"Hello World" fontName:@"Marker Felt" fontSize:64];
	// ask director for the window size
	CGSize size = [[CCDirector sharedDirector] winSize];
	label.position =  ccp( size.width /2 , size.height/2 );
	[self addChild: label];

Sprite Kit:

	SKLabelNode* gameScene = [SKLabelNode labelNodeWithFontNamed:@"Chalkduster"];
	[gameScene setText:@"New Game"];
	[gameScene setFontSize:18];
	gameScene setPosition:CGPointMake(CGRectGetMidX(self.frame)+5,CGRectGetMidY(self.frame)-40)];
	[self addChild:gameScene];

###CCMenu and CCMenuItem vs. Sprite Kit Menu

Cocos2D中创建菜单需要两个对象：CCMenu 和 CCMenuItem. 下面是创建两个菜单项的例子

	CGSize size = [[CCDirector sharedDirector] winSize];
	[CCMenuItemFont setFontSize:28];
	CCMenuItem *itemNewGame = [CCMenuItemFont itemWithString:@"New Game" block:^(id sender) {
	    // Your code
	}];
	CCMenuItem *itemOptions = [CCMenuItemFont itemWithString:@"Options" block:^(id sender) {
	    NSLog(@"Second item");
	}];
	CCMenu *menu = [CCMenu menuWithItems:itemNewGame, itemOptions, nil];
	[menu alignItemsHorizontallyWithPadding:20];
	[menu setPosition:ccp( size.width/2, size.height/2 - 50)];
	[self addChild:menu];
Spite Kit不包括任何类型的菜单的特定对象。
下面的例子我们用了 SKLabelNode作为 menu item. 首先我们定义 SKLabelNode:

	SKLabelNode*  gameScene = [SKLabelNode labelNodeWithFontNamed:@"Chalkduster"];
	[gameScene setText:@"New Game"];
	[gameScene setFontSize:18];
	[gameScene setPosition:CGPointMake(CGRectGetMidX(self.frame)+5,CGRectGetMidY(self.frame)-40)];
	[self addChild:gameScene];

在 **-(void)touchesBegan:(NSSet *)touches withEvent:(UIEvent *)event** 方法里面 我们创建截获事件

	for (UITouch *touch in touches)
	{
	    CGPoint location = [touch locationInNode:self];
	    if ([gameScene containsPoint:location]) {
	        // Scene Transition Animation
	        SKTransition* reveal = [SKTransition revealWithDirection:SKTransitionDirectionDown duration:1];
	        GameScene* gameScene = [[GameScene alloc] initWithSize:CGSizeMake(1024, 768)];
	        [self.scene.view presentScene:gameScene transition:reveal];
	        NSLog(@"Touched gameScene!!!!");
	    }
	} 
上面代码做了下面几件事情

1. 激活触摸时间
2. 将敲击的坐标转换成内部坐标
3. 验证敲击的坐标是否在SKLabelNode的动画场景内
4. 创建过渡动画
5. 转换场景

###Action vs. SKAction
区别最大的是Action 。SKAction是一个较复杂的对象。Action在Cocos2D 仅仅是一个动作。程序员必须定义 调用 创建。 
但是Sprite Kit中，SKAction 提供了如下的开发比如旋转 缩放 重复, 消失 播放声音 等等。 SKaction是一个抽象类能够处理任何种类的动作。
在cocos2d 我们需要定义一个调节调用的自定义方法
	[self schedule:@selector(addSprite:) interval:1];
然后在自定义的方法中添加我们自定义的动画:

	- (void) addSprite:(ccTime)dt
	{
	    CCSprite* aMovableSprite = [CCSprite spriteWithFile:@"frankenstein.png"];
	    aMovableSprite.scale = .8;
	    [self addChild:aMovableSprite];
	    CGSize winSize = [CCDirector sharedDirector].winSize;
	    int minX = aMovableSprite.contentSize.width / 2;
	    int maxX = winSize.width - aMovableSprite.contentSize.width/2;
	    int rangeX = maxX - minX;
	    int actualY = (arc4random() % rangeX) + minX;
	    CCCallBlockN * actionMoveDone = [CCCallBlockN actionWithBlock:^(CCNode *node) {
	        NSLog(@"Sprite free!");
	    }];
	    NSMutableArray *arrayBezier = [[NSMutableArray alloc] init];
	    ccBezierConfig bezier;
	    id bezierAction1;
	    float splitDuration = 6 / 6.0;
	    for(int i = 0; i< 6; i++){
	        if(i % 2 == 0){
	            bezier.controlPoint_1 = ccp(actualY+100,winSize.height-(100+(i*200)));
	            bezier.controlPoint_2 = ccp(actualY+100,winSize.height-(100+(i*200)));
	            bezier.endPosition = ccp(actualY,winSize.height-(200+(i*200)));
	            bezierAction1 = [CCBezierTo actionWithDuration:splitDuration bezier:bezier];
	        }
	        else{
	            bezier.controlPoint_1 = ccp(actualY-100,winSize.height-(100+(i*200)));
	            bezier.controlPoint_2 = ccp(actualY-100,winSize.height-(100+(i*200)));
	            bezier.endPosition = ccp(actualY,winSize.height-(200+(i*200)));
	            bezierAction1 = [CCBezierTo actionWithDuration:splitDuration bezier:bezier];
	        }
	        [arrayBezier addObject:bezierAction1];
	    }
	    [arrayBezier addObject:actionMoveDone];
	    id seq = [CCSequence actionsWithArray:arrayBezier];
	    [aMovableSprite runAction:seq];
	}

在Sprite Kit中 我们使用SKAction来控制对象开始和结束的运行状况

	SKSpriteNode* playerSprite = [SKSpriteNode spriteNodeWithImageNamed:@"player.png"];
	[playerSprite setScale:0.4];
	SKAction *movement =[SKAction moveTo:CGPointMake(900, 500) duration:5];
	SKAction *remove = [SKAction removeFromParent];
	[playerSprite runAction:[SKAction sequence:@[movement,remove]]];
	[self addChild:playerSprite];

但是我们定义一个自定义的动画然后用SKAction来激活这个动作。下面的例子说明了贝塞尔运动。

	SKAction *wait = [SKAction waitForDuration:1];
	SKAction *callEnemies = [SKAction runBlock:^{
	    [self sendNewSKSpriteNode];
	}];
	SKAction *updateSKSpriteNodeOnScreen = [SKAction sequence:@[wait,callEnemies]];
	[self runAction:[SKAction repeatActionForever:updateSKSpriteNodeOnScreen]]; 


下面的sendNewSKSpriteNode将处理自定义对象的运动。


	-(void) sendNewSKSpriteNode{
	    CGRect screenRect = [[UIScreen mainScreen] bounds];
	    // Custom SKAction
	    SKSpriteNode* enemy = [SKSpriteNode spriteNodeWithImageNamed:@"frankenstein.png"];
	    enemy.scale = 0.6;
	    CGMutablePathRef cgpath = CGPathCreateMutable();
	    //random values
	    float xStart = [self getRandomNumberBetween:0+enemy.size.width to:screenRect.size.width-enemy.size.width ];
	    float xEnd = [self getRandomNumberBetween:0+enemy.size.width to:screenRect.size.width-enemy.size.width ];
	    //ControlPoint1
	    float cp1X = [self getRandomNumberBetween:0+enemy.size.width to:screenRect.size.width-enemy.size.width ];
	    float cp1Y = [self getRandomNumberBetween:0+enemy.size.width to:screenRect.size.width-enemy.size.height ];
	    //ControlPoint2
	    float cp2X = [self getRandomNumberBetween:0+enemy.size.width to:screenRect.size.width-enemy.size.width ];
	    float cp2Y = [self getRandomNumberBetween:0 to:cp1Y];
	    CGPoint s = CGPointMake(xStart, 1024.0);
	    CGPoint e = CGPointMake(xEnd, -100.0);
	    CGPoint cp1 = CGPointMake(cp1X, cp1Y);
	    CGPoint cp2 = CGPointMake(cp2X, cp2Y);
	    CGPathMoveToPoint(cgpath,NULL, s.x, s.y);
	    CGPathAddCurveToPoint(cgpath, NULL, cp1.x, cp1.y, cp2.x, cp2.y, e.x, e.y);
	    SKAction *planeDestroy = [SKAction followPath:cgpath asOffset:NO orientToPath:YES duration:5];
	    [self addChild:enemy];
	    SKAction *remove2 = [SKAction removeFromParent];
	    [enemy runAction:[SKAction sequence:@[planeDestroy,remove2]]];
	    CGPathRelease(cgpath);
	}

###CCParticleExplosion vs. Emitter

Cocos2D中并没例子编辑器。必须使用外部应用程序创建例子 然后用特定的 CCParticleExplosion来改变其属性行为。在xcode中 你可以这样子来使用了:

	CCParticleExplosion* _particleExplosion;
	particleExplosion = [[CCParticleExplosion alloc] initWithTotalParticles:800];
	particleExplosion.texture = [[CCTextureCache sharedTextureCache] addImage:@"texture.png"];
	particleExplosion.life = 0.0f;
	particleExplosion.lifeVar = 0.708f;
	particleExplosion.startSize = 40;
	particleExplosion.startSizeVar = 38;
	particleExplosion.endSize = 14;
	particleExplosion.endSizeVar = 0;
	particleExplosion.angle = 360;
	particleExplosion.angleVar = 360;
	particleExplosion.speed = 243;
	particleExplosion.speedVar = 1;
	CGPoint g = CGPointMake(1.15, 1.58);
	particleExplosion.gravity = g;
	ccColor4F startC =  {0.89f, 0.56f, 0.36f, 1.0f};
	particleExplosion.startColor = startC;
	ccColor4F endC = {1.0f,0.0f,0.0f,1.0f};
	particleExplosion.endColor = endC;
	[self addChild:_particleExplosion];
	particleExplosion.position = ccp(_size.width/5, _size.height/5);
	[particleExplosion resetSystem];

发射器使用Sprite Kite粒子套件产生。 为了使用他们 你需要在项目中添加粒子。New -> File -> Resource -> Sprite Kit Particle File 命名并且选择粒子类型（火 烟 雪 等等）。
如下图
{%img  http://ww3.sinaimg.cn/mw690/a43af4ffjw1e8vnfhjmlgj20en07a3yz.jpg 400 500 %}

{%img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e8vnflpm16j206o05ft8q.jpg 300 500  %}

 现在你会看到有两个新文件在xcode 中：

{%img 200 300 http://ww4.sinaimg.cn/mw690/a43af4ffjw1e8vnls9m7bj203q018a9v.jpg%}
  

	SKEmitterNode* smokeTrail;
	NSString *smokePath = [[NSBundle mainBundle] pathForResource:@"MyParticle" ofType:@"sks"];
	smokeTrail = [NSKeyedUnarchiver unarchiveObjectWithFile:smokePath];
	smokeTrail.position = CGPointMake(CGRectGetMidX(self.frame)+40,CGRectGetMidY(self.frame)-100);
	[self addChild:smokeTrail];

###SimpleAudioEngine vs. Sprite Kit Sound

任何游戏应该都离不开多媒体吧，在cocos2d 我们要实现 需要两部
1：
	#import "SimpleAudioEngine.h"
2：

	[[SimpleAudioEngine sharedEngine] playBackgroundMusic:@"sound.caf" loop:YES];
	[[SimpleAudioEngine sharedEngine] setEffectsVolume:0.4f];

**有时，Xcode中并没有自动包括“Copy Bundle Resources”中的音乐文件。如果发生这种情况，你应该手动添加。**

在Sprite Kit中 你能够很简单的添加声音

	SKAction* soundAction = [SKAction playSoundFileNamed:@"preview.mp3" waitForCompletion:NO];
	[self runAction:soundAction];

下面是实现的一个火焰效果图
{% img  http://ww4.sinaimg.cn/mw690/a43af4ffjw1e8vnfvcmmdj20d80k8jro.jpg 200 400 %}

## 结束语

通过上面的分析 你会发现cocos2d 和Sprite kit 有很多相似之处。在易用性上 笔者觉得Spring kit 对ios开发者来说更加具有诱惑性。


