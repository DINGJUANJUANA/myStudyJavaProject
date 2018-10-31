package com.mystudy.AOPProxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

import static javafx.scene.input.KeyCode.T;

/**
 * Created by Administrator on 2018-08-24.
 */
public class SomeHandler<T> implements InvocationHandler {

    private T target;
    public SomeHandler(){

    }
    public SomeHandler( T target){
        this.target = target;
    }
    /**
     * proxy:代表动态代理对象
     * method：代表正在执行的方法
     * args：代表调用目标方法时传入的实参
     */

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("代理执行" +method.getName() + "方法");
        Object result=method.invoke(target,args);
        return result;
    }
}
