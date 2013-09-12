title: MAC OS X 下快速切换代理 
date: 2013-09-03 13:20:05
tags: [技术]
categories: 
- ios
- mac
---

因为行业原因 在公司上网必须通过代理安装，所以每天上下班开电脑第一件事 就是开关代理。于是做了一个软件 利用shell进行切换代理。

{% img left  http://ww2.sinaimg.cn/mw690/a43af4ffjw1e898v6vmwdj20dk06bwep.jpg 300 400 运行效果图 %}
  
  <!-- more-->
    
{% img left http://ww4.sinaimg.cn/mw690/a43af4ffjw1e898wixkiej207q020dfu.jpg 200 300 软件 %}

    

下面是主要源码

```
tell application "System Events"

set proxy_dialog to display dialog "代理模块(Ethernet版本):" buttons {"打开代理模式1", "打开代理模式2", "关闭代理"} default button "打开代理模式1" with title "华夏基金开发环境快速切换代理App"

set proxy_interface to button returned of proxy_dialog

end tell


if proxy_interface is "打开代理模式1" then

do shell script "networksetup -setwebproxy Ethernet XXX.XXX.XXX.XX XXXX&&networksetup -setsecurewebproxy Ethernet XXX.XXX.XXX.XX XXXX&&networksetup -setwebproxystate Ethernet on&&networksetup -setsecurewebproxystate Ethernet on" with administrator privileges

end if


if proxy_interface is "打开代理模式2" then

do shell script "networksetup -setwebproxy Ethernet XXX.XXX.XXX.XX XXXX&&networksetup -setsecurewebproxy Ethernet XXX.XXX.XXX.XX XXXX&&networksetup -setwebproxystate Ethernet on&&networksetup -setsecurewebproxystate Ethernet on" with administrator privileges

end if


if proxy_interface is "关闭代理" then

do shell script "networksetup -setwebproxystate Ethernet off&&networksetup -setsecurewebproxystate Ethernet off" with administrator privileges

end if

```

