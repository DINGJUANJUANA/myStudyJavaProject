package com.mystudy.bean;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2018-08-22.
 */
public class CarTest {

    @Test
    public  void  carTest(){
        ApplicationContext context=new AnnotationConfigApplicationContext(CarConfig.class);
        //根据ID从容器容获取bean
        Car car=(Car)context.getBean("annotest");
        car.driver();

        Man man=(Man)context.getBean("manwork");
        man.work();

        Man man2=(Man)context.getBean("manwork");
        man2.work();
    }

    @Test
    public void carTest2(){
        //classpath:spring/spring-context.xml
        ApplicationContext context=new ClassPathXmlApplicationContext("classpath:bean/applicationContext.xml");
        //XML的方式如果没有明确给定ID，默认bean的ID会根据类的全限定名来命名，以#加计数序号的方式命名。
        //Car car=(Car)context.getBean("com.mystudy.bean.BenzCar#0");
        Car car=(Car)context.getBean("benzCar");
        car.driver();
    }

    @Test
    public  void carTest3(){
        ApplicationContext context=new ClassPathXmlApplicationContext("classpath:applicationContext2.xml");
        Man man=(Man)context.getBean("man");
        man.work();
    }
}
