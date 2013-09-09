title: mac 下 git svn 的代理设置
date: 2013-09-02 08:10:34
tags: [技术]
categories: [git, svn]
---
所干的工作 因为涉及到金融行业网络安全性比较高 公司的网络设置了代理 这导致了git svn 双双挂了。 
<!-- more -->
废话少说 下面介绍如何对git svn 设置代理

1. $HOME 下 我的路径为/Users/jason:

2. 进入$HOME/.subversion 

   编辑servers 文件 添加

	   [global]
	    http-proxy-host = XX.XX.XX.XX
	    http-proxy-port = XXXX
	   [groups]

3. 编辑$HOME/.gitconfig

	   [http]        

	        proxy = http://XX.XX.XX.XX:XXXX

	   [https]
	         proxy = http://XX.XX.XX.XX:XXXX

4. 或者直接用命令

		git config --global http.proxy http://XX.XX.XX.XX:XXXX
		git config --global https.proxy http://XX.XX.XX.XX:XXXX
