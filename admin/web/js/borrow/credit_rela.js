var ConstantConfig = {
    Statuses:[{code:"1", name:"持有中"},{code:"2", name:"主动挂牌中"},{code:"3", name:"自动挂牌中"},{code:"4", name:"已结束"}],
};

var ConstantMethod = {
    getVal:function(cont, val){
        for (var i=0; i<cont.length; i++){
            if (cont[i].code == val){
                return cont[i];
            }
        }
        return null;
    }
};

var ConstantUtils = {
    getStatuses:function(val){
        return ConstantMethod.getVal(ConstantConfig.Statuses, val);
    }
};


$(function () {
    $("#jqGrid").jqGrid({
        url: '../reserveBorrow/queryDebtRelationInfo',
        datatype: "json",
        postData: {"borrowNo":sessionStorage.getItem("borrowNo"),"platform":sessionStorage.getItem("platform"),"contractAmount":sessionStorage.getItem("contractAmount")},
        colModel: [
            { label: '债权编号', name: 'debtNo', width: 50, key:true },
            { label: '创建时间', name: 'buildDate', width: 50 },
            { label: '债权价格', name: 'initPrincipal', width: 80 },
            { label: '初始本金', name: 'initPrincipal', width: 80 },
            { label: '当前本金', name: 'currPrincipal', width: 80 },
            { label: '当前债权价值', name: 'currValue', width: 80},
            { label: '回款金额', name: 'receiveValue', width: 80 },
            { label: '债权状态', name: 'debtStatus', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getStatuses(cellvalue);
                return m != null ? m.name : "";
            }},
            { label: '借款人', name: 'loanRealName', width: 80 },
            // { label: '借款人手机号', name: '', width: 80 }, // TODO
            { label: '占预约标比例', name: 'percentage', width: 80 },
            { label: '资金认购ID', name: 'cashNo', width: 80 },
            { label: '投资人', name: 'realname', width: 80 },
            { label: '投资人手机号', name: 'registerMobile', width: 80 },
            { label: '操作', name: 'parentName', width: 80, formatter: function(cellvalue, options, rowObjec){
                return "<a class='detail-btn'>债权详情</a>" +
                    "<input type='hidden' name='debtNo' value='"+rowObjec.debtNo+"'/>"+
                    "<input type='hidden' name='cashNo' value='"+rowObjec.cashNo+"'/>";
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
            page:"pageNum",
            rows:"pageSize",
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
            sessionStorage.setItem('debtNo', $t.siblings("input[name=debtNo]").val());
            sessionStorage.setItem('cashNo', $t.siblings("input[name=cashNo]").val());
            location.href = "credit_detail.html";
        }
    }, ".detail-btn");
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        config:{
            statuses:ConstantConfig.Statuses, //状态
        }
    },
    created: function(){
    },
    methods: {
        query: function () {
            this.reload();
        },
        reload: function (event) {
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                page:1
            }).trigger("reloadGrid");
        }
    }
});
