package com.ptpweb.api.vo;

import com.wordnik.swagger.annotations.ApiModel;
import com.wordnik.swagger.annotations.ApiModelProperty;

import java.io.Serializable;

/**
 * Created by Administrator on 2018-08-17.
 */
@ApiModel(value = "user对象", description = "用户注册入参对象")
public class UserRegisterParams implements Serializable {

    @ApiModelProperty(value = "phoneNum", notes = "用户手机号", dataType = "String", required = true)
    private String phoneNum;
    @ApiModelProperty(value = "pwd", notes = "密码", dataType = "String", required = true)
    private String pwd;
    @ApiModelProperty(value = "client", notes = "客户端(1:PC,2:微信,3:苹果,4:安卓)", dataType = "String", required = true)
    private String platform;

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}
