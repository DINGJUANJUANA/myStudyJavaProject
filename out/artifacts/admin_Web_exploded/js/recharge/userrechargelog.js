var vm;


function serializeObject(form) {
    var o = {};
    // form.find(".ui-select").each(function(r){
    //     var name=$(this).attr("name");
    //     var value=$(this).attr("data-value");
    //     o[name]= value;
    // })

    $.each(form.serializeArray(), function (index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
}

$.ajaxSetup({
    async : false //取消异步
});

function hasPermission(permission) {
    var ispermission ='';
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            id: "",
            orderId: "",
            submitStartDate: "",
            submitEndDate: "",
            accountOrgNo: "",
            bankCardNo: "",
            endStartDate: "",
            endEndDate: "",
            idno: "",
            amountStart: "",
            amountEnd: "",
            status: "",
            platform: "",
            showList: true,
            title: null,
            rechargeDetail: {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                // 送出後
                     vm.id = "";
                     vm.orderId  = "";
                     vm.submitStartDate  = "";
                     vm.submitEndDate  = "";
                     vm.accountOrgNo  = "";
                     vm.bankCardNo  = "";
                     vm.endStartDate  = "";
                     vm.endEndDate  = "";
                     vm.idno  = "";
                     vm.amountStart  = "";
                     vm.amountEnd  = "";
                     vm.status  = "";
                     vm.platform  = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        id:vm.id,
                        orderId: vm.orderId,
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        accountOrgNo: vm.accountOrgNo,
                        bankCardNo: vm.bankCardNo,
                        endStartDate: vm.endStartDate,
                        endEndDate: vm.endEndDate,
                        idno: vm.idno,
                        amountStart: vm.amountStart,
                        amountEnd: vm.amountEnd,
                        status: vm.status,
                        platform: vm.platform
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        id:vm.id,
                        orderId: vm.orderId,
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        accountOrgNo: vm.accountOrgNo,
                        bankCardNo: vm.bankCardNo,
                        endStartDate: vm.endStartDate,
                        endEndDate: vm.endEndDate,
                        idno: vm.idno,
                        amountStart: vm.amountStart,
                        amountEnd: vm.amountEnd,
                        status: vm.status,
                        platform: vm.platform
                    },
                    page:page
                }).trigger("reloadGrid");
            },
            download:function (event) {
                var url = '../userRecharge/downloadExcelList?'+$("#recharge").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../userRecharge/list',
        datatype: "json",
        colModel: [
            {label: '充值流水ID', name: 'id', width: 40},
            {label: '客户作业账户编码', name: 'accountOrgNo', width: 80},
            {label: '客户身份证', name: 'idno', width: 80},
            {label: '充值订单号', name: 'orderId', width: 80},
            {label: '交易对方账户', name: 'bankCardNo', width: 80},
            {label: '充值金额', name: 'amount', width: 40},
            {label: '充值提交时间', name: 'startDate', width: 80},
            {label: '充值结束时间', name: 'endDate', width: 80},
            {label: '充值状态', name: 'status', width: 40},
            {label: '操作', name: 'orderId', width: 80, formatter: formatFun}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
    var userInfo = getH5Session('userInfo');
    // if (userInfo.userId == 1) {
    //     var platfroms = getH5Session('platforms');
    //     $.each(platfroms, function (i, n) {
    //         var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
    //         $("#platform").append(htmlStr);
    //     })
    // }else {
    //     var htmlStr = "<option value='" + userInfo.platform + "'>" + userInfo.deptName + "</option>";
    //     $("#platform").append(htmlStr);
    // }
});

function formatFun(cellvalue, options, rowObjec) {
    if(hasPermission('balance:userRecharge:detail')) {
        return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;详情</p>';
    }else {
        return '';
    }
}

function zqgx(id) {
    vm.showList = false;
    $.get("../userRecharge/info/" + id, function (r) {
        vm.rechargeDetail = r.rechargeDetail;
    });

    $.jgrid.gridUnload('jqGridAccountIn');
    $("#jqGridAccountIn").jqGrid({
        url: "../userRecharge/accountIn/" + id,
        datatype: "json",
        colModel: [
            {label: '入金流水ID', name: 'accountOrgOrderNo', width: 80},
            {label: '入金账户编码', name: 'accountOrgId', width: 80},
            {label: '入金账户客户身份证号', name: 'idno', width: 80},
            {label: '入金账户客户', name: 'realname', width: 80},
            {label: '入金具体金额', name: 'operationAmount', width: 80}
        ],
        viewrecords: true,
        height: 60,
        width: 1000,
        rowNum: 1,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        pager: "#jqGridPagerAccountIn",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridZqgx").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $.jgrid.gridUnload('jqGridAccountOut');
    $("#jqGridAccountOut").jqGrid({
        url: "../userRecharge/accountOut/"  + id,
        datatype: "json",
        colModel: [
            {label: '出金流水ID', name: 'accountOrgOrderNo', width: 80},
            {label: '出金账户编码', name: 'accountOrgId', width: 80},
            {label: '出金账户客户身份证号', name: 'idno', width: 80},
            {label: '出金账户客户', name: 'realname', width: 80},
            {label: '出金具体金额', name: 'operationAmount', width: 80}
        ],
        viewrecords: true,
        height: 60,
        width: 1000,
        rowNum: 1,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        pager: "#jqGridPagerAccountOut",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridZqgx").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

}