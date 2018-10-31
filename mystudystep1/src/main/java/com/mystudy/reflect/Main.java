
package com.mystudy.reflect;

import javafx.util.Pair;

import java.awt.*;
import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;
import java.util.List;

/**
 * Created by Administrator on 2018-08-20.
 * 练习反射  class
 */
public class Main {
    public  static   void  main(String[] args) throws Exception  {
        Class cls;
        cls= Class.forName("com.mystudy.reflect.Student");
        System.out.println("class name:"+cls.getName());
        System.out.println("classs simple name:"+cls.getSimpleName());
        System.out.println("package name:"+cls.getPackage().getName());
        System.out.println("is interface?"+cls.isInterface());

        Student s=(Student) cls.newInstance();
        System.out.println( s.sayHi("hi"));
       //Field 相关
        Field f=cls.getField("name");
        System.out.println(f.get(s));
        f.setAccessible(true);
        System.out.println( f.getModifiers());

        //Method 对象
        Method m=cls.getMethod("sayHi",String.class);
        System.out.println( m.invoke(s,"abc") );
       //  BeanInfo beanInfo= Introspector.getBeanInfo(cls);
       // for(PropertyDescriptor )

         //Constructor 对象 调用构造方法
        Constructor c=cls.getConstructor(String.class,Integer.class);

        Class supperclass=  cls.getSuperclass();
        if(supperclass!=null)
            System.out.println(supperclass.getName().toString());
        else
            System.out.println("Student has no supperclass");

        //Annotation 注解 放在java 源码

        //泛型
        List<String> list=new ArrayList<String>();
        list.add("Test");
        String test=list.get(0);
        System.out.println(test);

        String[] strs={"A1","B2","C3"};
        Arrays.sort(strs);
        System.out.println(Arrays.toString(strs));

        Student[] ss={new Student("xim",10),new Student("zhc",9)};
        Arrays.sort(ss);
        System.out.println(Arrays.toString(ss));

        Pair[] arr=new Pair[2];

        Class<String > clazz=String.class;
        String s1=clazz.newInstance();
        System.out.println(s1);

        Constructor<String> cons=clazz.getConstructor(String.class);
        String s2=cons.newInstance("Hello");
        System.out.println(s2);

//        @SuppressWarnings("unchecked")
//        Pair<String>[] ps = (Pair<String>[])new Pair[2];
//        ps[0]=new Pair("a","b");
//        ps[0]=new Pair("x","y");
//        System.out.println(Arrays.toString(ps));

        List<String> list1=new ArrayList<String>();
        list1.add("a");
        list1.add("b");
        list1.add("c");
       for (String liststr:list1){
           System.out.println(liststr);
       }

    }

}
