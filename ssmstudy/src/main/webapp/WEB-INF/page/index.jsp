<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>商品管理系统后台主页</title>
    <script type="text/javascript">
        function logout() {
            location.href="${pageContext.request.contextPath}/user/logout";
        }
    </script>
</head>
<body>
<h3>商品管理系统后台主页</h3>
<h3>商品管理系统后台主页</h3>
<h3>商品管理系统后台主页</h3>
<h3>商品管理系统后台主页</h3>
<hr/>
<%--当前登录用户名：${userInfo.username}<br/>--%>
当前登录用户名：${loginuser}<br/>
测试内容：${msg}
<input type="button" value="退出登录" onclick="logout()">
</body>
</html>