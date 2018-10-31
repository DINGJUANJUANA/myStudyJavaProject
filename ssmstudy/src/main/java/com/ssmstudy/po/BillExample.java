package com.ssmstudy.po;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class BillExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public BillExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    public String getOrderByClause() {
        return orderByClause;
    }

    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    public boolean isDistinct() {
        return distinct;
    }

    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("Id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("Id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("Id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("Id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("Id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("Id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("Id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("Id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("Id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("Id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("Id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("Id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andAmountIsNull() {
            addCriterion("Amount is null");
            return (Criteria) this;
        }

        public Criteria andAmountIsNotNull() {
            addCriterion("Amount is not null");
            return (Criteria) this;
        }

        public Criteria andAmountEqualTo(BigDecimal value) {
            addCriterion("Amount =", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotEqualTo(BigDecimal value) {
            addCriterion("Amount <>", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountGreaterThan(BigDecimal value) {
            addCriterion("Amount >", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("Amount >=", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountLessThan(BigDecimal value) {
            addCriterion("Amount <", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountLessThanOrEqualTo(BigDecimal value) {
            addCriterion("Amount <=", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountIn(List<BigDecimal> values) {
            addCriterion("Amount in", values, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotIn(List<BigDecimal> values) {
            addCriterion("Amount not in", values, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("Amount between", value1, value2, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("Amount not between", value1, value2, "amount");
            return (Criteria) this;
        }

        public Criteria andSerialnumberIsNull() {
            addCriterion("SerialNumber is null");
            return (Criteria) this;
        }

        public Criteria andSerialnumberIsNotNull() {
            addCriterion("SerialNumber is not null");
            return (Criteria) this;
        }

        public Criteria andSerialnumberEqualTo(String value) {
            addCriterion("SerialNumber =", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberNotEqualTo(String value) {
            addCriterion("SerialNumber <>", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberGreaterThan(String value) {
            addCriterion("SerialNumber >", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberGreaterThanOrEqualTo(String value) {
            addCriterion("SerialNumber >=", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberLessThan(String value) {
            addCriterion("SerialNumber <", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberLessThanOrEqualTo(String value) {
            addCriterion("SerialNumber <=", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberLike(String value) {
            addCriterion("SerialNumber like", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberNotLike(String value) {
            addCriterion("SerialNumber not like", value, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberIn(List<String> values) {
            addCriterion("SerialNumber in", values, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberNotIn(List<String> values) {
            addCriterion("SerialNumber not in", values, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberBetween(String value1, String value2) {
            addCriterion("SerialNumber between", value1, value2, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andSerialnumberNotBetween(String value1, String value2) {
            addCriterion("SerialNumber not between", value1, value2, "serialnumber");
            return (Criteria) this;
        }

        public Criteria andGopayorderidIsNull() {
            addCriterion("GopayOrderId is null");
            return (Criteria) this;
        }

        public Criteria andGopayorderidIsNotNull() {
            addCriterion("GopayOrderId is not null");
            return (Criteria) this;
        }

        public Criteria andGopayorderidEqualTo(String value) {
            addCriterion("GopayOrderId =", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidNotEqualTo(String value) {
            addCriterion("GopayOrderId <>", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidGreaterThan(String value) {
            addCriterion("GopayOrderId >", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidGreaterThanOrEqualTo(String value) {
            addCriterion("GopayOrderId >=", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidLessThan(String value) {
            addCriterion("GopayOrderId <", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidLessThanOrEqualTo(String value) {
            addCriterion("GopayOrderId <=", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidLike(String value) {
            addCriterion("GopayOrderId like", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidNotLike(String value) {
            addCriterion("GopayOrderId not like", value, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidIn(List<String> values) {
            addCriterion("GopayOrderId in", values, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidNotIn(List<String> values) {
            addCriterion("GopayOrderId not in", values, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidBetween(String value1, String value2) {
            addCriterion("GopayOrderId between", value1, value2, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andGopayorderidNotBetween(String value1, String value2) {
            addCriterion("GopayOrderId not between", value1, value2, "gopayorderid");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableIsNull() {
            addCriterion("AfterPayAvailable is null");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableIsNotNull() {
            addCriterion("AfterPayAvailable is not null");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableEqualTo(BigDecimal value) {
            addCriterion("AfterPayAvailable =", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableNotEqualTo(BigDecimal value) {
            addCriterion("AfterPayAvailable <>", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableGreaterThan(BigDecimal value) {
            addCriterion("AfterPayAvailable >", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableGreaterThanOrEqualTo(BigDecimal value) {
            addCriterion("AfterPayAvailable >=", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableLessThan(BigDecimal value) {
            addCriterion("AfterPayAvailable <", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableLessThanOrEqualTo(BigDecimal value) {
            addCriterion("AfterPayAvailable <=", value, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableIn(List<BigDecimal> values) {
            addCriterion("AfterPayAvailable in", values, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableNotIn(List<BigDecimal> values) {
            addCriterion("AfterPayAvailable not in", values, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("AfterPayAvailable between", value1, value2, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andAfterpayavailableNotBetween(BigDecimal value1, BigDecimal value2) {
            addCriterion("AfterPayAvailable not between", value1, value2, "afterpayavailable");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIsNull() {
            addCriterion("CreateTime is null");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIsNotNull() {
            addCriterion("CreateTime is not null");
            return (Criteria) this;
        }

        public Criteria andCreatetimeEqualTo(Date value) {
            addCriterion("CreateTime =", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotEqualTo(Date value) {
            addCriterion("CreateTime <>", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeGreaterThan(Date value) {
            addCriterion("CreateTime >", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeGreaterThanOrEqualTo(Date value) {
            addCriterion("CreateTime >=", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeLessThan(Date value) {
            addCriterion("CreateTime <", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeLessThanOrEqualTo(Date value) {
            addCriterion("CreateTime <=", value, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeIn(List<Date> values) {
            addCriterion("CreateTime in", values, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotIn(List<Date> values) {
            addCriterion("CreateTime not in", values, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeBetween(Date value1, Date value2) {
            addCriterion("CreateTime between", value1, value2, "createtime");
            return (Criteria) this;
        }

        public Criteria andCreatetimeNotBetween(Date value1, Date value2) {
            addCriterion("CreateTime not between", value1, value2, "createtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeIsNull() {
            addCriterion("FinishTime is null");
            return (Criteria) this;
        }

        public Criteria andFinishtimeIsNotNull() {
            addCriterion("FinishTime is not null");
            return (Criteria) this;
        }

        public Criteria andFinishtimeEqualTo(Date value) {
            addCriterion("FinishTime =", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeNotEqualTo(Date value) {
            addCriterion("FinishTime <>", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeGreaterThan(Date value) {
            addCriterion("FinishTime >", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeGreaterThanOrEqualTo(Date value) {
            addCriterion("FinishTime >=", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeLessThan(Date value) {
            addCriterion("FinishTime <", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeLessThanOrEqualTo(Date value) {
            addCriterion("FinishTime <=", value, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeIn(List<Date> values) {
            addCriterion("FinishTime in", values, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeNotIn(List<Date> values) {
            addCriterion("FinishTime not in", values, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeBetween(Date value1, Date value2) {
            addCriterion("FinishTime between", value1, value2, "finishtime");
            return (Criteria) this;
        }

        public Criteria andFinishtimeNotBetween(Date value1, Date value2) {
            addCriterion("FinishTime not between", value1, value2, "finishtime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeIsNull() {
            addCriterion("OrderTime is null");
            return (Criteria) this;
        }

        public Criteria andOrdertimeIsNotNull() {
            addCriterion("OrderTime is not null");
            return (Criteria) this;
        }

        public Criteria andOrdertimeEqualTo(Date value) {
            addCriterion("OrderTime =", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeNotEqualTo(Date value) {
            addCriterion("OrderTime <>", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeGreaterThan(Date value) {
            addCriterion("OrderTime >", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeGreaterThanOrEqualTo(Date value) {
            addCriterion("OrderTime >=", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeLessThan(Date value) {
            addCriterion("OrderTime <", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeLessThanOrEqualTo(Date value) {
            addCriterion("OrderTime <=", value, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeIn(List<Date> values) {
            addCriterion("OrderTime in", values, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeNotIn(List<Date> values) {
            addCriterion("OrderTime not in", values, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeBetween(Date value1, Date value2) {
            addCriterion("OrderTime between", value1, value2, "ordertime");
            return (Criteria) this;
        }

        public Criteria andOrdertimeNotBetween(Date value1, Date value2) {
            addCriterion("OrderTime not between", value1, value2, "ordertime");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberIsNull() {
            addCriterion("MerchantNumber is null");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberIsNotNull() {
            addCriterion("MerchantNumber is not null");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberEqualTo(String value) {
            addCriterion("MerchantNumber =", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberNotEqualTo(String value) {
            addCriterion("MerchantNumber <>", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberGreaterThan(String value) {
            addCriterion("MerchantNumber >", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberGreaterThanOrEqualTo(String value) {
            addCriterion("MerchantNumber >=", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberLessThan(String value) {
            addCriterion("MerchantNumber <", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberLessThanOrEqualTo(String value) {
            addCriterion("MerchantNumber <=", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberLike(String value) {
            addCriterion("MerchantNumber like", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberNotLike(String value) {
            addCriterion("MerchantNumber not like", value, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberIn(List<String> values) {
            addCriterion("MerchantNumber in", values, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberNotIn(List<String> values) {
            addCriterion("MerchantNumber not in", values, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberBetween(String value1, String value2) {
            addCriterion("MerchantNumber between", value1, value2, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andMerchantnumberNotBetween(String value1, String value2) {
            addCriterion("MerchantNumber not between", value1, value2, "merchantnumber");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNull() {
            addCriterion("Description is null");
            return (Criteria) this;
        }

        public Criteria andDescriptionIsNotNull() {
            addCriterion("Description is not null");
            return (Criteria) this;
        }

        public Criteria andDescriptionEqualTo(String value) {
            addCriterion("Description =", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotEqualTo(String value) {
            addCriterion("Description <>", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThan(String value) {
            addCriterion("Description >", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionGreaterThanOrEqualTo(String value) {
            addCriterion("Description >=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThan(String value) {
            addCriterion("Description <", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLessThanOrEqualTo(String value) {
            addCriterion("Description <=", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionLike(String value) {
            addCriterion("Description like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotLike(String value) {
            addCriterion("Description not like", value, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionIn(List<String> values) {
            addCriterion("Description in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotIn(List<String> values) {
            addCriterion("Description not in", values, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionBetween(String value1, String value2) {
            addCriterion("Description between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andDescriptionNotBetween(String value1, String value2) {
            addCriterion("Description not between", value1, value2, "description");
            return (Criteria) this;
        }

        public Criteria andBilltypeIsNull() {
            addCriterion("BillType is null");
            return (Criteria) this;
        }

        public Criteria andBilltypeIsNotNull() {
            addCriterion("BillType is not null");
            return (Criteria) this;
        }

        public Criteria andBilltypeEqualTo(Integer value) {
            addCriterion("BillType =", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeNotEqualTo(Integer value) {
            addCriterion("BillType <>", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeGreaterThan(Integer value) {
            addCriterion("BillType >", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("BillType >=", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeLessThan(Integer value) {
            addCriterion("BillType <", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeLessThanOrEqualTo(Integer value) {
            addCriterion("BillType <=", value, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeIn(List<Integer> values) {
            addCriterion("BillType in", values, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeNotIn(List<Integer> values) {
            addCriterion("BillType not in", values, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeBetween(Integer value1, Integer value2) {
            addCriterion("BillType between", value1, value2, "billtype");
            return (Criteria) this;
        }

        public Criteria andBilltypeNotBetween(Integer value1, Integer value2) {
            addCriterion("BillType not between", value1, value2, "billtype");
            return (Criteria) this;
        }

        public Criteria andBillstatusIsNull() {
            addCriterion("BillStatus is null");
            return (Criteria) this;
        }

        public Criteria andBillstatusIsNotNull() {
            addCriterion("BillStatus is not null");
            return (Criteria) this;
        }

        public Criteria andBillstatusEqualTo(Integer value) {
            addCriterion("BillStatus =", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusNotEqualTo(Integer value) {
            addCriterion("BillStatus <>", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusGreaterThan(Integer value) {
            addCriterion("BillStatus >", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("BillStatus >=", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusLessThan(Integer value) {
            addCriterion("BillStatus <", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusLessThanOrEqualTo(Integer value) {
            addCriterion("BillStatus <=", value, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusIn(List<Integer> values) {
            addCriterion("BillStatus in", values, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusNotIn(List<Integer> values) {
            addCriterion("BillStatus not in", values, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusBetween(Integer value1, Integer value2) {
            addCriterion("BillStatus between", value1, value2, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBillstatusNotBetween(Integer value1, Integer value2) {
            addCriterion("BillStatus not between", value1, value2, "billstatus");
            return (Criteria) this;
        }

        public Criteria andBExportIsNull() {
            addCriterion("B_EXPORT is null");
            return (Criteria) this;
        }

        public Criteria andBExportIsNotNull() {
            addCriterion("B_EXPORT is not null");
            return (Criteria) this;
        }

        public Criteria andBExportEqualTo(Integer value) {
            addCriterion("B_EXPORT =", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportNotEqualTo(Integer value) {
            addCriterion("B_EXPORT <>", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportGreaterThan(Integer value) {
            addCriterion("B_EXPORT >", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportGreaterThanOrEqualTo(Integer value) {
            addCriterion("B_EXPORT >=", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportLessThan(Integer value) {
            addCriterion("B_EXPORT <", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportLessThanOrEqualTo(Integer value) {
            addCriterion("B_EXPORT <=", value, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportIn(List<Integer> values) {
            addCriterion("B_EXPORT in", values, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportNotIn(List<Integer> values) {
            addCriterion("B_EXPORT not in", values, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportBetween(Integer value1, Integer value2) {
            addCriterion("B_EXPORT between", value1, value2, "bExport");
            return (Criteria) this;
        }

        public Criteria andBExportNotBetween(Integer value1, Integer value2) {
            addCriterion("B_EXPORT not between", value1, value2, "bExport");
            return (Criteria) this;
        }

        public Criteria andInouttypeIsNull() {
            addCriterion("InoutType is null");
            return (Criteria) this;
        }

        public Criteria andInouttypeIsNotNull() {
            addCriterion("InoutType is not null");
            return (Criteria) this;
        }

        public Criteria andInouttypeEqualTo(Integer value) {
            addCriterion("InoutType =", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeNotEqualTo(Integer value) {
            addCriterion("InoutType <>", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeGreaterThan(Integer value) {
            addCriterion("InoutType >", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("InoutType >=", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeLessThan(Integer value) {
            addCriterion("InoutType <", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeLessThanOrEqualTo(Integer value) {
            addCriterion("InoutType <=", value, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeIn(List<Integer> values) {
            addCriterion("InoutType in", values, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeNotIn(List<Integer> values) {
            addCriterion("InoutType not in", values, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeBetween(Integer value1, Integer value2) {
            addCriterion("InoutType between", value1, value2, "inouttype");
            return (Criteria) this;
        }

        public Criteria andInouttypeNotBetween(Integer value1, Integer value2) {
            addCriterion("InoutType not between", value1, value2, "inouttype");
            return (Criteria) this;
        }

        public Criteria andPaytypeIsNull() {
            addCriterion("PayType is null");
            return (Criteria) this;
        }

        public Criteria andPaytypeIsNotNull() {
            addCriterion("PayType is not null");
            return (Criteria) this;
        }

        public Criteria andPaytypeEqualTo(Integer value) {
            addCriterion("PayType =", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeNotEqualTo(Integer value) {
            addCriterion("PayType <>", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeGreaterThan(Integer value) {
            addCriterion("PayType >", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("PayType >=", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeLessThan(Integer value) {
            addCriterion("PayType <", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeLessThanOrEqualTo(Integer value) {
            addCriterion("PayType <=", value, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeIn(List<Integer> values) {
            addCriterion("PayType in", values, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeNotIn(List<Integer> values) {
            addCriterion("PayType not in", values, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeBetween(Integer value1, Integer value2) {
            addCriterion("PayType between", value1, value2, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaytypeNotBetween(Integer value1, Integer value2) {
            addCriterion("PayType not between", value1, value2, "paytype");
            return (Criteria) this;
        }

        public Criteria andPaystatusIsNull() {
            addCriterion("PayStatus is null");
            return (Criteria) this;
        }

        public Criteria andPaystatusIsNotNull() {
            addCriterion("PayStatus is not null");
            return (Criteria) this;
        }

        public Criteria andPaystatusEqualTo(Integer value) {
            addCriterion("PayStatus =", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusNotEqualTo(Integer value) {
            addCriterion("PayStatus <>", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusGreaterThan(Integer value) {
            addCriterion("PayStatus >", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("PayStatus >=", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusLessThan(Integer value) {
            addCriterion("PayStatus <", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusLessThanOrEqualTo(Integer value) {
            addCriterion("PayStatus <=", value, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusIn(List<Integer> values) {
            addCriterion("PayStatus in", values, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusNotIn(List<Integer> values) {
            addCriterion("PayStatus not in", values, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusBetween(Integer value1, Integer value2) {
            addCriterion("PayStatus between", value1, value2, "paystatus");
            return (Criteria) this;
        }

        public Criteria andPaystatusNotBetween(Integer value1, Integer value2) {
            addCriterion("PayStatus not between", value1, value2, "paystatus");
            return (Criteria) this;
        }

        public Criteria andB2ctypeIsNull() {
            addCriterion("B2CType is null");
            return (Criteria) this;
        }

        public Criteria andB2ctypeIsNotNull() {
            addCriterion("B2CType is not null");
            return (Criteria) this;
        }

        public Criteria andB2ctypeEqualTo(Integer value) {
            addCriterion("B2CType =", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeNotEqualTo(Integer value) {
            addCriterion("B2CType <>", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeGreaterThan(Integer value) {
            addCriterion("B2CType >", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("B2CType >=", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeLessThan(Integer value) {
            addCriterion("B2CType <", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeLessThanOrEqualTo(Integer value) {
            addCriterion("B2CType <=", value, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeIn(List<Integer> values) {
            addCriterion("B2CType in", values, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeNotIn(List<Integer> values) {
            addCriterion("B2CType not in", values, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeBetween(Integer value1, Integer value2) {
            addCriterion("B2CType between", value1, value2, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andB2ctypeNotBetween(Integer value1, Integer value2) {
            addCriterion("B2CType not between", value1, value2, "b2ctype");
            return (Criteria) this;
        }

        public Criteria andTargetuseridIsNull() {
            addCriterion("TargetUserId is null");
            return (Criteria) this;
        }

        public Criteria andTargetuseridIsNotNull() {
            addCriterion("TargetUserId is not null");
            return (Criteria) this;
        }

        public Criteria andTargetuseridEqualTo(Integer value) {
            addCriterion("TargetUserId =", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridNotEqualTo(Integer value) {
            addCriterion("TargetUserId <>", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridGreaterThan(Integer value) {
            addCriterion("TargetUserId >", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("TargetUserId >=", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridLessThan(Integer value) {
            addCriterion("TargetUserId <", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridLessThanOrEqualTo(Integer value) {
            addCriterion("TargetUserId <=", value, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridIn(List<Integer> values) {
            addCriterion("TargetUserId in", values, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridNotIn(List<Integer> values) {
            addCriterion("TargetUserId not in", values, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridBetween(Integer value1, Integer value2) {
            addCriterion("TargetUserId between", value1, value2, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andTargetuseridNotBetween(Integer value1, Integer value2) {
            addCriterion("TargetUserId not between", value1, value2, "targetuserid");
            return (Criteria) this;
        }

        public Criteria andOperatoridIsNull() {
            addCriterion("OperatorId is null");
            return (Criteria) this;
        }

        public Criteria andOperatoridIsNotNull() {
            addCriterion("OperatorId is not null");
            return (Criteria) this;
        }

        public Criteria andOperatoridEqualTo(Integer value) {
            addCriterion("OperatorId =", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridNotEqualTo(Integer value) {
            addCriterion("OperatorId <>", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridGreaterThan(Integer value) {
            addCriterion("OperatorId >", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridGreaterThanOrEqualTo(Integer value) {
            addCriterion("OperatorId >=", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridLessThan(Integer value) {
            addCriterion("OperatorId <", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridLessThanOrEqualTo(Integer value) {
            addCriterion("OperatorId <=", value, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridIn(List<Integer> values) {
            addCriterion("OperatorId in", values, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridNotIn(List<Integer> values) {
            addCriterion("OperatorId not in", values, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridBetween(Integer value1, Integer value2) {
            addCriterion("OperatorId between", value1, value2, "operatorid");
            return (Criteria) this;
        }

        public Criteria andOperatoridNotBetween(Integer value1, Integer value2) {
            addCriterion("OperatorId not between", value1, value2, "operatorid");
            return (Criteria) this;
        }

        public Criteria andUseridIsNull() {
            addCriterion("UserId is null");
            return (Criteria) this;
        }

        public Criteria andUseridIsNotNull() {
            addCriterion("UserId is not null");
            return (Criteria) this;
        }

        public Criteria andUseridEqualTo(Integer value) {
            addCriterion("UserId =", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotEqualTo(Integer value) {
            addCriterion("UserId <>", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThan(Integer value) {
            addCriterion("UserId >", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridGreaterThanOrEqualTo(Integer value) {
            addCriterion("UserId >=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThan(Integer value) {
            addCriterion("UserId <", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridLessThanOrEqualTo(Integer value) {
            addCriterion("UserId <=", value, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridIn(List<Integer> values) {
            addCriterion("UserId in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotIn(List<Integer> values) {
            addCriterion("UserId not in", values, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridBetween(Integer value1, Integer value2) {
            addCriterion("UserId between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andUseridNotBetween(Integer value1, Integer value2) {
            addCriterion("UserId not between", value1, value2, "userid");
            return (Criteria) this;
        }

        public Criteria andFundIdIsNull() {
            addCriterion("Fund_Id is null");
            return (Criteria) this;
        }

        public Criteria andFundIdIsNotNull() {
            addCriterion("Fund_Id is not null");
            return (Criteria) this;
        }

        public Criteria andFundIdEqualTo(Integer value) {
            addCriterion("Fund_Id =", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdNotEqualTo(Integer value) {
            addCriterion("Fund_Id <>", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdGreaterThan(Integer value) {
            addCriterion("Fund_Id >", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("Fund_Id >=", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdLessThan(Integer value) {
            addCriterion("Fund_Id <", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdLessThanOrEqualTo(Integer value) {
            addCriterion("Fund_Id <=", value, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdIn(List<Integer> values) {
            addCriterion("Fund_Id in", values, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdNotIn(List<Integer> values) {
            addCriterion("Fund_Id not in", values, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdBetween(Integer value1, Integer value2) {
            addCriterion("Fund_Id between", value1, value2, "fundId");
            return (Criteria) this;
        }

        public Criteria andFundIdNotBetween(Integer value1, Integer value2) {
            addCriterion("Fund_Id not between", value1, value2, "fundId");
            return (Criteria) this;
        }

        public Criteria andSourcetypeIsNull() {
            addCriterion("SourceType is null");
            return (Criteria) this;
        }

        public Criteria andSourcetypeIsNotNull() {
            addCriterion("SourceType is not null");
            return (Criteria) this;
        }

        public Criteria andSourcetypeEqualTo(Integer value) {
            addCriterion("SourceType =", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeNotEqualTo(Integer value) {
            addCriterion("SourceType <>", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeGreaterThan(Integer value) {
            addCriterion("SourceType >", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeGreaterThanOrEqualTo(Integer value) {
            addCriterion("SourceType >=", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeLessThan(Integer value) {
            addCriterion("SourceType <", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeLessThanOrEqualTo(Integer value) {
            addCriterion("SourceType <=", value, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeIn(List<Integer> values) {
            addCriterion("SourceType in", values, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeNotIn(List<Integer> values) {
            addCriterion("SourceType not in", values, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeBetween(Integer value1, Integer value2) {
            addCriterion("SourceType between", value1, value2, "sourcetype");
            return (Criteria) this;
        }

        public Criteria andSourcetypeNotBetween(Integer value1, Integer value2) {
            addCriterion("SourceType not between", value1, value2, "sourcetype");
            return (Criteria) this;
        }
    }

    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}