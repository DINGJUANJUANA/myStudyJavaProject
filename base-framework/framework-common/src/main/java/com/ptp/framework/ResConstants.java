package com.ptp.framework;

/**
 * Created by Administrator on 2018-08-15.
 */
public enum  ResConstants {

    SUCCESS("success", "成功"),
    USER_NOT_LOGIN("user_not_login", "用户未登录"),
    PARAM_NOT_RIGHT("param_not_right", "入参数值不合法"),
    MOBILE_IS_EXIST_EXCEPTION("mobile_is_exist_exception", "该手机号已注册！"),
    ADD_DATA_FAIL("add_data_fail", "添加数据失败"),
    PUT_DATA_CACHE_EXCEPTION("put_data_cache_exception", "将数据放到缓存中异常"),
    GET_DATA_CACHE_EXCEPTION("put_data_cache_exception", "将数据放到缓存中异常");
    private final String code; // 错误码

    private final String msg; // 错误描述
    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
    private ResConstants(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
}
