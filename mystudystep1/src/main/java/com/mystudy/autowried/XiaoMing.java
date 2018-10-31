package com.mystudy.autowried;

import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Administrator on 2018-08-29.
 */
public class XiaoMing {

    public XiaoMing(){
        System.out.println("XiaoMing 类构造");
    }


    public void testAction(){
        System.out.println("测试调用通过");
    }

//    @Autowired
//    public void setDance(DanceImpl dance){
//        this.dance=dance;
//    }

    @Autowired
    private DanceImpl dance;

    public DanceImpl getDanceImpl(){
        return dance;
    }
    public void goDance(){
        dance.personDance();
    }
}
