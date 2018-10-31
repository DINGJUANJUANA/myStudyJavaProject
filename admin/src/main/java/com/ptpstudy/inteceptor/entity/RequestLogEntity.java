package com.ptpstudy.inteceptor.entity;

import com.alibaba.fastjson.JSON;

import java.util.Date;

/**
 * Created by Administrator on 2018-08-31.
 */
public class RequestLogEntity {

    private Long id;

    private String operateUrl;

    private Object operateData;

    private String operateBusiness;

    private String operateDesc;

    private String operateIp;

    private String operateUser;

    private Date operateTime;

    private String operateDataStr;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOperateUrl() {
        return operateUrl;
    }

    public void setOperateUrl(String operateUrl) {
        this.operateUrl = operateUrl;
    }

    public String getOperateBusiness() {
        return operateBusiness;
    }

    public void setOperateBusiness(String operateBusiness) {
        this.operateBusiness = operateBusiness;
    }

    public String getOperateDesc() {
        return operateDesc;
    }

    public void setOperateDesc(String operateDesc) {
        this.operateDesc = operateDesc;
    }

    public String getOperateIp() {
        return operateIp;
    }

    public void setOperateIp(String operateIp) {
        this.operateIp = operateIp;
    }

    public String getOperateUser() {
        return operateUser;
    }

    public void setOperateUser(String operateUser) {
        this.operateUser = operateUser;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(this);
    }

    public Object getOperateData() {
        return this.operateData;
    }

    public void setOperateData(Object operateData) {
        this.operateData = operateData;
    }

    public String getOperateDataStr() {
        if (this.getOperateData()!=null) {
            return JSON.toJSONString(this.operateData);
        }
        return null;
    }

    public void setOperateDataStr(String operateDataStr) {
        this.operateDataStr = operateDataStr;
    }


}
