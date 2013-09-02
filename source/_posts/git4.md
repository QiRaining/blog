title: git 系类教程之 懂的这些配置能让git 更好用
date: 2013-09-02 18:16:59
tags: [技术]
categories: git
---

是不是抱怨git操作太过于复杂,是不是想要让log 更加漂亮 是不是想要让git 跟svn 一样支持st ci 等等这样的缩写命令……
<!-- more -->
下面的这些配置能够满足你.
打开终端 执行
	cd
	vi .git/.gitconfig
然后修改gitconfig
	[alias]
	  logs = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	  st = status
	  ci = commit
	  br = branch
	  co = checkout
	  df = diff
	  lg = log -p
如果想要把 rebase 當做 git pull 的預設值，可以在專在 .gitconfig 加上
	[branch "master"]
	  remote = origin
	  merge = refs/heads/master
	  rebase = true
也可以直接加到 ~/.gitconfig 讓所有的 tracked branches 都自動套用這個設定：
	[branch]  
  		autosetuprebase = always



