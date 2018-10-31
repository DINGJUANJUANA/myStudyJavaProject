package com.ssmstudy.mapper;


import com.ssmstudy.po.Bill;
import com.ssmstudy.po.BillExample;

import java.util.List;

public interface BillMapper {

    int countByExample(BillExample example);

    int insert(Bill record);

    int insertSelective(Bill record);

    List<Bill> selectByExample(BillExample example);

    List<Bill> selectList();
}