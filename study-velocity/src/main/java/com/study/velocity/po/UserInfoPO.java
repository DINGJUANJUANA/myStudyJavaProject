package com.study.velocity.po;

import java.util.Date;

/**
 * Created by chenglong.zhou on 2018/9/12.
 */
public class UserInfoPO {

    private Integer id;

    private String sex;

    private String name;

    private Date age;

    public Date getAge() {
        return age;
    }

    public void setAge(Date age) {
        this.age = age;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
