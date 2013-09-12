title: svn  临时 切换用户 命令
date: 2013-09-03 13:56:11
tags: [技术]
categories: 
- svn
---
作为team leader  有时候需要帮别人解决技术问题，尝尝再别人的电脑上改了某些代码，提交的时候遇到了问题，就是怎样临时用自己的账户提交，提交完后 用不影响同事的电脑原有的svn账号
<!-- more -->

下面的可以解决这个问题

在所有命令下强制加上--username 和--password选项。 

例如：

l```
svn ci --username hufeng --password ####

```
