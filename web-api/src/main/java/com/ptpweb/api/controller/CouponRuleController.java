package com.ptpweb.api.controller;

import com.ptp.framework.result.Result;
import com.ptp.framework.result.ResultSupport;
import com.ptp.framework.util.UUIDUtil;
import com.ptp.user.service.CouponRuleService;
import com.ptpweb.api.vo.CouponRuleVo;
import com.ptpweb.api.vo.UserRegisterParams;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static java.lang.Float.parseFloat;
import static java.lang.Integer.parseInt;

/**
 * Created by Administrator on 2018-08-23.
 */
@Api("红包规则接口")
@RestController
@RequestMapping(name = "couponrule",value = "红包规则增删改查")
public class CouponRuleController {

    @Autowired
    CouponRuleService couponRuleService;

    @ApiOperation(value = "添加红包规则",notes = "")
    @RequestMapping(value = "addRule",method = RequestMethod.POST)
    public Result addRule(@RequestBody @ApiParam(name = "红包规则对象",value = "json格式",required = true)CouponRuleVo couponRuleVo){
        Result result=new ResultSupport<>();
        Map requestMap=new HashMap();
        requestMap.put("name",couponRuleVo.getName());
        requestMap.put("batchno",couponRuleVo.getBatchno());
        requestMap.put("amount",Float.toString(couponRuleVo.getAmount()));
        requestMap.put("bidAmount",Float.toString(couponRuleVo.getBidAmount()));
        requestMap.put("productLimitMin",Float.toString(couponRuleVo.getProductLimitMin()) );
        requestMap.put("productLimitMax",Float.toString(couponRuleVo.getProductLimitMax()));
        requestMap.put("productLimittype",couponRuleVo.getProductLimittype());
        requestMap.put("ruleDesc",couponRuleVo.getRuleDesc());
        requestMap.put("remark",couponRuleVo.getRemark());
        result=couponRuleService.addRule(requestMap);
        return  result;
    }

    @ApiOperation(value = "编辑红包规则",notes = "")
    @RequestMapping(value ="eidtRule",method =RequestMethod.POST)
    public Result edtiRule(@RequestParam @ApiParam(name ="ruleId",value ="红包规则ID") String ruleId,@RequestParam@ApiParam(name ="name",value = "")String name){
        Map requestMap=new HashMap();
        requestMap.put("ruleId",ruleId);
        requestMap.put("name",name);
        Result result=new ResultSupport<>();
        result=couponRuleService.editRule(requestMap);
        return  result;
    }
}
