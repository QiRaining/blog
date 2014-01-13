title: mac 下 node-qrcode的二维码库
date: 2013-11-27 21:51:25
tags: [技术]
categories: mac
---
这两天在mac下折腾node.js 的二维码库 ,遇到了n多大坑. 按着其官方文档的说明只有下面简简单单几句
```
Dependencies

These should be taken care of for you by npm but you should...

npm install canvas
If cairo gives you trouble and you cannot install canvas, checkout the canvas site. I know @tjholowaychuk has setup a way to download and install a version of cairo/pixman for testing.

The word "QR Code" is registered trademark of:

DENSO WAVE INCORPORATED
```

如果你的系统是mac的话 你只按着上面的安装方法 保准你折腾的头破血流, 我就是血淋淋的例子啊.

因为mac 下其要安装的库太多了 .下面一次列出来

```

1. brew install  pkgconfig  如果没有安装homebrew 的话 恭喜你 安装去吧.

2. install XQuartz [下载地址](https://xquartz.macosforge.org)

3. brew install Cairo

4. coyped all /opt/X11/lib/pkgconfig/*.pc to /usr/local/lib/pkgconfig on your mac

5. sudo npm install -g qrcode

```


以上的安装步骤 我可是折腾了足足一个晚上.

写个demo 进行测试下 qrcode.js

````
var http = require("http");
var QRCode = require('qrcode');
function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/html"});
  QRCode.toDataURL("胡峰",function(err,url){
    if(err) console.log('error: '+err);
    //console.log(url);
    response.end("<!DOCTYPE html/><html><head><title>二维码</title></head><body><p >请扫描二维码</p><img src='"+url+"'/></body></html>");
  });
}

http.createServer(onRequest).listen(8888);

```

 node qrcode.js  打开浏览器 ok了

 {%img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1eazxou2xo0j207o075aac.jpg%}



