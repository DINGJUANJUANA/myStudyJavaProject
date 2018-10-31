/**
 * Created by zhaojianhua on 2017/10/17.
 */
var vm;

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}
function serializeObject(form) {
    var o = {};
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
            dzId: "",
            status: "",
            dzStaus:"",
            showList: true,
            title: null,
            rechargeDetail: {},
            middleResult : {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                // 送出後
                vm.submitStartDate  = "";
                vm.submitEndDate  = "";
                vm.status  = "";
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
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page:page
                }).trigger("reloadGrid");
            },
            downRechargeDetail:function (event) {
                window.open('../compareRecharge/downloadCompareRecharge/'+ vm.rechargeDetail.batchNo+'?'+'dzStaus='+vm.dzStaus);
            },
            downloadRecharge:function (event) {
                var url = '../compareRecharge/downloadExcelRechargeList?'+$("#recharge").serialize();
                window.open(url);
            },
            outDzInfoDown: function (event) {
                var url = '../compareRecharge/downloadRechargeMakeupInfo/' + vm.rechargeDetail.batchNo;
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../compareRecharge/queryCompareRechargeOrder',
        datatype: "json",
        colModel: [
            {label: '对账日期', name: 'dataDate', width: 40},
            {label: '对账状态', name: 'result', width: 40},
            {label: '当日充值订单笔数', name: 'todayOrderCnt', width: 80},
            {label: '对账成功笔数', name: 'successCnt', width: 80},
            {label: '信息不等笔数', name: 'infoDiffCnt', width: 80},
            {label: '我方单边笔数', name: 'ourSideTradeCnt', width: 80},
            {label: '第三方单边笔数', name: 'thirdSideTradeCnt', width: 80},
            {label: '我方充值总金额', name: 'ourSideTradeAmount', width: 80},
            {label: '第三方充值总金额', name: 'thirdSideTradeAmount', width: 80},
            {label: '操作', name: 'batchNo', width: 80, formatter: formatFun}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
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
    setH5Session('recharge'+rowObjec.batchNo,rowObjec);
    vm.rechargeDetail = rowObjec;
    if(hasPermission('reconciliation:recharge:detail')) {
        return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;对账明细</p>';
    }else {
        return '';
    }
}

function reload1 () {
    $("#jqGridAccountIn").setGridParam({
        postData: {
            dzStaus: $("#selectdzStaus").val()
        },
        page:1
    }).trigger("reloadGrid");
}

function zqgx(batchNo) {
    vm.showList = false;
    vm.rechargeDetail  ={};
    vm.rechargeDetail = getH5Session('recharge'+batchNo);
    $.jgrid.gridUnload('jqGridAccountIn');
    $("#jqGridAccountIn").jqGrid({
        url: "../compareRecharge/queryCompareRechargeOrderDetail/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '对账ID', name: 'id', width: 80},
            {label: '对账结果', name: 'dzStaus', width: 160},
            {label: '订单状态', name: 'status', width: 160,formatter:function (status){var msg="";if(!status){msg="单边";}else if(status==4){msg="成功";}else{msg="失败";}return msg;}},
            {label: '我方记录的订单号', name: 'ourSideOrderNo', width: 200},
            {label: '我方记录发起的时间', name: 'orderTime', width: 200},
            {label: '我方记录的第三方客户号', name: 'thirdUserId', width: 200},
            {label: '我方记录的对方银行卡号', name: 'bankCardNo', width: 200},
            {label: '我方记录的交易金额', name: 'amount', width: 200},
            {label: '我方记录的手续费', name: 'fee', width: 200},
            {label: '第三方记录的订单号', name: 'thirdSideOrderNo', width: 200},
            {label: '第三方记录的清结算时间', name: 'createTime', width: 200},
            {label: '第三方记录的第三方客户号', name: 'usrCustId', width: 200},
            {label: '第三方记录的对方银行卡号', name: 'openAcctId', width: 200},
            {label: '第三方记录的交易金额', name: 'transAmt', width: 200},
            {label: '第三方记录的手续费', name: 'feeAmt', width: 200},
            {
                label: '平台', name: 'platform', width: 200
            },
            {label: '财务人员干涉状态', name: 'meddleStatus', width: 200},
            {label: '操作', name: 'meddleStatus', width: 100,formatter:function (value, options, row){
                switch (value){
                    case '':
                        return '';
                        break;
                    case '未干涉':
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal" onclick="dzId(\'' + row.id + '\')">执行干涉</button>';
                        break;
                    case '已干涉':
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal2" onclick="showRechargeMiddleInfo(\''+row.id+'\')">干涉结果</button>';
                        break;
                    default:
                        return '';
                }
            }}
        ],
        viewrecords: true,
        height: 500,
        width: 1500,
        shrinkToFit:false,
        autoScroll: true,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
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
        url: "../compareRecharge/rechargeMakeupInfo/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '被补录ID', name: 'id', width: 80},
            {label: '补录前对账结果', name: 'meddleStatusBefore', width: 160},
            {label: '补录后对账结果', name: 'dzStaus', width: 160},
            {label: '补录日期', name: 'meddleDate', width: 140}
        ],
        viewrecords: true,
        height: 500,
        width: 640,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
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

function submitbtn_click(){
    var userInfo = getH5Session('userInfo');
    var data = $("#middle").serializeJson();
    var datas = $.extend({recDetailId:vm.dzId},userInfo,data);
    $.ajax({
        cache: true,
        type: "GET",
        url:"../compareRecharge/saveRechargeMiddle",
        data:datas,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.code == 0) {
                reload1();
                $('#myModal').modal('hide');
            }else{
                alert("干涉失败");
            }
        }
    });
    return false;
}

function showRechargeMiddleInfo(id) {
    vm.dzId = id;
    $.get("../compareRecharge/getRecMiddleInfo/" + id, {type:"QDR"}, function (r) {
        if(r.code == 0) {
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
        }else {
            alert(r.msg);
        }
    });
}

function dzId(id) {
    vm.dzId = id;
}