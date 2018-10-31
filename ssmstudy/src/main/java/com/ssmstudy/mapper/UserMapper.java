package com.ssmstudy.mapper;


import com.ssmstudy.po.User;
import com.ssmstudy.po.UserExample;

import java.util.List;

public interface UserMapper {

    User findByUserName(String username);

    int countByExample(UserExample example);

    int deleteByPrimaryKey(Integer uid);

    int insert(User record);

    int insertSelective(User record);

    List<User> selectByExample(UserExample example);

    User selectByPrimaryKey(Integer uid);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}