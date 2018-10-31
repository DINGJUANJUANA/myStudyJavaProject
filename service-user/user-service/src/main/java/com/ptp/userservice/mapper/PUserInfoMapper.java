package com.ptp.userservice.mapper;

import com.ptp.userservice.po.PUserInfo;
import com.ptp.userservice.po.PUserInfoExample;
import java.util.List;

public interface PUserInfoMapper {
    int countByExample(PUserInfoExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(PUserInfo record);

    int insertSelective(PUserInfo record);

    List<PUserInfo> selectByExample(PUserInfoExample example);

    PUserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(PUserInfo record);

    int updateByPrimaryKey(PUserInfo record);
}