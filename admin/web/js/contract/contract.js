/**
 * Created by chenchunchuan on 2017/11/1.
 */
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
            debtId: "",
            startDate: "",
            endDate: "",
            status: "",
            showList: true,
            title: null,
            withDrawDetail: {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.debtId = "";
                vm.startDate = "";
                vm.endDate = "";
                vm.status = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        debtId: vm.debtId,
                        startDate: vm.startDate,
                        endDate: vm.endDate,
                        status: vm.status
                    },
                    page: 1
                }).trigger("reloadGrid");
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../contract/list',
        datatype: "json",
        colModel: [
            {label: '合同签约号', name: 'applyNo', width: 150},
            {label: '投资人ID(债权承接方ID)', name: 'investUserId', width: 150},
            {label: '借款人ID(债权转让方ID)', name: 'borrowUserId', width: 150},
            {label: '债权ID', name: 'debtId', width: 100},
            {label: '合同状态', name: 'status', width: 80,formatter:function (value, options, row) {
                var result = '';
                switch (value){
                    case 0:
                        result = '未签';
                        break;
                    case 1:
                        result = '已签';
                        break;
                    case 2:
                        result = '拒签';
                        break;
                    case 3:
                        result = '保全';
                        break;
                    default:
                        result = "error";
                }
                return result;
            }},
            {label: '协议类型', name: 'protocolType', width: 80,formatter:function (value, options, row) {
                var result = '';
                switch (value){
                    case 1:
                        result ='发薪贷';
                        break;
                    case 2:
                        result = '急借通';
                        break;
                    case 3:
                        result = '债权转让';
                        break;
                    case 4:
                        result = '自动投标授权';
                        break;
                    default:
                        result = "error"
                }
                return result;
            }},
            {label: '创建时间', name: 'createTime', width: 150},
            {label: '更新时间', name: 'updateTime', width: 150},
            {label: '操作', name: 'status', width: 80, formatter: formatFun}
        ],
        viewrecords: true,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        autowidth: true,
        multiselect: true,
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
});

function formatFun(cellvalue, options, rowObjec) {
    if(hasPermission('reconciliation:contract:downLoad')){
        return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + rowObjec.applyNo + '\')"><i class="fa fa-money"></i>&nbsp;下载合同</p>';
    }else{
        return '';
    }
}

function zqgx(applyNo) {
    $.get("../contract/downLoad/" + applyNo, function (r) {
        window.open(r.url);
    });

}
