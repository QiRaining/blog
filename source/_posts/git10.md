title: git系类教程之 找出最懒的程序员
date: 2013-09-03 11:19:34
tags: [技术]
categories: git
---

>场景假设:⼀一个开发⼩小组有10个程序员,他们⽤用 Git 做版本控制,某⼀一天程序员A push了当天的⼏几个 commit之后,突然在想“我在这个项⺫⽬目到底⼀一共进⾏行过多少次commit?谁⽐比我commit更多?多多少?谁是 组⾥里⾯面进⾏行最多commit的?谁是最少的?”
<!-- more -->

Git ⾮非常⼈人性化地⽀支持这样⼀一个命令:$ git shortlog
这个命令会返回这个 git repository 底下每个⽤用户进⾏行 commit 的次数,以及每次 commit 的注释。 -s 参数省略每次 commit 的注释,仅仅返回⼀一个简单的统计。
-n 参数按照 commit 数量从多到少的顺利对⽤用户进⾏行排序

```
$ git shortlog -s -n
  135  Tom Preston-Werner
  6  remi
  3  Mikael Lind
  3  Toby DiPasquale
  2  Aristotle Pagaltzis
  2  Basil Shkara
  1  Marc Chung
  1  Nick Gerakines

 ```