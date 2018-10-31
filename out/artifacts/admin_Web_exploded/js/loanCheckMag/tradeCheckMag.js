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

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

$(function(){

    $("#accountsList").collapse('show');
    $("#accountInfo").collapse('hide');


    $("#jqGrid").jqGrid({
        url : '../tradeCheckMag/getTradeCheck',
        datatype : "json",
        colModel : [
            {label: '对账日期', name: 'dataDate', width: 40},
            {label: '对账状态', name: 'result', width: 40},
            {label: '当日放款订单笔数', name: 'todayOrderCnt', width: 80},
            {label: '对账成功笔数', name: 'successCnt', width: 80},
            {label: '信息不等笔数', name: 'infoDiffCnt', width: 80},
            {label: '我方单边笔数', name: 'ourSideTradeCnt', width: 80},
            {label: '第三方单边笔数', name: 'thirdSideTradeCnt', width: 80},
            {label: '我方放款总金额', name: 'ourSideTradeAmount', width: 80},
            {label: '第三方放款总金额', name: 'thirdSideTradeAmount', width: 80},
            {label: '操作', name: 'batchNo', width: 80, formatter: function (value, options, row) {
                setH5Session('orderLoan'+row.batchNo,row);
                if(hasPermission('reconciliation:loanCheckMag:detail')) {
                    return '<button class="btn btn-success btn-xs" style="margin-left: 10px" onclick="showInfo(\'' + row.batchNo + '\')">对账明细</button>';
                }else {
                    return '';
                }
            }}
        ],
        viewrecords: true,
        width: 1500,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        // autowidth: true,
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
        }/*,
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }*/
    });
});

function back() {
    $("#accountsList").collapse('toggle');
    $("#accountInfo").collapse('toggle');
}

function showInfo(id) {
    var orderLoan = getH5Session('orderLoan'+id);
    $("#checkDate").text(orderLoan.dataDate);
    $("#checkStatus").text(orderLoan.result);
    $("#orderSum").text(orderLoan.todayOrderCnt);
    $("#successCnt").text(orderLoan.successCnt);
    $("#ourSideTradeCnt").text(orderLoan.ourSideTradeCnt);
    $("#infoDiffCnt").text(orderLoan.infoDiffCnt);
    $("#thirdSideTradeCnt").text(orderLoan.thirdSideTradeCnt);
    $("#total").text(orderLoan.ourSideTradeAmount);
    $("#totalThird").text(orderLoan.thirdSideTradeAmount);

    $("#batchNo").val(id);
    $.jgrid.gridUnload('jqGrid1');
    $.jgrid.gridUnload('jqGrid2');

    $("#jqGrid2").jqGrid({
        url : '../tradeCheckMag/getLoanMakeUpInfo',
        datatype : "json",
        postData : serializeObject($("#form1")),
        colModel : [
            {label: '被补录', name: 'id', width: 200},
            {label: '补录前对账结果', name: 'meddleStatusBefore', width: 200 ,formatter:function (value, options, row) {
                var result = '';
                switch (value){
                    case 1:
                        result ='对账成功';
                        break;
                    case 2:
                        result = '信息不等';
                        break;
                    case 3:
                        result = '我方单边';
                        break;
                    case 4:
                        result = '第三方单边';
                        break;
                    default :
                        result = "error"
                }
                return result;
            }},
            {label: '补录后结果', name: 'dzStatus', width: 200,formatter:function (value, options, row) {
                var result = '';
                switch (value){
                    case 1:
                        result ='对账成功';
                        break;
                    case 2:
                        result = '信息不等';
                        break;
                    case 3:
                        result = '我方单边';
                        break;
                    case 4:
                        result = '第三方单边';
                        break;
                    default :
                        result = "error"
                }
                return result;
            }},
            {label: '补录日期', name: 'updateTime', width: 200}
        ],
        viewrecords: true,
        width: 800,
        height:500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        // autowidth: true,
        multiselect: true,
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
        }
        /*gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }*/
    });

    $("#jqGrid1").jqGrid({
        url : '../tradeCheckMag/getTradeCheckDetail',
        datatype : "json",
        postData : serializeObject($("#form1")),
        colModel : [
            {label: '对账ID', name: 'id', width: 80},
            {label: '对账结果', name: 'status', width: 160,formatter:dzStatusFormat},
            {label: '干涉状态', name: 'meddleStatus', width: 160,formatter:meddleStatusFormat},
            {label: '我方业务类型', name: 'OrderBusiType', width: 200,formatter:busiTypeFormat},
            {label: '我方交易金额', name: 'OrderAmount', width: 200},
            {label: '我方利息金额', name: 'OrderAmountInterest', width: 200},
            {label: '我方发起方平台编号', name: 'OrderSendUserCode', width: 200},
            {label: '我方接收方平台编号', name: 'OrderReceUserCode', width: 200},
            {label: '我方标的编号', name: 'OrderBorrowNo', width: 200},
            {label: '我方债权份数', name: 'OrderdebtShare', width: 200},
            {label: '我方交易日期', name: 'OrderDate', width: 200},
            {label: '我方交易时间', name: 'OrderTime', width: 200},
            {label: '三方业务类型', name: 'SltBusiType', width: 200,formatter:busiTypeFormat},
            {label: '三方交易金额', name: 'SltAmount', width: 200},
            {label: '三方利息金额', name: 'SltAmountInterest', width: 200},
            {label: '三方发起方平台编号', name: 'OSltSendUserCode', width: 200},
            {label: '三方接收方平台编号', name: 'SltReceUserCode', width: 200},
            {label: '三方标的编号', name: 'SltBorrowNo', width: 200},
            {label: '三方债权份数', name: 'SltdebtShare', width: 200},
            {label: '三方交易时间', name: 'SltOrderDate', width: 200},
            {label: '财务人员干涉状态', name: 'meddleStatus', width: 200,formatter:meddleStatusFormat},
            {label: '操作', name: 'meddleStatus', width: 80, formatter: function (value, options, row) {
                var htmlStr = '';
                switch (value){
                    case "":
                        htmlStr ='';
                        break;
                    case 1:
                        htmlStr = '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="beginIntervene(\''+row.id+'\')">执行干涉</button>';
                        break;
                    case 2:
                        htmlStr = '<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="checkIntervene(\''+row.id+'\')">查看干涉结果</button>';
                }
                return htmlStr;
            }}
        ],
        viewrecords: true,
        width: 1500,
        height:500,
        rowNum: 10,
        shrinkToFit:false,
        autoScroll: true,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        // autowidth: true,
        multiselect: true,
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
        }
        /*gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid1").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }*/
    });

    $("#accountsList").collapse('toggle');
    $("#accountInfo").collapse('toggle');
}

$("#choose").click(function () {
    loanCheckReload();
});

function loanCheckReload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam',{
        page : page,
        postData : serializeObject($("#loanForm"))
    }).trigger("reloadGrid");
}

function loanCheckInfoReload() {
    var page = $("#jqGrid1").jqGrid('getGridParam', 'page');
    $("#jqGrid1").jqGrid('setGridParam',{
        page : page,
        postData : serializeObject($("#form1"))
    }).trigger("reloadGrid");
}

function loanMakeUpInfoReload() {
    var page = $("#jqGrid2").jqGrid('getGridParam', 'page');
    $("#jqGrid2").jqGrid('setGridParam',{
        page : page,
        postData : serializeObject($("#form1"))
    }).trigger("reloadGrid");
}

$("#chooseResult").change(function () {
    var page = $("#jqGrid1").jqGrid('getGridParam', 'page');
    $("#jqGrid1").jqGrid('setGridParam',{
        page : page,
        postData : serializeObject($("#form1"))
    }).trigger("reloadGrid");
});

function downloadloanCheck() {
    var url = '../tradeCheckMag/downloadTradeCheck?'+$("#loanForm").serialize();
    window.open(url);
}

function downloadLoanCheckInfo() {
    var url = '../tradeCheckMag/downloadTradeCheckInfo?'+$("#form1").serialize();
    window.open(url);
}
function downLoadLoanMakeUpInfo() {
    var url = '../tradeCheckMag/downLoadTradeMakeUpInfo?'+$("#form1").serialize();
    window.open(url);
}

function beginIntervene(id) {
    var user = getH5Session("userInfo");

    $("#recDetailId").val(id);
    $("#modifyUser").val(user.userId);
    $("#modifyUserName").val(user.username);
    $('#myModal1').modal('show');
}

function doIntervene() {
    $.ajax({
        type: "GET",
        url: "../tradeCheckMag/doIntervene",
        data: $("#formIntervene").serialize(),
        success: function(msg){
            if(msg.code==0){
                loanCheckInfoReload();
                loanMakeUpInfoReload();
                $("#formIntervene")[0].reset();
                $('#myModal1').modal('hide')
            }else {
                alert("干涉失败")
            }

        },
        error: function (msg) {
            alert( "网络异常请联系管理员");
        }
    });
}

function checkIntervene(id) {
    $.get("../loanCheckMag/getInterveneInfo",{id:id,type:"QDL"},function (data) {
        console.log(data);
        if (data.code==0){
            switch (data.sltRecMiddle.mistakeReason){
                case 1:
                    $("#remark1").val('业务线系统故障');
                    break;
                case 2:
                    $("#remark1").val('清结算系统故障');
                    break;
                case 3:
                    $("#remark1").val('第三方系统故障');
                    break;
                case 4:
                    $("#remark1").val('网络通讯故障');
                    break;
                case 5:
                    $("#remark1").val('未知');
                    break;
            }
            $("#reasondetail").val(data.sltRecMiddle.mistakeRemark);
            $("#name").val(data.sltRecMiddle.modifyUserName);
            $("#plan").val(data.sltRecMiddle.modifyRemark);
            $("#doremark").val(data.sltRecMiddle.middleRemark);
        }else{
            alert("查询干涉结果失败");
        }

    });
    $('#myModal2').modal('show')
}