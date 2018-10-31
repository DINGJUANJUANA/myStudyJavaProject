package com.study.velocity.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by chenglong.zhou on 2018/9/12.
 */
public class BaseController {

    protected String getSessionId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session == null? null: session.getId();
    }
}
