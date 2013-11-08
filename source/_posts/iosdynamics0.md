title: ios UIKit Dynamics 系列教程之Gravity+Collision
date: 2013-11-06 14:16:04
tags: [技术]
categories: ios
---
ios7推出好久了,但是最近忙着工作的时间现在才抽时间自己看了WWDC2013,很是惭愧.最客户端其实最有趣的莫过于动画.ios7给我最大的惊喜就是UIKit Dynamics的到来,想想两年前写招行掌上生活首页的时候,那时候没有现成的物理引擎,写的动画非常生硬,套用现在流行的话就是"既视感"不强.
<!-- more -->

理论性的东西不太擅长.引用[onevcat](http://onevcat.com/2013/06/uikit-dynamics-started/)老师的博客.

##UIKitUIKit动力架构：

###1 UIDynamicItem；

Dynamic的协议对象

###2 UIDynamicBehavior：

动力行为的描述，用来指定UIDynamicItem应该如何运动，即定义适用的物理规则；

其下面又有几种行为

1. 吸附行为（UIAttachmentBehavior）： 有一个对象UIAttachmentBehavior，该对象用来指定两个动力项（项或点）之间的连接，当一个项或者点移动时，吸附的项也随之移动。当然，这个连接并不是完全是静态的（static），吸附的项有两个属性damping(阻尼)和oscillation(震荡)，这两个属性决定了吸附项的行为是如何随时间而变化的。
 
2. 碰撞行为（UICollisionBehavior）： 通过对象UICollisionBehavior指定一个边界，并且让各个动力项，在该边界内参与碰撞。UICollisionBehavior对象还可以指定这些动力项适当的回应碰撞。
 
3. 重力行为（UIGravityBehavior）： 通过对象UIGravityBehavior给动力项指定一个重力矢量，具有重力矢量的动力项，会在重力矢量的方向上一直加速，直到与别的动力项产生了冲突或者，遇到了边界。
 
4. 推动行为（UIPushBehavior）： 通过对象UIPushBehavior给动力项指定一个持续的或者瞬时的力（force vector）。
 
5. 捕捉行为（UISnapBehavior）： 通过对象UISnapBehavior给动力项指定一个捕捉点。动力项会根据配置的效果，来抓住这一捕捉点。

当动力行为被添加到animator（UIDynamicAnimator类的实例对象）时，动力行为就被激活。animator为动力行为的执行提供了上下文。动力项可以以组合形式出现,只要添加到同一个animator中即可。

###3 UIDynamicAnimator；

动画的播放者，动力行为（UIDynamicBehavior）的容器，添加到容器内的行为将发挥作用；

###4 ReferenceView：

等同于力学参考系，

只有当想要添加力学的UIView是ReferenceView的子view时，动力UI才发生作用。


----------- 

下面开始动手来做
比如我们要实现下面的功能

{%image center http://ww3.sinaimg.cn/mw690/a43af4ffjw1eadmdoeir3g208z0d8x4h.gif%}


1. 首先创建 我们的animatior

```
UIDynamicAnimator *animator = [[UIDynamicAnimator alloc] initWithReferenceView:self.view];

```
2. 对你想要进行动画的 item 添加上想要的物理行为 下面 我对square1 分别添加了 重力和碰撞还有吸附引擎.

```
UIGravityBehavior *gravityBeahvior = [[UIGravityBehavior alloc] initWithItems:@[self.square1]];
UICollisionBehavior *collisionBehavior = [[UICollisionBehavior alloc] initWithItems:@[self.square1]];

CGPoint anchorPoint = CGPointMake(self.square1.center.x, self.square1.center.y - 110.0);
UIAttachmentBehavior *attachmentBehavior = [[UIAttachmentBehavior alloc] initWithItem:self.square1 attachedToAnchor:anchorPoint];

//anchorPoint 为描点 及Beahvior相对应的作力点

```
3. 激活碰撞引擎的边界属性

```
collisionBehavior.translatesReferenceBoundsIntoBoundary = YES;

```

他的边界是针对于你设置的animator中的referenceView而定的,即self.view  当然我们也可以自定义某一个区域作为碰撞边界

```
[collisionBehavior setTranslatesReferenceBoundsIntoBoundaryWithInsets:UIEdgeInsetsMake(0, 0, 100.0, 100.0)];

```
这样子还不能满足你的需求 cocoa 还提供了添加UIBezierPath的方法 addBoundaryWithIdentifier:forPath:和添加一条线段为边界的 addBoundaryWithIdentifier:fromPoint:toPoint 方法

4: 为了方便显示 我们给square1添加一个imageView, 然后设置图片的渲染属性 这样子我们可以很方便的改变图片的颜色用以

self.square1ImageView.image = [self.square1ImageView.image imageWithRenderingMode:UIImageRenderingModeAlwaysTemplate];

5:设置震荡频率和阻尼

```
// These parameters set the attachment in spring mode, instead of a rigid
// connection.
[attachmentBehavior setFrequency:.5];
[attachmentBehavior setDamping:0.2];

```

6: 为了更清楚的显示描点 和 item 显示的作用力 我们用绳子来展示

实现机制很简单 就是用绳子图片进行拼接 然后KVO 描点和item的运动轨迹 动态刷新 

```
- (void)trackAndDrawAttachmentFromView:(UIView*)attachmentPointView toView:(UIView*)attachedView withAttachmentOffset:(CGPoint)attachmentOffset
{
    if (!self.attachmentDecorationLayers)
        // First time initialization.
    {
        self.attachmentDecorationLayers = [NSMutableArray arrayWithCapacity:4];
        for (NSUInteger i=0; i<4; i++)
        {
            UIImage *dashImage = [UIImage imageNamed:[NSString stringWithFormat:@"DashStyle%i", (i % 3) + 1]];
            
            CALayer *dashLayer = [CALayer layer];
            dashLayer.contents = (__bridge id)(dashImage.CGImage);
            dashLayer.bounds = CGRectMake(0, 0, dashImage.size.width, dashImage.size.height);
            dashLayer.anchorPoint = CGPointMake(0.5, 0);
            
            [self.layer insertSublayer:dashLayer atIndex:0];
            [self.attachmentDecorationLayers addObject:dashLayer];
        }
    }
    
    // A word about performance.
    // Tracking changes to the properties of any id<UIDynamicItem> involved in
    // a simulation incurs a performance cost.  You will receive a callback
    // during each step in the simulation in which the tracked item is not at
    // rest.  You should therefore strive to make your callback code as
    // efficient as possible.
    
    [self.attachmentPointView removeObserver:self forKeyPath:@"center"];
    [self.attachedView removeObserver:self forKeyPath:@"center"];
    
    self.attachmentPointView = attachmentPointView;
    self.attachedView = attachedView;
    self.attachmentOffset = attachmentOffset;
    
    // Observe the 'center' property of both views to know when they move.
    [self.attachmentPointView addObserver:self forKeyPath:@"center" options:0 context:NULL];
    [self.attachedView addObserver:self forKeyPath:@"center" options:0 context:NULL];
    
    [self setNeedsLayout];
}

//| ----------------------------------------------------------------------------
- (void)layoutSubviews
{
    [super layoutSubviews];
    
    if (self.attachmentDecorationLayers)
    {
        // Here we adjust the line dash pattern visualizing the attachement
        // between attachmentPointView and attachedView to account for a change
        // in the position of either.
        
        const NSUInteger MaxDashes = self.attachmentDecorationLayers.count;
        
        CGPoint attachmentPointViewCenter = CGPointMake(self.attachmentPointView.bounds.size.width/2, self.attachmentPointView.bounds.size.height/2);
        attachmentPointViewCenter = [self.attachmentPointView convertPoint:attachmentPointViewCenter toView:self];
        CGPoint attachedViewAttachmentPoint = CGPointMake(self.attachedView.bounds.size.width/2 + self.attachmentOffset.x, self.attachedView.bounds.size.height/2 + self.attachmentOffset.y);
        attachedViewAttachmentPoint =  [self.attachedView convertPoint:attachedViewAttachmentPoint toView:self];
        
        CGFloat distance = sqrtf( powf(attachedViewAttachmentPoint.x-attachmentPointViewCenter.x, 2.0) +
                                 powf(attachedViewAttachmentPoint.y-attachmentPointViewCenter.y, 2.0) );
        CGFloat angle = atan2( attachedViewAttachmentPoint.y-attachmentPointViewCenter.y,
                              attachedViewAttachmentPoint.x-attachmentPointViewCenter.x );
        
        NSUInteger requiredDashes = 0;
        CGFloat d = 0.0f;
        
        // Depending on the distance between the two views, a smaller number of
        // dashes may be needed to adequately visualize the attachment.  Starting
        // with a distance of 0, we add the length of each dash until we exceed
        // 'distance' computed previously or we use the maximum number of allowed
        // dashes, 'MaxDashes'.
        while (requiredDashes < MaxDashes)
        {
            CALayer *dashLayer = self.attachmentDecorationLayers[requiredDashes];
            
            if (d + dashLayer.bounds.size.height < distance) {
                d += dashLayer.bounds.size.height;
                dashLayer.hidden = NO;
                requiredDashes++;
            } else
                break;
        }
        
        // Based on the total length of the dashes we previously determined were
        // necessary to visualize the attachment, determine the spacing between
        // each dash.
        CGFloat dashSpacing = (distance - d) / (requiredDashes + 1);
        
        // Hide the excess dashes.
        for (; requiredDashes < MaxDashes; requiredDashes++)
            [self.attachmentDecorationLayers[requiredDashes] setHidden:YES];
        
        // Disable any animations.  The changes must take full effect immediately.
        [CATransaction begin];
        [CATransaction setAnimationDuration:0];
        
        // Each dash layer is positioned by altering its affineTransform.  We
        // combine the position of rotation into an affine transformation matrix
        // that is assigned to each dash.
        CGAffineTransform transform = CGAffineTransformMakeTranslation(attachmentPointViewCenter.x, attachmentPointViewCenter.y);
        transform = CGAffineTransformRotate(transform, angle - M_PI/2);
        
        for (NSUInteger drawnDashes = 0; drawnDashes < requiredDashes; drawnDashes++)
        {
            CALayer *dashLayer = self.attachmentDecorationLayers[drawnDashes];
            
            transform = CGAffineTransformTranslate(transform, 0, dashSpacing);
            
            [dashLayer setAffineTransform:transform];
            
            transform = CGAffineTransformTranslate(transform, 0, dashLayer.bounds.size.height);
        }
        
        [CATransaction commit];
    }
}


//| ----------------------------------------------------------------------------
- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (object == self.attachmentPointView || object == self.attachedView)
        [self setNeedsLayout];
    else
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
}


```

6: 为了让程序更有意思点 我们可以用UICollisionBehaviorDelegate来处理碰撞回掉 比如碰到边界 我们改变下颜色

```

- (void)collisionBehavior:(UICollisionBehavior*)behavior beganContactForItem:(id<UIDynamicItem>)item withBoundaryIdentifier:(id<NSCopying>)identifier atPoint:(CGPoint)p
{
    // Lighten the tint color when the view is in contact with a boundary.
    [(UIView*)item setTintColor:[UIColor redColor]];

}

//| ----------------------------------------------------------------------------
//  This method is called when square1 stops contacting a collision boundary.
//  In this demo, the only collision boundary is the bounds of the reference
//  view (self.view).
//
- (void)collisionBehavior:(UICollisionBehavior*)behavior endedContactForItem:(id<UIDynamicItem>)item withBoundaryIdentifier:(id<NSCopying>)identifier
{
    // Restore the default color when ending a contcact.
    [(UIView*)item setTintColor:[UIColor greenColor]];

}

```

7: 添加手势 这样子才能够让方框指哪打哪

- (IBAction)handleSpringAttachmentGesture:(UIGestureRecognizer*)gesture
{
   [self.attachmentBehavior setAnchorPoint:[gesture locationInView:self.view]];
   self.attachmentView.center = self.attachmentBehavior.anchorPoint;
    
}














