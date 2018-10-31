package com.mystudymybatis.po;

/**
 * Created by Administrator on 2018-09-07.
 */
public class OrderExt extends POrder {
    private PUserInfo userInfo;

    public PUserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(PUserInfo userInfo) {
        this.userInfo = userInfo;
    }
}
