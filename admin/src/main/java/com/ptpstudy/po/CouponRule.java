package com.ptpstudy.po;

import java.util.Date;

public class CouponRule {
    private Integer id;

    private String name;

    private String couponRuleNo;

    private Boolean status;

    private String batchno;

    private Float amount;

    private Float bidAmount;

    private Float productLimitMin;

    private Float productLimitMax;

    private Boolean productLimittype;

    private String ruleDesc;

    private String remark;

    private String createName;

    private Date createDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCouponRuleNo() {
        return couponRuleNo;
    }

    public void setCouponRuleNo(String couponRuleNo) {
        this.couponRuleNo = couponRuleNo == null ? null : couponRuleNo.trim();
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getBatchno() {
        return batchno;
    }

    public void setBatchno(String batchno) {
        this.batchno = batchno == null ? null : batchno.trim();
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Float getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(Float bidAmount) {
        this.bidAmount = bidAmount;
    }

    public Float getProductLimitMin() {
        return productLimitMin;
    }

    public void setProductLimitMin(Float productLimitMin) {
        this.productLimitMin = productLimitMin;
    }

    public Float getProductLimitMax() {
        return productLimitMax;
    }

    public void setProductLimitMax(Float productLimitMax) {
        this.productLimitMax = productLimitMax;
    }

    public Boolean getProductLimittype() {
        return productLimittype;
    }

    public void setProductLimittype(Boolean productLimittype) {
        this.productLimittype = productLimittype;
    }

    public String getRuleDesc() {
        return ruleDesc;
    }

    public void setRuleDesc(String ruleDesc) {
        this.ruleDesc = ruleDesc == null ? null : ruleDesc.trim();
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName == null ? null : createName.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}