package com.ptp.userservice.serviceimpl;

import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.Result;
import com.ptp.framework.result.ResultSupport;
import com.ptp.framework.util.PageUtils;
import com.ptp.framework.util.R;
import com.ptp.user.service.QueryService;
import com.ptp.userservice.mapper.self.PUserInfoSelfMapper;
import com.ptp.userservice.po.PUserInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-29.
 */
public class QueryServiceImpl implements QueryService {
    @Autowired
    private PUserInfoSelfMapper pUserInfoSelfMapper;

    public Result getUserList(Map<String, Object> params) throws ZhongyingiException {
        BigInteger allCount=BigInteger.ZERO;
      //  PUserInfo pUserInfo=  pUserInfoSelfMapper.selectByuserName("djj");
      List<PUserInfo> list=pUserInfoSelfMapper.selectPUserInfoList(params);
        allCount=pUserInfoSelfMapper.selectPUserInfoCount(params);
        Map map=new HashMap();
        map.put("list",list);
      //  map.put("list",pUserInfo);
        map.put("allcount",allCount);
        Result result=new ResultSupport<>();
        result.setCode("000");
        result.setMsg("succ");
        result.setModel(map);
        return result;
    }
    public R getUserList2(){
        List<Map> listmap=pUserInfoSelfMapper.selectListMapUserList();
        PageUtils pageUtil = new PageUtils(listmap,listmap.size() , 2, 2);
        return R.ok().put("page", pageUtil);
    }
}
