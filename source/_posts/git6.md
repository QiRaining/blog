title: git系类教程之 获取指定分支指定文件的更新
date: 2013-09-03 10:03:50
tags: [技术]
categories: git
---
多分支并行时，主干A 想要获取某分支上的某个文件的更新，但是并不像merge 这个分支，如图

{%img center http://ww4.sinaimg.cn/mw690/a43af4ffjw1e89338drs8j20ib0g4abh.jpg 150 200 %}
<!-- more -->

```
git checkout 指定分支 指定文件

git checkout breanchA HFFrame/Global/Global_macro.h
```