package com.ptp.user.vo;

import java.io.Serializable;

/**
 * Created by Administrator on 2018-08-16.
 */
public class PUserInfoVo implements Serializable {

    private Integer id;

    private String userName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

}
