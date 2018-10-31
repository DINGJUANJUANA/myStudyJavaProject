package com.study.velocity.controller;

import com.study.velocity.po.UserInfoPO;
import com.study.velocity.utils.DateTimeUtils;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by chenglong.zhou on 2018/9/12.
 */
@Controller
@RequestMapping("/")
public class IndexController extends BaseController {

    @RequestMapping("test")
    public String test(){
        return "test";
    }
    @RequestMapping(value = {"/", "index"})
    public ModelAndView index(ModelAndView mav) {

        final Date date = new Date();

        //对象例子
        List<UserInfoPO> userInfoPOList = Arrays.asList(1,2,3,4,5,6).stream().map(i -> {
            UserInfoPO userInfoPO = new UserInfoPO();
            userInfoPO.setId(i);
            userInfoPO.setName("数字【"+i+"】");
            userInfoPO.setSex(i/2==0? "男士":"女士");
            userInfoPO.setAge(DateTimeUtils.addDays(date, i+2));
            return userInfoPO;
        }).collect(Collectors.toList());


        mav.addObject("userInfoPOList", userInfoPOList);
        mav.addObject("title", "welcome to china");
        mav.setViewName("index");
        return mav;
    }

    @RequestMapping(value = {"/", "login"})
    public ModelAndView login(ModelAndView mav){
        mav.setViewName("login");
        return mav;
    }
}
