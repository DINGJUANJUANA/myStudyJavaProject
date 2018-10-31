package com.mystudy.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by Administrator on 2018-08-22.
 * @Configuration 表明该类是Spring的一个配置类，该类中会包含应用上下文创建bean的具体细节
 * @Bean 告诉Spring该方法会返回一个要注册成为应用上下文中的bean的对象
 */

@Configuration
public class CarConfig {

    @Bean(name = "annotest")
    public  Car laoSiJi(){
        System.out.println("方法调用");
        return  new QQCar();
    }

    @Bean(name = "manwork")
    public Man work(){
        System.out.println("work调用");
        return new Man(laoSiJi());
    }

    @Bean(name = "manwork2")
    public Man work2(){
        return new Man(laoSiJi());
    }

}
