<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018-10-31
  Time: 14:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <!--jquery框架必需 begin-->
    <script src="${pageContext.request.contextPath}/statics/scripts/jquery/jquery.min.js"></script>
    <!--bootstrap组件-->
    <link href="${pageContext.request.contextPath}/statics/scripts/bootstrap/bootstrap.css" rel="stylesheet" />
    <script src="${pageContext.request.contextPath}/statics/scripts/bootstrap/bootstrap.min.js"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/statics/scripts/bootstraptable/bootstrap-table.min.css"/>
    <script src="${pageContext.request.contextPath}/statics/scripts/bootstraptable/bootstrap-table.min.js"></script>
    <script src="${pageContext.request.contextPath}/statics/scripts/bootstraptable/locale/bootstrap-table-zh-CN.min.js"></script><!-- 引入中文语言包 -->
    <!-- JS 扩展  created by xby-->
    <script src="${pageContext.request.contextPath}/statics/scripts/bootstraptable/common.js?v=1"></script>

    <script src="${pageContext.request.contextPath}/statics/scripts/framework/framework-ui.js"></script>
    <script src="${pageContext.request.contextPath}/statics/scripts/framework/framework-form.js"></script>
    <script src="${pageContext.request.contextPath}/statics/scripts/utils.js"></script>
    <script src="${pageContext.request.contextPath}/statics/scripts/common.js"></script>

    <title>Title</title>
    <style>
        html, body {
            height: 100%;
            width: 100%;
        }
    </style>
    <script type="text/javascript">
        $(function () {
            getGrid();
        });
        //加载表格
        function getGrid() {
            var columnsAll = [
                { title: '主键', field: 'id', align: 'center', width: 50, hidden: true },
                { title: '金额', field: 'amount', align: 'left', width: 150 },
                { title: '描述', field: 'description', align: 'left', width: 150 }
            ];
            //列表数据查询
            var data_json='' ;
            $.ajax({
                url: "${pageContext.request.contextPath}/bill/getList",
                data:"description=abcde",//JSON.stringify($(".searchPanel").GetWebControls()),// {"queryParams":} ,
                dataType: "json",
                async: false,
                success: function (data) {
                    data_json=data;
                }
            });
           // alert(JSON.stringify($(".searchPanel").GetWebControls()));
            // var last=JSON.stringify(data_json);
            bsTableEx({
                tableId: "gridTable",
                columns: columnsAll,
                dataJson: data_json,
                search: false, // 不显示 搜索框
                checkboxEnabled: false,
                checkboxHeader: false,
                detailView: false
            });
        }
        
        function btn_search() {
            getGrid();
        }
    </script>
</head>
<body>
<div>
    <div class="searchPanel">
      <table>
          <tr>
              <td>Description</td>
              <td><input type="text" name="description" id="description"/></td>
              <td><input type="button" value="查询" onclick="btn_search()"></td>
          </tr>
      </table>
        </div>
    <!--Grid列表-->
    <div class="gridPanel">
        <table id="gridTable"></table>
    </div>
</div>
</body>
</html>
