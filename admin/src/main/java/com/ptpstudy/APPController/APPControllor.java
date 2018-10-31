package com.ptpstudy.APPController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2018-09-03.
 */
@RestController
@RequestMapping(value = "app")
public class APPControllor {

    @RequestMapping(value = "ios.html")
    public String appiOSList(){
        return "IOS";
    }

    @RequestMapping(value = "myvuextest.html")
    public String myvuexTest(){
        return "app/myvuextest.html";
    }
}
