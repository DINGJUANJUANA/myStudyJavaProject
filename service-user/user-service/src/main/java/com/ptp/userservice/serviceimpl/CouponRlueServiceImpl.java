package com.ptp.userservice.serviceimpl;

import com.ptp.framework.cache.Jiucache;
import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.Result;
import com.ptp.framework.result.ResultSupport;
import com.ptp.framework.util.UUIDUtil;
import com.ptp.user.service.CouponRuleService;
import com.ptp.userservice.mapper.CouponRuleMapper;
import com.ptp.userservice.po.CouponRule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import static java.lang.Float.parseFloat;
import static java.lang.Integer.parseInt;

/**
 * Created by Administrator on 2018-08-23.
 */
public class CouponRlueServiceImpl implements CouponRuleService {

    @Autowired
    CouponRuleMapper couponRuleMapper;

    @Override
    public Result addRule(Map<String, String> params) throws ZhongyingiException {
        CouponRule couponRule = new CouponRule();
        couponRule.setName(params.get("name"));
        couponRule.setCouponRuleNo(UUIDUtil.getUUID());
        couponRule.setStatus(0);
        couponRule.setBatchno(params.get("batchno"));
        couponRule.setAmount(parseFloat(params.get("amount")));
        couponRule.setBidAmount(parseFloat(params.get("bidAmount")));
        couponRule.setProductLimitMin(parseFloat(params.get("productLimitMin")));
        couponRule.setProductLimitMax(parseFloat(params.get("productLimitMax")));
        couponRule.setProductLimittype(parseInt(params.get("productLimittype")));
        couponRule.setRuleDesc(params.get("ruleDesc"));
        couponRule.setRemark(params.get("remark"));
        couponRule.setCreateName("admin");
        //  SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        couponRule.setCreateDate(new Date());
        couponRuleMapper.insert(couponRule);
        Result result = new ResultSupport<>();
        result.setCode("000");
        result.setMsg("succ");
        return result;
    }

    @Override
    public Result delRule(Integer ruleId) throws ZhongyingiException {
        couponRuleMapper.deleteByPrimaryKey(ruleId);
        return null;
    }

    @Override
    public Result editRule(Map<String, String> params) throws ZhongyingiException {
        CouponRule couponRule = new CouponRule();
        int ruleId=parseInt(params.get("ruleId"));
        couponRule=couponRuleMapper.selectByPrimaryKey(ruleId);
        couponRule.setName("红包规则测试1");
        couponRule.setBatchno("20180823A");
        couponRule.setAmount(100.0f);
        couponRule.setRuleDesc("单笔投资满10000，投资1-12个月产品");
        couponRuleMapper.updateByPrimaryKeySelective(couponRule);
        Result result = new ResultSupport<>();
        result.setCode("000");
        result.setMsg("succ");
        return result;
    }

    @Autowired
    private  Jiucache jiucache;
    public String redisSetGet() throws ZhongyingiException{
       jiucache.put("test","abc");
        return  "cdef";
//        Object result=jiucache.getData("test");
//        return  String .valueOf(result);
    }

    @Autowired
    protected RedisTemplate<Serializable,Serializable> redisTemplate;

    public String saveUser( ) {
        redisTemplate.boundValueOps("test1").set("xiaoming");
        redisTemplate.execute(new RedisCallback<Object>() {
            @Override
            public Object doInRedis(RedisConnection connection) throws DataAccessException {
                connection.set(redisTemplate.getStringSerializer().serialize("user.uid." + 1),
                        redisTemplate.getStringSerializer().serialize("xiaoming"));
                return null;
            }
        });
        return "testabc";
    }
}
