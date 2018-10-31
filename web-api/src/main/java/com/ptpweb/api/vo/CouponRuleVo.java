package com.ptpweb.api.vo;

import com.wordnik.swagger.annotations.ApiModel;
import com.wordnik.swagger.annotations.ApiModelProperty;

/**
 * Created by Administrator on 2018-08-23.
 */
@ApiModel(value = "添加红包规则对象", description = "添加红包规则对象")
public class CouponRuleVo {
    @ApiModelProperty(value = "name", notes = "规则名称", dataType = "String", required = true)
    private String name;

    @ApiModelProperty(value = "couponRuleNo", notes = "规则编号", dataType = "String", required = true)
    private String couponRuleNo;

    @ApiModelProperty(value = "status", notes = "规则状态", dataType = "String", required = true)
    private String status;

    @ApiModelProperty(value = "batchno", notes = "规则批次号", dataType = "String", required = true)
    private String batchno;

    @ApiModelProperty(value = "amount", notes = "红包金额", dataType = "String", required = true)
    private Float amount;

    @ApiModelProperty(value = "bidAmount", notes = "红包使用起投金额", dataType = "Float", required = true)
    private Float bidAmount;

    @ApiModelProperty(value = "productLimitMin", notes = "红包使用可投产品期限最小期限", dataType = "Float", required = true)
    private Float productLimitMin;

    @ApiModelProperty(value = "productLimitMax", notes = "红包使用可投产品期限最大期限", dataType = "Float", required = true)
    private Float productLimitMax;

    @ApiModelProperty(value = "productLimittype", notes = "红包使用可投产品期限月/天", dataType = "String", required = true)
    private String productLimittype;

    @ApiModelProperty(value = "ruleDesc", notes = "规则使用说明", dataType = "String", required = true)
    private String ruleDesc;

    @ApiModelProperty(value = "remark", notes = "规则备注", dataType = "String", required = true)
    private String remark;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCouponRuleNo() {
        return couponRuleNo;
    }

    public void setCouponRuleNo(String couponRuleNo) {
        this.couponRuleNo = couponRuleNo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBatchno() {
        return batchno;
    }

    public void setBatchno(String batchno) {
        this.batchno = batchno;
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

    public String getProductLimittype() {
        return productLimittype;
    }

    public void setProductLimittype(String productLimittype) {
        this.productLimittype = productLimittype;
    }

    public String getRuleDesc() {
        return ruleDesc;
    }

    public void setRuleDesc(String ruleDesc) {
        this.ruleDesc = ruleDesc;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
