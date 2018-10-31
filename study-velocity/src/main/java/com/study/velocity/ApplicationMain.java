package com.study.velocity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

/**
 * Created by chenglong.zhou on 2018/9/12.
 */
@SpringBootApplication
/** 加载自定义的xml文件 **/
@ImportResource({"classpath:spring/spring-*.xml"})
public class ApplicationMain {

    public static void main(String[] args) {
        SpringApplication.run(ApplicationMain.class, args);
    }
}
