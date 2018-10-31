package com.mystudy.transation;

import com.mystudy.autowried.TextEditor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2018-08-30.
 */
public class MainApp {

    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        AccountService    accountService=(AccountService)context.getBean("accountService");
        System.out.println("getbBean");
        accountService.transfer("aaa","bbb",200d);
    }
}
