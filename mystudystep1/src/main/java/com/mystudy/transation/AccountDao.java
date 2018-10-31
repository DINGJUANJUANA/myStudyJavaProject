package com.mystudy.transation;

/**
 * Created by Administrator on 2018-08-30.
 */
public interface AccountDao {
    public void outMoney(String out,Double money);
    public void inMoney(String in,Double money);
}
