var vm;

/**
 *序列化form表单
 *@param  要序列化的表单的名称
 *@return 返回对象
 ***/
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

var AccountId = "";
var Platform = "";

function hasPermission(permission) {
    var ispermission = '';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission", {permission: permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

$(function () {

    vm = new Vue({
        el: '#accountsList',
        data: {
            submitStartDate: "",
            submitEndDate: "",
            status:"",
            queryOrderNo:"",
            accountId:""
        },
        mounted: function(){
        },
        methods: {
            query: function () {
                vm.reload();
            },
            back:function(){
                $("#showAccountList").show();
                $("#showDetailList").hide();
            },
            reset: function() {
                // 送出後
                vm.submitStartDate  = "";
                vm.submitEndDate  = "";
                vm.queryOrderNo="";
                vm.status  = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status,
                        queryCompanyName:encodeURI(vm.queryCompanyName)
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            queryDetail:function(){
                $("#jqGridDetail").setGridParam({
                    postData: {
                        startTime: vm.submitStartDate,
                        endTime: vm.submitEndDate,
                        status: vm.status,
                        orderNo:vm.queryOrderNo,
                        accountId:vm.accountId
                    },
                    width: 1000,
                    page:1
                }).trigger("reloadGrid");
            },
            exportDetail:function(){
                window.open("../userAccount/exportAccountZjLog?accountId="+vm.accountId+"&createTime="+vm.submitStartDate+"&endTime="+vm.submitEndDate+"&orderNo="+vm.queryOrderNo);
            }
        }
    })


    $("#accountsList").collapse('show');
    $("#accountInfo").collapse('hide');

    var user = getH5Session('userInfo');
    if (user.userId == 1) {
        var platfroms = getH5Session('platforms');
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#platform").append(htmlStr);
        });
    }
    ;


    $("#jqGrid").jqGrid({
        url: '../merchantMag/findMerchantAccount',
        datatype: "json",
        colModel: [
            {label: '商户子账户ID', name: 'id', width: 30, key: true},
            {label: '商户子账户编码', name: 'accountOrgId', width: 90},
            {label: '存管账户子账户编码', name: 'accountId', width: 100},
            {label: '账户名称', name: 'accountType', width: 60},
            {label: '账户总金额', name: 'totalAmount', width: 80},
            {label: '可用余额', name: 'availableAmount', width: 80},
            {label: '冻结余额', name: 'frozenAmount', width: 80},
            {label: '开户时间', name: 'createTime', width: 100},
            {
                label: '操作', name: 'status', width: 200, formatter: function (value, options, row) {
                    setH5Session('merchant' + row.id, row);
                    var returnStr1 = '';
                    var returnStr2 = '';
                    var returnStr3 = '';
                    var returnStr4 = '';
                    var returnStr5 = '';
                    // if (hasPermission('balance:merchantMag:ban')) {
                    //     returnStr1 = '<button class="btn btn-xs btn-primary" onclick="recharge(\'' + row.accountId + '\',\'' + row.platform + '\')">充值</button>';
                    //
                    // }
                    // if (hasPermission('balance:merchantMag:ban')) {
                    //     returnStr2 = '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="withDraw(\'' + row.accountId + '\',\'' + row.platform + '\')">提现</button>';
                    // }
                    if (hasPermission('balance:merchantMag:ban')) {
                        returnStr3 = '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="transfer(\'' + row.accountId + '\',\'' + row.platform + '\')">资金调拨</button>';
                    }
                    /*if (row.accountOrgId == "SYS_GENERATE_000") {*/
                       /* returnStr4 = '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="unbind(\'' + row.accountId + '\',\'' + row.platform + '\')">解绑</button>' +
                            '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="bindCard(\'' + row.accountId + '\',\'' + row.platform + '\')">绑卡</button>';*/
                    //}
                    returnStr5='<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="showDetail(\'' + row.accountId + '\',\'' + row.platform + '\')">详情</button>';
                    if(row.accountOrgId == "SYS_GENERATE_003"||row.accountOrgId == "SYS_GENERATE_007"){
                        return returnStr5
                    }
                    return returnStr1 + returnStr2 + returnStr4 + returnStr5+returnStr3;
                    //return '<button class="btn btn-xs btn-primary" onclick="showDetail(\'' + row.accountId + '\',\'' + row.platform + '\')">详情查看</button>';
                }
            }
        ],
        viewrecords: true,
        width: 1000,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
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

    $("#jqGridDetail").jqGrid({
        url: '../userAccount/findAccountZjLog',
        datatype: "json",
        colModel: [
            {label: '交易时间', name: 'createTime', width: 200, key: true},
            {label: '交易流水号', name: 'orderNo', width: 200},
            {label: '交易金额', name: 'operationAmount', width: 110},
            {label: '交易类型', name: 'type', width: 150},
            {label: '可用余额', name: 'availableCreditAfter', width: 200},
            {label: '备注', name: 'remark', width: 300}
        ],
        viewrecords: true,
        width: 1500,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        pager: "#jqGridDetailPager",
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
            $("#jqGridDetail").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $("#out").change(function(){
        if($(this).val()!="20"){
            $("#in option").hide();
            $("option.mainAccount").show();
            $("#in").val(20);
        }else{
            $("#in option").show();
            $("option.mainAccount").hide();
            $("#in").val(21);
        }
    });
});

$("#choose").click(function () {
    accountReload();
});

$("#chooseIncome").click(function () {
    incomeReload();
});

function showDetail(accountId,platform){
    console.log(accountId+","+platform)
    vm.accountId=accountId;
    $("#jqGridDetail").setGridParam({
        postData: {
            startTime: vm.submitStartDate,
            endTime: vm.submitEndDate,
            status: vm.status,
            orderNo:vm.queryOrderNo,
            accountId:accountId
        },
        width: 1000,
        page:1
    }).trigger("reloadGrid");
    $("#showAccountList").hide();
    $("#showDetailList").show();
}

/**
 * 表单重载
 */
function accountReload() {
    // var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: 1,
        postData: serializeObject($("#accountOrgForm"))
    }).trigger("reloadGrid");
}

function incomeReload() {
    // var page = $("#jqGridIncome").jqGrid('getGridParam', 'page');
    $("#jqGridIncome").jqGrid('setGridParam', {
        page: 1,
        postData: serializeObject($("#formIncome"))
    }).trigger("reloadGrid");
}


function recharge(accountId, platform) {
    AccountId = 'SYS_GENERATE_000';
    Platform = "HLW";
    $('#rechargeModal').modal('show')
}

function withDraw(accountId, platform) {
    AccountId = 'SYS_GENERATE_000';
    Platform = "HLW";
    $('#withDrawModal').modal('show')
}

function transfer(accountId, platform) {
    AccountId = accountId;
    Platform = platform;
    $('#transferModal').modal('show')
}

function unbind(accountId, platform) {
    confirm('确定要解绑银行卡吗？', function () {
        $.getJSON("../merchantMag/unbind", {accountId: accountId, platform: platform}, function (data) {
            if (data.code == 0) {
                alert("解绑成功！");
            } else {
                alert(data.msg);
            }
        });
    }) ;
}

function bindCard(accountId, platform) {
    AccountId = accountId;
    Platform = platform;
    $('#binCardModal').modal('show')
}

function submitbtn_click_bindcard() {
    $.getJSON("../merchantMag/bindCard", {
        accountId: AccountId,
        platform: Platform,
        bankCardNo: $("#bankCardNo").val(),
        bankCode: $("#bankCodeBind").val()
    }, function (data) {
        if (data.code == 0) {
            window.location.href = data.url;
        } else {
            alert(data.msg);
        }
    });
}

function submitbtn_click_recharge() {
    $.getJSON("../merchantMag/recharge", {
        accountId: AccountId,
        platform: Platform,
        amount: $("#recharge").val(),
        bankCode: $("#bankCode").val()
    }, function (data) {
        if (data.code == 0) {
            $("#rechargeModalForm")[0].reset();
            $('#rechargeModal').modal('hide');
            window.location.href = data.url;
        } else {
            alert(data.msg);
        }
    });
}

function submitbtn_click_withdraw() {

    $.getJSON("../merchantMag/withdraw", {
        accountId: AccountId,
        platform: Platform,
        amount: $("#withdraw").val()
    }, function (data) {
        if (data.code == 0) {
            $("#withDrawModalForm")[0].reset();
            $('#withDrawModal').modal('hide');
            window.location.href = data.url;
        } else {
            alert(data.msg);
        }
    });
}

function showKeyPress(_this) {
    _this.value = _this.value.replace(/[^0-9]/g, '');
}

function submitbtn_click_transfer() {

    $.getJSON("../merchantMag/transfer", {
        platform: Platform,
        amount: $("#transfer").val(),
        remark: $("#remark").val(),
        out: $("#out").val(),
        in: $("#in").val(),
    }, function (data) {
        if (data.code == 0) {
            $("#middle")[0].reset();
            $('#transferModal').modal('hide');
            accountReload();
            alert("资金调拨请求成功，请等待回调结果");
        } else {
            alert(data.msg);
        }
    });
}

function back() {
    $("#accountsList").collapse('toggle');
    $("#accountInfo").collapse('toggle');
}

$("#out").change(function () {
    $("#in").empty();
    if ($("#out").val() == 20) {
        $("#in").append("<option  selected=\"selected\" value=\"21\">代偿账户</option>\n" +
            "<option  value=\"22\">营销账户</option>\n" +
            "<option  value=\"23\">分润账户</option>\n" +
            "<option  value=\"24\">收入账户</option>\n" +
            "<option  value=\"25\">派息账户</option>\n" +
            "<option  value=\"26\">代充值账户</option>\n" +
            "<option  value=\"27\">垫资账户</option>");
    } else {
        $("#in").append("<option selected=\"selected\" value=\"20\">主账户</option>");
    }
});