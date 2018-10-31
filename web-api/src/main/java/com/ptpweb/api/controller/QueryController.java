package com.ptpweb.api.controller;

import com.ptp.framework.result.Result;
import com.ptp.framework.result.ResultSupport;
import com.ptp.user.service.QueryService;
import com.wordnik.swagger.annotations.Api;
import com.wordnik.swagger.annotations.ApiOperation;
import com.wordnik.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-29.
 */
@Api(value = "后台查询报表")
@RestController
@RequestMapping(name = "queryadmin",value = "后台查询报表")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @ApiOperation(value = "用户信息查询列表",notes = "")
    @RequestMapping(value ="eidtRule",method = RequestMethod.GET)
    public Result edtiRule( @RequestParam@ApiParam(name ="userName",value = "")String userName,@RequestParam @ApiParam(name ="pageSize",value ="")String pageSize,
                            @RequestParam @ApiParam(name="pageIndex",value = "")String pageIndex){
        Map requestMap=new HashMap();
        Integer page_index = 0;
        Integer page_size = 10;
        try {
            page_index = Integer.parseInt(pageIndex);
        } catch (Exception e) {
            page_index = page_index <= 0 ? 1 : page_index;
        }
        requestMap.put("page_start", page_size * (page_index > 0 ? (page_index - 1) : 0));
        requestMap.put("page_size", page_size);
        requestMap.put("userName",userName);
        Result result=new ResultSupport<>();
        result=queryService.getUserList(requestMap);
        return  result;
    }
}
