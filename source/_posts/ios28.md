title: iOS开发之MPNowPlayingInfoCenter 锁屏显示正在播放的音乐
date: 2013-09-18 23:43:50
tags: [技术]
categories: ios
---
今天在床上玩唱吧,听着歌锁屏了,当点亮屏幕的时候,锁屏页面出现了我正在听得歌曲 壁纸也换成了唱吧里面的歌手图片.做ios好几年了,从没有做过这个需求 于是好奇就翻看ios的[API文档](https://developer.apple.com/library/ios/documentation/mediaplayer/reference/MPNowPlayingInfoCenter_Class/Reference/Reference.html)找到了这个类.
<!-- more -->
如下图
{%img http://ww3.sinaimg.cn/mw690/a43af4ffjw1e8r3az0tbaj20g50litai.jpg 300 600%}
   
{%img http://ww2.sinaimg.cn/mw690/a43af4ffjw1e8r3b00x7aj20gj05wq3e.jpg 300 200%}


##MPNowPlayingInfoCenter 解释

>即时播放中心能够用于播放APP中正在播放的媒体信息.
播放的信息会显示在锁屏页面和多任务管理页面.如果用户是用airplay播放的话 会自动投射到相应的设备上.

[下载源码](https://github.com/hufeng825/LockScreenInfo.git)


##开始动手
### 让App支持后台运行
先创建工程,因为是audio 类型的app 需要支持后台播放 所以得要在plist 中声明属性.
添加如下属性

Required background modes -> App plays audio
如下图

{%img left http://ww2.sinaimg.cn/mw690/a43af4ffjw1e8r45ojlcuj20l80a2q4l.jpg 300 400 %}

### 添加播放的Frame

1. AVFoundation.framework
2. MediaPlayer.framework

{%img left http://ww3.sinaimg.cn/mw690/a43af4ffjw1e8r4757worj208c03vq2z.jpg 300 400 %}


### 开始代码吧
 
首先创建一个ViewController 和一个用于播放的按钮 playButton


	@interface ViewController : UIViewController {
	 
	IBOutlet UIButton *playButton;
	 
	}
	 
	@property (nonatomic, retain) IBOutlet UIButton *playButton;
	 
	-(IBAction)playButtonPress:(id)sender;


加入播放用的控件audioPlayer 和其相应的头文件

	#import <MediaPlayer/MPNowPlayingInfoCenter.h>
	#import <MediaPlayer/MPMediaItem.h>
	#import <AVFoundation/AVFoundation.h>
	MPMoviePlayerController *audioPlayer;

	@property (nonatomic, retain) MPMoviePlayerController *audioPlayer;

	@synthesize playButton, audioPlayer;


在viewDidLoad 中 我们要把AudioPlayer 进行初始化 此处加载网络上的一首音频

	[[AVAudioSession sharedInstance] setDelegate: self];
	 
	NSError *myErr;
 
	// Initialize the AVAudioSession here.
	if (![[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryPlayback error:&myErr]) {
	    // Handle the error here.
	    NSLog(@"Audio Session error %@, %@", myErr, [myErr userInfo]);
	}
	else{
	    // Since there were no errors initializing the session, we'll allow begin receiving remote control events
	    [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
	}
	 
	    //initialize our audio player
	    audioPlayer = [[MPMoviePlayerController alloc] initWithContentURL:[NSURL URLWithString:@"http://www.cocoanetics.com/files/Cocoanetics_031.mp3"]];
	     
	    [audioPlayer setShouldAutoplay:NO];
	    [audioPlayer setControlStyle: MPMovieControlStyleEmbedded];
	    audioPlayer.view.hidden = YES;
	     
	    [audioPlayer prepareToPlay];

点击按钮开始播放,注意因为MPNowPlayingInfoCenter只支持5.0+ 所以为了防止低版本使用 巧妙的应用了NSClassFromString进行了判断

	- (IBAction)playButtonPress:(id)sender {
	     
	    [audioPlayer play];
	     
	    Class playingInfoCenter = NSClassFromString(@"MPNowPlayingInfoCenter");
	     
	    if (playingInfoCenter) {
	 
	         
	        NSMutableDictionary *songInfo = [ [NSMutableDictionary alloc] init];
	         
	        
	        MPMediaItemArtwork *albumArt = [ [MPMediaItemArtwork alloc] initWithImage: [UIImage imagedNamed:@"AlbumArt"] ];
	         
	        [ songInfo setObject: @"Audio Title" forKey:MPMediaItemPropertyTitle ];
	        [ songInfo setObject: @"Audio Author" forKey:MPMediaItemPropertyArtist ];
	        [ songInfo setObject: @"Audio Album" forKey:MPMediaItemPropertyAlbumTitle ];
	        [ songInfo setObject: albumArt forKey:MPMediaItemPropertyArtwork ];
	        [ [MPNowPlayingInfoCenter defaultCenter] setNowPlayingInfo:songInfo ];
	    }
	}

---
[参考 http://jaysonlane.net/tech-blog/2012/04/lock-screen-now-playing-with-mpnowplayinginfocenter/](http://jaysonlane.net/tech-blog/2012/04/lock-screen-now-playing-with-mpnowplayinginfocenter/)





