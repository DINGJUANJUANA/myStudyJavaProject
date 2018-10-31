package com.mystudy.transation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import javax.sql.DataSource;

/**
 * Created by Administrator on 2018-08-30.
 */
public class AccountDaoImpl implements AccountDao   {

    public void test(){
        System.out.println("accountdaoimpl test");
    }
    private JdbcTemplate jdbcTemplate;

    public void  setDataSource(javax.sql.DataSource dataSource){
        System.out.println("setDataSource");
        this.jdbcTemplate=new JdbcTemplate(dataSource);
    }

    @Override
    public void outMoney(String out, Double money) {
        String sql="update account set money=money-? where name=?";
        this.jdbcTemplate.update(sql,money,out);
    }

    @Override
    public void inMoney(String in, Double money) {
        String sql = "update account set money = money + ? where name = ?";
        this.jdbcTemplate.update(sql, money,in);
    }
}
