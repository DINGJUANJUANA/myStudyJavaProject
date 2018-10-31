package com.ptp.user.service;

import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.Result;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-29.
 */
public interface QueryService {
    Result getUserList(Map<String, Object> params) throws ZhongyingiException;
}
