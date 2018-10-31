package com.mystudy.transation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by Administrator on 2018-08-30.
 */
public class AccountServiceImpl  implements AccountService{
    //注入DAO类
    private AccountDao  accountDao;
    public void setAccountDao(AccountDao accountDao) {
        System.out.println("setAccountDao");
        this.accountDao = accountDao;
    }

    @Transactional(isolation = Isolation.DEFAULT,propagation = Propagation.REQUIRED)
    public void transfer(String out, String in, Double money) {
        System.out.println("Begin transfer");
        accountDao.outMoney(out,money);
        int  i=1/0;
        accountDao.inMoney(in,money);
    }
}
