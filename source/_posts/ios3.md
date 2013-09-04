title: ios 清理工程中没有用到的图片
date: 2013-08-29 16:43:14
tags: [技术]
categories: 
- ios
- mac
---
>发布前往往需要清理工程中没有用到的图片，这些图片可能是测试图片也可能是以往版本中替换遗留下来的图片

<!-- more -->

##使用方法
1. 将下面代码保存成**.sh 然后chomd 777 使其可执行
2. 将**.sh 拷贝到工程根目录下
3. ./执行**.sh 
4.  再同级目录下会生成一个imge.txt 结果文件

 如下图  

{% img http://ww3.sinaimg.cn/mw690/a43af4ffjw1e83pb1zvo7j215q0pq7bz.jpg 300 500 %}

##源码 

```
#!/bin/sh

echo "删除有风险 下手需谨慎 如需再次确认图片是否被引用到"

echo "Defult.png 和例如[UIImage imageNamed:@‘img.png'] 可能会误报"


read -n1 -p  "【Y】查阅如何确认 【N】直接进行图片检索" 

case $answer in 

"Y"|"y") 

open -a Safari "http://blog.csdn.net/hufeng825/article/details/8533647"

echo -n "按任意键开始程序";

read var

;;

"N"|"n") 

echo "命令执行时终端会输入结果 搜索完毕后 会在当前路径下自动生成imag.txt的结果报告"

;;

*) 

;;

esac




PROJ=`find .  ! -name '*.xib' -o -name '*.[mh]' -o -name '*.storyboard' -o -name '*.mm' -o -name '*.html' `


echo "~~~~~~~~~~~~开始搜索~~~~~~~~~~~~" >>'./image.txt';

for png in `find . -name '*.png'`
do

   name=`basename -s .png $png`
   name=`basename -s @2x $name`
   if ! grep -qhs "$name" "$PROJ"; then
        echo "$png 可能没引用" 
        echo "$png 可能没引用"  >>'./image.txt' ;
   fi
done

for jpg in `find . -name '*.jpg'`
do
   name=`basename -s .jpg $jpg`
   name=`basename -s @2x $name`
   if ! grep -qhs "$name" "$PROJ"; then
        echo "$png 可能没引用" 
        echo "$jpg 可能没引用"  >>'./image.txt';
   fi
done

echo "~~~~~~~~~~~~结束搜索~~~~~~~~~~~~" >>'./image.txt';
<<EOF

```