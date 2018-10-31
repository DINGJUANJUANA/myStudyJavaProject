package com.ptp.userservice.serviceimpl;

import com.ptp.framework.Constant;
import com.ptp.framework.ResConstants;
import com.ptp.framework.cache.Jiucache;
import com.ptp.framework.result.Result;
import com.ptp.framework.exceptions.ZhongyingiException;
import com.ptp.framework.result.ResultSupport;
import com.ptp.framework.util.UUIDUtil;
import com.ptp.user.model.User;
import com.ptp.user.service.UserRegisterService;

import com.ptp.userservice.mapper.PUserInfoMapper;
import com.ptp.userservice.mapper.self.PUserInfoSelfMapper;
import com.ptp.user.vo.PUserInfoVo;
import com.ptp.userservice.po.PUserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;

/**
 * Created by Administrator on 2018-08-13.
 */

public class UserRegisterServiceImpl implements UserRegisterService {

    private static  final Logger LOGGER= LoggerFactory.getLogger(UserRegisterServiceImpl.class);

   // @Autowired
   // private Jiucache jiucache;
    @Autowired
    private PUserInfoSelfMapper pUserInfoSelfMapper;
    @Autowired
    private PUserInfoMapper pUserInfoMapper;
    public String sayHello(String name) {
        return "Get:"+name ;
    }

    public PUserInfoVo testGetUserInfo(Integer id) {
        return pUserInfoSelfMapper.selectPUserInfoVoById(id);
    }

    /*
    用户登录
     */
    public Result login(Map<String, String> params) throws ZhongyingiException {
        //jiucache.put();
        Result  result=new ResultSupport<>();
        result.setCode(ResConstants.SUCCESS.getCode());
        result.setMsg("注册成功！");
        return result;
    }
    /*
 用户注册入参验证
     */
    private void regValidate(String[] params)
    {
        if (params[0] != null) {
            Matcher numMatcher = Constant.numReg.matcher(params[0]);
            if (!numMatcher.matches()) {
             //   LOGGER.error(String.format("base validate error : format  is not correct " + ": [params:{phoneNum:%s}]",
             //           params[0]));
                throw new ZhongyingiException(ResConstants.PARAM_NOT_RIGHT.getCode(), "用户名格式错误");
            }
        }

    }

    private  void  checkRegisterInfo(Map<String,String>params)
    {

    }

    public Result register(Map<String, String> params) throws ZhongyingiException {
      //  LOGGER.info("注册入参:"+params.toString());
        this.regValidate(new String[] { params.get("phoneNum"), params.get("passWord"), params.get("imageCode"),
                params.get("SmsCode"), null });
        this.checkRegisterInfo(params);

        //1.判断手机号是否存在
      /*  User user=new User();
        user.setMobile(params.get("phoneNum"));
        user=pUserInfoSelfMapper.selectOne(user);
        if(user!=null)
        {
            throw new ZhongyingiException(ResConstants.MOBILE_IS_EXIST_EXCEPTION.getCode(),
                    ResConstants.MOBILE_IS_EXIST_EXCEPTION.getMsg());
        }*/
        //2.判断邀请码是否存在

        //3.缓存判断注册IP

        //4.用户注册写入数据库
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        PUserInfo userInfo=new PUserInfo();
        userInfo.setuserCode(UUIDUtil.getUUID());
        userInfo.setUserName(params.get("phoneNum"));

        try {
            pUserInfoMapper.insertSelective(userInfo);
        } catch (Exception e) {
           // LOGGER.error(e.getMessage() + "入参:" + params.toString());
            throw new ZhongyingiException(ResConstants.ADD_DATA_FAIL.getCode(),
                    ResConstants.ADD_DATA_FAIL.getMsg());
        }

        Result  result=new ResultSupport<>();
        result.setCode(ResConstants.SUCCESS.getCode());
        result.setMsg("注册成功！");
        return result;
    }
}
