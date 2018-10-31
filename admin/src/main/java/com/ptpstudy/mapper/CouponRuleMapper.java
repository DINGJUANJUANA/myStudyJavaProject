package com.ptpstudy.mapper;

import com.ptpstudy.po.CouponRule;
import com.ptpstudy.po.CouponRuleExample;
import java.util.List;

public interface CouponRuleMapper {
    int countByExample(CouponRuleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(CouponRule record);

    int insertSelective(CouponRule record);

    List<CouponRule> selectByExample(CouponRuleExample example);

    CouponRule selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(CouponRule record);

    int updateByPrimaryKey(CouponRule record);
}