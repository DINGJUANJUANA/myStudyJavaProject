package com.ptpweb.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by Administrator on 2018-09-12.
 */
@Controller
@RequestMapping("/home")
public class FreemarkerController {

    @RequestMapping("/testa")
    public String testa(){
        return "testa";
    }
}
