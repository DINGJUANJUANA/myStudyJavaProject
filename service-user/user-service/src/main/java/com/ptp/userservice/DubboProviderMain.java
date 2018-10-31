package com.ptp.userservice;

import com.alibaba.fastjson.JSON;
import com.ptp.userservice.serviceimpl.UserRegisterServiceImpl;
import com.ptp.user.vo.PUserInfoVo;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by Administrator on 2018-08-09.
 */
public class DubboProviderMain {
   //private static final Logger log = LoggerFactory.getLogger(DubboProvider_user.class);
    public static void main(String[] args) {
        try {

            System.out.println("---------------- begin");

            ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
                    "classpath:spring/spring-context.xml");
            context.start();
            System.out.print("====================start finished!===============================");

/*
            PUserInfoSelfMapper pUserInfoSelfMapper = context.getBean(PUserInfoSelfMapper.class);
            PUserInfo pUserInfo = pUserInfoSelfMapper.selectByuserName("xiaom");

            System.out.println("pUserInfo :" + JSON.toJSONString(pUserInfo));


            UserRegisterServiceImpl userRegisterService = context.getBean(UserRegisterServiceImpl.class);

            PUserInfoVo pUserInfoVo = userRegisterService.testGetUserInfo(1);
            System.out.println("pUserInfoVo :" + JSON.toJSONString(pUserInfoVo));
*/
            System.in.read();
        } catch (Exception e) {
          //  log.error("== DubboProvider context start error:", e);
            e.printStackTrace();
        }
    }

}

//@SpringBootApplication
//@ImportResource(locations={"classpath:spring/**/**.xml"})
//@MapperScan(basePackages="com.ptp.userservice.mapper")
//public class DubboProviderMain {
//    public static void main(String[] args) {
//        SpringApplication.run(DubboProviderMain.class, args);
//    }
//}