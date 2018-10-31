package com.mystudy.bean;

/**
 * Created by Administrator on 2018-08-22.
 */
public class Man {
    private  Car car;
//    public void setCar(Car car){
//        this.car=car;
//    }
    public  Man(Car car){
        this.car=car;
    }

    public void work(){
        car.driver();
    }
}
