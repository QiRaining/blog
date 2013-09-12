title: mac 下更新DNS 缓存
date: 2013-09-03 17:14:30
tags: [技术]
categories: [ios ,mac]
---

开始的时候难免遇到修改host的时候，但是host后没有即刻生效，可使用终端命令手动清除DNS缓存：

```
dscacheutil -flushcache
```