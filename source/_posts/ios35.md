title: ios系类教程之用instruments来检验你的app
date: 2014-01-13 21:44:58
tags: [技术]
categories: ios
---
>比较了好多关于instruments 还是发现老外写的比较牛逼.于是果断翻译过来.有能力的的可以去看英文原版,鼓励大家看原版资料远离二手教程
http://www.raywenderlich.com/23037/how-to-use-instruments-in-xcode

##入门
为了节省大家的时间,提供一个演示的Demo给大家.[代码传送门](http://cdn4.raywenderlich.com/downloads/InstrumentsTutorial.zip).
下载后解压然后用xcode打开.
编译运行APP后 然后在搜索框内输入任意词汇,点击结果你会看到下面的结果   

{%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1eci9qbiaq7j208v0da3zj.jpg%}   

<!-- more -->
正如你所见的,这个app很简单.程序其实调用的是Flickr的API,通过app顶部的搜索框执行搜索后在下面的tableview显示你搜索的搜索词,搜索词后面的括号内有搜索结果的个数,点击此行进入一个略所图的结果列表页面 如上图. 点击其中一行 进入图像的大图模式,在这个页面你可以根据需要旋转图像.
到目前为止页面看起来差不多了,你也许会想应该可以直接提交appstore了吧.接下来这篇文章将会教你instruments工具来提高你app性能和稳定性.

##"时间探测器"

天下武功，唯快不破。很多公司都信奉这个教条.恨不得把app压法周期压缩到最低,这就导致了开发中隐藏了很多问题,有点经验的工程师草率的优化下,更糟的情况那些没有经验的工程师甚至不会对app进行任何优化.

某种程度上来说,你开发过程中是可以忽略性能优化的. 十年前,移动设备的硬件资源是非常有限的.甚至连浮点数都是被禁止的.因为浮点数能导致代码变大计算的速度变慢.
科技发展如此迅速的今天,硬件很大程度上可以弥补软件的短板.现在的移动设备3D硬件处理的效率甚至媲美于PC机了,但是你不能总依赖于硬件和处理器速度来掩饰你APP做的多垃圾吧.(如果安卓系统跑在Iphone上还能够像IOS一样顺滑吗?,其实是一个道理的)

性能这个概念很抽线,所以我们必须借助数据化图形化的输出方式.你可能花一周的时间去优化一个有趣的算法,但是这算法只占总执行时间的0.5%,不管你花多少精力去优化它,没人会注意到.相反一个for循环花费了90%的时间,你稍微修改下就能提高10%的效率,就是这个简单的修改可以得到大家很大的好感.因为.他们运行app时的第一感受就是比之前快了很多.没人会care你修改的是一个多牛逼的算法,还是一个简单的for循环.
这个说明了什么.
与其花费时间在优化小细节上不如多点时间找到你改优化的地方.

下面引出第一个工具 "时间事件查看器"(自己杜撰的名字英文--Time Profiler),------他可以测量时间的间隔,中断程序执行,跟踪每个线程的堆栈.你可以想象下是xcode调试时按下暂停时的画面  

{%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1ecibl3evcoj207c0g7wfl.jpg%}  

比如,100个样本都在做1毫秒的间隔,然后在某个方法堆栈顶部有10个样本,你可以推算出大概的时间有10%个10毫秒花费在此方法中,这是一个近似值.

废话少说,时间是个检测到的.
从xcode的菜单选择Product-Profile,或者选择⌘I,{%img http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecic1kiax3j205v02nq2x.jpg%}程序会启动Instruments,这时候你会看到一个选择窗口  
   
{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecic3fuaoqj20n10jl0v1.jpg%}  
 
 这是instruments所有测试仪器的面板,选择 "timer profilter" 点击"profile"回启东模拟器和app,此时会要求你输入一次密码,以便instruments能有权限去截获监听此进程.  

 {%img center http://ww4.sinaimg.cn/small/a43af4ffjw1ecicaqnba9j20fh09tgm4.jpg%}  
     
 在工具窗口中，可以看到时间计数，并留下了一个小箭头移动到右侧的图形在屏幕的中央上方。这表明该应用程序正在运行。

 现在开始运行app,搜索一些图片,这时候你发现查找一个结果太慢了,而且搜索结果列表页面滚动起来也是让人无法忍受的,
 首先，确保工具栏中的视图选择有选择的所有三个选项，如下所示：  
{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecici64zqwj202y01ijr6.jpg %}    

￼这将确保所有的面板都打开。现在，研究下面的截图和它下面的每个部分的解释：   

{%img  center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecicvvuvpqj20c208wq3v.jpg%}   

~~~~~~~~~~~

1. 录控按钮。中间的红色按钮将停止与启动它被点击时，应用程序目前正在分析。注意这实际上是停止和启动应用程序,而不是暂停它。  

2. 运行定时器和运行导航,定时器显示APP已经运行了多长时间,箭头之间是可以移动的。如果停止，然后使用录制按钮重新启动应用程序，这将开始一个新的运行。显示屏便会显示“run2 of 2”，你可以回到第一次运行的数据，首先你停止当前运行，然后按下左箭头回去。  

3. 运行轨道.   

4. 扩展面板,在时间探查仪器的情况下，它是用来跟踪显示堆栈  

5. 详细地面板。它显示了你正在使用的仪器的主要信息,这是使用频率最高的部门,可以从它这里看到cpu运行的时间   

6. 选项面板 稍后介绍

~~~~~~~~~~~

重头戏来了.

##深究

执行图像搜索，并深究结果。我个人比较喜欢寻找“狗”，当然你也可以选择任意你想要的内容.比如猫啊美女啊什么的.

现在上下滚动记下列表,让时间探测器测量下数据,然后注意看下屏幕的变化和数值.这些数值反应了CPU周期.

但是你也许会发现下面的数值太多,看你的眼花缭乱. 下面打开左边的调用树 然后按着如下的配置

{%img center http://ww3.sinaimg.cn/mw690/a43af4ffjw1ecidfkvchwj205508wwem.jpg%}

以下介绍下配置选项：

~~~~~~~~~~~


Separate by Thread: 每个线程应该分开考虑。只有这样你才能揪出那些大量占用CPU的"重"线程  

Invert Call Tree: 从上倒下跟踪堆栈,这意味着你看到的表中的方法,将已从第0帧开始取样,这通常你是想要的,只有这样你才能看到CPU中话费时间最深的方法.也就是说FuncA{FunB{FunC}} 勾选此项后堆栈以C->B-A 把调用层级最深的C显示在最外面 

Hide Missing Symbols: 如果dSYM无法找到你的app或者系统框架的话,那么表中看不到方法名只能看到十六进制的数值,如果勾线此项可以隐藏这些符号,便于简化数据

Hide System Libraries: 勾选此项你会显示你app的代码,这是非常有用的. 因为通常你只关心cpu花在自己代码上的时间不是系统上的

Show Obj-C Only: 只显示oc代码 ,如果你的程序是像OpenGl这样的程序,不要勾选侧向因为他有可能是C++的  

Flatten Recursion: 递归函数, 每个堆栈跟踪一个条目

Top Functions: 一个函数花费的时间直接在该函数中的总和，以及在函数调用该函数所花费的时间的总时间。因此，如果函数A调用B，那么A的时间报告在A花费的时间加上B.花费的时间,这非常真有用，因为它可以让你每次下到调用堆栈时挑最大的时间数字，归零在你最耗时的方法。

~~~~~~~~~~~

如果您已启用上述选项,虽然有些值可能会略有不同，下面的结果的顺序应该是类似下表： 

{%img center http://ww3.sinaimg.cn/mw690/a43af4ffjw1eciea0qldhj20cu08w75b.jpg%}   

通过上面你能看到大部分时间都花在更新表格照片了.

双击此行,然后将会看到如下  
{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1ecieegah2wj20cv08w0tj.jpg%}  

那么这很有趣，不是吗！几乎四分之三的时间花费在setPhoto：方法都花在创造照片的图像数据！
现在可以看到的是什么问题,NSData’s dataWithContentsOfURL 方法并不会立即返回,因为要从网上去数据,每次调用都需要长达几秒的时间返回,而此方法运行在主线程,可想而知会有什么结果了.
其实为了解决这个问题,类提供了一个ImageCache 的后台异步下载的方法.

现在，您可以切换到Xcode和手动找到该文件，但仪器有一个方便的“打开Xcode中”按钮，就在你的眼前。找到它的面板只是上面的代码并单击它：  

{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecieiognodj20c4044dfv.jpg%}  

想如下修改

```
- (void)setPhoto:(FlickrPhoto *)photo {
    _photo = photo;
 
    self.textLabel.text = photo.title;f
 
//    NSData *imageData = [NSData dataWithContentsOfURL:_photo.thumbnailUrl]; 
//    self.imageView.image = [UIImage imageWithData:imageData];
 
    [[ImageCache sharedInstance] downloadImageAtURL:_photo.thumbnailUrl
                                  completionHandler:^(UIImage *image) {
                                      self.imageView.image = image;
                                      [self setNeedsLayout];
                                  }];
}

```

修改好厚,在仪器重新运行该应用程序Product--Profile（或⌘I-记住，这些快捷键真的会为您节省一些时间）。
请注意，这个时候会再问一次你是否使用一起。这是因为你还有一个窗口中打开这个程序，及仪器假定您要使用相同的选项再次运行。
执行一些更多的搜索，并注意此时用户界面不是那么卡顿了！这些图像现在异步加载，并缓存在后台，所以一旦他们已经被下载一次，他们不必再次下载。
看上去很不错！是时候发布了吗? 当然还不够


## 分配，分配，分配

接下来的仪器是分配工具。它能给出你所有创建和存储它们的内存的详细信息，它也显示你保留了每个对象的计数。

关闭仪器，回到Xcode和选择Product->Profile。然后，从选择器分配并单击配置文件。如下图:

{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1eciet83x01j20xc0oqaeh.jpg%}  

程序再次打开 然后你会看到  

{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecif0bcb3vj20c208w3zd.jpg %}

这个时候你会发现两个曲目。一个叫(分配)Allocations，以及一个被称为VM Tracker(虚拟机跟踪)。该分配轨道将详细在本教程中讨论;虚拟机跟踪也是非常有用的，但更复杂一点。
所以你的错误会追踪下？
有隐藏的项目，你可能不知道有东西在那儿。你可能已经听说了内存泄漏。但你可能不知道的是，其实有两种泄漏。
第一个是真正的内存泄漏，一个对象尚未被释放，但是不再被引用的了。因此，存储器不能被重新使用。
第二类泄漏是比较麻烦一些。这就是所谓的“无界内存增长”。这发生在内存继续分配，并永远不会有机会被释放。
如果永远这样下去你的程序占用的内存会无限大,当超过一定内存的话 会被系统的看门狗给kill掉.

建立一个场景，你可以检测出无限的内存增长。首先，在应用程序使10个不同的搜索（不要用已经存在的搜索）。确保搜索的一些结果！现在让程序等待几秒钟。

你应该已经注意到，在分配的轨道图不断上升。这是告诉你的,内存被分配了。它的这一特征，将引导你找到无限的内存增长。
你将要执行的是"heap shot analysis"。为此，按这个按钮叫“Mark Heap”。你会发现的详细面板左侧的按钮  

{% img center http://ww1.sinaimg.cn/small/a43af4ffjw1ecifcxzy9uj207e03q0sv.jpg %}  

按下它，你会看到一个红色的标志出现在轨道上，像这样：

{%img center http://ww3.sinaimg.cn/mw690/a43af4ffjw1ecifgqlk64j201304ft8h.jpg%}


heap shot分析的目的是执行一个动作多次，看看如果内存是否无限增长。搜索一个内容，稍等几秒加载图像，然后返回主页。然后再标记堆。反复这样做不同的搜索。
演戏几个搜索后，仪器会看起来像这样：

{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecifkhamr4j20c208wdgf.jpg%}

这时你应该会疑问。图中的蓝色是怎么回事了，你继续这样操作10次这样的搜索 蓝色还不断变高：
那肯定是不好的。别急，有什么关于内存的警告？你知道这些，对不对？内存警告是告诉一个应用程序，内存警告是ios处理app最好的方式尤其是在内存越来越吃紧的时候,你需要清除一些内存。
内存一直增长其实也不一定是你的代码除了问题,也有可能是UIKit 系统框架本身导致的.

通过选择HardwareSimulate内存警告在iOS模拟器的菜单栏模拟内存警告。你会发现，记忆体使用量出现小幅回落，但绝对不会回到它应该的。所以还是有无限的内存增长发生的地方。
究其原因，堆出手做钻进搜索的每次迭代后，你可以看到内存的分配每个镜头之间。一起来看看在详细信息面板，你会看到一堆一堆的镜头。

在iOS模拟器的菜单栏中选择hardwaresimulate内存警告模拟内存警告。你会发现内存使用会出现小幅回落，但肯定不会回到它应该在的地方。
每一次的搜索后做你可以看到内存已拍摄之间的分配。在详细信息面板看一看，你会看到一好多堆镜头。

##稳准狠
第一个堆镜头作为参照,然后随便打开一个堆镜头,你会看到如下:  
{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1ecifzbusd2j20dc07caat.jpg%}  

靠，这是一个很大的对象！从哪里开始看呢？
最好的方式是通过列表，你在你的应用程序直接使用的类。在这种情况下，HTTPHeaderDict，CGRegion，CGPath，CFNumber，等等都是可以忽略了。
但是，一个突出的是UIImage,这肯定是在你程序使用的。点击上的UIImage左侧的箭头显示的完整列表。选择一个，在扩展详细信息面板：
{%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1ecig2kckgtj203208w0sq.jpg%}  

图中灰色的是系统库,黑色部分是你应用的代码,要获得此跟踪更多的上下文,双击唯一的黑框ImageCache方法,这时候将掉转到如下方法

```
- (void)downloadImageAtURL:(NSURL*)url completionHandler:(ImageCacheDownloadCompletionHandler)completion {
    UIImage *cachedImage = [self imageForKey:[url absoluteString]];
    if (cachedImage) {
        completion(cachedImage);
    } else {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            NSData *data = [NSData dataWithContentsOfURL:url];
            UIImage *image = [UIImage imageWithData:data];
            [self setImage:image forKey:[url absoluteString]];
            dispatch_async(dispatch_get_main_queue(), ^{
                completion(image);
            });
        });
    }
}

```

工具是非常有用的,你现在要努力通过自己的代码思考发生了什么.看看通过上面的方法，你会看到它调用一个名为setImage方法：forKey：。这种方法在缓存以防它再次使用以后的应用程序的图像。啊！那么这肯定听起来像它可能是一个问题!
一起来看看该方法的实现：
```
- (void)setImage:(UIImage*)image forKey:(NSString*)key {
    [_cache setObject:image forKey:key];
}
```
从网络上下载一个图片添加字典中,你会注意到这些图片从来没有从字典清楚过
,这就是内存为什么会一直增长,因为应用程序并不会从缓存里删除东西.它只会一直增加他们.
要解决此问题,你需要的是ImageCache收到UIApplication内存吃紧的警告时.清理缓存.

为了使ImageCache能接收通知，修改ini​​t方法如下：

```
- (id)init {
    if ((self = [super init])) {
        _cache = [NSMutableDictionary new];
        [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(memoryWarning:) name:UIApplicationDidReceiveMemoryWarningNotification object:nil];
    }
    return self;
}
```
注册UIApplicationDidReceiveMemoryWarningNotification执行memoryWarning：方法。

```
- (void)memoryWarning:(NSNotification*)note {
    [_cache removeAllObjects];
}

```
memoryWarning删除缓存中的所有对象。这将确保没有持图像。
为了测试此修复程序，再次启动仪器（从Xcode中有⌘I）和重复的步骤。不要忘了在模拟结束内存警告！

**注意：请确保您从Xcode中退出，重新构建，而不是仅仅点击仪器仪表上的红色按钮，以确保您使用的是最新的代码。**

这一次分析应该是这样的：

{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1ecign06n2yj20c208w0tb.jpg%}  

这个时候，内存受到内存警告后急剧下降。但还是有一些内存整体增长，但远不及像以前那样。
究其原因还是有一定的增长确实是由于系统库，并没有太多可以做的。看来，系统库不释放所有的内存，这可能是由设计或可能是一个错误。你可以在你的应用程序做的是释放尽可能多的内存越好，你已经做到这一点！
干得好！还有一个问题，修补了, - 仍然有泄漏，你还没有解决的第一种类型的问题。

##内存泄露

内存泄漏的仪器。这是用来找到第一类泄漏前面提到的 - 当一个对象不再被引用时出现的那种
检测泄漏是可以理解的一个很复杂的事情，但泄漏的工具记得，已分配的所有对象，并定期通过扫描每个对象以确定是否有任何不能从任何其他对象访问的。
关闭仪器，回到Xcode和选择Product->Profile  

{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1eciguvy9x5j20xc0p8dke.jpg%}  

回到你的应用程序！执行搜索，得到结果。然后点选结果的预览行打开全屏浏览器。按下旋转按钮在左上角，然后再按一次。
回到仪器，等待片刻。如果你已经正确地完成上述步骤后，你会发现泄漏已经出现了！你的工具窗口将看起来像这样：  
{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1ecigwp5ymtj20c208wmxq.jpg%}  

返回到模拟器，并按下旋转几次。然后返回到仪器和等会,得到如下结果：

{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1ecigy7zu2hj20c208w0tb.jpg%}

哪来的泄漏从哪里来？扩展详细信息面板   
{%img center http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecici64zqwj202y01ijr6.jpg %}    
在扩展的详细信息面板打开CGContext上名单。在列表中选择CGContext上的元素之一，这表明导致要创建的对象，如下面的堆栈跟踪： 
{%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1ecih21lep0j203208wdfz.jpg%}   

再次，涉及到你的代码中的帧显示为黑色。由于只有一个，双击它，看看代码的方法。
有问题的方法是rotateTapped： ，这是被调用时被窃听旋转按钮的处理程序。这种方法旋转原始图像，并创建一个新的图像，如下：

```
- (void)rotateTapped:(id)sender {
    UIImage *currentImage = _imageView.image;
    CGImageRef currentCGImage = currentImage.CGImage;
 
    CGSize originalSize = currentImage.size;
    CGSize rotatedSize = CGSizeMake(originalSize.height, originalSize.width);
 
    CGContextRef context = CGBitmapContextCreate(NULL,
                                                 rotatedSize.width,
                                                 rotatedSize.height,
                                                 CGImageGetBitsPerComponent(currentCGImage),
                                                 CGImageGetBitsPerPixel(currentCGImage) * rotatedSize.width,
                                                 CGImageGetColorSpace(currentCGImage),
                                                 CGImageGetBitmapInfo(currentCGImage));
 
    CGContextTranslateCTM(context, rotatedSize.width, 0.0f);
    CGContextRotateCTM(context, M_PI_2);
    CGContextDrawImage(context, (CGRect){.origin=CGPointZero, .size=originalSize}, currentCGImage);
 
    CGImageRef newCGImage = CGBitmapContextCreateImage(context);
    UIImage *newImage = [UIImage imageWithCGImage:newCGImage];
 
    self.imageView.image = newImage;
}

```

再次，仪器只能在这里给你一个提示，问题出在哪里，它不能告诉你确切位置的泄漏。这是唯一能够证明你在创建对象泄露的地方.你可能认为ARC并有不可能是造成代码中内存泄漏...对不对？
回想一下，ARC只涉及Objective-C的对象。它不管理保留和的CoreFoundation对象而不是Objective-C的对象的释放。
啊，现在它开始变得明显的问题是什么 
-CGContextRef和CGImageRef对象永远不会被释放！为了解决这个问题，在rotateTapped方法的末尾添加以下两行代码：
```
CGImageRelease(newCGImage);
CGContextRelease(context);
```
这两种调用都需要来维护这两个对象的保留计数。这个说明，你还需要了解引用计数 - 即使你在你的项目中使用的ARC！
从在Xcode中，使用⌘I工具构建和运行应用程序。
在使用泄漏仪器仪器再看看应用程序，看看是否泄漏的被固定。如果你正确地遵循上述步骤，泄漏应消失！









 










