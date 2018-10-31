/**
 * Created by chenchunchuan on 2017/11/2.
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
            startDate: "",
            type: "",
            endDate: "",
            operateType: "",
            orderNo: "",
            mobile: "",
            platform: "",
            remark: "",
            id: "",
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.startDate = "";
                vm.endDate = "";
                vm.type = "";
                vm.operateType = "";
                vm.orderNo = "";
                vm.mobile = "";
                vm.platform = "";
                vm.remark = "";
                vm.id = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        startDate: vm.startDate,
                        endDate: vm.endDate,
                        type: vm.type,
                        operateType: vm.operateType,
                        orderNo: vm.orderNo,
                        mobile: vm.mobile,
                        platform: vm.platform
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            download: function (event) {
                var url = '../userAccountOrgLog/downloadExcelList?' + $("#userAccountOrgLog").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../userAccountOrgLog/list',
        datatype: "json",
        colModel: [
            {label: '流水号', name: 'id', width: 45},
            {label: '订单号', name: 'orderNo', width: 150},
            {label: '用户姓名', name: 'realName', width: 70},
            {label: '用户手机号', name: 'mobile', width: 80},
            {label: '交易金额', name: 'operationAmount', width: 80},
            {label: '交易前余额', name: 'availableAmountBefore', width: 80},
            {label: '交易前冻结金额', name: 'frozenAmountBefore', width: 90},
            {label: '交易后余额', name: 'availableAmountAfter', width: 80},
            {label: '交易后冻结金额', name: 'frozenAmountAfter', width: 90},
            {label: '交易类型', name: 'type', width: 60},
            {label: '收支类型', name: 'operateType', width: 60},
            {label: '交易时间', name: 'createTime', width: 140},
            {label: '交易备注', name: 'remark', width: 155},
            {label: '操作', name: 'id', width: 60, formatter: formatFun}
        ],
        viewrecords: true,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
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
    var userInfo = getH5Session('userInfo');
    if (userInfo.userId == 1) {
        var platfroms = getH5Session('platforms');
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#platform").append(htmlStr);
        })
    }else {
        var htmlStr = "<option value='" + userInfo.platform + "'>" + userInfo.deptName + "</option>";
        $("#platform").append(htmlStr);
    }
});

function formatFun(cellvalue, options, rowObjec) {
    if(hasPermission('reconciliation:userAccountOrgLog:change')) {
        return '<p class="btn btn-success btn-xs" data-toggle="modal" data-target="#myModal" onclick="putId(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;修改</p> ';
    }else {
        return '';
    }
}


function updremark(){
    $.getJSON("../userAccountOrgLog/updRemark", {id:vm.id,remark:vm.remark}, function (data) {
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function putId(id) {
    vm.id = id;
}

