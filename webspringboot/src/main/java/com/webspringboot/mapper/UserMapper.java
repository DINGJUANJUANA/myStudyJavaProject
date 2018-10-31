package com.webspringboot.mapper;

import com.webspringboot.po.User;
import com.webspringboot.po.UserExample;
import java.util.List;

public interface UserMapper {

    User findByuserName(String username);

    int countByExample(UserExample example);

    int deleteByPrimaryKey(Integer uid);

    int insert(User record);

    int insertSelective(User record);

    List<User> selectByExample(UserExample example);

    User selectByPrimaryKey(Integer uid);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}