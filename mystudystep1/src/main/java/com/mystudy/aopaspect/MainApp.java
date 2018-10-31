package com.mystudy.aopaspect;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2018-08-29.
 */
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context =
                new ClassPathXmlApplicationContext("classpath:bean/AopBean.xml");
        Student student = (Student) context.getBean("student");
        student.getName();
        student.getAge();
      //  student.printThrowException();
    }
}
