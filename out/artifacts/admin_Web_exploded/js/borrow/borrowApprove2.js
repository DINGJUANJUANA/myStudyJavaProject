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
            fromRaise: { // 募集
                borrowNo: null,
                periodLength: null,
                date: null
            },

            configs: getH5Session('configs')
        },
        methods: {
            query: function () {
                vm.reload();
            },

            reload: function (event) {
                vm.showList = true;
                vm.showSCDDetail = false;
                vm.showHKDDetail = false;
                vm.userCode = null;
                vm.remark = null;
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
                        'returnType': vm.q.returnType, 'status': vm.q.status, 'rate': vm.q.rate
                    },
                    page: 1
                }).trigger("reloadGrid");

            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../borrowApprove/list2',
        datatype: "json",
        colModel: [
            {label: '借款项目编号', name: 'borrow_no', width: 80},
            {label: '借款项目名称', name: 'borrow_name', width: 80},
            {
                label: '年化利率', name: 'annualized_rate', width: 30, formatter: function (a, b, c) {
                    return a + '%';
                }
            },
            {label: '借款项目合同编号', name: 'contract_no', width: 80},
            {label: '创建时间', name: 'create_time', width: 80},
            {label: '合同金额', name: 'contract_amount', width: 40},
            {
                label: '还款方式', name: 'return_type', width: 40, formatter: function (a, b, c) {
                    return getConfigValByCode2Key('return_type', a);
                }
            },
            {label: '操作', name: 'borrow_no', width: 40, formatter: formatFun}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        // rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
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
    var res = '<p class="btn btn-success btn-sm" onclick="detail(\'' + cellvalue + '\')">查看详情</p>&nbsp';
    return res;
}

function detail(id) {
    vm.showList = false;
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

function approve() {
    confirm('请问确定要审批通过吗？', function () {
        $.get("../borrowApprove/approve2?borrowNo=" + vm.fromBorrow.borrowNo + "&platform=" + vm.fromBorrow.assetPlatform, function (r) {
            if (r.code == 0) {
                alert("复审通过成功");
                vm.query();
            } else {
                alert("复审通过异常：" + r.msg);
            }
        });
    });

}

function denied() {
    $.get("../borrowApprove/denied?borrowNo=" + vm.fromBorrow.borrowNo + "&remark=" + vm.remark, function (r) {
        if (r.code == 0) {
            alert("审批驳回成功");
            vm.query();
        } else {
            alert("审批驳回异常：" + r.msg);
        }
    });
}