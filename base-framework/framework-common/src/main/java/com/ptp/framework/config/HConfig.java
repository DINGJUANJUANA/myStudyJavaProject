package com.ptp.framework.config;

import java.util.Properties;

/**
 * Created by Administrator on 2018-08-15.
 */
public enum  HConfig {
    CONTEXT("context.properties"), // 项目级别
    GLOBAL("global.properties"), // 全局
    RESOURCE("resource.properties")// 资源redis
    ;
    private static final String configPath = "/config/";
    private Properties props;
    private String fileName;
    private HConfig(String fileName) {
        this.props = new Properties();
        this.fileName = fileName;
    }
}
