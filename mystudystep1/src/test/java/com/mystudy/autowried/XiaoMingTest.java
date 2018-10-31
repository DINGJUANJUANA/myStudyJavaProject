package com.mystudy.autowried;

import com.mystudy.bean.CarConfig;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2018-08-29.
 */
public class XiaoMingTest {
    @Test
    public void askAction() throws Exception {
         ApplicationContext context=new ClassPathXmlApplicationContext("classpath:bean/applicationContext.xml");
         //XiaoMing xiaoMing=new XiaoMing();
        XiaoMing xiaoMing=(XiaoMing)context.getBean("xiaoMing");
         xiaoMing.testAction();
         xiaoMing.goDance();
    }

}