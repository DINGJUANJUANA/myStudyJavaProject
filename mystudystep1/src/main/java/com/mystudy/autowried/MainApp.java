package com.mystudy.autowried;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2018-08-29.
 */
public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:bean/applicationContext.xml");
        System.out.println("Begin getBean");
        TextEditor te = (TextEditor) context.getBean("textEditor");
        System.out.println("finish getBean");
        te.spellCheck();
    }
}
