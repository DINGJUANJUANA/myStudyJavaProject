/**
 *序列化form表单
 *@param  要序列化的表单的名称
 *@return 返回对象
 ***/
function serializeObject(form){
    var o = {};

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
function reload() {
    // var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#userAccountForm"))
    }).trigger("reloadGrid");
}

$(function(){

    $("#userAccountsList").collapse('show');
    $("#userAccountInfo").collapse('hide');

    $("#jqGrid").jqGrid({
        url : '../userAccount/queryUserAccount',
        datatype : "json",
        colModel : [
            {label: '存管账户编码', name: 'accountId', width: 80, key: true},
            {label: '担保公司名称', name: 'realname', width: 80},
            {label: '联系人姓名', name: 'contractPerson', width: 80},
            {label: '注册手机号', name: 'mobile', width: 80},
            {label: '开户时间', name: 'createTime', width: 140},
            {label: '账户总余额', name: 'totalAmount', width: 100},
            {label: '可用余额', name: 'availableAmount', width: 100},
            {label: '冻结金额', name: 'frozenAmount', width: 100},
            {label: '操作', name: 'status', width: 110,formatter:function (value, options, row){
                setH5Session('merchant'+row.id,row);
                var isPermitted = hasPermission('balance:userAccount:detail');
                if(isPermitted) {
                    return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="showInfo(\'' + row.id + '\')">详情</button>';
                }else {
                    return ' ';
                }
            }}
        ],
        viewrecords: true,
        width: 1000,
        height: 450,
        rowNum: 10,
        rowList: [10, 30, 50],
        // rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
        pager: "#jqGridPager",
        postData:{
          accountType:$("#accountType").val()
        },
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

    $("#choose").click(function () {
        console.log(serializeObject($("#userAccountForm")))
        reload();
    });

    $("#jqGrid1").jqGrid({
        url : "../userAccount/findAccountOrgNum",
        datatype : "json",
        colModel : [
            {label: '作业账户ID', name: 'id', width: 150, key: true},
            {label: '客户作业账户编码', name: 'accountOrgId', width: 150},
            {label: '账面总金额', name: 'totalAmount', width: 150},
            {label: '创建时间', name: 'createTime', width: 150},
            {label: '账户状态', name: 'status', width: 80,formatter:function (value, options, row) {
                switch (value)
                {
                    case 1:
                        value = '<span>启用</span>';
                        break;
                    case 2:
                        value = '<span>禁用</span>';
                        break;
                    case 3:
                        value = '<span>冻结</span>';
                        break;
                }
                return value;
            }}
        ],
        viewrecords: true,
        width: 600,
        rowNum: 10,
        rowList: [10, 30, 50],
        // rownumbers: true,
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
        url : "../userAccount/findAccountSzLog",
        datatype : "json",
        colModel : [
            {label: '收支流水ID', name: 'id', width: 150, key: true},
            {label: '交易时间', name: 'createTime', width: 180},
            {label: '交易流水号', name: 'orderNo', width: 150},
            {label: '交易金额', name: 'operationAmount', width: 150},
            {label: '交易类型', name: 'type', width: 150},
            {label: '账户可用余额', name: 'availableCreditAfter', width: 200},
        ],
        viewrecords: true,
        width: 1000,
        rowNum: 10,
        rowList: [10, 30, 50],
        // rownumbers: true,
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
        url : "../userAccount/findAccountFrozenLog",
        datatype : "json",
        colModel : [
            {label: '流水ID', name: 'id', width: 150, key: true},
            {label: '操作时间', name: 'createTime', width: 150},
            {label: '类型', name: 'frozenType', width: 150},
            {label: '金额', name: 'operationAmount', width: 200},
            {label: '备注', name: 'remark', width: 200}
        ],
        viewrecords: true,
        width: 600,
        rowNum: 10,
        rowList: [10, 30, 50],
        // rownumbers: true,
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

    $("#jqGrid4").jqGrid({
        url : "../userAccount/findBankCardChangeLog",
        datatype : "json",
        colModel : [
            {label: '银行卡变更ID', name: 'id', width: 150, key: true},
            {label: '创建时间', name: 'createTime', width: 150},
            {label: '变更前', name: 'changeBefore', width: 400},
            {label: '变更后', name: 'changeAfter', width: 290}
        ],
        viewrecords: true,
        width: 1600,
        rowNum: 10,
        rowList: [10, 30, 50],
        // rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
        pager: "#jqGridPager4",
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
            $("#jqGrid4").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

});

//下含客户作业账户
function userAccountOrgReload() {
    // var page = $("#jqGrid1").jqGrid('getGridParam', 'page');
    $("#jqGrid1").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-1"))
    }).trigger("reloadGrid");
}

//收支流水
function accountSzLogReload() {
    // var page = $("#jqGrid2").jqGrid('getGridParam', 'page');
    $("#jqGrid2").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-2"))
    }).trigger("reloadGrid");
}

//解冻冻结流水
function accountFrozenLogReload() {
    // var page = $("#jqGrid3").jqGrid('getGridParam', 'page');
    $("#jqGrid3").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-3"))
    }).trigger("reloadGrid");
}

//银行卡变更历史
function bankChangeLogReload() {
    // var page = $("#jqGrid4").jqGrid('getGridParam', 'page');
    $("#jqGrid4").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#form-4"))
    }).trigger("reloadGrid");
}

function showInfo(id) {
    var merchantAccount = getH5Session('merchant'+id);
    $("#merchantId").text(merchantAccount.id);
    $("#merchantAmount").text(merchantAccount.totalAmount);
    $("#merchantAccountId").text(merchantAccount.accountId);
    $("#merchantAvailableAmount").text(merchantAccount.availableAmount);
    $("#merchangrealname").text(merchantAccount.realname);
    $("#merchantFrozenAmount").text(merchantAccount.frozenAmount);
    if(merchantAccount.unifiedCode!=null&&merchantAccount.unifiedCode!=""){
        $("#merchantidno").text(merchantAccount.unifiedCode);
    }else if(merchantAccount.organizationCode!=null&&merchantAccount.organizationCode!=""){
        $("#merchantidno").text(merchantAccount.organizationCode);
    }else{
        $("#merchantidno").text(merchantAccount.idno);
    }
    $("#merchantContractPerson").text(merchantAccount.contractPerson);
    $("#merchantCreateTime").text(merchantAccount.createTime);
    $("#merchantmobile").text(merchantAccount.mobile);
    $("#merchantbankCardNo").text(merchantAccount.bankCardNo);
    $("#merchantOrgNum").text(merchantAccount.orgNum);
    $("#accountId-accountOrg").val(merchantAccount.accountId);
    $("#accountId-sz").val(merchantAccount.accountId);
    $("#accountId-frozen").val(merchantAccount.accountId);
    $("#accountId-bankCard").val(merchantAccount.accountId);
    userAccountOrgReload();
    accountSzLogReload();
    accountFrozenLogReload();
    bankChangeLogReload();
    $("#userAccountsList").collapse('toggle');
    $("#userAccountInfo").collapse('toggle');
}

function back() {
    $("#userAccountsList").collapse('toggle');
    $("#userAccountInfo").collapse('toggle');
}

function downloadAccount() {
    var url = '../userAccount/downloadExcelAccountList?' + $("#userAccountForm").serialize();
    window.open(url);
}

function downloadAmountLog(){
    var url = '../userAccount/downloadExcelAccountLogList?' + $("#form-2").serialize();
    window.open(url);
}

