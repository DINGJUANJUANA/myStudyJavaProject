/**
 * Created by chenchunchuan on 2017/10/17.
 */

var vm;

function hasPermission(permission) {
    var ispermission = '';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission", {permission: permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

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

(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            submitStartDate: "",
            submitEndDate: "",
            status: "",
            dzStaus: "",
            dzId: "",
            showList: true,
            title: null,
            withDrawDetail: {},
            middleResult: {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.submitStartDate = "";
                vm.submitEndDate = "";
                vm.status = "";
                vm.dzStaus = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                vm.showList = true;
                vm.withDrawDetail = {};
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page: page
                }).trigger("reloadGrid");
            },
            outPut: function (event) {
                var url = '../withDrawReconciliation/downloadExcelDetail/' + vm.withDrawDetail.batchNo + '?' + 'dzStaus=' + vm.dzStaus;
                // console.log(url);
                window.open(url);
            },
            download: function (event) {
                var url = '../withDrawReconciliation/downloadExcelList?' + $("#withDrawReconciliation").serialize();
                // console.log(url);
                window.open(url);
            },
            outPut1: function (event) {
                var url = '../withDrawReconciliation/downloadWithDrawMakeupInfo/' + vm.withDrawDetail.batchNo;
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../withDrawReconciliation/list',
        datatype: "json",
        colModel: [
            {label: '对账日期', name: 'dataDate', width: 40},
            {label: '对账状态', name: 'result', width: 40},
            {label: '当日提现订单笔数', name: 'todayOrderCnt', width: 80},
            {label: '对账成功笔数', name: 'successCnt', width: 80},
            {label: '信息不等笔数', name: 'infoDiffCnt', width: 80},
            {label: '我方单边笔数', name: 'ourSideTradeCnt', width: 80},
            {label: '第三方单边笔数', name: 'thirdSideTradeCnt', width: 80},
            {label: '我方提现总金额', name: 'ourSideTradeAmount', width: 80},
            {label: '第三方提现总金额', name: 'thirdSideTradeAmount', width: 80},
            {label: '操作', name: 'batchNo', width: 80, formatter: formatFun}
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
});

function formatFun(cellvalue, options, rowObjec) {
    setH5Session('withDraw' + rowObjec.batchNo, rowObjec);
    if (hasPermission('reconciliation:withDraw:detail')) {
        return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;对账明细</p>';
    } else {
        return '';
    }
}
function reload1() {

    console.log(vm.dzStaus);
    $("#jqGridAccountIn").setGridParam({
        postData: {
            dzStaus: $("#selectdzStaus").val()
        },
        page: 1
    }).trigger("reloadGrid");
}


function submitbtn_click() {
    var userInfo = getH5Session('userInfo');
    var proRuestl_1 = $("#middle").serializeJson();//数据序列化
    console.log(proRuestl_1);
    var data = $.extend({id: vm.dzId}, userInfo, proRuestl_1);
    console.log(data);

    $.getJSON("../withDrawReconciliation/interfere", data, function (data) {
        console.log(data);
        if (data.code == 0) {
            reloadCansel();
            $("#middle")[0].reset();
            $('#myModal').modal('hide');
        } else {
            alert("干涉失败");
        }
    });
    return false;
}

function dzId(id) {
    vm.dzId = id;
}

function dzResult(id) {
    vm.dzId = id;
    vm.middleResult = {};
    $.get("../compareRecharge/getRecMiddleInfo/" + id, {type: "QDC"}, function (r) {
        if (r.code == 0) {
            vm.middleResult = r.sltRecMiddle;
            switch (vm.middleResult.mistakeReason) {
                case 1:
                    vm.middleResult.mistakeReason = "业务线系统故障";
                    break;
                case 2:
                    vm.middleResult.mistakeReason = "清结算系统故障";
                    break;
                case 3:
                    vm.middleResult.mistakeReason = "第三方系统故障";
                    break;
                case 4:
                    vm.middleResult.mistakeReason = "网络通讯故障";
                    break;
                case 5:
                    vm.middleResult.mistakeReason = "未知";
                    break;
            }
        } else {
            alert(r.msg);
        }
    });
}

function reloadCansel() {
    var page = $("#jqGridAccountIn").jqGrid('getGridParam', 'page');
    $("#jqGridAccountIn").setGridParam({
        postData: {
            dzStaus: $("#selectdzStaus").val()
        },
        page: page
    }).trigger("reloadGrid");

    $("#jqGridMakeup").trigger("reloadGrid");
}

function zqgx(batchNo) {
    vm.showList = false;

    vm.withDrawDetail = {};
    vm.withDrawDetail = getH5Session('withDraw' + batchNo);
    $.jgrid.gridUnload('jqGridAccountIn');
    $("#jqGridAccountIn").jqGrid({
        url: "../withDrawReconciliation/info/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '对账ID', name: 'id', width: 80},
            {label: '对账结果', name: 'dzStaus', width: 160},
            {label: '订单状态', name: 'status', width: 160,formatter:function (status){var msg="";if(!status){msg="单边";}else if(status==4||status==2){msg="成功";}else{msg="失败";}return msg;}},
            {label: '我方记录的订单号', name: 'ourSideOrderNo', width: 200},
            {label: '我方记录发起的时间', name: 'orderTime', width: 200},
            {label: '我方记录的第三方客户号', name: 'thirdUserId', width: 200},
            {label: '我方记录的对方银行卡号', name: 'bankCardNo', width: 200},
            {label: '我方记录的交易金额', name: 'amount', width: 200},
            {label: '我方记录的服务费', name: 'fee', width: 200},
            {label: '第三方记录的订单号', name: 'thirdSideOrderNo', width: 200},
            {label: '第三方记录的清结算时间', name: 'createTime', width: 200},
            {label: '第三方记录的第三方客户号', name: 'usrCustId', width: 200},
            {label: '第三方记录的对方银行卡号', name: 'openAcctId', width: 200},
            {label: '第三方记录的交易金额', name: 'transAmt', width: 200},
            {label: '第三方记录的手续费', name: 'feeAmt', width: 200},
            {label: '第三方记录的服务费', name: 'servFee', width: 200},
            {
                label: '平台', name: 'platform', width: 200
            },
            {label: '财务人员干涉状态', name: 'meddleStatus', width: 200},
            {
                label: '操作', name: 'meddleStatus', width: 100, formatter: function (value, options, row) {
                switch (value) {
                    case '':
                        return '';
                        break;
                    case '未干涉':
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal" onclick="dzId(\'' + row.id + '\')">执行干涉</button>';
                        break;
                    case '已干涉':
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal2" onclick="dzResult(\'' + row.id + '\')">干涉结果</button>';
                        break;
                    default:
                        return '';
                }
            }
            }
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        shrinkToFit: false,
        autoScroll: true,
        rowNum: 10,
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
        }
    });

    $.jgrid.gridUnload('jqGridMakeup');
    $("#jqGridMakeup").jqGrid({
        url: "../withDrawReconciliation/withDrawMakeupInfo/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '被补录ID', name: 'id', width: 80},
            {label: '补录前对账结果', name: 'meddleStatusBefore', width: 160},
            {label: '补录后对账结果', name: 'dzStaus', width: 160},
            {label: '补录日期', name: 'meddleDate', width: 140}
        ],
        viewrecords: true,
        height: 500,
        width: 540,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        pager: "#jqGridPagerMakeup",
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
        }
    });

}
