title: hibernate 笔记之 基础概念和配置
date: 2013-08-14 15:56:58
tags: [技术]
categories: hibernate
---
## ORM 概念
> ORM 解决主要的问题是对象-- 关系映射， 域模型是面向对象的，而关系模型数据是面向关系的，一般情况下，一个持久化类和一个表对应，类的每个实例对应表中的一条记录。

<!-- more -->

### 对象的持久化

• 狭义的理解,“持久化”仅仅指把对象永久保存到数据库中

• 广义的理解,“持久化”包括和数据库相关的各种操作:
	
* 保存:把对象永久保存到数据库中。

* 更新:更新数据库中对象(记录)的状态。

* 删除:从数据库中删除一个对象。

* 查询:根据特定的查询条件,把符合查询条件的一个或多个对象从数据 库加载到内存中。

* 加载:根据特定的OID,把一个对象从数据库加载到内 
	>' OID --->为了在系统中能够找到所需对象,需要为每一个对象分配一个唯一的标识号。 在关系数据库中称之为主键,而在对象术语中,则叫做对象标识(Object identifier-OID). '


 标号  | 面向对象概念 | 面向关系概念 
--- | --- | ---
*1* | `对象` | **表的行（即记录）**
2 | 属性 | 表的列（即字段）

## 注意事项

1. 有一个无参的构造器  反射时需要
2.  类不能声明为final  如果声明就不能实现延迟加载了

## hibernate 配置文件

> hibernate.cfg.xml

```
<hibernate-configuration>
	<session-factory>
		<!-- 数据连接相关的配置 -->
		<property name="hibernate.connection.driver_class">com.mysql.jdbc.Driver</property>
		<property name="hibernate.connection.url">jdbc:mysql://localhost:3306/test</property>
		<property name="hibernate.connection.username">root</property>			
		<property name="hibernate.connection.password">1234</property>
			
		<!-- 执行操作时显示SQL语句 -->
		<property name="show_sql">true</property>

		<!-- 格式化输出的SQL语句 -->
		<property name="format_sql">true</property>
		
		<!-- 配置数据库方言 -->
		<property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>	
		<property name="hibernate.hbm2ddl.auto">update</property>
			
		<!-- 配置映射文件 -->			
		<mapping resource="com/vince/entity/User.hbm.xml"/>	
		</session-factory>	
</hibernate-configuration>

```

hbm2ddl.auto:该属性可帮助程序员实现正向工程, 即由 java 代码生成数据库脚本, 进而生成具体的表结构. 。取值 create | update | create-drop | validate

– create : 会根据 .hbm.xml 文件来生成数据表, 但是每次运行都会删 除上一次的表 ,重新生成表, 哪怕二次没有任何改变

– create-drop:会根据.hbm.xml文件生成表,但是SessionFactory一关 闭, 表就自动删除

– update:最常用的属性值,也会根据.hbm.xml文件生成表,但 若 .hbm.xml 文件和数据库中对应的数据表的表结构不同, Hiberante 将更新数据表结构,但不会删除已有的行和列

– validate : 会和数据库中的表进行比较, 若 .hbm.xml 文件中的列在数 据表中不存在,则抛出异常

* format_sql:是否将 SQL 转化为格式良好的 SQL . 取值 true | false

------------------

## hibernate 映射文件

> User.hbm.xml

```
<?xml version="1.0"?>
<!DOCTYPE hibernate-mapping PUBLIC
	"-//Hibernate/Hibernate Mapping DTD 3.0//EN"
	"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd">

<hibernate-mapping package="com.vince.entity">
	<class name="User" table="USER_TABLE" dynamic-update="true" dynamic-insert="true">
		<!-- 配置主键 -->
		<id name="id" column="ID">
			<!-- native表示使用本地数据库生成主键的方式 -->
			<generator class="native"></generator>
		</id>
		<!-- 其它属性的配置 -->
		<property name="name" column="NAME" not-null="true"></property>
		<property name="age" column="AGE"></property>
		<property name="createDate" column="CREATE_DATE"></property>
	</class>

</hibernate-mapping>


-------

<hibernate-mapping package="com.vince.entity">
	<class name="Emp" table="EMP" dynamic-insert="true"
		dynamic-update="true">
		<id name="id" type="int">
			<column name="ID" />
			<generator class="native" />
		</id>
		<property name="name" type="java.lang.String">
			<column name="NAME" />
		</property>
		<property name="salary" type="float">
			<column name="SALARY" />
		</property>
		<property name="age" type="int">
			<column name="AGE" />
		</property>
	</class>
</hibernate-mapping>

```

###主键生成策略

{% img center http://ww2.sinaimg.cn/mw690/a43af4ffjw1e7n5a834npj20x00lajw6.jpg
  hiberate 主键生成策略 %}

 ------


##SessionFactory 接口
• 针对单个数据库映射关系经过编译后的内存镜像,是线程安 全的。

• Configuration 对象根据当前的配置信息生成 SessionFactory 对象。SessionFactory 对象一旦构造完毕,即被赋予特定的 配置信息

* Configuration cfg = new Configuration().configure();

* SessionFactory sf = cfg.buildSessionFactory();

• SessionFactory是生成Session的工厂:

* Session session = sf.openSession();

• 构造 SessionFactory 很消耗资源


## hibernate.hbm2ddl.auto 
1. create-drop   每次启动重新创建 结束后删除
2. create 每次启动都重新创建
3. update 不一样就更新
4. validate 仅仅验证



## 如何使用

### 使用范例


```
package hufeng.test ;

import org.hibernate.Session ;
import org.hibernate.SessionFactory ;
import org.hibernate.cfg.Configuration ;

public class  Test{
	publick static void main(String[] args){
	// 加载hibernate 配置文件 （默认加载classpath 下的hibernate.cfg.xml）
	Configuration cfg = new Configuration().config();
	
	// 通过Configulation 对象创建SessionFactory 工厂
	SessionFactory factory = cfg.buildSessionFactory();
 	
 	//Session操作数据库的一次会话
 	//线程不安全
 	Session session = factory.openSession();


 	//开启事务 --> 把很多操作组合成一个整体 让事物具有原子性
 	Transaction tx =  session.beginTransation();


 	CustomUser user = new CustomUser("jason",20,new Date());

 	//保存数据
 	session.save(user);

 	//提交事物
 	tx.commit();

 	//关闭
 	session.close();
 	factory.close();
 }
}

```

### 创建Hibernate 工具类

```
public final class HibernateUtil{
	private static SessionFactory sessionFactory;
	private HibernateUtil(){}

	static {
		Configuration cfg  = new Configuration().configure();
		sessionFactory = cfg.buildSessionFactory();
	}

	 public static SessionFactory  getSesstionFactory()
	 {
	 	return sessionFactory;
	 }

	 public static Session getSession()
	 {
	 	return sessionFactory.openSession();
	 }

	 public static void save(Object obj)
	 {
	 	Session session = getSession();
	 	Transaction tx = session.benginTransaction();
	 	session.save(obj);
	 	session.evict(obj);//把对象清理出esssion 避免批处理时session中的缓存过多 导致内存溢出
	 	//session.clear()；清楚session中所有的对象
	 	tx.commit();
	 	session.close();
	 }
}

```

### 应用工具类后的代码


```
package hufeng.test ;

import org.hibernate.Session ;
import org.hibernate.SessionFactory ;
import org.hibernate.cfg.Configuration ;
import org.util.HibernateUtil;

public class Test {
	public static void save()
	{
		User user =new User("jack",22,new Date()));
		HibernateUtil.save(user);
	}
}

publick static void main(String[] args)
{
	save();
}

```
### 更加规范应用HQL的代码

```
public final class HibernateUtil {

	private static SessionFactory sessionFactory;

	private HibernateUtil() {
	}

	static {
		Configuration cfg = new Configuration().configure();
		sessionFactory = cfg.buildSessionFactory();
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static Session getSession() {
		return sessionFactory.openSession();
	}

	public static void save(Object obj) {
		Session session = null;
		try {
			session = getSession();
			Transaction tx = session.beginTransaction();
			session.save(obj);
			tx.commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	public static void update(Object obj) {
		Session session = null;
		try {
			session = getSession();
			Transaction tx = session.beginTransaction();
			session.update(obj);
			tx.commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	public static void delete(Object obj) {
		Session session = null;
		try {
			session = getSession();
			Transaction tx = session.beginTransaction();
			session.delete(obj);
			tx.commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
	}
	
	public static Object get(Class clazz,Serializable id) {
		Session session = null;
		try {
			session = getSession();
			return session.get(clazz, id);
		} catch (HibernateException e) {
			e.printStackTrace();
		} finally {
			session.close();
		}
		return null;
	}

}

--------
@Override
	public List<Emp> list() throws Exception {
		Session session  = HibernateUtil.getSession();
		//hql针对对象查询语句
		String hql = "from Emp";//
		//创建查询(hql)
		Query query = session.createQuery(hql);
		List<Emp> list = query.list();
		session.close();
		return list;
	}

	@Override
	public void add(Emp emp) throws Exception {
		HibernateUtil.save(emp);
		
	}

	@Override
	public List<Emp> listByName(String name) throws Exception {
		Session session  = HibernateUtil.getSession();
		String hql = "from Emp e where e.name=?";
		Query query = session.createQuery(hql);
		//sql ？起始位置从1开始
		//hql ？起始位置从0开始
		query.setString(0, name);
		
		List<Emp> list = query.list();
		session.close();
		return list;
	}

	@Override
	public List<Emp> listByAge(int age) throws Exception {
		
		
		return null;
	}

	//使用别名代替?方式，可以不用考虑设置参数的顺序
	@Override
	public List<Emp> listByNameAge(String name, int age) throws Exception {
		Session session = HibernateUtil.getSession();
		String hql = "from Emp e where e.age=:age and e.name=:name";
		Query query = session.createQuery(hql);
//		query.setString(0, name);
//		query.setInteger(1, age);
		query.setString("name", name);
		query.setInteger("age", age);
		
		//对分页的支持
		query.setFirstResult(0);//设置查询的起始位置
		query.setMaxResults(1);//设置每页的记录数
		
		
		List<Emp> emps = query.list();
		
		
		
		//iterate查询会执行 N+1条语句
//		Iterator<Emp> emps = query.iterate();
		
		session.close();
		return emps;
	}

	@Override
	public List<Emp> listLikeName(String name) {
		Session session = HibernateUtil.getSession();
		String hql = "from Emp e where e.name like :name";
		Query query = session.createQuery(hql);
		query.setString("name", "%"+name+"%");
		List<Emp> list = query.list();
		session.close();
		return list;
	}

	@Override
	public Emp getByName(String name) {
		String hql = "from Emp e where e.name=:name";
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery(hql);
		query.setString("name", name);
		//返回唯一的结果
		Emp emp = (Emp)query.uniqueResult();
		session.close();
		return emp;
	}

	//QBC检索方式(了解)
	@Override
	public Emp getById(int id) {
		
		Session session = HibernateUtil.getSession();
		Criteria criteria = session.createCriteria(Emp.class);
		//添加查询条件
		criteria.add(Restrictions.eq("id", id));
		Emp emp = (Emp)criteria.uniqueResult();
		session.close();
		return emp;
	}

	@Override
	public long countEmp() {
		String hql = "select count(id) as id from Emp";
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery(hql);
		long count = (long)query.uniqueResult();
		session.close();
		return count;
	}
	public void countEmp2() {
		String hql = "select count(id),avg(age) as id from Emp";
		Session session = HibernateUtil.getSession();
		Query query = session.createQuery(hql);
		List list = query.list();
		Object[] objs = (Object[])list.get(0);
		int count = (int)objs[0];
		int avg = (int)objs[1];
		session.close();
	}


```
