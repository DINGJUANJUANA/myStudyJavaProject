package com.mystudymybatis.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2018-10-29.
 */
@Controller
@RequestMapping(value="/")
public class IndexController {

    @RequestMapping(value = "index")
    public String index(){
        return "index";
    }
}
