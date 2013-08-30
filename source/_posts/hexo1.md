title: hexo教程1 如何安装hexo
date: 2013-08-08 14:21:33
tags: [技术]
categories: [hexo]
---
<!--more-->
##前言
>很早之前就想自己搭建一个博客，但是无奈已没有时间 而没有银子购买服务器，把家里的mac 当做服务器搭建wordpress但是不能保证速度和访问时间。偶然间发现了octopress,于是兴冲冲的折腾起来，最后搭建成功了，废了很大的经历，最主要的原因是还是网络原因，octopress 安装需要下载大量的安装依赖非常繁琐，到处是坑。后来偶然间发现了hexo，发现要比octopress 好用的太多了。于是果断废弃octopress 转头hexo

***

##概念理解
hexo 是基于node.js 的 和rails 差不多。再次使用前 需要安装两个插件

 *   nvm （版本控制）
     nodejs version manager,可以把它理解为 rails里面的rvm  
 *   npm （包管理机制 ）
 	 nodejs package manager,可以把它理解为 rails 里面的bundle 
     
- - -
###安装步骤(mac)
>只针对于mac 其他的请到官网查看相应平台的安装方法http://zespia.tw/hexo 

***
#### npm
***
打开终端 执行一下命令

```
git clone git://github.com/creationix/nvm.git ~/nvm
```
安装完毕后，在~/.bash_profile或~/.bashrc加入以下内容

```
. ~/nvm/nvm.sh`
```
执行

```
source .bash_profile //或者 source .bashrc
```
之后即可使用 nvm 来安装 Node.js

```
   nvm install v0.8.14
   nvm use v0.8.14
   nvm alias default v0.8.14 
```
***
#### hexo
安装

```
npm install -g hexo
```
更新

```
npm update -g 
```
***

###设定

编辑 _config.yml

下面贴出我的配置 大家自行根据各自的配置进行相应修改


	// Site
	title: 阿峰的技术窝窝
	subtitle: 专注于移动互联网
	description: C/C++/Linux/嵌入式/IOS/WEB/
	author: Jason Hu
	email: hufeng@hufengvip.cn
	language: zh-CN

	// URL
	// If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
	url: http://hufeng825.github.com
	root: /
	permalink: :year/:month/:day/:title/
	tag_dir: tags
	archive_dir: archives
	category_dir: categories
	code_dir: downloads/code

	// Writing
	new_post_name: :title.md # File name of new posts
	default_layout: post
	auto_spacing: false # Add spaces between asian characters and western characters
	titlecase: false # Transform title into titlecase
	max_open_file: 100
	filename_case: 0
	highlight:
	  enable: true
	  line_number: true
	  tab_replace:

	// Category & Tag
	default_category: IOS
	category_map:
	tag_map:

	// Archives
	// 2: Enable pagination
	// 1: Disable pagination
	// 0: Fully Disable
	archive: 2
	category: 2
	tag: 2

	// Server
	// Hexo uses Connect as a server
	// You can customize the logger format as defined in
	// http://www.senchalabs.org/connect/logger.html
	port: 4000
	logger: false
	logger_format:

	// Date / Time format
	// Hexo uses Moment.js to parse and display date
	// You can customize the date format as defined in
	// http://momentjs.com/docs/#/displaying/format/
	date_format: YYYY MMM D
	time_format: H:mm:ss

	// Pagination
	// Set per_page to 0 to disable pagination
	per_page: 10
	pagination_dir: page

	// Disqus
	disqus_shortname:

	// Extensions
	// Plugins: https://github.com/tommy351/hexo/wiki/Plugins
	// Themes: https://github.com/tommy351/hexo/wiki/Themes

	plugins:
	- hexo-generator-sitemap


	theme: bootstrap
	exclude_generator:

	// Deployment
	// Docs: http://zespia.tw/hexo/docs/deploy.html
	deploy: 
	  type: github
	  repository: https://github.com/hufeng825/hufeng825.github.io.git
	  branch: master
 