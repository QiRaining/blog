title: MQ 笔记之 发送接受实例
date: 2013-08-23 10:27:45
tags: [技术]
categories: MQ
---
> mq 支持多种发送格式  BytesMessage  MapMessage ObjectMessage TextMessage StreamMessage等
<!-- more -->

本文章以 MapMessage 和 ObjectMessage 为例

**注意 发送ObjectMessage时  接受实例必须相同类名**


##发送实例
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;


public class Send {


 public static void main(String[] args) throws Exception {
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory();

        Connection connection = connectionFactory.createConnection();
        connection.start();

        Session session = connection.createSession(Boolean.TRUE, Session.AUTO_ACKNOWLEDGE);
        Destination destination = session.createQueue("hf");

        MessageProducer producer = session.createProducer(destination);
       for(int i=0; i<3; i++) {
//            MapMessage message = session.createMapMessage();
//           message.setLong("count", new Date().getTime());
//            message.setObject("hf",new SendData());
      ObjectMessage message = session.createObjectMessage();
      message.setObject(new SendData());
//           message.setBytes("count", getTestData(1));
            Thread.sleep(1);
            //通过消息生产者发出消息
            producer.send(message);
        }
        session.commit();
        session.close();
        connection.close();
    }
}


##接收实例

```
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

public class Recive {

public static void main(String[] args) throws Exception {
    ConnectionFactory connectionFactory = new ActiveMQConnectionFactory();

    Connection connection = connectionFactory.createConnection();
    connection.start();

    final Session session = connection.createSession(Boolean.TRUE, Session.AUTO_ACKNOWLEDGE);
    Destination destination = session.createQueue("hf");

    MessageConsumer consumer = session.createConsumer(destination);
/*//listener 方式
consumer.setMessageListener(new MessageListener() {

    public void onMessage(Message msg) {
        MapMessage message = (MapMessage) msg;
        //TODO something....
        System.out.println("收到消息：" + new Date(message.getLong("count")));
        session.commit();
    }

});
Thread.sleep(30000);
	*/
	int i=0;
	while(i<100) {
	i++;
	//            MapMessage message = (MapMessage) consumer.receive();
	ObjectMessage message = (ObjectMessage) consumer.receive();

	session.commit();

	//TODO something....
	//             System.out.println("收到消息：" + arrayToString(message.getBytes("count")));

	System.out.println("收到消息：" + ((SendData) message.getObject()).getDateStr());
	}

	session.close();
	connection.close();
}

//    public static final String arrayToString(byte[] bytes)
//    {
//        StringBuffer buff = new StringBuffer();
//        for (int i = 0; i < bytes.length; i++)
//        {
//            buff.append(bytes[i] + " ");
//        }
//        return buff.toString();
//    }
}

```

##传递参数

import java.io.Serializable;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: jason
 * Date: 13-8-22
 * Time: 下午5:21
 * To change this template use File | Settings | File Templates.
 */
public class SendData  implements Serializable {

//    private  static  final  long serialVersionUID = -23235245213533L;

    private  byte[] buffer;

    private String dateStr;

    public SendData() {
        setBuffer(null);
        setDateStr(null);
    }

    public byte[] getBuffer() {
        return buffer;
    }

    public String getDateStr() {
        return dateStr;
    }

    public void setDateStr(String dateStr) {
        this.dateStr = String.valueOf(new Date().getTime());
    }

    public void setBuffer(byte[] buffer) {
        System.out.print("begin \n");
        byte [ ] buffers = new byte[1024*1];
        for (int i=0 ;  i< buffers.length ;i++)
            buffers[i] = Byte.parseByte("2");
        System.out.print("end \n");
        this.buffer = buffers;
    }


}

