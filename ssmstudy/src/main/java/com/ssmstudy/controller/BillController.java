package com.ssmstudy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2018-10-31.
 */
@Controller
@RequestMapping(value = "bill")
public class BillController {

    @RequestMapping(value = "list")
    public String list(){
        return "bill/list";
    }
}
