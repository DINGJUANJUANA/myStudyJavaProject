package com.ptp.userservice.mapper;

import com.ptp.userservice.po.Bill;
import com.ptp.userservice.po.BillExample;
import java.util.List;

public interface BillMapper {
    int countByExample(BillExample example);

    int insert(Bill record);

    int insertSelective(Bill record);

    List<Bill> selectByExample(BillExample example);
}