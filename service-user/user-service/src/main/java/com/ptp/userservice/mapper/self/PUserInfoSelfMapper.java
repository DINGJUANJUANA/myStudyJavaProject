package com.ptp.userservice.mapper.self;

import com.ptp.user.model.User;
import com.ptp.userservice.po.PUserInfo;
import com.ptp.user.vo.PUserInfoVo;
import tk.mybatis.mapper.common.Mapper;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

public interface PUserInfoSelfMapper extends Mapper<User>{

    PUserInfo selectByuserName(String userName);

    PUserInfoVo selectPUserInfoVoById(Integer id);

    List<PUserInfo> selectPUserInfoList(Map<String,Object> mapper);

    BigInteger selectPUserInfoCount(Map<String,Object> mapper);

    List<Map> selectListMapUserList();

}