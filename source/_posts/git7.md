title: git系类教程之 指定公钥
date: 2013-09-03 10:13:04
tags: [技术]
categories: git
---

如果本地有多个公钥 如何对git 进行指定用哪个公钥呢？
<!-- more -->

```
vi .git/config 


[core]

       repositoryformatversion = 0

       filemode = true

       bare = false

       logallrefupdates = true

       ignorecase = true

[remote "origin"]

       fetch = +refs/heads/*:refs/remotes/origin/*

       url = ssh://dev@nav.fun-guide.mobi:6521/home/dev/git/cmb.git

[branch "master"]

       remote = origin

       merge = refs/heads/master

[branch "cmb-dingcan"]

       remote = origin

       merge = refs/heads/cmb-dingcan

~                                                                               



Host git.magus-soft.com

HostName git.magus-soft.com

Port 6521

User git

IdentityFile ~/.ssh/iphone_git

~                                                                                 



／.ssh/config

```