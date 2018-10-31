package com.mystudy.reflect;

/**
 * Created by Administrator on 2018-08-20.
 */
public class Student  implements Comparable<Student>{

    @Range
    private  int age;
    @NotNull
    public  String name="小明";
    public   String address;

    public  Student(){

    }
    public  Student(@NotNull  String name,Integer age) {
        this.name=name;
        this.age=age;
    }
    public String  sayHi(String title) {
        return title;
    }

    public int compareTo(Student o) {
       if(this.age<o.age)
           return  -1;
        else
           return 1;
    }
}
