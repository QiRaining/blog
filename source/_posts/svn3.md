title: svn错误：SVN remains in conflict?
date: 2013-09-03 13:49:56
tags: [技术]
categories: 
- svn
---

解决如下:

```
svn remove --force yourfilename
svn resolve --accept=working  yourfilename
svn commit -m ""

```