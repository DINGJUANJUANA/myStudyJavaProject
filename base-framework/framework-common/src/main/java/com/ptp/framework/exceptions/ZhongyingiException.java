package com.ptp.framework.exceptions;

/**
 * Created by Administrator on 2018-08-15.
 */
public class ZhongyingiException extends BizException {
    /**
     * serialVersionUID:TODO
     */

    private static final long serialVersionUID = 1L;

    private String errorCode;

    private String message;

    public ZhongyingiException() {
        super();
    }

    public ZhongyingiException(Throwable throwable) {
        super(throwable);
    }

    public ZhongyingiException(String errorCode) {
        super();
        this.message = errorCode;
    }

    public ZhongyingiException(String errorCode, String message) {
        super(errorCode,message);
        this.errorCode = errorCode;
        this.message = message;
    }

    public ZhongyingiException(String errorCode, String message, Throwable throwable) {
        super(errorCode,message, throwable);
        this.errorCode = errorCode;
        this.message = message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
