/**
 * Created by chenchunchuan on 2017/11/6.
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
            investId: "",
            registerMobile: "",
            borrowName: "",
            productNo: "",
            status: "",
            profitPlan: "",
            recommendCode: "",
            platform: "",
            startRate: "",
            endRate: "",
            startInterestStartDate: "",
            endInterestStartDate: "",
            startInitCashAmount: "",
            endInitCashAmount: "",
            startPlanQuitDate: "",
            endPlanQuitDate: "",
            debtHoldCount: "",
            debtHoldValue: "",
            matchRecordCount: "",
            recoverRecordCount: "",
            transferRecordCount: "",
            userData: "",
            cashDetail: {},
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.investId = "";
                vm.registerMobile = "";
                vm.borrowName = "";
                vm.productNo = "";
                vm.status = "";
                vm.profitPlan = "";
                vm.recommendCode = "";
                vm.platform = "";
                vm.startRate = "";
                vm.endRate = "";
                vm.startInterestStartDate = "";
                vm.endInterestStartDate = "";
                vm.startInitCashAmount = "";
                vm.endInitCashAmount = "";
                vm.startPlanQuitDate = "";
                vm.endPlanQuitDate = "";
            },
            back: function (event) {
                vm.showList = true;
                vm.cashDetail = {};
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        investId: vm.investId,
                        registerMobile: vm.registerMobile,
                        borrowName: vm.borrowName,
                        productNo: vm.productNo,
                        status: vm.status,
                        profitPlan: vm.profitPlan,
                        recommendCode: vm.recommendCode,
                        platform: vm.platform,
                        startRate: vm.startRate,
                        endRate: vm.endRate,
                        startInterestStartDate: vm.startInterestStartDate,
                        endInterestStartDate: vm.endInterestStartDate,
                        startInitCashAmount: vm.startInitCashAmount,
                        endInitCashAmount: vm.endInitCashAmount,
                        startPlanQuitDate: vm.startPlanQuitDate,
                        endPlanQuitDate: vm.endPlanQuitDate
                    },
                    page: page
                }).trigger("reloadGrid");
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        investId: vm.investId,
                        registerMobile: vm.registerMobile,
                        borrowName: vm.borrowName,
                        productNo: vm.productNo,
                        status: vm.status,
                        profitPlan: vm.profitPlan,
                        recommendCode: vm.recommendCode,
                        platform: vm.platform,
                        startRate: vm.startRate,
                        endRate: vm.endRate,
                        startInterestStartDate: vm.startInterestStartDate,
                        endInterestStartDate: vm.endInterestStartDate,
                        startInitCashAmount: vm.startInitCashAmount,
                        endInitCashAmount: vm.endInitCashAmount,
                        startPlanQuitDate: vm.startPlanQuitDate,
                        endPlanQuitDate: vm.endPlanQuitDate
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            download: function (event) {
                var url = '../cashList/downloadExcelList?' + $("#cashList").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../cashList/list',
        datatype: "json",
        colModel: [
            {label: '认购ID', name: 'investId', width: 50},
            {label: '产品模板', name: 'productName', width: 60},
            {label: '计划标名称', name: 'borrowName', width: 80},
            {label: '投资人', name: 'realname', width: 50},
            {label: '手机号', name: 'registerMobile', width: 80},
            {label: '邀请码', name: 'recommendCode', width: 80},
            {label: '待配置资金', name: 'guardFundsAmount', width: 80},
            {label: '认购金额', name: 'initCashAmount', width: 80},
            {label: '投资周期', name: 'period', width: 80},
            {label: '收益处理方式', name: 'profitPlan', width: 150},
            {label: '来源', name: 'platform', width: 60},
            {label: '约定收益率', name: 'rate', width: 60},
            {label: '用户实收收益', name: 'userActualProfit', width: 60},
            {label: '计息起始日', name: 'interestStartDate', width: 60},
            {label: '实际退出日', name: 'actualQuitDate', width: 60},
            {label: '退出日', name: 'planQuitDate', width: 60},
            {label: '状态', name: 'status', width: 60},
            {label: '操作', name: 'cashNo', width: 80, formatter: formatFun}
        ],
        viewrecords: true,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
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
        }
    });

    var userInfo = getH5Session('userInfo');
    if (userInfo.userId == 1) {
        var platfroms = getH5Session('platforms');
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#platform").append(htmlStr);
        })
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#updPlatform").append(htmlStr);
        })
    } else {
        var htmlStr = "<option value='" + userInfo.platform + "'>" + userInfo.deptName + "</option>";
        $("#platform").append(htmlStr);
    }
    $("#platform").change(function () {

        $("#product_list").empty();
        var platform = $("#platform").val();
        $.ajax({
            type: "GET",
            url: "../coupon/lcproduct?platform=" + platform,
            data: null,
            success: function (r) {
                if (r.code == 0) {
                    var data = r.data;
                    $("#product_list").append("<option  value=''selected=‘selected’>全部</option>");
                    for (item in data) {
                        var lcp = data[item];
                        var s = "<option  value='" + lcp.id + "'>" + lcp.productName + "</option>";
                        $("#product_list").append(s);
                    }
                } else {
                    alert("理财产品加载失败");
                }
            }
        });
    });

});

function formatFun(cellvalue, options, rowObjec) {
    if(hasPermission('reconciliation:cashList:detail')) {
        return '<p class="btn btn-success btn-xs" onclick="cashDetail(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;调阅</p> &nbsp;';
    }else {
        return '';
    }
}


function cashDetail(cashNo) {
    vm.showList = false;

    $.get("../cashList/cashDetail", {cashNo: cashNo}, function (data) {
        // console.log(data);
        vm.cashDetail = {};
        if (data.code == 0) {
            vm.cashDetail = data.outMap;
        } else {
            alert(data.msg);
        }
    });
    $.jgrid.gridUnload('debtHold');
    $("#debtHold").jqGrid({
        url: '../cashList/queryHeldDebtBoss?' + 'cashNo='+ cashNo,
        datatype: "json",
        colModel: [
            {label: '债权ID', name: 'id', width: 40},
            {label: '配置时间', name: 'matchDate', width: 60},
            {label: '配置时价格', name: 'matchPrincipal', width: 80},
            {label: '当前本金', name: 'currPrincipal', width: 50},
            {label: '当前价格', name: 'currPrincipal', width: 80},
            {label: '预期价值', name: 'currValue', width: 80},
            {label: '已获回款', name: 'receiveTotal', width: 80},
            {label: '散标ID', name: 'borrowId', width: 80},
            {label: '借款人', name: 'realName', width: 80},
            {label: '剩余期限', name: 'remainPeriod', width: 60},
            {label: '原还款期限', name: 'period', width: 60},
            {label: '债权占散标比', name: 'proportion', width: 60}
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        rowNum: 10,
        gridComplete: completeMethod1,
        rowList: [10, 30, 50],
        autowidth: false,
        multiselect: true,
        pager: "#debtHoldPager",
        jsonReader: {
            userdata:"totalValue",
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

    function completeMethod1(){
        var total=$("#debtHold").getGridParam('userData');
        var records=$("#debtHold").jqGrid('getGridParam','records');
        console.log(total);
        vm.debtHoldCount = records;
        vm.debtHoldValue = total;
    }

    $.jgrid.gridUnload('matchRecord');
    $("#matchRecord").jqGrid({
        url: '../cashList/queryMatchRecordBoss?' + 'cashNo='+ cashNo,
        datatype: "json",
        colModel: [
            {label: '债权ID', name: 'id', width: 180},
            {label: '配置时间', name: 'matchDate', width: 170},
            {label: '配置时价格', name: 'matchPrincipal', width: 80},
            {label: '解配时价格', name: 'expirePrincipal', width: 50},
            {label: '配置时价值', name: 'matchValue', width: 80},
            {label: '解配时价值', name: 'expireValue', width: 80},
            {label: '已获回款', name: 'receiveTotal', width: 80},
            {label: '散标ID', name: 'borrowId', width: 180},
            {label: '借款人', name: 'realName', width: 80},
            {label: '剩余期限', name: 'remainPeriod', width: 60},
            {label: '原还款期限', name: 'period', width: 60},
            {label: '持有天数', name: 'daysBetween', width: 60}
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        rowNum: 10,
        gridComplete: completeMethod2,
        rowList: [10, 30, 50],
        autowidth: false,
        multiselect: true,
        pager: "#matchRecordPager",
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

    function completeMethod2(){
        var records=$("#matchRecord").jqGrid('getGridParam','records');
        vm.matchRecordCount = records;
    }

    $.jgrid.gridUnload('recoverRecord');
    $("#recoverRecord").jqGrid({
        url: '../cashList/queryDebtRecoverRecord?' + 'cashNo='+ cashNo,
        datatype: "json",
        colModel: [
            {label: '回款时间', name: 'createTime', width: 40},
            {label: '债权ID', name: 'id', width: 60},
            {label: '散标ID', name: 'borrowId', width: 80},
            {label: '回款金额', name: 'receiveTotal', width: 50},
            {label: '回款本金', name: 'receiveCorpus', width: 80},
            {label: '回款利息', name: 'receiveInterest', width: 80},
            {label: '回款服务费', name: 'receiveServiceFee', width: 80},
            {label: '债权结余本金', name: 'currPrincipalAfter', width: 80}
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        rowNum: 10,
        gridComplete: completeMethod3,
        rowList: [10, 30, 50],
        autowidth: false,
        multiselect: true,
        pager: "#recoverRecordPager",
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

    function completeMethod3(){
        var records=$("#recoverRecord").jqGrid('getGridParam','records');
        vm.recoverRecordCount = records;
    }

    $.jgrid.gridUnload('transferRecord');
    $("#transferRecord").jqGrid({
        url: '../cashList/queryDebtTransferBoss?' + 'cashNo='+ cashNo,
        datatype: "json",
        colModel: [
            {label: '债权ID', name: 'id', width: 60},
            {label: '债转状态', name: 'status', width: 80},
            {label: '债权价格', name: 'salePrincipal', width: 50},
            {label: '折让费（折让率）', name: 'discountPrincipal', width: 80},
            {label: '手续费（手续费率）', name: 'transferFee', width: 80},
            {label: '手续费收取原因', name: 'transferType', width: 80},
            {label: '实际入账金额', name: 'transferAmount', width: 80},
            {label: '承接人', name: 'realName', width: 80},
            {label: '承接时间', name: 'transferDate', width: 80}
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        rowNum: 10,
        gridComplete: completeMethod4,
        rowList: [10, 30, 50],
        autowidth: false,
        multiselect: true,
        pager: "#transferRecordPager",
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

    function completeMethod4(){
        var records=$("#transferRecord").jqGrid('getGridParam','records');
        vm.transferRecordCount = records;
    }

    $.jgrid.gridUnload('CashLog');
    $("#CashLog").jqGrid({
        url: '../cashList/queryCashLogByCashNo?' + 'cashNo='+ cashNo,
        datatype: "json",
        colModel: [
            {label: '流水号', name: 'id', width: 60},
            {label: '时间', name: 'createTime', width: 80},
            {label: '收入', name: 'inAmount', width: 50},
            {label: '支出', name: 'outAmount', width: 80},
            {label: '结存金额', name: 'currCashAmountAfter', width: 80},
            {label: '交易类型', name: 'type', width: 80,formatter:function (value, options, row) {
                var result = '';
                switch (value){
                    case 0:
                        result ='初始认购 ';
                        break;
                    case 1:
                        result = '借款人还款';
                        break;
                    case 2:
                        result = '投资人回款';
                        break;
                    case 3:
                        result = '复投';
                        break;
                    case 4:
                        result = '承兑';
                        break;
                    case 5:
                        result = '首次配置';
                        break;
                    default:
                        result = "error"
                }
                return result;
            }},
            {label: '备注', name: 'remark', width: 80}
        ],
        viewrecords: true,
        height: 400,
        width: 1500,
        rowNum: 10,
        gridComplete: completeMethod5,
        rowList: [10, 30, 50],
        autowidth: false,
        multiselect: true,
        pager: "#CashLogPager",
        jsonReader: {
            userdata:"userData",
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

    function completeMethod5(){
        var userData=$("#CashLog").jqGrid('getGridParam','userData');
        vm.userData = userData;
    }
}

