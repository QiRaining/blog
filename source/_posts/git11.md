title: git错误 fatal: remote origin already exists.
date: 2013-09-03 13:37:59
tags: [技术]
categories: git
---

> 当执行 git remote addorigin git@github.com:hufeng825/test.git

错误提示：fatal: remote origin already exists.
<!-- more -->
解决办法

```
$ git remote rm origin

```