package com.mystudy.AOPProxy;

import org.springframework.aop.framework.ProxyFactory;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

/**
 * Created by Administrator on 2018-08-24.
 */
public class JDKDynamicProxyTest {

    public static void  main(String[] args){
        try {
            // 创建一个实例对象，这个对象是被代理的对象
            CalculatorImpl calculator = new CalculatorImpl();
            //创建一个与代理对象相关联的InvocationHandler
            InvocationHandler calHandler = new SomeHandler<Calculator>(calculator);
            //创建一个代理对象stuProxy来代理zhangsan，代理对象的每个执行方法都会替换执行Invocation中的invoke方法
            Calculator proxied = (Calculator) Proxy.newProxyInstance(Calculator.class.getClassLoader(), calculator.getClass().getInterfaces(), calHandler);
            int result = proxied.calculate(10, 2);
            System.out.println(String.valueOf(result));
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
