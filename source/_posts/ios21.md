title:  在Finder标题栏上显示完整路径
date: 2013-09-02 09:57:17
tags: [技术]
categories: [ios, mac]
---
打开终端，输入以下命令并回车：

	defaults write com.apple.finder _FXShowPosixPathInTitle -bool YES

然后再把finder关了再打开，你会发现路径栏变成这个样子了：
