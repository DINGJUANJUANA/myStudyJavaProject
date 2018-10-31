package com.ssmstudy.serviceimpl;

import com.ssmstudy.mapper.UserMapper;
import com.ssmstudy.po.User;
import com.ssmstudy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Administrator on 2018-09-12.
 */

//注意事项：类上加上@Service
@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    public User findUserByUserName(String username){
        return  userMapper.findByUserName(username);
    }
}
