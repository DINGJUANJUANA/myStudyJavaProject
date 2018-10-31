
/**
 *序列化form表单
 *@param  要序列化的表单的名称
 *@return 返回对象
 ***/
function serializeObject(form){
    var o = {};
    // form.find(".ui-select").each(function(r){
    //     var name=$(this).attr("name");
    //     var value=$(this).attr("data-value");
    //     o[name]= value;
    // })

    $.each(form.serializeArray(),function(index){
        if(o[this['name']]){
            o[this['name']] = o[this['name']] + ","+this['value'];
        }else{
            o[this['name']] =  this['value'];
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
/**
 * 表单重载
 */
function accountReload() {
    // var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#accountOrgForm"))
    }).trigger("reloadGrid");
}

function incomeReload() {
    // var page = $("#jqGrid1").jqGrid('getGridParam', 'page');
    $("#jqGrid1").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-1"))
    }).trigger("reloadGrid");
}

function frozenReload() {
    // var page = $("#jqGrid2").jqGrid('getGridParam', 'page');
    $("#jqGrid2").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-2"))
    }).trigger("reloadGrid");
}

function changeLogReload() {
    // var page = $("#jqGrid3").jqGrid('getGridParam', 'page');
    $("#jqGrid3").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-3"))
    }).trigger("reloadGrid");
}
function autoTenderReload() {
    // var page = $("#jqGrid2").jqGrid('getGridParam', 'page');
    $("#jqGridAutoTender").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-4"))
    }).trigger("reloadGrid");
}
function tenderReload() {
    // var page = $("#jqGrid2").jqGrid('getGridParam', 'page');
    $("#jqGridTenderLog").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-5"))
    }).trigger("reloadGrid");
}

function changeStatus(data) {
    $.get("../customerMag/changeCustomerStatus", { id: data} ,function (r) {
        console.log(r);
        if (r.code == "success"){
            accountReload();
        }else {
            console.log(r.code);
        }

    });
}

$(function(){

    $("#accountsList").collapse('show');
    $("#accountInfo").collapse('hide');

    var user = getH5Session('userInfo');

    $("#jqGrid").jqGrid({
        url : '../customerMag/findCustomerAccount',
        datatype : "json",
        colModel : [
            {label: '作业账户ID', name: 'id', width: 50, key: true},
            {label: '作业账户编码', name: 'accountOrgId', width: 100},
            {label: '担保公司名称', name: 'realName', width: 110},
            {label: '联系人姓名', name: 'contractPerson', width: 110},
            {label: '注册手机号', name: 'mobile', width: 180},
            {label: '创建时间', name: 'createTime', width: 140},
            {label: '账面总余额', name: 'totalAmount', width: 110},
            {label: '可用余额', name: 'availableAmount', width: 110,hidedlg:true,hidden:true},
            {label: '冻结余额', name: 'frozenAmount', width: 110,hidedlg:true,hidden:true},
            {label: '账户状态', name: 'status', width: 80,formatter:function (value, options, row) {
                return value == 1 ?
                    '<span>启用</span>':
                    '<span>禁用</span>';
            }
            },
            {label: '操作', name: 'status', width: 110,formatter:function (value, options, row){
                row.openFlag = row.openFlag == 1?"开启":"关闭";
                setH5Session('customer'+row.id,row);
                var returnStr1 = '';
                var returnStr2 = '';
                if(hasPermission('balance:customerMag:ban')) {
                    returnStr1 = value == 1 ?
                        '<button class="btn btn-xs btn-warning" onclick="changeStatus(\'' + row.id + '\')">禁用</button>' :
                        '<button class="btn btn-xs btn-success" onclick="changeStatus(\'' + row.id + '\')">启用</button>';
                }
                if(hasPermission('balance:customerMag:detail')){
                    returnStr2 ='<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="showInfo(\'' + row.id + '\')">详情</button>';
                }
                return returnStr1 + returnStr2;
            }}
        ],
        viewrecords: true,
        width: 1200,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        postData:{
            accountType:$("#accountType").val()
        },
        rownumbers: false,
        rownumWidth: 25,
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

$("#choose").click(function () {
    accountReload();
});

function back() {
    $("#accountsList").collapse('toggle');
    $("#accountInfo").collapse('toggle');
}

$("#chooseIncome").click(function () {
   incomeReload()
});

$("#chooseFrozen").click(function () {
    frozenReload()
});
$("#autoTender").click(function () {
    autoTenderReload()
});
$("#tender").click(function () {
    tenderReload()
});

function showInfo(id) {
    var customerAccount = getH5Session('customer'+id);
    $("#customerId").text(customerAccount.id);
    $("#customerAmount").text(customerAccount.totalAmount);
    $("#customerAccountOrgId").text(customerAccount.accountOrgId);
    $("#customerAvailableAmount").text(customerAccount.availableAmount);
    $("#customerName").text(customerAccount.realName);
    $("#customerfrozenAmount").text(customerAccount.frozenAmount);
    if(customerAccount.unifiedCode!=null && customerAccount.unifiedCode!=''){

        $("#customerIdNo").text(customerAccount.unifiedCode);
    }else if(customerAccount.organizationCode!=null&& customerAccount.organizationCode!=''){
        $("#customerIdNo").text(customerAccount.organizationCode);
    }else{
        $("#customerIdNo").text(customerAccount.idno);
    }
    $("#customerContractPerson").text(customerAccount.contractPerson);
    $("#customerCreateTime").text(customerAccount.createTime);
    $("#customerPlatform").text(customerAccount.platformName);
    $("#customerMobile").text(customerAccount.mobile);
    $("#customerUserType").text(customerAccount.userType);
    $("#customerAccountId").text(customerAccount.accountId);
    $("#openFlag").text(customerAccount.openFlag);
    $("#matchNum").text(customerAccount.matchNum);

    $("#accountOrgId-income").val(customerAccount.accountOrgId);
    $("#accountOrgId-frozen").val(customerAccount.accountOrgId);
    $("#accountOrgId-statusLog").val(customerAccount.accountOrgId);
    $("#autoTenderLog").val(customerAccount.userCode);
    $("#tenderLog").val(customerAccount.userCode);
    $.jgrid.gridUnload('jqGrid1');
    $.jgrid.gridUnload('jqGrid2');
    $.jgrid.gridUnload('jqGrid3');
    $.jgrid.gridUnload('jqGridAutoTender');
    $.jgrid.gridUnload('jqGridTenderLog');
    $("#jqGrid1").jqGrid({
        url : "../customerMag/findCustomerAmountLog",
        datatype : "json",
        postData : serializeObject($("#form-1")),
        colModel : [
            {label: '交易时间', name: 'accountTime', width: 200},
            {label: '交易流水号', name: 'orderNo', width: 150},
            {label: '交易金额', name: 'operationAmount', width: 150},
            {label: '交易类型', name: 'type', width: 200},
            {label: '账户可用余额', name: 'availableAmountAfter', width: 100}
        ],
        viewrecords: true,
        width: 1000,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
        pager: "#jqGridPager1",
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
            $("#jqGrid1").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#jqGrid2").jqGrid({
        url : "../customerMag/findFrozenAmountLog",
        datatype : "json",
        postData : serializeObject($("#form-2")),
        colModel : [
            {label: '流水ID', name: 'orderNo', width: 200, key: true},
            {label: '操作时间', name: 'changeTime', width: 200},
            {label: '类型', name: 'type', width: 250},
            {label: '金额', name: 'amount', width: 250},
            {label: '备注', name: 'remark', width: 100},
        ],
        viewrecords: true,
        width: 1000,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
        pager: "#jqGridPager2",
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
            $("#jqGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#jqGrid3").jqGrid({
        url : "../customerMag/findCustomerLog",
        datatype : "json",
        postData : serializeObject($("#form-3")),
        colModel : [
            {label: '切换时间', name: 'createTime', width: 250, key: true},
            {label: '切换前', name: 'beforeImage', width: 250},
            {label: '切换后', name: 'afterImage', width: 250},
            {label: '切换者', name: 'switchUser', width: 250}
        ],
        viewrecords: true,
        width: 1000,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
        pager: "#jqGridPager3",
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
            $("#jqGrid3").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#jqGridAutoTender").jqGrid({
        url : "../customerMag/findTenderOperateLog",
        datatype : "json",
        postData : serializeObject($("#form-4")),
        colModel : [
            {label: '最大投资金额', name: 'maxInvestAmount', width: 200,hidden:true},
            {label: '最大投资周期长度', name: 'maxPeriodLength', width: 200,hidden:true},
            {label: '周期单位', name: 'periodUnit', width: 200,hidden:true},
            {label: '操作时间', name: 'createTime', width: 200, key: true},
            {label: '操作行为', name: 'openFlag', width: 150,formatter:function (value, options, row) {
                    return value == 1? "开启":"关闭";
                }},
            {label: '操作客户端', name: 'client', width: 150,formatter:function (value, options, row) {
                    return getConfigValByCode2Key('client',value);
                }},
            {label: '当前设置投标类型', name: 'borrowTypeInfo', width: 200,formatter:function (value, options, row) {
                    switch (value){
                        case '1':
                            return "全部";
                            break;
                        case '2':
                            return "信用贷";
                            break;
                        case '3':
                            return "抵押贷";
                            break;
                    }
                }},
            {label: '当前设置单笔投资投资区间', name: 'minInvestAmount', width: 200,formatter:function (value, options, row) {
                return value+"--"+row.maxInvestAmount;
            }},
            {label: '当前设置投资期限', name: 'minPeriodLength', width: 200,formatter:function (value, options, row) {
                var periodUnit = getConfigValByCode2Key('period_unit',row.periodUnit);
                var min = value == null? "不限": value+periodUnit;
                var max = row.maxPeriodLength == null? "不限": row.maxPeriodLength+periodUnit;
                    return min+"--"+max;
                }},
            {label: '使用优惠券', name: 'autoUseCoupon', width: 100,formatter:function (value, options, row) {
                return value == 1? "是":"否";
            }}

        ],
        viewrecords: true,
        width: 1500,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: false,
        //multiselect: true,
        pager: "#jqGridPagerAutoTender",
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
            $("#jqGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#jqGridTenderLog").jqGrid({
        url : "../customerMag/findTenderLog",
        datatype : "json",
        postData : serializeObject($("#form-5")),
        colModel : [
            {label: '周期名称', name: 'periodUnit',hidden:true},
            {label: '投标时间', name: 'orderDateTime', width: 200, key: true},
            {label: '标的ID', name: 'borrowNo', width: 150},
            {label: '标的类型', name: 'borrowType', width: 150,formatter:function (value, options, row) {
                    return value == 2?"信用贷":"抵押贷";
                }},
            {label: '投资金额', name: 'investAmount', width: 150},
            {label: '标的期限', name: 'periodLength', width: 150,formatter:function (value, options, row) {
                    return row.periodLength +getConfigValByCode2Key('period_unit', row.periodUnit);
                }},
            {label: '还款方式', name: 'profitPlan', width: 200,formatter:function (value, options, row) {
                    return getConfigValByCode2Key('return_type', value);
                }},
            {label: '使用优惠券/类型', name: 'discountType', width: 200,formatter:function (value, options, row) {
                   if(row.discountType == 0){
                       return '否';
                   }else {
                       return '是/' + getConfigValByCode2Key('discount_type', row.discountType);
                   }
                }},
            {label: '抵扣/返现/加息金额', name: 'couponProfit', width: 200},
            {label: '标的状态', name: 'status', width: 100,formatter:function (value, options, row) {
                   return getConfigValByCode2Key('order_invest_status', row.status);
                }},
            {label: '投标方式', name: 'autoTenderFlag', width: 100,formatter:function (value, options, row) {
                    return value == 2 ?"自动投标":"手动投标";
                }},
            {label: '合同预览', name: 'borrowNo', width: 100,formatter:function (value, options, row) {
                    return  '<button class="btn btn-xs btn-warning" onclick="contract(\'' + value + '\')">合同预览</button>';
                }}
        ],
        viewrecords: true,
        width: 1500,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: false,
        //multiselect: true,
        pager: "#jqGridPagerTenderLog",
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
            $("#jqGridTenderLog").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#accountsList").collapse('toggle');
    $("#accountInfo").collapse('toggle');
}

function contract(borrow) {
    $.getJSON("../customerMag/getBorrowContract?borrowNo=" + borrow, function (r) {
        console.log(r);
        if(r.code==0){
            var win;
            win = window.open( 'about:blank','','scroll:1;status:0;help:0;resizable:1;dialogWidth:800px;dialogHeight:600px');
            win.document.write(r.model);
        }else {
            alert(r.msg)
        }
    });
}

function downloadCustomerAccount() {
    var url = '../customerMag/downloadCustomerAccount?'+$("#accountOrgForm").serialize();
    window.open(url);
}
function downloadCustomerAmountLog() {
    var url = '../customerMag/downloadCustomerAmountLog?'+$("#form-1").serialize();
    window.open(url);
}
function downloadCustomerLog() {
    var url = '../customerMag/downloadCustomerLog?'+$("#form-3").serialize();
    window.open(url);
}
function downloadFrozenAmountLog() {
    var url = '../customerMag/downloadFrozenAmountLog?'+$("#form-2").serialize();
    window.open(url);
}
function downloadAutoTenderLog() {
    var url = '../customerMag/downloadAutoTenderLog?'+$("#form-4").serialize();
    window.open(url);
}
function downloadTenderLog() {
    var url = '../customerMag/downloadTenderLog?'+$("#form-5").serialize();
    window.open(url);
}