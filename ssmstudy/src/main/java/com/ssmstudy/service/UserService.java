package com.ssmstudy.service;

import com.ssmstudy.po.User;

/**
 * Created by Administrator on 2018-09-12.
 */
public interface UserService {
    User findUserByUserName(String username);
}
