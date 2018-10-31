package com.mystudymybatis.mapper;


import com.mystudymybatis.po.PUserInfo;
import com.mystudymybatis.po.PUserInfoExample;

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