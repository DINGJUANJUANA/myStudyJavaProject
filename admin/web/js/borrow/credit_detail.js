$(function () {
    var ConstantConfig = {
        Statuses:[{code:"1", name:"挂牌中"},{code:"2", name:"债转成功"},{code:"3", name:"债转失败"},{code:"4", name:"撤销挂牌"}], // 债转状态
        DebtStatuses:[{code:"1", name:"持有中"},{code:"2", name:"主动挂牌中"},{code:"3", name:"自动挂牌中"},{code:"4", name:"已结束"}], // 债权状态
        TransferTypes:[{code:"1", name:"主动债转"}, {code:"2", name:"自动债转"}], // 手续费转让原因
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
        getDebtStatuses:function(val){
        	return ConstantMethod.getVal(ConstantConfig.DebtStatuses, val);
        },
        getTransferTypes:function(val){
            return ConstantMethod.getVal(ConstantConfig.TransferTypes, val);
        },
    };

    var PrivateVar = {
        debtNo:sessionStorage.getItem("debtNo"),
        cashNo:sessionStorage.getItem("cashNo")
    };

    // Vue
    var vm = new Vue({
        el:'#rrapp',
        data:{
            detail:{ // 详情
                debtNo: null, // 债权ID
                currValue: null, // 当前债权价格
                currPrincipal: null, // 当前债权本金
                expectValue: null, // 预期债权价值
                receiveValue: null, // 已回款
                loanBorrowNo: null, // 债权归属散标
                loanRealName: null, // 散标借款人
                proportion: null, // 债权占散标比率
                cashNo: null, // 资金认购来源
                realname: null, // 认购出借人
                buildDate: null, // 债权形成时间
                expireDate: null, // 债权终结时间
                percentage: null, // 回款进度
                debtStatus: null, // 债权状态
            },
            statistics:{
                retNum:null, // 累计回款次数 --
                retMoney:null, // 累计回款金额
                transferNum:null, // 已转让债权个数 --
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

    // detail
    $.ajax({
        type: "GET",
        url: "../reserveBorrow/queryDebtDetailsInfo",
        data: {"debtNo": PrivateVar.debtNo},
        success: function(r){
            if(r.code === 0){
                vm.detail.debtNo = r.result.debtNo;
                vm.detail.currValue = r.result.currValue;
                vm.detail.currPrincipal = r.result.currPrincipal;
                vm.detail.expectValue = r.result.expectValue;
                vm.detail.receiveValue = r.result.receiveValue;
                vm.detail.loanBorrowNo = r.result.loanBorrowNo;
                vm.detail.loanRealName = r.result.loanRealName;
                vm.detail.proportion = r.result.proportion;
                vm.detail.cashNo = r.result.cashNo;
                vm.detail.realname = r.result.realname;
                vm.detail.buildDate = r.result.buildDate;
                vm.detail.expireDate = r.result.expireDate;
                vm.detail.percentage = r.result.percentage;
                vm.detail.debtStatus = ConstantUtils.getDebtStatuses(r.result.debtStatus).name;
            }else{
                alert("获取认购摘要数据失败");
            }
        }
    });

    // table
    $("#jqGrid1").jqGrid({
        url: '../reserveBorrow/queryDebtPaymentInfo',
        datatype: "json",
        postData: {"cashNo":PrivateVar.cashNo},
        colModel: [
            { label: '编号', name: 'debtNo', width: 50 },
            { label: '回款时间', name: 'billDate', width: 50 },
            { label: '回款金额', name: 'realTotal', width: 80 },
            { label: '回款本金', name: 'realCorpus', width: 80 },
            { label: '回款利息', name: 'realInterest', width: 80 },
            { label: '债权结余本金', name: 'surplusAmount', width: 80 }
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
        },
        loadComplete:function (xhr){
            // console.log(xhr);
            vm.statistics.retNum = xhr.page.totalCount;
            vm.statistics.retMoney = xhr.totalCurrValue;
        }
    });

    $("#jqGrid2").jqGrid({
        url: '../reserveBorrow/queryDebtTransferInfo',
        datatype: "local",
        postData: {"sellerCashNo":PrivateVar.cashNo},
        colModel: [
            { label: '挂牌时间', name: 'listingTime', width: 50},
            { label: '转让人', name: 'sellerName', width: 50 },
            { label: '承接时间', name: 'transferDate', width: 80 },
            { label: '承接人', name: 'buyerName', width: 80 },
            { label: '转让时债权价格', name: 'salePrincipal', width: 80 },
            { label: '折让费（折让率）', name: 'discountPrincipal', width: 80 },
            { label: '手续费（手续费率）', name: 'transferFee', width: 80 },
            { label: '手续费收取原因', name: 'transferType', width: 80 , formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getTransferTypes(cellvalue);
                return m != null ? m.name : "";
            }},
            { label: '实际入账金额', name: 'transferAmount', width: 80 },
            { label: '债转状态', name: 'status', width: 80 , formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getStatuses(cellvalue);
                return m != null ? m.name : "";
            }},
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        // rownumWidth: 25,
        autowidth:true,
        multiselect: false,
        pager: "#jqGridPager2",
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
            vm.statistics.transferNum = xhr.sellertDebtCount;
        }
    });

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var jg = $("#jqGrid" + $(e.target).attr("href").substr(4));
        // if (jg.data("loaded")) {
        //     return;
        // }
        jg.data("loaded", true);
        var page = jg.jqGrid('getGridParam','page');
        jg.jqGrid('setGridParam',{
            datatype:"json",
            page:page
        }).trigger("reloadGrid");
    });
});
