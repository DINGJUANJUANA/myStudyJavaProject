package com.mystudy.AOPProxy;

/**
 * Created by Administrator on 2018-08-24.
 */

public class ProxyTest {

    public static void main(String[] args){
        LiuDeiHuaProxy proxy=new LiuDeiHuaProxy();
        Person p=proxy.getProxy();
        String retValue=p.sing("冰雨");
        System.out.println(retValue);
        String retValue2=p.dance("街舞");
        System.out.println(retValue2);
    }
}
