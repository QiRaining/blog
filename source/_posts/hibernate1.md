title: hibernate 笔记之 session
date: 2013-08-14 10:36:16
tags: [技术]
categories: hibernate
---
## session 的概述
<!-- more -->

1. session 接口是hibernate 向应用程序提供操作数据库最主要的接口，他提供了基本的保存，更新，删除和加载java对象的方法

2. session 具有一个缓存对象，位于缓存中的对象成为持久化对象，它和数据库中的相关记录对应，session能够在某些时间点，按照缓存中的对象变化来执行相关的sql语句。来同步更新数据库，这一过程被称为清理缓存

3. 站在持久化的角度，hibernate 把对象分成四种状态：持久化状态，临界状态，游流状态 删除状态 session的特定方法能使对象从一个状态转换成另一个状态

---
## Session 接口
Session 是应用程序与数据库之间交互操作的一个单线程对象,是 Hibernate 运作的中心,所有持久化对象必须在 session 的管理下才可以进 行持久化操作。此对象的生命周期很短。Session 对象有一个一级缓存,显 式执行 flush 之前,所有的持久层操作的数据都缓存在 session 对象处。相 当于 JDBC 中的 Connection。

• 持久化类与 Session 关联起来后就具有了持久化的能力。

• Session 类的方法:

* 取得持久化对象的方法: get() load()

* 持久化对象都得保存,更新和删除: save(),update(),saveOrUpdate(),delete()

* 开启事务: beginTransaction().

* 管理 Session 的方法:isOpen(),flush(), clear(), evict(), close()等



```
import java.util.Date;
import java.util.UUID;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.vince.entity.User;
import com.vince.util.HibernateUtil;


public class Test {
	
	
	public static void evict(){
		
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		User user = new User("test-7",17,new Date());
		session.save(user);
		
		session.evict(user);//把对象从session中清除,在批量处理时，避免session中缓存的对象太多，会导致内存溢出
//		session.clear();//清除session中所有的缓存对象
		User user2 = (User)session.load(User.class, user.getId());
		System.out.println(user2);
		
		tx.commit();
		session.close();
	}
	
	
	
	/**
	 * merge方法：合并,保存或更新
	 * 
	 * 
	 */
	public static void merge(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		//情况一：临时对象(新创建的对象)
		//1)user1 的状态是瞬时对象时，创建一个新的对象user2,把user1对象的属性拷贝到新建的user2对象中,持久化这个user2对象,执行insert语句
//		User user1 = new User();
//		user1.setAge(22);
//		user1.setName("test--3");
//		user1.setCreateDate(new Date());
//		
//		
//		User user2 = (User)session.merge(user1);
//		
//		System.out.println(user1==user2);
		
		//情况二：user1 的状态是游离对象时，Session缓存中是否存在ID为与user1相同的持久化对象
		//(1)如果有
//		User user2 = (User)session.load(User.class, 1);
//		User user1 = new User();
//		user1.setAge(20);
//		user1.setCreateDate(new Date());
//		user1.setId(1);
//		user1.setName("test---4");
//		session.merge(user1);
		
		
		
		//情况三：如果session中不存在该对象，那么去数据库中查询是否存在该ID的记录，
		//如果存在，那么就加载这条记录到session中(user2)，比较两个对象属性是否一致，
		//如果不一致，就把user1的属性拷贝到user2中，执行update语句
		//如果一致，就不执行任何操作
//		User user1 = new User();
//		user1.setAge(22);
////		user1.setCreateDate(new Date());
//		user1.setId(5);
//		user1.setName("aaa");
//		session.merge(user1);
		
		//情况四：如果session中不存在该对象，那么去数据库中查询是否存在该ID的记录，
		//如果不存在，创建一个新的对象user2,把user1对象的属性拷贝到新建的user2对象中,
		//持久化这个user2对象,执行insert语句
		User user1 = new User();
		user1.setAge(22);
		user1.setCreateDate(new Date());
		user1.setId(6);
		user1.setName("bbb");
		User user2 = (User)session.merge(user1);
		
		
		tx.commit();
		session.close();
		
	}
	
	/**
	 * saveOrUpdate 方法：执行保存或更新
	 * 1、如果实体对象是临时状态（没有ID），那么该方法将执行保存操作
	 * 2、如果实体对象是游离状态（有ID），那么该方法以将执行更新操作
	 * 	如果数据库不存在该ID，那么更新将抛出异常
	 * 3、判断ID是否为空（整型ID 0 空），根据映射文件中的unsaved-value
	 * 	属性值来判断
	 */
	public static void saveOrUpdate(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
		User user = new User();
		user.setAge(21);
		user.setName("test--1");
		user.setCreateDate(new Date());
		user.setId(3);
		
		session.saveOrUpdate(user);
		
		tx.commit();
		session.close();
	}
	
	
	public static void delete(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
//		User user = new User();
//		user.setId(6);
//		user.setName("xxx");
		
		User user = (User)session.load(User.class, 3);
		
		session.delete(user);
		
		System.out.println(user.getId());
		
		tx.commit();
		session.close();
	}
	
	/**
	 * 更新对象:通过update方法
	 * 1、如果数据库中不存在ID的记录，抛出异常
	 * 2、默认生成的SQL语句会根据ID为条件更新所有字段，
	 * 如果只更新发生变化的字段，那么在映射文件的class配置中添加 dynamic-update=true
	 * 
	 */
	public static void update2(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		
//		User user = new User("Tom-1",23,new Date());
		User user = (User)session.get(User.class, 1);
		
		user.setName("888");
		session.update(user);
		
		tx.commit();
		session.close();
	}
	/**
	 * 更新对象
	 * 通过session 的脏数据机制
	 */
	public static void update1(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		User user = (User)session.load(User.class, 1);
		user.setName("xxx");
		tx.commit();
		session.close();
	}
	
	/**
	 * load方法：
	 * 1、如果数据库不存在记录，那么将抛出异常
	 * 2、load方法先执行延迟加载，返回代理对象，在真正使用到该对象时才会
	 * 从数据库中查询
	 * 3、初始化代理对象的方法：
	 * （1）调用代理对象的非主键属性
	 * （2）Hibernate.initialize()方法初始化代理对象
	 */
	public static User load(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		User user = (User)session.load(User.class, 5);
		
//		System.out.println(user.getName());
		Hibernate.initialize(user);//初始化代理对象
		tx.commit();
		session.close();
		
		return user;
	}
	
	/**
	 * get方法：
	 * 1、立即从数据库中查询数据
	 * 2、如果数据库不存在记录，那么将返回null
	 */
	public static void get(){
		Session session = HibernateUtil.getSession();
		Transaction tx = session.beginTransaction();
		Class c = User.class;
		User user = (User)session.get(c, 1);
		if(user!=null){
		//修改时间
		user.setCreateDate(new Date());
		}
		System.out.println(user);
		
//		session.flush();//刷新缓冲
		tx.commit();
		session.close();
	}
	
	/**
	 * save()方法以会立即为持久化对象设置主键，所有在任何时候会执行insert语句
	 * persist()，如果在事务内部那么与save()一样，如果在事务外部，不会立即执行
	 * insert语句
	 */
	public static void save(){
//		User user = new User("jack",22,new Date());
		User user = new User();
		user.setName("jack");
		Session session = HibernateUtil.getSession();
//		Transaction tx = session.beginTransaction();
		session.save(user);
//		session.persist(user);
		
//		tx.commit();
		
		session.close();
		
	}

	public static void main(String[] args) {
//		save();
//		get();
//		User user = load();
//		System.out.println(user);
		
//		update1();
//		update2();
		
//		delete();
//		saveOrUpdate();
//		merge();
//		evict();
		
//		System.out.println(UUID.randomUUID().toString());
	}

}


```