package com.mystduystep2;

/**
 * Created by Administrator on 2018-09-10.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**Freemarker模板的Controller*/

@Controller
@RequestMapping("/home")
public class FreemarkerAndJsp {


    /**
     * Freemarker模板的Controller
     */

    @RequestMapping(value = "/welcome", method = {RequestMethod.GET})

    public ModelAndView getFirstPage(HttpServletRequest request) {

//welcom就是视图的名称（welcom.ftl）

        ModelAndView mv = new ModelAndView("welcome");

        mv.addObject("name", "My First Spring Mvc and Freemarker !");

        return mv;
    }
    /**jsp模板的Controller*/

    @RequestMapping(value="/jsp",method={RequestMethod.GET})

    public ModelAndView getJsp(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView("index");

        mv.addObject("message1", "切换到jsp模板、");

        mv.addObject("message2", "My First Spring Mvc");

        mv.setViewName("hello/index");

        return mv;

    }
}