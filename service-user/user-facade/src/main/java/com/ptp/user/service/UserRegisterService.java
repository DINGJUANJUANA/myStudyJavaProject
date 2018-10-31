package com.ptp.user.service;

import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.Result;
import com.ptp.user.vo.PUserInfoVo;

import java.util.Map;

/**
 * Created by Administrator on 2018-08-13.
 */
public interface UserRegisterService {
    String sayHello(String name);
    public Result register(Map<String, String> params) throws ZhongyingiException;
    public Result login(Map<String,String> parms)throws  ZhongyingiException;

    public PUserInfoVo testGetUserInfo(Integer id);
}
