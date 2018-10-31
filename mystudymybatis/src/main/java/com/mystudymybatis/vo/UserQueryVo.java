package com.mystudymybatis.vo;

import com.mystudymybatis.po.PUserInfo;

import java.util.List;

/**
 * Created by Administrator on 2018-09-13.
 */
public class UserQueryVo {
    private PUserInfo user;
    //批量ID
    private List<Integer> idList;

    public PUserInfo getUser() {
        return user;
    }

    public void setUser(PUserInfo user) {
        this.user = user;
    }

    public List<Integer> getIdList() {
        return idList;
    }

    public void setIdList(List<Integer> idList) {
        this.idList = idList;
    }
}
