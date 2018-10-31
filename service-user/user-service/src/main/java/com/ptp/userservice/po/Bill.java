package com.ptp.userservice.po;

import java.math.BigDecimal;
import java.util.Date;

public class Bill {
    private Integer id;

    private BigDecimal amount;

    private String serialnumber;

    private String gopayorderid;

    private BigDecimal afterpayavailable;

    private Date createtime;

    private Date finishtime;

    private Date ordertime;

    private String merchantnumber;

    private String description;

    private Integer billtype;

    private Integer billstatus;

    private Integer bExport;

    private Integer inouttype;

    private Integer paytype;

    private Integer paystatus;

    private Integer b2ctype;

    private Integer targetuserid;

    private Integer operatorid;

    private Integer userid;

    private Integer fundId;

    private Integer sourcetype;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getSerialnumber() {
        return serialnumber;
    }

    public void setSerialnumber(String serialnumber) {
        this.serialnumber = serialnumber == null ? null : serialnumber.trim();
    }

    public String getGopayorderid() {
        return gopayorderid;
    }

    public void setGopayorderid(String gopayorderid) {
        this.gopayorderid = gopayorderid == null ? null : gopayorderid.trim();
    }

    public BigDecimal getAfterpayavailable() {
        return afterpayavailable;
    }

    public void setAfterpayavailable(BigDecimal afterpayavailable) {
        this.afterpayavailable = afterpayavailable;
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getFinishtime() {
        return finishtime;
    }

    public void setFinishtime(Date finishtime) {
        this.finishtime = finishtime;
    }

    public Date getOrdertime() {
        return ordertime;
    }

    public void setOrdertime(Date ordertime) {
        this.ordertime = ordertime;
    }

    public String getMerchantnumber() {
        return merchantnumber;
    }

    public void setMerchantnumber(String merchantnumber) {
        this.merchantnumber = merchantnumber == null ? null : merchantnumber.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public Integer getBilltype() {
        return billtype;
    }

    public void setBilltype(Integer billtype) {
        this.billtype = billtype;
    }

    public Integer getBillstatus() {
        return billstatus;
    }

    public void setBillstatus(Integer billstatus) {
        this.billstatus = billstatus;
    }

    public Integer getbExport() {
        return bExport;
    }

    public void setbExport(Integer bExport) {
        this.bExport = bExport;
    }

    public Integer getInouttype() {
        return inouttype;
    }

    public void setInouttype(Integer inouttype) {
        this.inouttype = inouttype;
    }

    public Integer getPaytype() {
        return paytype;
    }

    public void setPaytype(Integer paytype) {
        this.paytype = paytype;
    }

    public Integer getPaystatus() {
        return paystatus;
    }

    public void setPaystatus(Integer paystatus) {
        this.paystatus = paystatus;
    }

    public Integer getB2ctype() {
        return b2ctype;
    }

    public void setB2ctype(Integer b2ctype) {
        this.b2ctype = b2ctype;
    }

    public Integer getTargetuserid() {
        return targetuserid;
    }

    public void setTargetuserid(Integer targetuserid) {
        this.targetuserid = targetuserid;
    }

    public Integer getOperatorid() {
        return operatorid;
    }

    public void setOperatorid(Integer operatorid) {
        this.operatorid = operatorid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getFundId() {
        return fundId;
    }

    public void setFundId(Integer fundId) {
        this.fundId = fundId;
    }

    public Integer getSourcetype() {
        return sourcetype;
    }

    public void setSourcetype(Integer sourcetype) {
        this.sourcetype = sourcetype;
    }
}