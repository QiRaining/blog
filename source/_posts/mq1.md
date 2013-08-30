title: MQ 笔记之 mac 下安装环境
date: 2013-08-20 17:47:34
tags: [技术]
categories: MQ
---
##下载
[从下载地址中下载包](http://www.apache.org/dyn/closer.cgi?path=/activemq/apache-activemq/5.8.0/apache-activemq-5.8.0-bin.tar.gz)
解压包然后把包放到一个自己不会手一抖就删掉的位置，此处我放到了本地的document下
如下图
<!-- more -->
{% img left http://ww2.sinaimg.cn/mw690/a43af4ffjw1e7uav8h7lbj20o80gkjtw.jpg 200 300 图片%}
## 添加环境到path 
把/你的保存路径/apache-activemq-5.8.0/bin/activemq 添加到 PATH 中 

0. cd 
1. 执行 vi .profile 
2. 输入 i 
3. 插入 export MQ=/你的路径/apache-activemq-5.8.0/bin/macosx/activemq
4. wq
5. source .profile

## 启动mq
$Mq start
输入账号 admin 密码  admin

**注意** 如果用代理上网 请把网络环境设置下 如下图
{% img http://ww1.sinaimg.cn/mw690/a43af4ffjw1e7ubcv9nx0j20oa08egmc.jpg 200 300 网络配置 %}

##查看启动效果
{% img http://ww1.sinaimg.cn/mw690/a43af4ffjw1e7ubfs7cg1j21ga0oe0yw.jpg 200 300 启动效果 %}

## 基本配置
conf/jetty.xml
```
<bean id="securityConstraint">
 
        <property name="name" value="BASIC" />
 
        <property name="roles" value="admin" />
 
        <property name="authenticate" value="false" />
 
</bean>

```
此处可以配置登陆用户权限


```
 <property name="connectors">
            <list>
                <bean id="Connector" class="org.eclipse.jetty.server.nio.SelectChannelConnector">
                    <property name="port" value="8161" />
                </bean>
            </list>
 </property>

```
此处用来修改端口号





