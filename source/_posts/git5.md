title: git系列教程之 修改远程仓库地址 modify remote url
date: 2013-09-03 09:50:37
tags: [技术]
categories: git
---
某天突然IT部门告之服务器要换地址了，本地有clone出来的git厍，则需要修改一下origin的地址，以便能继续push和pull，方法是，在命令行项目所在目录下执行：
<!-- more -->
	git remote set-url origin 新地址

