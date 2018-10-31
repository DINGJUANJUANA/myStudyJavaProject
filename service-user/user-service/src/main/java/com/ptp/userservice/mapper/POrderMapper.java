package com.ptp.userservice.mapper;

import com.ptp.userservice.po.POrder;
import com.ptp.userservice.po.POrderExample;
import java.util.List;

public interface POrderMapper {
    int countByExample(POrderExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(POrder record);

    int insertSelective(POrder record);

    List<POrder> selectByExample(POrderExample example);

    POrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(POrder record);

    int updateByPrimaryKey(POrder record);
}