package com.ptp.userservice.po;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CouponRuleExample {
    protected String orderByClause;

    protected boolean distinct;

    protected List<Criteria> oredCriteria;

    public CouponRuleExample() {
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
            addCriterion("id is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("id is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("id =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("id <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("id >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("id >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("id <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("id <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("id in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("id not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("id between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("id not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andNameIsNull() {
            addCriterion("name is null");
            return (Criteria) this;
        }

        public Criteria andNameIsNotNull() {
            addCriterion("name is not null");
            return (Criteria) this;
        }

        public Criteria andNameEqualTo(String value) {
            addCriterion("name =", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotEqualTo(String value) {
            addCriterion("name <>", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThan(String value) {
            addCriterion("name >", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameGreaterThanOrEqualTo(String value) {
            addCriterion("name >=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThan(String value) {
            addCriterion("name <", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLessThanOrEqualTo(String value) {
            addCriterion("name <=", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameLike(String value) {
            addCriterion("name like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotLike(String value) {
            addCriterion("name not like", value, "name");
            return (Criteria) this;
        }

        public Criteria andNameIn(List<String> values) {
            addCriterion("name in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotIn(List<String> values) {
            addCriterion("name not in", values, "name");
            return (Criteria) this;
        }

        public Criteria andNameBetween(String value1, String value2) {
            addCriterion("name between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andNameNotBetween(String value1, String value2) {
            addCriterion("name not between", value1, value2, "name");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoIsNull() {
            addCriterion("coupon_rule_no is null");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoIsNotNull() {
            addCriterion("coupon_rule_no is not null");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoEqualTo(String value) {
            addCriterion("coupon_rule_no =", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoNotEqualTo(String value) {
            addCriterion("coupon_rule_no <>", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoGreaterThan(String value) {
            addCriterion("coupon_rule_no >", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoGreaterThanOrEqualTo(String value) {
            addCriterion("coupon_rule_no >=", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoLessThan(String value) {
            addCriterion("coupon_rule_no <", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoLessThanOrEqualTo(String value) {
            addCriterion("coupon_rule_no <=", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoLike(String value) {
            addCriterion("coupon_rule_no like", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoNotLike(String value) {
            addCriterion("coupon_rule_no not like", value, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoIn(List<String> values) {
            addCriterion("coupon_rule_no in", values, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoNotIn(List<String> values) {
            addCriterion("coupon_rule_no not in", values, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoBetween(String value1, String value2) {
            addCriterion("coupon_rule_no between", value1, value2, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andCouponRuleNoNotBetween(String value1, String value2) {
            addCriterion("coupon_rule_no not between", value1, value2, "couponRuleNo");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("status is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("status is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Boolean value) {
            addCriterion("status =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Boolean value) {
            addCriterion("status <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Boolean value) {
            addCriterion("status >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Boolean value) {
            addCriterion("status >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Boolean value) {
            addCriterion("status <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Boolean value) {
            addCriterion("status <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Boolean> values) {
            addCriterion("status in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Boolean> values) {
            addCriterion("status not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Boolean value1, Boolean value2) {
            addCriterion("status between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Boolean value1, Boolean value2) {
            addCriterion("status not between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andBatchnoIsNull() {
            addCriterion("batchno is null");
            return (Criteria) this;
        }

        public Criteria andBatchnoIsNotNull() {
            addCriterion("batchno is not null");
            return (Criteria) this;
        }

        public Criteria andBatchnoEqualTo(String value) {
            addCriterion("batchno =", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoNotEqualTo(String value) {
            addCriterion("batchno <>", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoGreaterThan(String value) {
            addCriterion("batchno >", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoGreaterThanOrEqualTo(String value) {
            addCriterion("batchno >=", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoLessThan(String value) {
            addCriterion("batchno <", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoLessThanOrEqualTo(String value) {
            addCriterion("batchno <=", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoLike(String value) {
            addCriterion("batchno like", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoNotLike(String value) {
            addCriterion("batchno not like", value, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoIn(List<String> values) {
            addCriterion("batchno in", values, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoNotIn(List<String> values) {
            addCriterion("batchno not in", values, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoBetween(String value1, String value2) {
            addCriterion("batchno between", value1, value2, "batchno");
            return (Criteria) this;
        }

        public Criteria andBatchnoNotBetween(String value1, String value2) {
            addCriterion("batchno not between", value1, value2, "batchno");
            return (Criteria) this;
        }

        public Criteria andAmountIsNull() {
            addCriterion("amount is null");
            return (Criteria) this;
        }

        public Criteria andAmountIsNotNull() {
            addCriterion("amount is not null");
            return (Criteria) this;
        }

        public Criteria andAmountEqualTo(Float value) {
            addCriterion("amount =", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotEqualTo(Float value) {
            addCriterion("amount <>", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountGreaterThan(Float value) {
            addCriterion("amount >", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountGreaterThanOrEqualTo(Float value) {
            addCriterion("amount >=", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountLessThan(Float value) {
            addCriterion("amount <", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountLessThanOrEqualTo(Float value) {
            addCriterion("amount <=", value, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountIn(List<Float> values) {
            addCriterion("amount in", values, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotIn(List<Float> values) {
            addCriterion("amount not in", values, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountBetween(Float value1, Float value2) {
            addCriterion("amount between", value1, value2, "amount");
            return (Criteria) this;
        }

        public Criteria andAmountNotBetween(Float value1, Float value2) {
            addCriterion("amount not between", value1, value2, "amount");
            return (Criteria) this;
        }

        public Criteria andBidAmountIsNull() {
            addCriterion("bid_amount is null");
            return (Criteria) this;
        }

        public Criteria andBidAmountIsNotNull() {
            addCriterion("bid_amount is not null");
            return (Criteria) this;
        }

        public Criteria andBidAmountEqualTo(Float value) {
            addCriterion("bid_amount =", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountNotEqualTo(Float value) {
            addCriterion("bid_amount <>", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountGreaterThan(Float value) {
            addCriterion("bid_amount >", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountGreaterThanOrEqualTo(Float value) {
            addCriterion("bid_amount >=", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountLessThan(Float value) {
            addCriterion("bid_amount <", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountLessThanOrEqualTo(Float value) {
            addCriterion("bid_amount <=", value, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountIn(List<Float> values) {
            addCriterion("bid_amount in", values, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountNotIn(List<Float> values) {
            addCriterion("bid_amount not in", values, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountBetween(Float value1, Float value2) {
            addCriterion("bid_amount between", value1, value2, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andBidAmountNotBetween(Float value1, Float value2) {
            addCriterion("bid_amount not between", value1, value2, "bidAmount");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinIsNull() {
            addCriterion("product_limit_min is null");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinIsNotNull() {
            addCriterion("product_limit_min is not null");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinEqualTo(Float value) {
            addCriterion("product_limit_min =", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinNotEqualTo(Float value) {
            addCriterion("product_limit_min <>", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinGreaterThan(Float value) {
            addCriterion("product_limit_min >", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinGreaterThanOrEqualTo(Float value) {
            addCriterion("product_limit_min >=", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinLessThan(Float value) {
            addCriterion("product_limit_min <", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinLessThanOrEqualTo(Float value) {
            addCriterion("product_limit_min <=", value, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinIn(List<Float> values) {
            addCriterion("product_limit_min in", values, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinNotIn(List<Float> values) {
            addCriterion("product_limit_min not in", values, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinBetween(Float value1, Float value2) {
            addCriterion("product_limit_min between", value1, value2, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMinNotBetween(Float value1, Float value2) {
            addCriterion("product_limit_min not between", value1, value2, "productLimitMin");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxIsNull() {
            addCriterion("product_limit_max is null");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxIsNotNull() {
            addCriterion("product_limit_max is not null");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxEqualTo(Float value) {
            addCriterion("product_limit_max =", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxNotEqualTo(Float value) {
            addCriterion("product_limit_max <>", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxGreaterThan(Float value) {
            addCriterion("product_limit_max >", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxGreaterThanOrEqualTo(Float value) {
            addCriterion("product_limit_max >=", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxLessThan(Float value) {
            addCriterion("product_limit_max <", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxLessThanOrEqualTo(Float value) {
            addCriterion("product_limit_max <=", value, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxIn(List<Float> values) {
            addCriterion("product_limit_max in", values, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxNotIn(List<Float> values) {
            addCriterion("product_limit_max not in", values, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxBetween(Float value1, Float value2) {
            addCriterion("product_limit_max between", value1, value2, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimitMaxNotBetween(Float value1, Float value2) {
            addCriterion("product_limit_max not between", value1, value2, "productLimitMax");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeIsNull() {
            addCriterion("product_limittype is null");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeIsNotNull() {
            addCriterion("product_limittype is not null");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeEqualTo(Boolean value) {
            addCriterion("product_limittype =", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeNotEqualTo(Boolean value) {
            addCriterion("product_limittype <>", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeGreaterThan(Boolean value) {
            addCriterion("product_limittype >", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeGreaterThanOrEqualTo(Boolean value) {
            addCriterion("product_limittype >=", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeLessThan(Boolean value) {
            addCriterion("product_limittype <", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeLessThanOrEqualTo(Boolean value) {
            addCriterion("product_limittype <=", value, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeIn(List<Boolean> values) {
            addCriterion("product_limittype in", values, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeNotIn(List<Boolean> values) {
            addCriterion("product_limittype not in", values, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeBetween(Boolean value1, Boolean value2) {
            addCriterion("product_limittype between", value1, value2, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andProductLimittypeNotBetween(Boolean value1, Boolean value2) {
            addCriterion("product_limittype not between", value1, value2, "productLimittype");
            return (Criteria) this;
        }

        public Criteria andRuleDescIsNull() {
            addCriterion("rule_desc is null");
            return (Criteria) this;
        }

        public Criteria andRuleDescIsNotNull() {
            addCriterion("rule_desc is not null");
            return (Criteria) this;
        }

        public Criteria andRuleDescEqualTo(String value) {
            addCriterion("rule_desc =", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescNotEqualTo(String value) {
            addCriterion("rule_desc <>", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescGreaterThan(String value) {
            addCriterion("rule_desc >", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescGreaterThanOrEqualTo(String value) {
            addCriterion("rule_desc >=", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescLessThan(String value) {
            addCriterion("rule_desc <", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescLessThanOrEqualTo(String value) {
            addCriterion("rule_desc <=", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescLike(String value) {
            addCriterion("rule_desc like", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescNotLike(String value) {
            addCriterion("rule_desc not like", value, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescIn(List<String> values) {
            addCriterion("rule_desc in", values, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescNotIn(List<String> values) {
            addCriterion("rule_desc not in", values, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescBetween(String value1, String value2) {
            addCriterion("rule_desc between", value1, value2, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRuleDescNotBetween(String value1, String value2) {
            addCriterion("rule_desc not between", value1, value2, "ruleDesc");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNull() {
            addCriterion("remark is null");
            return (Criteria) this;
        }

        public Criteria andRemarkIsNotNull() {
            addCriterion("remark is not null");
            return (Criteria) this;
        }

        public Criteria andRemarkEqualTo(String value) {
            addCriterion("remark =", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotEqualTo(String value) {
            addCriterion("remark <>", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThan(String value) {
            addCriterion("remark >", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkGreaterThanOrEqualTo(String value) {
            addCriterion("remark >=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThan(String value) {
            addCriterion("remark <", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLessThanOrEqualTo(String value) {
            addCriterion("remark <=", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkLike(String value) {
            addCriterion("remark like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotLike(String value) {
            addCriterion("remark not like", value, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkIn(List<String> values) {
            addCriterion("remark in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotIn(List<String> values) {
            addCriterion("remark not in", values, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkBetween(String value1, String value2) {
            addCriterion("remark between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andRemarkNotBetween(String value1, String value2) {
            addCriterion("remark not between", value1, value2, "remark");
            return (Criteria) this;
        }

        public Criteria andCreateNameIsNull() {
            addCriterion("create_name is null");
            return (Criteria) this;
        }

        public Criteria andCreateNameIsNotNull() {
            addCriterion("create_name is not null");
            return (Criteria) this;
        }

        public Criteria andCreateNameEqualTo(String value) {
            addCriterion("create_name =", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotEqualTo(String value) {
            addCriterion("create_name <>", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameGreaterThan(String value) {
            addCriterion("create_name >", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameGreaterThanOrEqualTo(String value) {
            addCriterion("create_name >=", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLessThan(String value) {
            addCriterion("create_name <", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLessThanOrEqualTo(String value) {
            addCriterion("create_name <=", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameLike(String value) {
            addCriterion("create_name like", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotLike(String value) {
            addCriterion("create_name not like", value, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameIn(List<String> values) {
            addCriterion("create_name in", values, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotIn(List<String> values) {
            addCriterion("create_name not in", values, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameBetween(String value1, String value2) {
            addCriterion("create_name between", value1, value2, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateNameNotBetween(String value1, String value2) {
            addCriterion("create_name not between", value1, value2, "createName");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNull() {
            addCriterion("create_date is null");
            return (Criteria) this;
        }

        public Criteria andCreateDateIsNotNull() {
            addCriterion("create_date is not null");
            return (Criteria) this;
        }

        public Criteria andCreateDateEqualTo(Date value) {
            addCriterion("create_date =", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotEqualTo(Date value) {
            addCriterion("create_date <>", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThan(Date value) {
            addCriterion("create_date >", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateGreaterThanOrEqualTo(Date value) {
            addCriterion("create_date >=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThan(Date value) {
            addCriterion("create_date <", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateLessThanOrEqualTo(Date value) {
            addCriterion("create_date <=", value, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateIn(List<Date> values) {
            addCriterion("create_date in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotIn(List<Date> values) {
            addCriterion("create_date not in", values, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateBetween(Date value1, Date value2) {
            addCriterion("create_date between", value1, value2, "createDate");
            return (Criteria) this;
        }

        public Criteria andCreateDateNotBetween(Date value1, Date value2) {
            addCriterion("create_date not between", value1, value2, "createDate");
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