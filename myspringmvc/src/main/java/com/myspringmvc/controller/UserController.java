package com.myspringmvc.controller;

import com.myspringmvc.po.Item;
import com.myspringmvc.po.User;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

/**
 * Created by Administrator on 2018-10-25.
 */
@Controller
@RequestMapping("user")
public class UserController {
    @RequestMapping("index")
    public String index(){
        return "index";
    }

    @RequestMapping("findUserBysIds")
    public String findUserBysIds(Integer[]id,Model model){
        model.addAttribute("msg","接收到的参数"+ ArrayUtils.toString(id, ","));
        return "success";
    }
    //不能映射到关系 ，集合只能是 数组 或者对应到 POJO 中的List
    @RequestMapping("findUserBysIds2")
    public String findUserBysIds2(List<Integer> id, Model model){
        model.addAttribute("msg","接收到的参数"+id);
        return "success";
    }
    @RequestMapping("findUserBysIds3")
    public String findUserBysIds3(User user, Model model){
        model.addAttribute("msg","接收到的参数"+user.getUid());
        return "success";
    }

    @RequestMapping("updateUser")
    public String updateUser(User user, Model model){
        List<Item> itemList = user.getItemList() ;
        for(Item item :itemList) {
            model.addAttribute("msg", "接收到的参数" + item.getName());
        }
        return "success";
    }
}
