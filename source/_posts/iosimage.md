title: ios 开发笔记之图片 Image
date: 2013-08-20 09:29:39
tags: [技术]
categories: ios
---

##关于图片资源
ios 程序会把图片资源编译成二进制文件，程序运行时会把这些图片从磁盘加载直接到内存，如果图片很大，加载速度就会很慢。
<!-- more -->
为了优化提高性能，需要尽量压缩图片资源。（ps 苹果公司的UIKit 开发者Andy Matuschak指出：使用resizable image是最快的方法。）


##关于图片资源的压缩
如果不需要用半透明的图片 则尽量不要用png 格式的图片。相应的可以用jpg格式的。另外谷歌最新推出的一种格式webp
  
###1 WebP是什么
WebP是Google推出的一种同时提供了有损压缩与无损压缩的图片格式。目前互联网上传输的数据有65%都是图片，WebP就是出于减少数据量、加速网络传输的目的而开发的。WebP希望能够达到和JPEG同水平的图片质量，但是更小的文件，以减少图片的传送时间。
在有损压缩的状况下，WebP比同样画质的JPEG少了25% ～ 34%的文件大小 。而在无损压缩的情形中，比起用libpng产生的PNG图片，WebP少了34%的文件大小，也比用pngout再处理过的PNG图片少了26%的文件大小。
###2 WebP的使用
webp图片压缩率会比jpeg、png更高，因此下载图片会更省流量，特别适合在mobile app上使用。 比如iOS app上，可以把webp编译生成framework，然后加入引用就可以是使用了。强烈推荐。
这iOS解析时，可以直接使用 WebPImage。
NSData *imageData = [NSData dataWithContentsOfURL:url];
UIImage *tmpImage = [[WebPImage alloc] loadWebPFromData:imageData];
SDWebImage最近也提供了对webp的支持，起先不支持自己写了一个分类，现在可以直接用他的UIImage+WebP


##关于加载方式
  imageNamed每次都读图片到缓存中，只适合频繁使用的图片，
initWithContentsOfFile的方法加载图片后，不缓存，适合加载不常使用的图片。 
引导图片一般情况下只会启动一次而且图片也一般情况下比较大所以用imageNamed 会非常， 如果用initWithContentsOfFile:，这些图片所占用内存可以很快被释放

>资料参考by wufawei stackoverflow



