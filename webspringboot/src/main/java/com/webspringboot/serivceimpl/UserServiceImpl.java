package com.webspringboot.serivceimpl;

import com.webspringboot.mapper.UserMapper;
import com.webspringboot.po.User;
import com.webspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by Administrator on 2018-09-12.
 */
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    public User findUserByUserName(String username){
        return  userMapper.findByuserName(username);
    }
}
