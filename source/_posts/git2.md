title: git 系类教程之 log显示
date: 2013-09-02 17:59:59
tags: [技术]
categories: git
---
查看log是程序员常用的操作之一,不要以为一个git log了事,下面介绍下git log 的高级操作.
<!-- more -->
1. 显示所有提交记录的包括提交时间 提交人员联系方式等等: git log
2. 显示所有提交记录 只显示提交信息: git shortlog
3. 显⽰示版本历史,以及版本间的内容差异:git log -p
4. 只显⽰示最近⼀一次提交:git log -1
5. 显⽰示最近的20个提交:以及版本间的内容差异:git log -20 -p
6. 显⽰示最近6⼩小时的提交:git log --since="6 hours"
7. 显⽰示两天之前的提交:git log --before="2 days" 