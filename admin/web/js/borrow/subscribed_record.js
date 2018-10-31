$(function () {
    var ConstantConfig = {
        Statuses:[{code:null, name:"请选择"}, {code:"0", name:"默认状态"}, {code:"1", name:"撮合中"},{code:"2", name:"正常赎回中"},{code:"3", name:"提前赎回中"},
            {code:"4", name:"已承兑"},{code:"5", name:"转让中"},{code:"6", name:"计息中"}],
        FeeTypes:[{code:"1", name:"按金额收费"}, {code:"2", name:"按赎回费率收费"}], // 手续费方式
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
        getFeeTypes:function(val){
            return ConstantMethod.getVal(ConstantConfig.FeeTypes, val);
        },
    };

    var vm = new Vue({
        el:'#rrapp',
        data:{
            q:{ // 查询条件
                cashNo: null, // 认购资金ID
                investName: null, // 投资人姓名
                status: null, // 状态
            },
            redemption:{ // 提前赎回
                cashNo: null, // 认购资金ID
                feeType: "1", // 手续费方式
                advanceFee: null, // 按金额收费
                advanceFeeRate: null, // 按赎回费率收费
                advanceExitDate: null, // 提前赎回时间
            },
            config:{
                statuses:ConstantConfig.Statuses,
                feeTypes:ConstantConfig.FeeTypes,
            },
            title: null
        },
        created: function(){
            this.initConfig();
        },
        methods: {
            query: function () {
                this.reload();
            },
            add: function(){
                vm.title = "新增";
            },
            reload: function (event) {
                var param = new Object();
                param.borrowNo = sessionStorage.getItem("borrowNo");
                for (var p in vm.q){
                    var v = vm.q[p];
                    if (v != null && $.trim(v) != "") param[p] = v;
                }

                var page = $("#jqGrid").jqGrid('getGridParam','page');
                $("#jqGrid").jqGrid('setGridParam',{postData:null});
                $("#jqGrid").jqGrid('setGridParam',{
                    postData:param,
                    page:1
                }).trigger("reloadGrid");
            },
            initConfig: function(){

            }
        }
    });

    $("#jqGrid").jqGrid({
        url: '../reserveBorrow/queryCashInfo',
        datatype: "json",
        postData: {"borrowNo":sessionStorage.getItem("borrowNo")},
        colModel: [
            { label: '认购资金ID', name: 'cashNo', width: 50, key:true },
            { label: '投资人姓名', name: 'realname', width: 50 },
            { label: '投资人身份证', name: 'idno', width: 80 },
            { label: '邀请码', name: 'recommendCode', width: 80 },
            { label: '待配置资金', name: 'currCashAmount', width: 80 },
            { label: '认购金额', name: 'initCashAmount', width: 80 },
            { label: '用户实际收益', name: 'userActualProfit', width: 80 },
            { label: '计息起始日', name: 'interestStartDate', width: 80 },
            { label: '实际退出日', name: 'advanceExitDate', width: 80 },
            { label: '退出日', name: 'interestEndDate', width: 80 },
            { label: '状态', name: 'cashStatus', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getStatuses(cellvalue);
                return m != null ? m.name : "";
            }},
            { label: '操作', name: 'parentName', width: 80, formatter: function(a, b, row){
            	var btnArea = "<a class='detail-btn'>认购详情</a>";
            	if (row.cashStatus == 0 || row.cashStatus == 1 || row.cashStatus == 5 || row.cashStatus == 6) {
            		btnArea += "&nbsp;<a class='redeem-btn'>提前赎回</a>";
            	} else if (row.cashStatus == 2 || row.cashStatus == 4) {
            		btnArea += "&nbsp;<a style='color:#cccccc;'>提前赎回</a>";
            	} else if (row.cashStatus == 3) {
            		btnArea += "&nbsp;<a style='color:#cccccc;'>已赎回</a>";
            	}
            	btnArea += "<input name='cashNo' type='hidden' value='"+row.cashNo+"'/>";
            	btnArea += "<input name='cashStatus' type='hidden' value='"+row.cashStatus+"'/>";
                return btnArea;
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

    // 时间选择
    $(".date-comp").on({
        click:function(){
            var $t = $(this);
            WdatePicker({
                readOnly:true,
                dateFmt:'yyyy-MM-dd HH:mm:ss',
                minDate:new Date().toLocaleString(),
                onpicking:function(dp){
                    if ($t.is("[r-advance-exit-date]"))  vm.redemption.advanceExitDate = dp.cal.getNewDateStr();
                },
                onclearing:function(){
                    if ($t.is("[r-advance-exit-date]"))  vm.redemption.advanceExitDate = null;
                }
            });
        }
    });

    // 认购详情
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            sessionStorage.setItem('cashNo', $t.siblings("input[name=cashNo]").val());
            location.href = "subscribed_detail.html";
        }
    }, ".detail-btn");

    // 提前赎回
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            if ($t.siblings("input[name=cashStatus]").val() == 0 || $t.siblings("input[name=cashStatus]").val() == 5) {
            	alert("只有满标起息可以做提前赎回");
            } else {
                $('#charge-modal').modal('toggle');
                vm.redemption.cashNo = $t.siblings("input[name=cashNo]").val();
            }
        }
    }, ".redeem-btn");

    // 提前赎回-提交
    $("#charge-sub").on({
        click: function () {
            if (isBlank(vm.redemption.advanceFee)) {alert("请填写手续费"); return;}
            if (!isNumber(vm.redemption.advanceFee) || parseFloat(vm.redemption.advanceFee) < 0) {alert("手续费必须大于0"); return;}
            if (isBlank(vm.redemption.advanceExitDate)) {alert("请选择时间"); return;}

            var param = copy(vm.redemption);
            if (param.feeType == 1){
                param.advanceFeeRate = null;
            }else{
                param.advanceFeeRate = param.advanceFee;
                param.advanceFee = null;
            }
            console.log(param);
            var url = "../reserveBorrow/doAdvanceRedeem";
            $.ajax({
                type: "POST",
                url: url,
                data: param,
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            $('#charge-modal').modal('hide');
                            $("#formTab")[0].reset();
                            resetText();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }
    });

    function isBlank(v){
        if (v == null || $.trim(v) == ""){
            return true;
        }
        return false;
    }

    function isNumber(str){
        return !isNaN(str);
    }

    function isInt(str){
        if (str == null || str == "")
            return false;
        var result=str.toString().match(/^(-|\+)?\d+$/);
        if(result==null) return false;
        return true;
    }

    function copy(obj){
        if(typeof obj != 'object'){
            return obj;
        }
        var newobj = {};
        for ( var attr in obj) {
            newobj[attr] = copy(obj[attr]);
        }
        return newobj;
    }

    function resetText() {
        vm.redemption.cashNo = null; // 认购资金ID
        vm.redemption.feeType = "1"; // 手续费方式
        vm.redemption.advanceFee = null; // 按金额收费
        vm.redemption.advanceFeeRate = null; // 按赎回费率收费
        vm.redemption.advanceExitDate = null; // 提前赎回时间
    }
});