function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


var Request = GetRequest();
var cashNo = Request['cashNo'];



var ConstantConfig = {
    Statuses:[{code:"", name:"请选择"}, {code:"1", name:"待配置"},{code:"2", name:"计息"},{code:"3", name:"提前赎回"},{code:"4", name:"到期赎回"},{code:"5", name:"流标退返"},{code:"6", name:"转让中"},{code:"7", name:"已承兑"}], // 债转状态
    TransferTypes:[{code:"1", name:"主动债转"}, {code:"2", name:"自动债转"}], // 手续费转让原因
    PeriodUnits:[{code:"1", name:"天"},{code:"2", name:"周"},{code:"3", name:"月"},{code:"4", name:"年"}], // 标的周期
    ProfitPlans:[{code:"", name:"全部"}, {code:"1", name:"等额本息"}, {code:"2", name:"等额本金"},{code:"3", name:"按期付息，到期还本"},{code:"4", name:"一次性还款"},{code:"99", name:"其他"}], // 收益处理方式
    CashStatuses:[{code:"0", name:"默认状态"}, {code:"1", name:"撮合中"},{code:"2", name:"正常赎回"},{code:"3", name:"提前赎回"},{code:"4", name:"已承兑"},{code:"5", name:"转让中"},{code:"6", name:"计息中"}] // 认购资金状态
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
    },
    getTransferTypes:function(val){
        return ConstantMethod.getVal(ConstantConfig.TransferTypes, val);
    },
    getPeriodUnits:function(val){
        return ConstantMethod.getVal(ConstantConfig.PeriodUnits, val);
    },
    getCashStatuses:function(val){
        return ConstantMethod.getVal(ConstantConfig.CashStatuses, val);
    },
    getProfitPlans:function(val){
        return ConstantMethod.getVal(ConstantConfig.ProfitPlans, val);
    }
};

var vm;

$(function () {



    // Vue
    vm = new Vue({
        el:'#rrapp',
        data:{
            detail:{ // 详情
                cashNo: null, // 认购资金ID
                realname: null, // 投资人
                borrowName: null, // 预约标名称
                productName: null, // 产品名称
                periodLength: null, // 投资周期
                profitPlan: null, // 收益方式
                cashStatus: null, // 状态
                initCashAmount: null, // 认购金额
                userPlanProfit: null, // 累计收益
                annualizedRate: null, // 预期年化收益率
                cashInvestDate: null, // 认购日期
                interestStartDate: null, // 计息起始日
                interestEndDate: null, // 最终退出日
                intStartDate: null, // 计息起始日
                exitedDate: null, // 最终退出日
                surplusNum: null, // 剩余投资时间
                holdedAmount: null, // 债权持有
                currCashAmount: null // 待配置资金
            },
            statistics:{
                creditNum:null, // 当前持有债权个数 --
                creditMoney:null, // 当前持有债权价值总计
                configNum:"102", // 资产配置次数 --
                retNum:"15", // 累计回款次数 --
                retMoney:"3,100.98", // 累计回款金额
                transferNum:"67", // 已转让债权个数 --
                capitalNum:"101", // 资金流水条数 --
                finishMoney:"2,000", // 当前现金结存
                earningMoney:"900", // 利息收益
                chargeMoney:"125" // 手续费缴纳
            }
        },
        methods: {
            query: function () {
                var page = $("#jqGrid").jqGrid('getGridParam','page');
                $("#jqGrid").jqGrid('setGridParam',{
                    poslabelata:param,
                    page:1
                }).trigger("reloadGrid");
            }
        }
    });

    // detaiL
    $.ajax({
        type: "GET",
        url: "../fromborrow/queryCashDetailsInfo?cashNo=" +cashNo,
        data: null,
        success: function(r){

            if(r.code === 0){
                vm.detail.cashNo = r.result.cashNo;
                vm.detail.realname = r.result.realname;
                vm.detail.borrowName = r.result.borrowName;
                vm.detail.productName = r.result.productName;
                vm.detail.periodLength = r.result.periodLength+ConstantUtils.getPeriodUnits(r.result.periodUnit).name;
                vm.detail.profitPlan = ConstantUtils.getProfitPlans(r.result.profitPlan).name;;
                vm.detail.cashStatus = ConstantUtils.getCashStatuses(r.result.cashStatus).name;
                vm.detail.initCashAmount = r.result.initCashAmount;
                vm.detail.userPlanProfit = r.result.userPlanProfit;
                vm.detail.annualizedRate = r.result.annualizedRate;
                vm.detail.cashInvestDate = r.result.cashInvestDate;
                vm.detail.interestStartDate = r.result.interestStartDate;
                vm.detail.interestEndDate = r.result.interestEndDate;
                vm.detail.surplusNum = r.result.surplusNum;
                vm.detail.holdedAmount = r.result.holdedAmount;
                vm.detail.currCashAmount = r.result.currCashAmount;
            }else{
                alert("获取认购摘要数据失败");
            }
        }
    });


    initTable1();


    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        // var jg = $("#jqGrid" + $(e.target).attr("href").substr(4));
        var tabHref = $(e.target).attr("href").substr(4);
        if(tabHref == '1'){
           initTable1();
        }

        if(tabHref == '2'){
            initTable2();
        }

        if(tabHref == '4'){
           initTable4();
        }

    });
});




function initTable1() {
    $.jgrid.gridUnload('jqGrid1');
    // table
    $("#jqGrid1").jqGrid({
        url: '../fromborrow/queryPaymentPlanInfo',
        datatype: "json",
        postData: {"cashNo":cashNo},
        colModel: [
            { label: '计划回款时间', name: 'billDate', width: 50, key:true },
            { label: '应回款本金', name: 'receiveCorpus', width: 50 },
            { label: '应回款利息', name: 'receiveInterest', width: 80 },
            { label: '已回款本金', name: 'realCorpus', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '已回款利息', name: 'realInterest', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '未回款本金', name: 'waitCorpus', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '未回款利息', name: 'waitInterest', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
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
        pager: "#jqGridPager1",
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
        }
    });
}

function initTable4() {
    $.jgrid.gridUnload('jqGrid1');
    $("#jqGrid1").jqGrid({
        url: '../fromborrow/queryDebtPaymentInfo',
        datatype: "json",
        postData: {"cashNo":cashNo},
        colModel: [
            { label: '回款时间', name: 'billDate', width: 50, key:true },
            { label: '回款债权', name: 'debtNo', width: 50 },
            { label: '债权归属的散标', name: 'borrowNo', width: 80 },
            { label: '回款金额', name: 'realTotal', width: 80 },
            { label: '回款中所含本金', name: 'realCorpus', width: 80 },
            { label: '回款中所含利息', name: 'realInterest', width: 80 },
            { label: '回款后债权剩余本金', name: 'surplusAmount', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        width: 1200,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        autowidth:true,
        multiselect: false,
        pager: "#jqGridPager1",
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
        },
        loadComplete:function (xhr){
            // console.log(xhr);
            vm.statistics.retNum = xhr.page.totalCount;
            vm.statistics.retMoney = xhr.totalCurrValue;
        }
    });

}


function initTable2() {
    $.jgrid.gridUnload('jqGrid1');
    $("#jqGrid1").jqGrid({
        url: '../fromborrow/queryHaveDebtInfo',
        datatype: "json",
        postData: {"cashNo":cashNo},
        colModel: [
            { label: '债权ID', name: 'debtNo', width: 50, key:true },
            { label: '配置时间', name: 'matchDate', width: 50 },
            { label: '配置时债权价格', name: 'matchPrincipal', width: 80 },
            { label: '当前债权本金', name: 'currPrincipal', width: 80 },
            { label: '当前债权价值', name: 'currValue', width: 80 },
            { label: '预期债权价值', name: 'expectValue', width: 80 },
            { label: '已获回款', name: 'receiveValue', width: 80 },
            { label: '债权归属的散标', name: 'loanBorrowNo', width: 80 },
            { label: '散标借款人', name: 'realName', width: 80 },
            { label: '剩余期限', name: 'surplusPeriod', width: 80 },
            { label: '散标原还款期限', name: 'periodLength', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getPeriodUnits(rowObjec.periodUnit);
                if (m == null) return cellvalue;
                return cellvalue+m.name;
            }},
            { label: '债权占散标', name: 'proportion', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        width: 1200,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        // rownumWidth: 25,
        autowidth:true,
        multiselect: false,
        pager: "#jqGridPager1",
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
        },
        loadComplete:function (xhr){
            console.log(xhr);
            vm.statistics.creditNum = xhr.page.totalCount;
            vm.statistics.creditMoney = xhr.totalCurrValue;
        }
    });

}
