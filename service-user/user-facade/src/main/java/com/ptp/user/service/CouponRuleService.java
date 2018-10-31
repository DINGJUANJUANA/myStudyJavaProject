package com.ptp.user.service;

import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.Result;

import java.util.Map;

/**
 * Created by Administrator on 2018-08-23.
 */
public interface CouponRuleService {

    public Result addRule(Map<String, String> params) throws ZhongyingiException;
    public Result delRule(Integer ruleId) throws ZhongyingiException;
    public Result editRule(Map<String,String> params) throws  ZhongyingiException;

}
