package com.ssmstudy.controller;

import com.ssmstudy.po.User;
import com.ssmstudy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2018-10-31.
 */
@Controller
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/tologin")
    public String toLogin(){
        return "login";
    }

    @RequestMapping(value ="login")
    public String login(User user, HttpServletRequest request, HttpServletResponse response, Model modelAndView){
        //1.验证登录用户名密码
        User dbuser=userService.findUserByUserName(user.getUsername());
        if(dbuser==null){
            modelAndView.addAttribute("msg","用户不存在");
            return "login";
        }else if(!dbuser.getPassword().equals(user.getPassword())){
            modelAndView.addAttribute("msg","密码不正确");
            return "login";
        }
        else{
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html;charset=UTF-8");
            //使用request对象的getSession()获取session
            HttpSession session=request.getSession();
            session.setAttribute("loginuser",user.getUsername());
            String sessionId=session.getId();
           /* if(session.isNew()){
                modelAndView.addAttribute("msg","session创建成功，session的id是："+sessionId);
            }else{
                modelAndView.addAttribute("msg","服务器已经存在该session了，session的id是："+sessionId);
            }*/
            return "redirect:/index";
        }
    }

    @RequestMapping(value ="logout")
    public String logout(HttpSession session){
        session.invalidate();
        return "redirect:/user/tologin";
    }

}
