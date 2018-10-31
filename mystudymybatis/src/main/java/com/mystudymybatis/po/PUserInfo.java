package com.mystudymybatis.po;

import java.io.Serializable;
import java.util.List;

public class PUserInfo implements Serializable {
    private Integer id;
    private String userCode;
    private String userName;

    private Integer userAge;

    private List<POrder> pOrderlist;

    private String userPwd;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public String getuserCode() {
        return userCode;
    }

    public void setuserCode(String userCode) {
        this.userCode = userCode == null ? null : userCode.trim();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public Integer getUserAge() {
        return userAge;
    }

    public void setUserAge(Integer userAge) {
        this.userAge = userAge;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd == null ? null : userPwd.trim();
    }

    public List<POrder>getpOrderlist(){
       return pOrderlist;
    }
    public void setpOrderlist(List<POrder> pOrderlist){this.pOrderlist=pOrderlist;}
}