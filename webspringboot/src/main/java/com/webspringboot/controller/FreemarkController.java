package com.webspringboot.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Administrator on 2018-09-12.
 */

@Controller
@RequestMapping(name = "home",value = "home")
public class FreemarkController {

    @RequestMapping(value = "testvm",method = RequestMethod.GET)
    public String testvm(){
        return "testvm";
    }

    @RequestMapping(value = "test",method = RequestMethod.GET)
    public @ResponseBody String test(){
        return "test";
    }

    @RequestMapping("/a.html")
    public String test2(){
        return "abcd";
    }

    @RequestMapping("/index.html")
    public String index(){
        return "indexabc";
    }

    @RequestMapping("/abc")
    public String index2(HttpServletRequest request, HttpServletResponse response){
        return "abc";
    }
}
