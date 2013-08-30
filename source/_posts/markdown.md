title: Markdown 
date: 2013-08-14 16:13:21
tags: [技术]
categories: hexo
---
本文简单介绍下 Markdown 语法
<!-- more -->

###什么是Markdown

Markdown是一个将文本转化为HTML的工具。简单来说，Markdown是一个兼顾可读性与易用性的轻量级标记体系。Markdown并不追求大而全，它只关心HTML里最常用的几个标记，对于一些不常用的标记它允许直接将HTML标记插入文本。

****

##表格

标号  | 面向对象概念 | 面向关系概念 
--- | --- | ---
*1* | `对象` | **表的行（即记录）**
2 | 属性 | 表的列（即字段）

代码如下

```
标号  | 面向对象概念 | 面向关系概念 
--- | --- | ---
*1* | `对象` | **表的行（即记录）**
2 | 属性 | 表的列（即字段）

```

****

##标题

Markdown提供了两种方式（Setext和Atx）来显示标题。

代码如下

```
Setext方式
标题1
=================

标题2
-----------------

Atx方式
# 标题1
## 标题2
###### 标题6

```
****

##换行

在文字的末尾使用两个或两个以上的空格来表示换行。

代码如下

```
> 这是一个引用，
> 这里木有换行，   
> 在这里换行了。
> > 内部嵌套

```
****

##列表

###无序列表使用*、+或-后面加上空格来表示。

代码如下 

```
* Item 1
* Item 2
* Item 3

+ Item 1
+ Item 2
+ Item 3

- Item 1
- Item 2
- Item 3

```


###有序列表使用数字加英文句号加空格表示。


代码如下 

```
1. Item 1
2. Item 2
3. Item 3


```

****

##代码区域

行内代码使用反斜杠`表示。 
代码段落则是在每行文字前加4个空格或者1个缩进符表示。

****


##强调

Markdown使用\*或\_表示强调。


代码如下 

```

单星号 = *斜体*
单下划线 = _斜体_
双星号 = **加粗**
双下划线 = __加粗__

```

链接

Markdown支持两种风格的链接：Inline和Reference。

语法：

Inline：以中括号标记显示的链接文本，后面紧跟用小括号包围的链接。如果链接有title属性，则在链接中使用空格加“title属性”。
Reference：一般应用于多个不同位置使用相同链接。通常分为两个部分，调用部分为[链接文本][ref]；定义部分可以出现在文本中的其他位置，格式为[ref]: http://some/link/address (可选的标题)。 
注：ref中不区分大小写。

代码如下 

```

这是一个Inline[示例](http://www.baidu.com "可选的title")。
这是一个Reference[示例][ref]。
[ref]: http://www.baidu.com 

```

****

## 图片

图片的使用方法基本上和链接类似，只是在中括号前加叹号。 
注：Markdown不能设置图片大小，如果必须设置则应使用HTML标记<img>。

代码如下 

```
{% img right http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg 300 400 可选的title %}
Inline示例：![替代文本](http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg "可选的title")
Reference示例：![替代文本][pic]
[pic]: http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg "可选的title"
HTML示例：<img src="http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg" alt="替代文本" title="标题文本" width="200" />

```
效果

{% img right http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg 300 400 可选的title %}
Inline示例：![替代文本](http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg "可选的title")
Reference示例：![替代文本][http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg]
[pic]: /assets/images/ship.jpg "可选的title"
HTML示例：<img src="http://ww4.sinaimg.cn/large/a43af4ffjw1e3nomotys9j.jpg" alt="替代文本" title="标题文本" width="200" />

****


## 自动链接

使用尖括号，可以为输入的URL或者邮箱自动创建链接。如test@test.com。

## 分隔线

在一行中使用三个或三个以上的*、-或_可以添加分隔线，其中可以有空白，但是不能有其他字符。

## 转义字符

Markdown中的转义字符为\，可以转义的有：
```
\\ 反斜杠
\` 反引号
\* 星号
\_ 下划线
\{\} 大括号
\[\] 中括号
\(\) 小括号
\# 井号
\+ 加号
\- 减号
\. 英文句号
\! 感叹号

```



