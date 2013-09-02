title: git 系列教程之 提交信息的后悔药 修改提交信息
date: 2013-09-02 18:06:42
tags: [技术]
categories: git
---
有没有提交过"修改bug" "上传代码" 等等类似脑残的提交信息. code review 时看到这样的提交信息 每个team leader 肯定不会容忍的. 下面要介绍的是如何修改之前提交的历史信息
<!-- more -->

##方法一 可以修改最后一次 commit
	 git commit --amend 
----

##方法二 交互式修改

###步骤一
	git rebase -i master~1 //最
	git rebase -i master~5 //最后五次

###步骤二
 // 显示结果如下，修改 pick 为 edit ，并 :wq 保存退出
	 pick 91b495b 2012-01-08: "提交信息内容"

	# Rebase 9ef2b1f..91b495b onto 9ef2b1f
	#
	# Commands:
	#  pick = use commit
	#  edit = use commit, but stop for amending //改上面的 pick 为 edit
	#  squash = use commit, but meld into previous commit
	#
	# If you remove a line here THAT COMMIT WILL BE LOST.
	# However, if you remove everything, the rebase will be aborted.
	#

###步骤三
 使用

	git rebase --continue //完成操作
