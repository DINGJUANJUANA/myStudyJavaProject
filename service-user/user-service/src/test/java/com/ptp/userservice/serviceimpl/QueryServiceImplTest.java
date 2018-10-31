package com.ptp.userservice.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.ptp.framework.result.Result;
import com.ptp.framework.util.R;
import org.apache.ibatis.ognl.IntHashMap;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2018-08-29.
 */
public class QueryServiceImplTest {
    @Test
    public void getUserList() throws Exception {
        Map<String, Object> requestMap=new HashMap();
        requestMap.put("page_start",0);
        requestMap.put("page_size", 10);
        requestMap.put("userName",null);
     ApplicationContext context= new ClassPathXmlApplicationContext("classpath:spring/spring-context.xml");
     QueryServiceImpl queryService=(QueryServiceImpl)context.getBean("queryServiceImpl");
//        Result result= queryService.getUserList(requestMap);
        Result result= queryService.getUserList(requestMap);
       System.out.println(JSON.toJSONString(result));
        System.out.println("abcd");
    }

    @Test
    public void getUserList2() throws Exception {
        ApplicationContext context= new ClassPathXmlApplicationContext("classpath:spring/spring-context.xml");
        QueryServiceImpl queryService=(QueryServiceImpl)context.getBean("queryServiceImpl");
         R result= queryService.getUserList2();
        System.out.println(JSON.toJSONString(result));
        System.out.println("abcd");
    }
}