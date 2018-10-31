$(function () {
    $("#jqGrid").jqGrid({
        url: '../systemplatform/list',
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', width: 50, key: true },
            { label: '门户名称', name: 'portalName', width: 80 },
            { label: '英文简称', name: 'englishName', width: 80 },
            { label: '类型 1:资金端 2:资产端', name: 'type', width: 80 },
            { label: '创建人', name: 'createUser', width: 80 },
            { label: '创建时间', name: 'createTime', width: 80 },
            { label: '修改时间', name: 'updateTime', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title: null,
        systemPlatform: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.systemPlatform = {};
        },
        update: function (event) {
            var id = getSelectedRow();
            if(id == null){
                return ;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(id)
        },
        saveOrUpdate: function (event) {
            var url = vm.systemPlatform.id == null ? "../systemplatform/save" : "../systemplatform/update";
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(vm.systemPlatform),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                            vm.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if(ids == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: "../systemplatform/delete",
                    data: JSON.stringify(ids),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(index){
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function(id){
            $.get("../systemplatform/info/"+id, function(r){
                vm.systemPlatform = r.systemPlatform;
            });
        },
        getDate: function(){
            //WdatePicker()
            WdatePicker({el:'createTime',dateFmt:'yyyy-MM-dd HH:mm:ss',onpicked:function(dp){
                vm.systemPlatform.createTime = dp.cal.getDateStr()
            }});
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
        }
    }
});