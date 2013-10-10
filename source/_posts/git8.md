title: git系类教程之 综合篇
date: 2013-09-03 10:18:19
tags: [技术]
categories: git
---

不敢说这是git常用操作最全的教程，这是本人再前人的基础上加上应用了三年多git总结的，应该是比较全的，后续我还会把git 常见的错误总结出来。
<!-- more -->

##git基本工作流程

git支持很多种不同的工作流程，我们采用的是与SVN接近的模拟中央服务器流程。即，有一个公用的代码库放在服务器上，开发者从这个共享的服务器克隆后，在本地开发，然后提交到服务器，并且从服务器获取其他用户提交的内容。

**注意** git是分布式的代码控制系统，所以每个代码库都是平等的，这里只是在逻辑上划分了一个中央服务器而已，在物理结构上，中央代码库与本地代码库没有什么不同。
[编辑]创建帐号
git可以使用多种协议在代码库之间通信。我们目前采用ssh协议，需要用户在服务器上有一个ssh帐号才能访问代码库。用户需要在本机创建一个ssh密钥对，把公钥发给管理员，密钥保存在自己本机。这样，就可以使用密钥连接服务器。


##开始工作
开始工作之前，需要复制一套中央服务器的代码库：

```
$ git clone /server/repo/project

```

###本地修改和提交

git的提交操作是在本地完成的，不需要网络连接。

```
$ git checkout branch
--- 编辑现有文件或者添加新文件 ...

```

```
$ git add newfile
$ git commit -a
--- 填写此次提交的备注

```
###从中央服务器获取其他人的更新

这个操作实际是执行了获取更新，并且与本地代码合并两个操作。因为有可能2人改了同一个地方，所以这里有可能会出现冲突的情况。出现冲突时，需要手工合并代码。

```
$ git pull
向中央服务器发送本地的修改
这个操作是把本地的所有新的commit历史都提交到服务器

```

```
$ git push

```

##一：版本控制守则

1. 不要提交垃圾文件。包括临时文件，编译产生的二进制文件，个人设置文件，系统cache，与项目无关的文件等等。使用.gitignore文件来告诉git哪些文件应该忽略掉。  

2. 不要提交不能编译运行的代码到master分支。平时创建临时分支来工作，可以随时提交，当告一段落之后再合并到master分支。保证master分支的代码是可运行的，这样不会给团队中的其他人带来不必要的影响。 

3. 善用分支。可以每开始一个新功能时就创建一个新分支，改完后合并到master。每个新版本也要用一个新分支，这样如果需要改老版本的bug，那么可以很轻松地切换到老分支，改完后再切回新分支。 

4. 多提交，及时提交。每当改动达到可以用一句话描述的时候，就提交。 

5. 一定要写清楚提交注释，写明做了哪些修改，不要用笼统的一句话例如“改bug”，而是要写具体的说明例如，“按钮文字从转发改成分享”。
每个准备提交上线的版本要打tag，命名成v1.0.0_rc1这种格式，第一次提交就是rc1，第二次提交就是rc2等等 

---

##二：git仓库

###请求代码

```
$ git clone ssh://%%%%.git
$ git clone ssh://%%%%%%.git

```

##三： 本地代码库管理

### 1.让git使用你的用户名来标记每次commit

```
$ git config --global user.name "hufeng"
$ git config --global user.email hufeng@hufengvip.cn

```
### 2.在当前目录初始化一个代码库

```
$ git init

```

### 3.把所有文件加入版本控制

```
$ git add .

```
### 4.commit所有修改过的文件

```
$ git commit -a

```

### 5.扔掉对代码库所做的修改，恢复到HEAD版本

```
$ git checkout -f
或
$ git reset --hard

```
### 6.优化log显示

```
git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

```
### 7.创建一个分支

```
$ git branch test

```

### 8.切换到一个分支

```
$ git checkout test

```

### 9.切换回主分支

```
$ git checkout master

```
### 10.命令行提示符脚本

*把下面的脚本放到 ~/.profile 或者 ~/.bashrc 里，命令行的提示符即会显示出当前的git分支名称。例如：~/Projects/cmb (master) $*

```
function parse_git_branch {
      ref=$(git symbolic-ref HEAD 2> /dev/null) || return
        echo "("${ref#refs/heads/}")"
}

PS1="\w \$(parse_git_branch)\$ "

```
---

## 三. 操作远程代码库

### 1.使用git协议共享本地代码库

git本身带了一个服务器命令，启动后，其他机器可以用git协议访问本机的代码库

```
$ git daemon --export-all --base-path=/home/pub/projects/ test.git

```
**注意：**

* 如果返回"fatal: no matching remote head"，说明代码库里没有文件或者没有commit过。
* 在.git目录下应该有git-daemon-export-ok这个文件，否则必须使用export-all参数来强制共享
* 如果允许远程提交代码，需要加上 --enable=receive-pack 参数

### 2.从版本库中删除文件

```
在git rm -rf  --cached  CCB.xcodeproj/project.xcworkspace/xcuserdata/  

--cached 本地保留服务器删除

```
### 3.远程仓库的重命名

在新版 Git 中可以用 git remote rename 命令修改某个远程仓库的简短名称，比如想把 pb 改成 paul，可以这么运行：

```
$ git remote rename pb paul
$ git remote origin pau

```
**注意**
对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 pb/master 分支现在成了paul/master。

### 4.远程仓库的删除

碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 git remote rm 命令：

```
$ git remote rm branchA

```
或者使用	

```
 $ git push origin :xx //删除远程
 
 $ git branch -d xx //删除本地

```

### 5.更新指定分支指定文件

```
$ git checkout 指定分支 指定文件

$ git checkout master HFFrame/Global/Global_macro.h

```

### 6.复制一个远程代码库

```
$ git clone git://10.150.150.136/test.git test

```

### 7.从远程代码库上的主分支获取最新的代码

第一次：

```
$ git pull git://10.150.###.###/test.git master
或
$ git pull ssh://10.150.###.###/test.git master

```
以后：

```
$git pull origin master

指定好配置文件后可以直接执行pull push 不用跟后面的分支 骨干

具体方法是 仓库跟目录 .git/config 

 [core]
           repositoryformatversion = 0
           filemode = true
           bare = false
           logallrefupdates = true
           ignorecase = true
   [remote "origin"]
           fetch = +refs/heads/*:refs/remotes/orig    in/*
           url = ssh://git@git.huaxia.com:6521    /cmblife.git
   [branch "master"]
          remote = origin
          merge = refs/heads/master
   [branch "hufeng"]
          remote = origin
          merge = refs/heads/hufeng

```
### 8.将本地代码库的修改传给远程代码库

如果是提交到master分支：

```
$ git push origin master

```
**警告** 远程代码库应该是一个空的bare库，否则会搞乱working copy！！如果working copy是干净的，可以使用git checkout -f来同步代码库。如果已经做了修改，则就没有很好的办法恢复同步状态了！

### 9. 在远程代码库创建一个分支

有时候在本地创建的分支希望分享到远程代码库的分支里，下面命令会在远程创建一个名为branch的分支，并且和本地的branch分支关联起来

```
$ git push origin branch

```
以后，即可使用 git push 来分享代码到远程库。


### 10.在本地关联一个远程库的分支

有时候需要在本地获取一个远程分支，使用这个命令：

```
$ git branch --track origin/branch

```
以后即可使用 git pull 来获取远程的更新


### 11.下载所有远程分支

```
$ get fetch --all

```







