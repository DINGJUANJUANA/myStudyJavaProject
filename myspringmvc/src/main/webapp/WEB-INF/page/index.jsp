<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018-10-25
  Time: 16:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<a href="${pageContext.request.contextPath}/user/findUserBysIds?id=1&id=2&id=3">根据ID批量查找</a>
<a href="${pageContext.request.contextPath}/user/findUserBysIds3?uid=1&uid=2&uid=3">根据ID批量查找</a>
<form action="${pageContext.request.contextPath}/user/updateUser" method="post">
    用户名称：<input type="text" name="userName"/><br/>
    用户性别：<input type="text" name="sex"><br/>
    <!-- -->
    购买商品1名称：<input type="text" name="itemList[0].name"/> <br/>
    购买商品1价格：<input type="text" name="itemList[0].price"/> <br/>

    购买商品2名称：<input type="text" name="itemList[1].name"/> <br/>
    购买商品2价格：<input type="text" name="itemList[1].price"/> <br/>


    购买商品3名称：<input type="text" name="itemMap[item3].name"/> <br/>
    购买商品3价格：<input type="text" name="iterList[item3].price"/> <br/>
<input type="submit" value="提交"/>
</form>
</body>
</html>
