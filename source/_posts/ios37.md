title: iOS系列教程之TextKit实现图文混排读后记
date: 2014-01-21 22:21:56
tags: [技术]
categories: ios
---
前两天看搜狐[家明哥](http://weibo.com/jiaming0329)写的[《TextKit实现图文混排》](http://blog.sina.com.cn/s/blog_6f1a34260101ptox.html) 今晚回家看了下API发现了一个更加取巧的实现方式.可以直接将后台返回的html富文本用textView显示出来.
记得两年前当时做这个的时候还是借助了笨重的webview.
>>
Textkit是iOS7新推出的类库，其实是在之前推出的CoreText上的封装，有了这个TextKit，以后不用再拿着CoreText来做累活了，
下面是我分别用UITextView 和UIWebView 显示一段图文混合的文字 


{%img  http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecrjrol3fwg208o0esait.gif%}

<!-- more -->
-----------

##API

```
- (id)initWithFileURL:(NSURL *)url options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict error:(NSError **)error

```
-----------

##Description	

Initializes a new attributed string object from the data at the given URL.
The HTML importer should not be called from a background thread (that is, the options dictionary includes NSDocumentTypeDocumentAttribute with a value of NSHTMLTextDocumentType). It will try to synchronize with the main thread, fail, and time out. Calling it from the main thread works (but can still time out if the HTML contains references to external resources, which should be avoided at all costs). The HTML import mechanism is meant for implementing something like markdown (that is, text styles, colors, and so on), not for general HTML import.

-----------




##测试用的html

```
<meta charset="UTF-8">
<div style="background-color:lightgrey;
    font-size:14px;
    color:#304182;
  text-align:center; 
  margin-left:5px;
  padding-right:5px">
	<p>Hi
		<span style="font-size:18px; color:#E88834;">
			Taobao
		</span>
        
		<img src="hufeng.png" height="32" width="32" />
        <p> 静态图片
		<img src="taobao.gif" height="32" width="52">
        <p> 动态图片
	</p>
	 
</div>

```
* **需要注意的是第一行需要指明编码格式  否则的话 中文会显示乱码**
* **gif图片textView会自动转换成静态图片进行显示**

如下图是去掉meta charset="UTF-8"的显示效果
{%img http://ww1.sinaimg.cn/mw690/a43af4ffjw1ecrjvxjcelj207m054glk.jpg%}


##功能函数

```
- (void)loadHtmlToWebView
{
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"text" withExtension:@"html"];
    [_webView loadRequest:[NSURLRequest requestWithURL:url]];
}

```

```
- (void)loadHtmlToTextView
{
    
    // Create attributed string from HTML
    NSURL *url = [[NSBundle mainBundle] URLForResource:@"text" withExtension:@"html"];
    NSAttributedString *attrStr = [[NSAttributedString alloc]
                                   initWithFileURL:url
                                   options:@{NSDocumentTypeDocumentAttribute:NSHTMLTextDocumentType}
                                   documentAttributes:nil error:nil];
    [_textView setAttributedText:attrStr];

}
```

演示代码下载
http://vdisk.weibo.com/s/aOcPgYpXA04g2  





