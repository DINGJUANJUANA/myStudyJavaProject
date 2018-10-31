package com.mystudy.AOPProxy;

/**
 * Created by Administrator on 2018-08-24.
 */
public class LiuDeiHua implements Person {
    public String sing(String name) {
        System.out.println("刘德华唱"+name+"歌！！");
        return "歌唱完了，谢谢大家！";
    }

    public String dance(String name) {
        System.out.println("刘德华跳"+name+"舞！！");
        return "跳完了，谢谢大家！";
    }
}
