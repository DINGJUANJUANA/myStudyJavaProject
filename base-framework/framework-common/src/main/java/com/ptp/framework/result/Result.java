package com.ptp.framework.result;

import java.io.Serializable;

/**
 * Created by Administrator on 2018-08-15.
 */
public interface Result<T> extends Serializable {


    /**
     * 获取返回码
     *
     * @return 返回码
     */
    public String getCode();

    /**
     * 设置返回码
     *
     * @param code
     */
    public void setCode(String code);

    /**
     * 设置结果信息
     *
     * @param msg
     */
    public void setMsg(String msg);

    /**
     * 返回结果信息
     *
     * @return
     */
    public String getMsg();

    /**
     * <p>
     * 设置 model 对象。key 置为对象 class 类名
     * </p>
     *
     * @param model
     */
    public void setModel(T model);

    /**
     * <p>
     * 从 models 中获取指定类的 model 对象
     * </p>
     *
     * @return
     */
    public T getModel();

}
