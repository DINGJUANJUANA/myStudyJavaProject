package com.mystudy.autowried;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2018-08-29.
 */
//@Component
public class TextEditor {
    //@Autowired 可自动通过byType 自动连接 找到spring ioc 容器中对应的 bean 自动装配
    @Autowired
   private SpellChecker spellChecker;
//    @Autowired
//     public void setSpellChecker( SpellChecker spellChecker ){
//        this.spellChecker = spellChecker;
//    }
//    public SpellChecker getSpellChecker( ) {
//        return spellChecker;
//    }
    public void spellCheck() {
        spellChecker.checkSpelling();
    }

   // @Autowired
    public TextEditor(SpellChecker spellChecker ){
        System.out.println("Inside TextEditor constructor." );
        this.spellChecker = spellChecker;
    }
}
