
$(function () {

    $("#jqGrid").jqGrid({
        url: '../reserveBorrow/queryReserveBorrowInfo',
        datatype: "json",
        colModel: [
            { label: '预约标ID', name: 'borrowNo', width: 200, key:true },
            { label: '预约标名称', name: 'borrowName', width: 50 },
            { label: '产品类型', name: 'productNo', width: 80 , formatter: function(cellvalue, options, rowObjec){
                var m = getProductNos(cellvalue);
                if (m == null) return "";
                return m.name;
            }},
            { label: '资金端平台', name: 'platform', width: 80 },
            { label: '募集金额', name: 'contractAmount', width: 80 },
            { label: '投资周期', name: 'periodLength', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = getPeriodUnits(rowObjec.periodUnit);
                if (m == null) return "";
                return cellvalue+m.name;
            }},
            { label: '收益处理方式', name: 'profitPlan', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = getProfitPlans(cellvalue);
                if (m == null) return "";
                return m.name;
            }},
            { label: '年化收益率', name: 'annualizedRate', width: 80 , formatter: function(cellvalue, options, rowObjec){
                return cellvalue+"%";
            }},
            { label: '平台加息', name: 'appendRate', width: 80 , formatter: function(cellvalue, options, rowObjec){
                return cellvalue+"%";
            }},
            { label: '当前应收金额', name: 'curReceiveCorpus', width: 80 },
            { label: '当前结清金额', name: 'curRealCorpus', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '已收本金', name: 'realCorpus', width: 80 },
            { label: '已收利息', name: 'realInterest', width: 80 },
            { label: '已收总额', name: 'realTotal', width: 80 },
            { label: '当期还款状态', name: 'curStatus', width: 80 , formatter: function(cellvalue, options, rowObjec){
                var m = getStatuses(cellvalue);
                if (m == null) return "";
                return m.name;
            }},
            { label: '发布日期', name: 'publishTime', width: 80 },
            // { label: '操作时间', name: '', width: 80 },
            // { label: '操作人', name: '', width: 80 },
            { label: '操作', width: 280, formatter: function(a, b, row){
                var rsltInfo = "";
                if(hasPermission('borrow:reserveBorrow:delete')) {
                    if (row.btnType == 0) {
                        rsltInfo = "&nbsp;<a class='delete-btn'>删除</a>";
                    } else if (row.btnType == 1) {
                        rsltInfo = "&nbsp;<a class='update-btn'>满标</a>";
                    }
                }
                var rsltzq = '';
                var rsltrg = '';
                var rsltqg = '';
                if(hasPermission('borrow:reserveBorrow:zq')){
                    rsltzq = "&nbsp;<a class='dept-btn'>债权关系</a>";
                }
                if(hasPermission('borrow:reserveBorrow:rg')){
                    rsltrg ="&nbsp;<a class='record-btn'>认购记录</a>";
                }
                if(hasPermission('borrow:reserveBorrow:qg')){
                    rsltqg ="&nbsp;<a class='regular-btn'>预约标期供</a>";
                }
                return rsltInfo +
                    rsltzq +
                    rsltrg +
                    rsltqg +
                    // "&nbsp;<a class='redeem-btn'>提前赎回</a>" +
                    "<input type='hidden' name='id' value='"+row.id+"'/>" +
                    "<input type='hidden' name='borrowNo' value='"+row.borrowNo+"'/>" +
                    "<input type='hidden' name='platform' value='"+row.platform+"'/>" +
                    "<input type='hidden' name='contractAmount' value='"+row.contractAmount+"'/>";
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
        }
    });

    $(".date-comp").on({
        click:function(){
            var $t = $(this);
            WdatePicker({
                readOnly:true,
                dateFmt:'yyyy-MM-dd HH:mm:ss',
                onpicking:function(dp){
                    if ($t.is("[q-start-date]"))  vm.q.startDate = dp.cal.getNewDateStr();
                    else if ($t.is("[q-end-date]"))  vm.q.endDate = dp.cal.getNewDateStr();
                    else if ($t.is("[r-advance-exit-date]"))  vm.redemption.advanceExitDate = dp.cal.getNewDateStr();
                },
                onclearing:function(){
                    if ($t.is("[q-start-date]"))  vm.q.startDate = null;
                    else if ($t.is("[q-end-date]"))  vm.q.endDate = null;
                    else if ($t.is("[r-advance-exit-date]"))  vm.redemption.advanceExitDate = null;
                }
            });
        }
    });

    // 删除
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            console.log($t.siblings("input[name=borrowNo]").val());

            var idVal = $t.siblings("input[name=id]").val();
            var borrowNoVal = $t.siblings("input[name=borrowNo]").val();
            var url = "../reserveBorrow/delReserveBorrowInfo";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/x-www-form-urlencoded",
                data: {borrowNo : borrowNoVal},
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                        });
                        vm.reload();
                    }else{
                        alert(r.msg);
                    }
                }
            });
        }
    }, ".delete-btn");

    // 更新
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            console.log($t.siblings("input[name=borrowNo]").val());

            var idVal = $t.siblings("input[name=id]").val();
            var borrowNoVal = $t.siblings("input[name=borrowNo]").val();
            var url = "../reserveBorrow/updateReserveBorrowInfo";
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/x-www-form-urlencoded",
                data: {id : idVal, borrowNo : borrowNoVal},
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                        });
                        vm.reload();
                    }else{
                        alert(r.msg);
                    }
                }
            });
        }
    }, ".update-btn");

    // 债权关系
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            sessionStorage.setItem('borrowNo', $t.siblings("input[name=borrowNo]").val());
            sessionStorage.setItem('platform', $t.siblings("input[name=platform]").val());
            sessionStorage.setItem('contractAmount', $t.siblings("input[name=contractAmount]").val());
            location.href = "credit_rela.html";
        }
    }, ".dept-btn");

    // 认购记录
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            sessionStorage.setItem('borrowNo', $t.siblings("input[name=borrowNo]").val());
            location.href = "subscribed_record.html";
        }
    }, ".record-btn");

    // 预约标期供
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            sessionStorage.setItem('borrowNo', $t.siblings("input[name=borrowNo]").val());
            location.href = "regular_borrow.html";
        }
    }, ".regular-btn");

    // 提前赎回
    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            $('#charge-modal').modal('toggle');
            vm.redemption.borrowNo = $t.siblings("input[name=borrowNo]").val();
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
                            $("#formTab")[0].reset();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }
    });

    // 产品类型
    $.ajax({
        type: "GET",
        url: "../reserveBorrow/config",
        success: function(r){
            if(r.code === 0){
                var ary = new Array();
                ary.push({code:"", name:"全部"});
                for (var i=0; i<r.reserveProducts.length; i++){
                    var rp = r.reserveProducts[i];
                    ary.push({code:rp.productNo, name:rp.productName});
                }
                vm.config.productNos = ary;
                vm.q.productNo = "";
            }else{
                alert("获取配置数据失败");
            }
        }
    });
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        q:{ // 查询条件
            borrowNo: null, // 预约标ID
            borrowName: null, // 名称
            productNo: null, // 产品类型
            amountYesMin: null, // 最小募集金额
            amountYesMax: null, // 最大募集金额
            periodLengthMin: null, // 最小投资周期
            periodLengthMax: null, // 最大投资周期
            periodUnit: "", // 投资周期单位
            profitPlan: "", // 收益处理方式
            annualizedRateMin: null, // 最小年华收益率
            annualizedRateMax: null, // 最大年华收益率
            startDate: null, // 开始发布时间
            endDate: null // 结束发布时间
        },
        redemption:{ // 提前赎回
            borrowNo: null, // 预约标ID
            feeType: "1", // 手续费方式
            advanceFee: null, // 按金额收费
            advanceFeeRate: null, // 按赎回费率收费
            advanceExitDate: null, // 提前赎回时间
        },
        config:{
            periodUnits:[{code:"", name:"全部"}, {code:"1", name:"天"},{code:"2", name:"周"},{code:"3", name:"月"},{code:"4", name:"年"}], // 投资周期
            productNos:null, // 产品类型
            profitPlans:[{code:"", name:"全部"}, {code:"1", name:"等额本息"}, {code:"2", name:"等额本金"},
                         {code:"3", name:"按期付息，到期还本"},{code:"4", name:"一次性还款"},{code:"99", name:"其他"}], // 收益处理方式
            statuses:[{code:"1", name:"未到期"}, {code:"2", name:"部分还款"},{code:"3", name:"提前结清"},{code:"4", name:"已结清待解冻"},{code:"5", name:"已结清"},{code:"6", name:"已逾期"}], // 当期还款状态
            feeTypes:[{code:"1", name:"按金额收费"}, {code:"2", name:"按赎回费率收费"}], // 手续费方式
        }
    },
    created: function(){
        this.initConfig();
    },
    methods: {
        query: function () {
            this.reload();
        },
        add: function(){
            location.href = "appointment_borrow_add.html";
        },
        reload: function (event) {
            var param = new Object();
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

function getProductNos(val){
    for (var i=0; i<vm.config.productNos.length; i++){
        if (vm.config.productNos[i].code == val){
            return vm.config.productNos[i];
        }
    }
    return null;
}

function getPeriodUnits(val){
    for (var i=0; i<vm.config.periodUnits.length; i++){
        if (vm.config.periodUnits[i].code == val){
            return vm.config.periodUnits[i];
        }
    }
    return null;
}

function getProfitPlans(val){
    for (var i=0; i<vm.config.profitPlans.length; i++){
        if (vm.config.profitPlans[i].code == val){
            return vm.config.profitPlans[i];
        }
    }
    return null;
}

function getStatuses(val){
    for (var i=0; i<vm.config.statuses.length; i++){
        if (vm.config.statuses[i].code == val){
            return vm.config.statuses[i];
        }
    }
    return null;
}

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

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}