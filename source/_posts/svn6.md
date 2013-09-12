title: svn 回退版本
date: 2013-09-03 14:02:35
tags: [技术]
categories: 
- svn
---
```
svn merge -r rHEAD:4367 http://svnserver/svn/pingan/client/iPhone2/trunk/

```
本地回退

```
svn ci -m "提交"

```