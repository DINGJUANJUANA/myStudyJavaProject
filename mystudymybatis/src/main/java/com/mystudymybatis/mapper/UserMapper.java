package com.mystudymybatis.mapper;

import com.mystudymybatis.po.OrderExt;
import com.mystudymybatis.po.POrder;
import com.mystudymybatis.po.PUserInfo;
import com.mystudymybatis.vo.UserQueryVo;

import javax.xml.crypto.dsig.spec.ExcC14NParameterSpec;
import java.util.List;

/**
 * Created by Administrator on 2018-09-07.
 */
public interface UserMapper {
     PUserInfo  findUserById(Integer userId);

     List<PUserInfo> findUserAndOrderRstMap();

     PUserInfo findUserByName(String userName);

     void insertUser(PUserInfo pUserInfo);
     List<OrderExt> findOrdersAndUserRstMap() throws Exception;

     List<PUserInfo> findUserList(UserQueryVo vo);

     Integer findUserCount(UserQueryVo vo);
}
