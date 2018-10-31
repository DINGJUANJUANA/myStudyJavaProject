package com.mystudy.autowried;

import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2018-08-29.
 */
//@Component
public class SpellChecker {
    public SpellChecker(){
        System.out.println("Inside SpellChecker constructor." );
    }
    public void checkSpelling(){
        System.out.println("Inside checkSpelling." );
    }
}
