$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/dept/list',
        datatype: "json",
        colModel: [
            { label: '部门编号', name: 'deptId', width: 50, key: true },
            { label: '英文名称', name: 'platform', width: 80 },
            { label: '中文名称', name: 'name', width: 80 },
            { label: '上级部门', name: 'parentName', width: 80 },
            { label: '类别', name: 'type', width: 80, formatter: function(cellvalue, options, rowObjec){
                if(rowObjec.type == null){
                    return "";
                }
                return 1 == cellvalue ? "资金":"资产";
            } },
            { label: '排序', name: 'orderNum', width: 80 }

        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: false,
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

var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title: null,
        dept:{
            parentName:null,
            parentId:0,
            orderNum:0
        }
    },
    methods: {
        getDept: function(menuId){
            //加载菜单树
            $.get("../sys/dept/select", function(r){
                ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
                // var node = ztree.getNodeByParam("deptId", vm.dept.parentId);
                // ztree.selectNode(node);
                //
                // vm.dept.parentName = node.name;
                ztree.expandAll(true);
            })
        },
		query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.dept = {parentName:null,parentId:0,orderNum:0};
            vm.getDept();
        },
        update: function (event) {
            var deptId = getSelectedRow();
            if(deptId == null){
                return ;
            }
            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(deptId)
            vm.getDept();
        },
        saveOrUpdate: function (event) {
            var url = vm.dept.deptId == null ? "../sys/dept/save" : "../sys/dept/update";
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(vm.dept),
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
            var departIds = getSelectedRows();
            if(departIds == null){
                return ;
            }
            if(departIds.length != 1){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "GET",
                    url: "../sys/dept/delete",
                    data: "deptId=" + departIds[0],
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
        getInfo: function(deptId){
            $.get("../sys/dept/info/"+deptId, function(r){
                vm.dept = r.dept;
            });
        },
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级部门
                    vm.dept.parentId = node[0].deptId;
                    vm.dept.parentName = node[0].name;

                    layer.close(index);
                }
            });
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