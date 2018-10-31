package com.ptp.framework.result;

import com.ptp.framework.result.Result;

/**
 * Created by Administrator on 2018-08-15.
 */
public class ResultSupport<T> implements Result<T> {

    /**
     *
     */
    private static final long serialVersionUID = -1802692098484483921L;

    private String code;

    private String msg;

    private T model;


    public ResultSupport() {
    }


    public ResultSupport(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public ResultSupport(String code, String msg, T model) {
        this.code = code;
        this.msg = msg;
        this.model = model;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public void setCode(String code) {
        this.code = code;
    }

    public void setCode(Integer code) {
        this.code = String.valueOf(code);
    }

    @Override
    public String getMsg() {
        return msg;
    }

    @Override
    public void setMsg(String msg) {
        this.msg = msg;
    }

    @Override
    public T getModel() {
        return model;
    }

    @Override
    public void setModel(T model) {
        this.model = model;
    }
}
