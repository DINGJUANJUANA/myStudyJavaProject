package com.ptp.userservice.serviceimpl;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2018-08-20.
 */
public class UserRegisterServiceImplTest {
    @Test
    public void sayHello() throws Exception {
        assertEquals("Get:abcd",new UserRegisterServiceImpl().sayHello("abcd"));
    }

    @Test
    public void testGetUserInfo() throws Exception {
        new UserRegisterServiceImpl().testGetUserInfo(1);
    }

    @Test
    public void register() throws Exception {

    }

}