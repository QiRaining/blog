title: git与SVN协同的工作流程
date: 2013-09-03 11:00:12
tags: [技术]
categories: [git, svn]
---

git可以和SVN服务器一起使用，即，中央服务器采用svn，本地代码库使用git。这样的好处是，可以兼容以前的项目，同时本地有一套完整的版本控制系统，可以随时查看代码修改历史，随时提交，不需要网络。合适的时候再提交到SVN服务器。git-svn的工作流程也有很多，我们推荐使用下面这种方式。

<!-- more-->


##一.git-svn初始化

```
git svn init SVNREMOTEURL

```
-s 参数是表面使用的是svn标准命名方法,即 trunk,tags,branches,这个参数有时很重要,建议使用,命 令后面还可以加个文件夹名字作为clone后的目录

```
git svn fetch

```
可能碰到只想从某个版本开始进行fetch,那么请需要 –r 参数。 例如:

```
$ git svn fetch -r 1342:HEAD

$ git remote add origin GITREMOTEURL 初始化远程git 地址 

这⼀一步可以省略 如果没必要提交到远程git 服务器中

```

##二.git-svn基本⽤用法

###本地修改代码后提交 

```
git commit -a -m “”

```
###同步远程svn 服务器 

```
git svn rebase 

```
###推送到远程svn服务器 

```
git svn dcommit 

```
###推送到远程git 服务器 

```
git push

```

###从SVN服务器获取代码

```
$ git svn clone http://svnserver/project/trunk

```
### 创建一个本地分支

```
为了方便合并，减少不必要的麻烦，最好保持主分支master不变，在一个新的分支进行日常工作

git branch workA

```
###日常修改和提交


与git的工作流程完全一样

```
$ git checkout -b work
$ git commit -a

```
###切回master从SVN获取最新代码

```
$ git checkout master
$ git svn rebase

```

###master同步后，与工作分支合并

```
$ git checkout work
$ git rebase master     ## 手工解决可能的冲突

```

###合并主分支

```
$ git checkout master $ git merge work

```

###git-svn 解决冲突 

* ⼿动打开冲突的⽂文件 找到冲突的地⽅方修改完成后保存

* 执⾏行 git add 冲突⽂文件

* git rebase --continue 

* git svn dcommit