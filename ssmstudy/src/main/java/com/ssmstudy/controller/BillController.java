package com.ssmstudy.controller;

import com.alibaba.fastjson.JSON;
import com.ssmstudy.po.Bill;
import com.ssmstudy.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Method;
import java.util.List;


/**
 * Created by Administrator on 2018-10-31.
 */
@Controller
@RequestMapping(value = "bill")
public class BillController {

    @Autowired
    private BillService billService;
    //v1
    @RequestMapping(value = "list")
    public String list(){
        return "bill/list";
    }

    //,method = RequestMethod.POST
   @ResponseBody
    @RequestMapping(value = "getList")
    public String getList(Bill queryParams){
       String test= queryParams.getDescription();
       System.out.println("查询参数"+test);
        List<Bill> billList=billService.getList();
        String datajson= JSON.toJSONString(billList);
        //服务器断分页数据源
        String  result="{\"total\":" +String.valueOf(billList.size()) + ",\"rows\":" + datajson + "}";
        return result;
    }
}
