package com.ptp.userservice.serviceimpl;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2018-08-24.
 */
public class CouponRlueServiceImpl2Test {
    @Test
    public void redisSetGet() throws Exception {
//      //  ApplicationContext ac =  new ClassPathXmlApplicationContext("classpath:spring/spring-context-redis.xml");
//       ApplicationContext ac =  new ClassPathXmlApplicationContext("classpath:spring/spring-context.xml");
//        CouponRlueServiceImpl impl = (CouponRlueServiceImpl)ac.getBean("couponRlueServiceImpl");
//        String resultValue= impl.saveUser();
//        System.out.println(resultValue);
        ApplicationContext ac =  new ClassPathXmlApplicationContext("classpath:spring/spring-context.xml");
        CouponRlueServiceImpl impl = (CouponRlueServiceImpl)ac.getBean("couponRlueServiceImpl");
        String resultValue=impl.redisSetGet();
        System.out.println(resultValue);
    }


}