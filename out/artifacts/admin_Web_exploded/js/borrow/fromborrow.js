var vm;

$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            q: {
                borrowNo: null,
                borrowName: null,
                minAmout: null,
                maxAmout: null,
                periodLength: null,
                periodUnit: null,
                returnType: null,
                status: null,
                rate: null
            },
            showList: true,
            showDetailOld: false,
            showDetail: false,
            showSCDDetail: false,
            showHKDDetail: false,
            title: null,
            fromBorrow: {},
            car: {},
            date: {},
            user: {},
            hkd: {},
            userCode: null,
            guaranteeFee: null,
            remark: null,
            fromRaise:{ // 募集
                borrowNo:null,
                periodLength:null,
                date:null
            },

            configs: getH5Session('configs')
        },
        methods: {
            query: function () {
                vm.reload();
            },

            reload: function (event) {
                vm.showList = true;
                vm.showDetailOld = false;
                vm.showDetail = false;
                vm.showSCDDetail = false;
                vm.showHKDDetail = false;
                vm.fromBorrow = {};
                vm.car = {};
                vm.date = {};
                vm.user = {};
                vm.hkd = {};
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").jqGrid('setGridParam', {
                    postData: {
                        'borrowNo': vm.q.borrowNo, 'borrowName': vm.q.borrowName, 'minAmout': vm.q.minAmout,
                        'maxAmout': vm.q.maxAmout, 'periodLength': vm.q.periodLength, 'periodUnit': vm.q.periodUnit,
                        'returnType': vm.q.returnType,'status': vm.q.status, 'rate': vm.q.rate
                    },
                    page: 1
                }).trigger("reloadGrid");

            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../fromborrow/list',
        datatype: "json",
        colModel: [
            {label: '加息利率', name: 'exRate', width: 80,hidedlg:true,hidden:true},
            {label: '借款项目编号', name: 'borrowNo', width: 80},
            {label: '借款项目名称', name: 'borrowName', width: 80},
            {label: '标的类型', name: 'borrowActiveType', width: 40, formatter: function (a, b, c) {
                    var borrowActiveType= null;
                    switch (a){
                        case 0:
                            borrowActiveType = '普通标';
                            break;
                        case 1:
                            borrowActiveType = '新手标';
                            break;
                        case 2:
                            borrowActiveType = '活动标';
                            break;
                    }
                    return borrowActiveType;
                }},
            {label: '年化利率', name: 'annualizedRate', width: 60, formatter: function (a, b, c) {
                    var exRate = '';
                    console.log(c.exRate);
                    if(c.exRate !='0.00' && c.exRate != null){
                        exRate = '+'+c.exRate + '%';
                    }
                    return a + '%'+exRate;
                }},
            {label: '借款项目合同编号', name: 'contractNo', width: 80},
            {label: '计划投标开始日期', name: 'startDate', width: 80},
            {label: '计划投标截止日期', name: 'endDate', width: 80},
            {label: '合同金额', name: 'contractAmount', width: 40},
            {label: '还款方式', name: 'returnType', width: 50, formatter: function (a, b, c) {
                return getConfigValByCode2Key('return_type', a);
            }},
            {label: '状态', name: 'status', width: 60, formatter: function (a, b, c) {
                return getConfigValByCode2Key('borrow_status', a);
            }},
            {label: '操作', name: 'borrowNo', width:100, formatter: formatFun}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        // rownumWidth: 25,
        autowidth: true,
        // multiselect: true,
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

    $(".date-comp").on({
        click:function(){
            var $t = $(this);
            WdatePicker({
                readOnly:true,
                dateFmt:'yyyy-MM-dd HH:mm:ss',
                onpicking:function(dp){
                    vm.fromRaise.date = dp.cal.getNewDateStr();
                },
                onclearing:function(){
                    vm.fromRaise.date = null;
                }
            });
        }
    });

    // 募集-提交
    $("#modal-sub").on({
        click: function () {
            if (!isNumber(vm.fromRaise.periodLength) || parseInt(vm.fromRaise.periodLength) < 0 || parseInt(vm.fromRaise.periodLength) % 1 > 0) {alert("手续费必须大于0"); return;}
            if (isBlank(vm.fromRaise.date)) {alert("请选择时间"); return;}

            var param = {"startTime":vm.fromRaise.date, "raisePeriod":vm.fromRaise.periodLength, "borrowNo":vm.fromRaise.borrowNo};
            console.log(param);
            var url = "../fromborrow/startRaise";
            $.ajax({
                type: "POST",
                url: url,
                data: param,
                contentType: "application/x-www-form-urlencoded",
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.fromRaise.date = null;
                            vm.fromRaise.periodLength = null;
                            vm.fromRaise.borrowNo = null;
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        }
    });
});

function formatFun(cellvalue, options, rowObjec) {
    var btns = '';

    var res = '<p class="btn btn-success btn-sm" onclick="zqgx(\'' + cellvalue + '\')">债权</p>&nbsp' +
         '<p class="btn btn-danger btn-sm" onclick="orderInvenst(\'' + cellvalue + '\')">认购</p>&nbsp' +
        '<p class="btn btn-primary btn-sm" onclick="qgFun(\'' + cellvalue + '\')">期供</p>&nbsp'+
        '<p class="btn btn-primary btn-sm" onclick="detail(\'' + cellvalue + '\')">详情</p>&nbsp'+
        btns;
    return res;
}


function orderInvenst(id) {
    vm.title = '认购记录';
    vm.showList = false;
    vm.showDetailOld = true;
    $.get("../fromborrow/info/" + id, function (r) {
        vm.fromBorrow = r.fromBorrow;
    });

    $.jgrid.gridUnload('jqGridZqgx');
    $("#jqGridZqgx").jqGrid({
        url: "../fromborrow/orderInvest/" + id,
        datatype: "json",
        colModel: [
            {label: '用户ID', name: 'userCode', width: 50, key: true},
            {label: '用户手机号', name: 'registerMobile', width: 50},
            {label: '投资金额（元）', name: 'investAmount', width: 80},
            {label: '投资时间', name: 'createTime', width: 80}
        ],
        viewrecords: true,
        height: 500,
        width: 1200,
        rowNum: 10,
        rowList: [10],
        rownumbers: true,
        // rownumWidth: 25,
        pager: "#jqGridPagerZqgx",
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

function qgFun(id) {
    vm.title = '散标期供';
    vm.showList = false;
    vm.showDetailOld = true;
    $.get("../fromborrow/info/" + id, function (r) {
        vm.fromBorrow = r.fromBorrow;
    });

    $.jgrid.gridUnload('jqGridZqgx');
    $("#jqGridZqgx").jqGrid({
        url: "../fromborrow/billInvestDetail/" + id,
        datatype: "json",
        colModel: [
            {label: '标的号', name: 'borrowNo', width: 180},
            {label: '期数', name: 'curStageNo', width: 180},
            {label: '应收本金', name: 'receiveCorpus', width: 180},
            {label: '实收本金', name: 'realCorpus', width: 180},
            {label: '应收利息', name: 'receiveInterest', width: 180},
            {label: '账单日', name: 'billDate', width: 180},
            {label: '状态', name: 'status', width: 80, formatter: function (a, b, c) {
                return getConfigValByCode2Key('bill_invest_detail_status', a);
            }},
            {
                label: '操作', name: 'dzStatus', width: 80, formatter: function (data, b, row) {
                return "<p class='btn btn-success btn-sm' onclick=\"dcDetailFun('" + row.borrowNo+ "','" + row.curStageNo + "')\">代偿详情</p> ";
            }
            }
        ],
        viewrecords: true,
        height: 500,
        width: 1200,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        // rownumWidth: 25,
        pager: "#jqGridPagerZqgx",
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

function zqgx(id) {
    vm.showList = false;
    vm.showDetailOld = true;
    vm.title = '债权关系';
    $.get("../fromborrow/info/" + id, function (r) {
        vm.fromBorrow = r.fromBorrow;
    });

    $.jgrid.gridUnload('jqGridZqgx');
    $("#jqGridZqgx").jqGrid({
        url: "../fromborrow/zqgx/" + id,
        datatype: "json",
        colModel: [
            {label: '债权ID', name: 'debtNo', width: 180},
            {label: '初始本金/元', name: 'initPrincipal', width: 80},
            {label: '债权归属项目', name: 'borrowName', width: 80},
            {label: '债权形成时间', name: 'buildDate', width: 100},
            {label: '当前债权价格', name: 'currValue', width: 80},
            {label: '当前债权本金', name: 'currPrincipal', width: 80},
            {label: '债权占散标比率', name: 'proportion', width: 80},
            {label: '最近更新时间', name: 'updateTime', width: 100},
            {label: '持有者姓名', name: 'debteUserName', width: 80}
        ],
        viewrecords: true,
        height: 500,
        width: 1200,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        // rownumWidth: 25,
        pager: "#jqGridPagerZqgx",
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

function rgdetail(id) {
    layer.open({
        type: 2,
        area: ['1500px', '800px'],
        skin: 'layui-layer-molv',
        title: "详情",
        fixed: false, //不固定
        maxmin: true,
        content: '../fromborrow/investDetail.html?cashNo=' + id
    });
};

function dcDetailFun(billInvestNo,curStageNo){
    layer.open({
        type: 2,
        area: ['1500px', '500px'],
        skin: 'layui-layer-molv',
        title: "代偿详情",
        fixed: false, //不固定
        maxmin: true,
        content: '../fromborrow/dcDetail.html?billInvestNo=' + billInvestNo +'&curStageNo=' +curStageNo
    });
}

// 开始募集
function startMj(id) {
    vm.fromRaise.borrowNo = id;
    console.log(vm.fromRaise.borrowNo);
    $('#modal').modal('toggle');
}

// 上架 & 下架
function sell(id) {
    $.get("../fromborrow/sale", {"borrowNo":id}, function (r) {
        if (r.code == 0){
            vm.reload();
        }else{
            alert(r.msg);
        }
    });
}


function isNumber(str){
    return !isNaN(str);
}

function isBlank(v){
    if (v == null || $.trim(v) == ""){
        return true;
    }
    return false;
}


function detail(id) {
    vm.showList = false;
    vm.showDetail = true;
    vm.title = '查看详情';
    $.get("../borrowApprove/detail?borrowNo=" + id, function (r) {
        vm.fromBorrow = r.data.fromBorrow;
        vm.fromBorrow.returnType = getConfigValByCode2Key('return_type', vm.fromBorrow.returnType);
        vm.fromBorrow.periodUnit = getConfigValByCode2Key('period_unit', vm.fromBorrow.periodUnit);
        vm.car = r.data.car;
        vm.date = r.data.date;
        vm.user = r.data.user;
        vm.userCode = r.data.userCode;
        vm.guaranteeFee = r.data.guaranteeFee;
        vm.hkd = r.data.hkd;
        if(r.data.fromBorrow.assetPlatform == "SCD"){
            vm.showSCDDetail = true;
            vm.user.usageLoan = getConfigValByCode2Key('usage_loan', vm.user.usageLoan);
            var imgurl = eval(r.data.imgurl);
            var imgurlNew = eval(r.data.imgurlNew);
            $("#imgurl").empty();
            $("#imgurlNew").empty();
            imgurl.forEach(function (value, index, array) {
                var img = '<div class="col-sm-6 col-md-3" style="margin-left: 10px ; margin-top: 10px">'+
                    '<a href=\''+value+'\' target="blank">'+
                    '<img src=\''+value+'\' alt="通用的占位符缩略图" width="500" height="300" >'+
                   '</a> </div> ';
                $("#imgurl").append(img);
            });
            imgurlNew.forEach(function (value, index, array) {
                var img = '<div class="col-sm-6 col-md-3">'+
                    '<a href=\''+value+'\' target="blank">'+
                    '<img src=\''+value+'\' alt="通用的占位符缩略图" width="500" height="300" >'+
                    '</a> </div> ';
                $("#imgurlNew").append(img);
            });
        }
        if(r.data.fromBorrow.assetPlatform == "HKD"){
            vm.showHKDDetail = true;
            vm.hkd.borrowMain = getConfigValByCode2Key('borrow_main', vm.hkd.borrowMain);
            vm.hkd.borrowType = getConfigValByCode2Key('borrow_type', vm.hkd.borrowType);
            vm.hkd.isearlyrepayment = getConfigValByCode2Key('isEarlyRepayment', vm.hkd.isearlyrepayment);
            vm.hkd.isfixed = getConfigValByCode2Key('isFixed', vm.hkd.isfixed);
            var Img = eval(vm.hkd.showImgUrl);
            $("#imgHKD").empty();
            Img.forEach(function (value, index, array) {
                var img = '<div class="col-sm-6 col-md-3">'+
                    '<a href=\''+value+'\' target="blank">'+
                    '<img src=\''+value+'\' alt="通用的占位符缩略图" width="500" height="300" hspace="10" vspace="10" >'+
                    '</a> </div> ';
                $("#imgHKD").append(img);
            });
        }
    });
}

function imgClick() {

}
