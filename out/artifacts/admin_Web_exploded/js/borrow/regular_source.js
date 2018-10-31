
$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/dept/list',
        datatype: "json",
        colModel: [
            { label: '债权编号', name: 'deptId', width: 50, key:true },
            { label: '应收本金', name: 'platform', width: 80 },
            { label: '实收本金', name: 'name', width: 80 },
            { label: '应收利息', name: 'parentName', width: 80 },
            { label: '实收利息', name: 'type', width: 80},
            { label: '到期时间', name: 'orderNum', width: 80 },
            { label: '回款时间', name: 'platform', width: 80 },
            { label: '状态', name: 'name', width: 80, formatter: function(cellvalue, options, rowObjec){
                return 1 == cellvalue ? "资金":"资产";
            }}
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        // rownumWidth: 25,
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

    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            console.log($t.siblings("input").val());
        }
    }, ".source-btn");
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        q:{ // 查询条件
            id: null, // 预约标ID
        },
        showList: true,
        title: null
    },
    created: function(){
        this.initConfig();
    },
    methods: {
        query: function () {
            this.reload();
        },
        reload: function (event) {
            var param = vm.q;

            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:param,
                page:1
            }).trigger("reloadGrid");
        },
        initConfig: function(){

        }
    }
});