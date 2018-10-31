package com.ssmstudy.controller;

import com.ssmstudy.po.User;
import com.ssmstudy.service.UserService;
import com.ssmstudy.vo.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2018-10-29.
 */
@Controller
@RequestMapping(value = "/")
public class IndexController {

    @RequestMapping(value = "index")
    public String  index(HttpServletRequest request, HttpServletResponse response, HttpSession session, Model modelAndView){
       // modelAndView.addObject("userInfo",user);
       Object loginuser=  session.getAttribute("loginuser");
        if(loginuser==null || loginuser.toString().equals("")){
            return "redirect:/user/tologin";
        }
        modelAndView.addAttribute("loginuser",loginuser.toString());
        modelAndView.addAttribute("msg","ABC");

        return "index";
       // return "index";
    }

    @RequestMapping(value = "test")
    public String test(){
        return "test";
    }

    @RequestMapping(value ="getitem")
    public String getItem(Item item){
        System.out.println(item.getName());
        return "success";
    }


}
