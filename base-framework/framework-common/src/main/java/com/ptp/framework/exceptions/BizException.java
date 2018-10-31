package com.ptp.framework.exceptions;

import com.alibaba.fastjson.JSON;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-15.
 */
public class BizException extends RuntimeException {
    private static final long serialVersionUID = -5875371379845226068L;



    /**
     * 异常信息
     */
    protected String msg;

    /**
     * 具体异常码
     */
    protected String code;

    public BizException(String code, String msgFormat, Object... args) {
        super(String.format(msgFormat, args));
        this.code = code;
        this.msg = String.format(msgFormat, args);
    }


    public BizException() {
        super();
    }

    public String getMsg() {
        return msg;
    }

    public String getCode() {
        return code;
    }

    /**
     * 实例化异常
     *
     * @param msgFormat
     * @param args
     * @return
     */
    public  BizException newInstance(String msgFormat, Object... args) {
        return new BizException(this.code, msgFormat, args);
    }

    public BizException(String message, Throwable cause) {
        super(message, cause);
    }

    public BizException(Throwable cause) {
        super(cause);
    }

    public BizException(String message) {
        super(message);
    }


    @Override
    public String getMessage() {
        Map<String,Object> map = new HashMap<String,Object>();
        map.put("code", code);
        map.put("msg", msg);
        return JSON.toJSONString(map);
    }



}
