package com.mystudy.AOPProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * Created by Administrator on 2018-08-24.
 * 这个代理类负责生成刘德华的代理人
 */
public class LiuDeiHuaProxy {

    //设计一个类变量记住代理类要代理的目标对象
    private Person ldh=new LiuDeiHua();

    /**
        * 设计一个方法生成代理对象
        * @Method: getProxy
        * @Description: 这个方法返回刘德华的代理对象：Person person = LiuDeHuaProxy.getProxy();//得到一个代理对象
        *
         * @return 某个对象的代理对象
        */

    public Person getProxy(){
        //使用Proxy.newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)返回某个对象的代理对象
        //通过"Proxy"类提供的一个newProxyInstance方法用来创建一个对象的代理对象
        //ClassLoader 类的加载器
        return (Person) Proxy.newProxyInstance(LiuDeiHuaProxy.class.getClassLoader(), ldh.getClass().getInterfaces(), new InvocationHandler() {
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                if(method.getName().equals("sing")){
                    System.out.println("我是他的经纪人，要找他唱歌得先给十万块钱！！");
                    //已经给钱了，经纪人自己不会唱歌，就只能找刘德华去唱歌！
                   return method.invoke(ldh, args); //代理对象调用真实目标对象的sing方法去处理用户请求
                }
                if(method.getName().equals("dance")){
                    System.out.println("我是他的经纪人，要找他跳舞得先给二十万块钱！！");
                    //已经给钱了，经纪人自己不会唱歌，就只能找刘德华去跳舞！
                    return method.invoke(ldh, args);//代理对象调用真实目标对象的dance方法去处理用户请求
                }
                return  null ;
            }
        });
    }
}
