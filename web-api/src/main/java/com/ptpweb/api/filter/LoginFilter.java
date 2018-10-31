package com.ptpweb.api.filter;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.alibaba.fastjson.JSON;
import com.ptp.framework.ResConstants;
import com.ptp.framework.cache.Jiucache;
import com.ptp.framework.result.ResultSupport;
import org.apache.commons.lang3.BooleanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Administrator on 2018-08-28.
 * @WebFilter(filterName = "test",urlPatterns = "/user/*")
 * 使用web.xml 的配置方式
 */
@Component
public class LoginFilter implements Filter {
    @Autowired
    private Jiucache jiucache;

    private Boolean enabled; // 过滤器开关

    private String[] includes; // 需要登录的路径

    private String[] excludes;// 排除登录的路径

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
       System.out.println("---------------------->过滤器被创建");
        String enabledCfg = filterConfig.getInitParameter("enabled");
        enabledCfg = org.apache.commons.lang3.StringUtils.isBlank(enabledCfg) ? "true" : enabledCfg;
        enabled = BooleanUtils.toBoolean(enabledCfg);
        String includesCfg = filterConfig.getInitParameter("includes");
        String excludesCfg = filterConfig.getInitParameter("excludes");
        includes = org.apache.commons.lang3.StringUtils.split(includesCfg, ",");
        excludes = org.apache.commons.lang3.StringUtils.split(excludesCfg, ",");
        System.out.println("---------------------->过滤器被创建---"+excludesCfg);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        String requestUri = httpRequest.getRequestURI();
        System.out.println("--------------------->过滤器：请求地址"+requestUri);
        if(!requestUri.contains("test")){
            response.setContentType("text/plain;charset=UTF-8");
            ResultSupport responseModel = new ResultSupport();
            responseModel.setModel(null);
            responseModel.setCode(ResConstants.USER_NOT_LOGIN.getCode());
            responseModel.setMsg(ResConstants.USER_NOT_LOGIN.getMsg());
            writeAndResponse(JSON.toJSONString(responseModel), response);
        }
        else {
            chain.doFilter(httpRequest, httpResponse);
        }
        return;
       /* String userCode = httpRequest.getParameter("userCode");
        String userId = httpRequest.getParameter("user_id");
        if(org.apache.commons.lang3.StringUtils.isBlank(userCode)){
            response.setContentType("text/plain;charset=UTF-8");
            ResultSupport responseModel = new ResultSupport();
            responseModel.setModel(null);
            responseModel.setCode(ResConstants.USER_NOT_LOGIN.getCode());
            responseModel.setMsg(ResConstants.USER_NOT_LOGIN.getMsg());
           // writeAndResponse(JacksonUtil.bean2Json(responseModel), response);
            writeAndResponse(JSON.toJSONString(responseModel), response);
            return;
        }
        chain.doFilter(httpRequest, httpResponse);*/
    }

    @Override
    public void destroy() {
        System.out.println("----------------------->过滤器被销毁");
    }
    /**
     * 请求地址过滤
     *
     * @param uri
     * @return
     */
    private boolean isInclude(String uri) {
        boolean out = false;
        for (String include : includes) {
            if (org.apache.commons.lang3.StringUtils.indexOfIgnoreCase(uri, include) != -1) {
                out = true;
                break;
            }
        }
        return out;
    }

    /**
     * 请求地址过滤
     *
     * @param uri
     * @return
     */
    private boolean isExcludes(String uri) {
        boolean out = false;
        for (String include : excludes) {
            if (org.apache.commons.lang3.StringUtils.indexOfIgnoreCase(uri, include) != -1) {
                out = true;
                break;
            }
        }
        return out;
    }

    private void writeAndResponse(String str, ServletResponse response) {
        PrintWriter out = null;
        try {
            out = response.getWriter();
            out.print(str);
            out.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (out != null)
                out.close();
        }
    }
}
