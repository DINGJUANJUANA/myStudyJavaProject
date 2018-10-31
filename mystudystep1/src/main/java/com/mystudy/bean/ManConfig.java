package com.mystudy.bean;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;

/**
 * Created by Administrator on 2018-08-22.
 */
@Configuration
@Import(CarConfig.class)//通过@Import注解引入产生Car实例的配置类
//@ImportResource("classpath:resource/applicationContext.xml")
public class ManConfig {
    @Bean
    public Man work(Car car) {
        return new Man(car);
    }
}
