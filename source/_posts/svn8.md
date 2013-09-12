title: svn错误local add incoming add upon merge
date: 2013-09-03 14:06:15
tags: [技术]
categories: 
- svn
---

在svn命令行merge之后文件经常会出现local add, incoming add upon merge问题，导致无法提交，可以通过以下命令解决冲突 
Summarizing to resolve the tree conflict committing your working dir with svn client 1.6.x you can use: 
<!-- more -->
```
svn resolve --accept working -R . 

```
where . is the directory in conflict.
