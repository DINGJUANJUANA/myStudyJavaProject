package com.mystudymybatis.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.mystudymybatis.mapper.PUserInfoMapper;
import com.mystudymybatis.mapper.UserMapper;
import com.mystudymybatis.po.OrderExt;
import com.mystudymybatis.po.PUserInfo;
import com.mystudymybatis.vo.UserQueryVo;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018-09-07.
 */
public class MybatisDemo {
//    @Autowired
//    private PUserInfoMapper pUserInfoMapper;
    @Test
    public void getUser(){
        System.out.println("---------------- begin");

        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
      //  context.start();
        PUserInfoMapper pUserInfoMapper = context.getBean(PUserInfoMapper.class);
        PUserInfo userInfo= pUserInfoMapper.selectByPrimaryKey(1);
        System.out.println(JSON.toJSONString(userInfo));

        UserMapper userMapper=context.getBean(UserMapper.class);
        PUserInfo userInfo1=userMapper.findUserById(2);
        System.out.println(JSON.toJSONString(userInfo1));
    }

    @Test
    public void  findUserAndOrderRstMap(){
        System.out.println("---------------- begin");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        List<PUserInfo> listuser=userMapper.findUserAndOrderRstMap();
        for (PUserInfo userInfo:listuser)
                 System.out.println(JSON.toJSONString(userInfo));
    }

    @Test
    public void findUserByName(){
        System.out.println("---------------- begin");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        PUserInfo userInfo1=userMapper.findUserByName("djj");
        System.out.println(JSON.toJSONString(userInfo1));
    }

    @Test
    public void insertUser() {
        System.out.println("---------------- begin");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        PUserInfo pUserInfo=new PUserInfo();
        pUserInfo.setUserName("张三");
        pUserInfo.setUserAge(18);
        pUserInfo.setuserCode("zhangsan");
        pUserInfo.setUserPwd("111111");
        userMapper.insertUser(pUserInfo);
        Integer userId=pUserInfo.getId();
        System.out.println(Integer.toString(userId));
    }

    //延迟加载
    @Test
    public void tetsLazyLoading()throws Exception{
        System.out.println("---------------- begin");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        List<OrderExt> orderExts= userMapper.findOrdersAndUserRstMap();
        for (OrderExt orderExt:orderExts){
            System.out.println(orderExt);
            System.out.println(orderExt.getUserInfo().getId());
        }
    }

    @Test
    public void  testFindUserList()throws Exception{
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        PUserInfo user=new PUserInfo();
        user.setUserName("djj");
        List<Integer> idList=new ArrayList<>();
        idList.add(1);
        idList.add(2);
        UserQueryVo vo=new UserQueryVo();
        vo.setUser(user);
        List<PUserInfo> pUserInfos= userMapper.findUserList(vo);
        Integer userCount=userMapper.findUserCount(vo);
        System.out.println("查询结果："+String.valueOf(userCount));
    }

    @Test
    public void testOneLevelCache()throws Exception{
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                "classpath:spring/spring-context.xml");
        UserMapper userMapper=context.getBean(UserMapper.class);
        PUserInfo userInfo=userMapper.findUserById(1);
        System.out.println("第一次查询结果："+JSON.toJSONString(userInfo));

        PUserInfo userInfo2=userMapper.findUserById(1);
        System.out.println("第二次查询结果："+JSON.toJSONString(userInfo2));
    }

    @Test
    public void testPageHelper()throws Exception{
        try {
            ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                    "classpath:spring/spring-context.xml");
            UserMapper userMapper = context.getBean(UserMapper.class);
            PUserInfo user = new PUserInfo();
            UserQueryVo vo = new UserQueryVo();
            vo.setUser(user);
            //分页参数,第一个参数是当前页码(pageNo),第二个参数是每页显示多少条(pageSize)
            PageHelper.startPage(2, 2);
            List<PUserInfo> userInfos = userMapper.findUserList(vo);
            System.out.println("分页查询结果内容："+JSON.toJSONString(userInfos));
            PageInfo<PUserInfo> thePage = new PageInfo<PUserInfo>(userInfos);
            System.out.println("下一页:" + thePage.getNextPage() + ",上一页:" + thePage.getPrePage()
                    + ",总条数:" + thePage.getTotal() + ",总页码:" + thePage.getPages());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
