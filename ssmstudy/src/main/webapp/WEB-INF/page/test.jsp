<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>商品管理系统后台主页</title>
</head>
<body>
<h3>商品管理系统后台主页</h3>
<hr/>
 <%--${pageContext.request.contexPath}/getitem?id=1&name=test&price=20.5--%>
  <a href="${pageContext.request.contextPath}/getitem?id=1&name=test&price=20.5"> 测试POJO 绑定类型访问</a><br/>

<hr/>
</body>
</html>