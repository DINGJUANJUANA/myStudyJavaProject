/**
 * Created by zhaojianhua on 2017/10/17.
 */
var vm;

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}
function serializeObject(form) {
    var o = {};
    $.each(form.serializeArray(), function (index) {
        if (o[this['name']]) {
            o[this['name']] = o[this['name']] + "," + this['value'];
        } else {
            o[this['name']] = this['value'];
        }
    });
    return o;
}

(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            submitStartDate: "",
            submitEndDate: "",
            dzId: "",
            status: "",
            dzStaus:"",
            showList: true,
            title: null,
            detail: {},
            middleResult : {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                // 送出後
                vm.submitStartDate  = "";
                vm.submitEndDate  = "";
                vm.status  = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page:page
                }).trigger("reloadGrid");
            },
            downUserDetail:function (event) {

                window.open('../userAccountOrder/downloadUserCheckInfo/'+ vm.detail.batchNo+'?'+'dzStaus='+vm.dzStaus);
            },
            downloadUser:function (event) {
                var url = '../userAccountOrder/downloadUserCheck?'+$("#user").serialize();
                window.open(url);
            },
            outDzInfoDown: function (event) {
                var url = '../userAccountOrder/downloadMakeupInfo/' + vm.detail.batchNo+'?type=2';
                window.open(url);
            }
        }
    })
    $("#jqGrid").jqGrid({
        url: '../userAccountOrder/queryUserInfoOrderList',
        datatype: "json",
        colModel: [
            {label: '对账日期', name: 'dataDate', width: 40},
            {label: '对账状态', name: 'result', width: 40},
            {label: '当日用户信息变更', name: 'todayOrderCnt', width: 80},
            {label: '对账成功笔数', name: 'successCnt', width: 80},
            {label: '信息不等笔数', name: 'infoDiffCnt', width: 80},
            {label: '我方单边笔数', name: 'ourSideTradeCnt', width: 80},
            {label: '第三方单边笔数', name: 'thirdSideTradeCnt', width: 80},
            {label: '操作', name: 'batchNo', width: 80, formatter: formatFun}
            /*{label: '对账ID', name: 'id', width: 40},
            {label: '我方对账结果', name: 'dzStatus', width: 40,formatter:dzStatusFormat},
            {label: '我方订单状态', name: 'meddleStatus', width: 80,formatter:meddleStatusFormat},
            {label: '我方订单号', name: 'ourSideOrderNo', width: 80},
            {label: '我方用户编号', name: 'ourUserCode', width: 80},
            {label: '我方用户信息类型', name: 'ourAuthType', width: 80,formatter:ourAuthTypeFormat},
            {label: '我方操作状态', name: 'ourStatus', width: 80,formatter:ourOptStatus},
            {label: '我方记录时间', name: 'ourOrderTime', width: 80},
            {label: '第三方订单号', name: 'thirdSideOrderNo', width: 80},
            {label: '第三方客户编号', name: 'thirdUserCode', width: 80},
            {label: '第三方用户信息类型', name: 'thirdAuthType', width: 80,formatter:thirdAuthTypeFormat},
            {label: '第三方操作状态', name: 'thirdStatus', width: 80,formatter:transTatFormat},
            {label: '第三方记录时间', name: 'thirdOrderDate', width: 80},
            {label: '操作', name: 'batchNo', width: 80, formatter: formatFun}*/
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
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
});

function formatFun(cellvalue, options, rowObjec) {
    rowObjec['result']=dzResultFormat(rowObjec['result']);
    setH5Session('user'+rowObjec.batchNo,rowObjec);

    vm.detail = rowObjec;

    if(hasPermission('reconciliation:userAccount:detail')) {
        return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;对账明细</p>';
    }else {
        return '';
    }

}

function reload1 () {
    $("#jqGridAccountIn").setGridParam({
        postData: {
            dzStaus: $("#selectdzStaus").val()
        },
        page:1
    }).trigger("reloadGrid");
}

function zqgx(batchNo) {
    vm.showList = false;
    vm.detail  ={};
    vm.detail = getH5Session('user'+batchNo);
    $.jgrid.gridUnload('jqGridAccountIn');
    $("#jqGridAccountIn").jqGrid({
        url: "../userAccountOrder/queryUserInfoCheckList/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '对账ID', name: 'id', width: 80},
            {label: '对账结果', name: 'dzStatus', width: 100},
            {label: '业务类型', name: 'ourType', width: 100,},
            {label: '我方用户编号', name: 'ourUserCode', width: 170},
            {label: '我方用户类型', name: 'ourUserRole', width: 100},
            {label: '开户名', name: 'ourAccountName', width: 100},
            {label: '证件类型', name: 'ourIdnoType', width: 100},
            {label: '证件号码', name: 'ourIdno', width: 100},
            {label: '银行预留手机号', name: 'ourMobile', width: 170},
            {label: '所属银行', name: 'ourBankNo', width: 160},
            {label: '银行卡号', name: 'ourBankCardNo', width: 160},
            {label: '企业法人姓名', name: 'ourLegalPerson', width: 160},
            {label: '企业营业执照编号', name: 'ourBusinessLicenceCode', width: 160},
            {label: '组织结构代码证编号', name: 'ourOrganizationCode', width: 200},
            {label: '税务登记号', name: 'ourTaxNo', width: 200},
            {label: '开户银行许可证号', name: 'ourBankLicense', width: 200},
            {label: '机构信用代码', name: 'ourCreditCode', width: 200},
            {label: '统一社会信用代码', name: 'ourUnifiedCode', width: 200},
            {label: '我方订单时间', name: 'ourCreateTime', width: 200},
            {label: '第三方客户编号', name: 'thirdUserCode', width: 200},
            {label: '第三方用户类型', name: 'thirdUserType', width: 200},
            {label: '第三方用户角色', name: 'thirdUserRole', width: 200},
            {label: '第三方开户名', name: 'thirdAccountName', width: 200},
            {label: '第三方证件类型', name: 'thirdIdnoType', width: 200},
            {label: '第三方证件号码', name: 'thirdIdno', width: 200},
            {label: '第三方银行预留手机号', name: 'thirdMobile', width: 200},
            {label: '第三方所属银行', name: 'thirdBankNo', width: 200},
            {label: '第三方银行卡号', name: 'thirdBankCardNo', width: 200},
            {label: '第三方企业法人姓名', name: 'thirdLegalPerson', width: 200},
            {label: '第三方企业营业执照编号', name: 'thirdBusinessLicenceCode', width: 200},
            {label: '第三方组织机构代码证编号', name: 'thirdOrganizationCode', width: 200},
            {label: '第三方税务登记号', name: 'thirdTaxNo', width: 200},
            {label: '第三方开户银行许可证号', name: 'thirdBankLicense', width: 200},
            {label: '第三方机构信用代码', name: 'thirdCreditCode', width: 200},
            {label: '第三方统一社会信用代码', name: 'thirdUnifiedCode', width: 200},
            {label: '第三方订单时间', name: 'thirdCreateTime', width: 200},

            {label: '操作', name: 'meddleStatus', width: 100,formatter:function (value, options, row){
                switch (value){
                    case 0:
                        return '';
                        break;
                    case 2:
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal2" onclick="showUserMiddleInfo(\''+row.id+'\')">干涉结果</button>';
                        break;
                    default:
                        return '<button class="btn btn-xs btn-primary" style="margin-left: 10px" data-toggle="modal" data-target="#myModal" onclick="dzId(\'' + row.id + '\')">执行干涉</button>';
                        break;
                }
            }}
        ],
        viewrecords: true,
        height: 500,
        width: 1500,
        shrinkToFit:false,
        autoScroll: true,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        pager: "#jqGridPagerAccountIn",
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
    });

    $.jgrid.gridUnload('jqGridMakeup');
    $("#jqGridMakeup").jqGrid({
        url: "../userAccountOrder/userMakeupInfo/" + batchNo,
        datatype: "json",
        colModel: [
            {label: '被补录ID', name: 'id', width: 80},
            {label: '补录前对账结果', name: 'meddleStatusBefore', width: 160},
            {label: '补录后对账结果', name: 'dzStaus', width: 160},
            {label: '补录日期', name: 'meddleDate', width: 140}
        ],
        viewrecords: true,
        height: 500,
        width: 640,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        pager: "#jqGridPagerMakeup",
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
    });
}

function submitbtn_click(){
    var userInfo = getH5Session('userInfo');
    var data = $("#middle").serializeJson();
    var datas = $.extend({recDetailId:vm.dzId},userInfo,data);
    $.ajax({
        cache: true,
        type: "GET",
        url:"../userAccountOrder/saveUserMiddle",
        data:datas,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.code == 0) {
                reload1();
                $('#myModal').modal('hide');
            }else{
                alert("干涉失败");
            }
        }
    });
    return false;
}

function showUserMiddleInfo(id) {
    vm.dzId = id;
    $.get("../userAccountOrder/getRecMiddleInfo/" + id, {type:"QDU"}, function (r) {
        if(r.code == 0) {
            vm.middleResult = r.sltRecMiddle;
            switch (vm.middleResult.mistakeReason) {
                case 1:
                    vm.middleResult.mistakeReason = "业务线系统故障";
                    break;
                case 2:
                    vm.middleResult.mistakeReason = "清结算系统故障";
                    break;
                case 3:
                    vm.middleResult.mistakeReason = "第三方系统故障";
                    break;
                case 4:
                    vm.middleResult.mistakeReason = "网络通讯故障";
                    break;
                case 5:
                    vm.middleResult.mistakeReason = "未知";
                    break;
            }
        }else {
            alert(r.msg);
        }
    });
}

function dzId(id) {
    vm.dzId = id;
}