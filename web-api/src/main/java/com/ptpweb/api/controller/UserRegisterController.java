package com.ptpweb.api.controller;

import com.alibaba.fastjson.JSON;
import com.ptp.framework.result.Result;
import com.ptp.framework.result.ResultSupport;
import com.ptp.user.service.UserRegisterService;
import com.ptp.user.vo.PUserInfoVo;
import com.ptpweb.api.vo.UserRegisterParams;
import com.wordnik.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-13.
 */
@Api("用户接口")
@RestController
@RequestMapping(name = "用户注册",value = "user")
public class UserRegisterController {
@Autowired
private UserRegisterService userRegisterService;
    private final String inviteCode = "inviteCode";

     @ApiOperation(value = "测试1", notes = "")
     @RequestMapping(value = "test",method = RequestMethod.GET)
     public String Test()
     {
       return   userRegisterService.sayHello("abcd");
     }
    @ApiOperation(value = "测试2", notes = "")
    @RequestMapping(value = "testregister",method = RequestMethod.GET)
    public String testRegister()
    {
        PUserInfoVo userInfoVo=  userRegisterService.testGetUserInfo(1);
        return  "PUserInfoVo:"+ JSON.toJSONString(userInfoVo);
    }

    @ApiOperation(value = "注册", notes = "")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "phoneNum", dataType = "String", value = "用户名", paramType = "query", required = true),
            @ApiImplicitParam(name = "passWord", dataType = "String", value = "密码", paramType = "query", required = true),
            @ApiImplicitParam(name = "client", dataType = "String", value = "客户端(1:PC,2:微信,3:苹果,4:安卓)", paramType = "query", required = true),
            @ApiImplicitParam(name = "imageCode", dataType = "String", value = "图形验证码", paramType = "query", required = true),
            @ApiImplicitParam(name = "SmsCode", dataType = "String", value = "短信验证码", paramType = "query", required = true),
            @ApiImplicitParam(name = "platform", dataType = "String", value = "平台(HLW:好利网)", paramType = "query", required = true),
            @ApiImplicitParam(name = "token", dataType = "String", value = "token", paramType = "query", required = true),
            @ApiImplicitParam(name = "userType", dataType = "String", value = "userType", paramType = "query", required = true),
            @ApiImplicitParam(name = "inviteCode", dataType = "String", value = "邀请码", paramType = "query", required = false),
            @ApiImplicitParam(name = "bdUrl", dataType = "String", value = "bdUrl", paramType = "query", required = false),
            @ApiImplicitParam(name = "onlyCode", dataType = "String", value = "onlyCode", paramType = "query", required = false) })
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Result register(@RequestParam(value = "phoneNum", required = true) String phoneNum,
                           @RequestParam(value = "passWord", required = true) String passWord,
                           @RequestParam(value = "client", required = true) String client,
                           @RequestParam(value = "token", required = true) String token,
                           @RequestParam(value = "imageCode", required = true) String imageCode,
                           @RequestParam(value = "SmsCode", required = true) String SmsCode,
                           @RequestParam(value = "userType", required = true) String userType,
                           @RequestParam(value = "platform", required = true) String platform,
                           @RequestParam(value = "bdUrl", required = false) String bdUrl,
                           @RequestParam(value = "inviteCode", required = false) String inviteCode,
                           @RequestParam(value = "onlyCode", required = false) String onlyCode,
                           HttpServletRequest httpServletRequest) {
        //dubbo 调用  接口 通过类实现
        //userRegisterService.sayHello("abcd");
        Map requestMap=new HashMap();
        requestMap.put("phoneNum",phoneNum);
        requestMap.put("passWord",passWord);
        Result  result=userRegisterService.register(requestMap);
        return  result;
    }


    @ApiOperation(value = "用户注册2registerbyparams", notes = "")
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "phoneNum", dataType = "String", value = "用户名", paramType = "query", required = true),
//            @ApiImplicitParam(name = "passWord", dataType = "String", value = "密码", paramType = "query", required = true),
//            @ApiImplicitParam(name = "client", dataType = "String", value = "客户端(1:PC,2:微信,3:苹果,4:安卓)", paramType = "query", required = true) })
    @RequestMapping(value = "/registerbyparams", method = RequestMethod.POST)
    public Result registerbyparams(@RequestParam @ApiParam(value = "用户名", name = "phoneNum",required = true) String phoneNum,
                                   @RequestParam @ApiParam(value = "密码",name = "passWord", required = true) String passWord,
                                   @RequestParam @ApiParam(value = "客户端(1:PC,2:微信,3:苹果,4:安卓)", name = "client",required = true) String client) {
        //dubbo 调用  接口 通过类实现
        //userRegisterService.sayHello("abcd");
        Map requestMap=new HashMap();
        requestMap.put("phoneNum",phoneNum);
        requestMap.put("passWord",passWord);
        Result  result=userRegisterService.register(requestMap);
        return  result;
    }

    @ApiOperation(value = "用户注册2",notes = "注意事项")
    @RequestMapping(value = "register2",method = RequestMethod.POST)
    public Result register2(@RequestBody @ApiParam(name = "用户对象",value = "json格式",required = true)UserRegisterParams userRegisterParams){
        Result result=new ResultSupport<>();
        result.setCode("000");;
        result.setMsg("succ");
        result.setModel(userRegisterParams);
        return  result;
    }

    //paramType 有path以地址形式提交数据、query直接跟参数完成自动映射赋值（get方法使用）、body以流的形式提交仅支持POST（@requestBody）、header参数在request headers里面提交、form以form表单形式提交仅支持POST，dataType如果是自定义的实体对象，需要在请求参数时加上@requestBody注解
    @ApiOperation(value = "用户登录",notes = "")
    @RequestMapping(name = "login",method = RequestMethod.POST)
    public Result login(@RequestParam @ApiParam(value = "登录手机号",name = "phone",required = true) String phone,
                         @RequestParam @ApiParam( value = "登录密码",name = "pwd",required = true) String pwd){
        Result result=new ResultSupport<>();
        result.setCode("000");;
        result.setMsg("succ");
        return  result;
    }
}
