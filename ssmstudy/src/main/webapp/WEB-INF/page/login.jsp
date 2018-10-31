<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018-10-31
  Time: 10:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>平台用户登录</title>
</head>
<body>
<h3>用户登录</h3>
<font color="red">${msg}</font>
<form action="${pageContext.request.contextPath}/user/login" method="post">
    用户名：<input type="text"  name="username" value="djj"/><br/>
    密码：<input type="text" name="password" value="111111"/>
    <input type="submit" value="登录"/>
</form>
</body>
</html>
