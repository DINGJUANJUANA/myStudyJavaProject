/**
 * Created by chenchunchuan on 2017/11/1.
 */
var vm;

function hasPermission(permission) {
    var ispermission = '';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission", {permission: permission}, function (r) {
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
            userCode: "",
            endDate: "",
            status: "",
            idno: "",
            inviteCode: "",
            mobile: "",
            platform: "",
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
                vm.status = "";
                vm.idno = "";
                vm.inviteCode = "";
                vm.mobile = "";
                vm.platform = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        startDate: vm.startDate,
                        endDate: vm.endDate,
                        status: vm.status,
                        idno: vm.idno,
                        inviteCode: vm.inviteCode,
                        mobile: vm.mobile,
                        platform: vm.platform
                    },
                    page: page
                }).trigger("reloadGrid");
            },
            download: function (event) {
                var url = '../userInfo/downloadExcelList?' + $("#userInfo").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../userInfo/list',
        datatype: "json",
        colModel: [
            {label: '编号', name: 'id', width: 40},
            {label: '会员姓名', name: 'realName', width: 60},
            {label: '电话', name: 'mobile', width: 80},
            {label: '邀请码', name: 'inviteCode', width: 50},
            {label: '可用', name: 'availableAmount', width: 80},
            {label: '冻结', name: 'frozenAmount', width: 80},
            {label: '待收本金', name: 'cashAmount', width: 80},
            {label: '待收利息', name: 'profitAmount', width: 80},
            {label: '累计投资', name: 'investAmount', width: 80},
            {label: '累计收益', name: 'profitAll', width: 80},
            {
                label: '用户状态', name: 'openAccountStatus', width: 60, formatter: function (value, options, row) {
                var result = '';
                switch (value) {
                    case 1:
                        result = '未开户';
                        break;
                    case 3:
                        result = '已开户';
                        break;
                    case 4:
                        result = '待激活';
                        break;
                    default:
                        result = "error"
                }
                return result;
            }
            },
            {
                label: '状态', name: 'status', width: 60, formatter: function (value, options, row) {
                var result = '';
                switch (value) {
                    case 1:
                        result = '未锁定';
                        break;
                    case 2:
                        result = '锁定';
                        break;
                    default:
                        result = "error"
                }
                return result;
            }
            },
            {label: '操作', name: 'userCode', width: 100, formatter: formatFun}
        ],
        viewrecords: true,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
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
    var userInfo = getH5Session('userInfo');
    if (userInfo.userId == 1) {
        var platfroms = getH5Session('platforms');
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#platform").append(htmlStr);
        })
        $.each(platfroms, function (i, n) {
            var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
            $("#updPlatform").append(htmlStr);
        })
    } else {
        var htmlStr = "<option value='" + userInfo.platform + "'>" + userInfo.deptName + "</option>";
        $("#platform").append(htmlStr);
    }
});

function formatFun(cellvalue, options, rowObjec) {

    var rsltLock = '';
    var rsltplatform = '';
    if (hasPermission('reconciliation:userInfo:lock')) {
        switch (rowObjec.status) {
            case 1:
                rsltLock = '<p class="btn btn-success btn-xs" onclick="lockUser(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;锁定</p> &nbsp;';
                break;
            case 2:
                rsltLock = '<p class="btn btn-success btn-xs" onclick="unLockUser(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;解锁</p> &nbsp;';
        }
    }
    //
    // if(hasPermission('reconciliation:userInfo:platform')){
    //     rsltplatform =  '<p class="btn btn-success btn-xs" data-toggle="modal" data-target="#myModal" onclick="putUserCode(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;修改来源</p>&nbsp;';
    // }

    return rsltLock + rsltplatform;
    // switch (rowObjec.status) {
    //     case 1:
    //         return '<p class="btn btn-success btn-xs" onclick="lockUser(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;锁定</p> &nbsp;' +
    //             '<p class="btn btn-success btn-xs" data-toggle="modal" data-target="#myModal" onclick="putUserCode(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;修改来源</p>&nbsp;';
    //         break;
    //     case 2:
    //         return '<p class="btn btn-success btn-xs" onclick="unLockUser(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;解锁</p> &nbsp;' +
    //             '<p class="btn btn-success btn-xs" data-toggle="modal" data-target="#myModal" onclick="putUserCode(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;修改来源</p>&nbsp;';
    //         break;
    //     // +
    //     //     '<p class="btn btn-success btn-xs" onclick=""><i class="fa fa-money"></i>&nbsp;修改邀请码</p>'
    // }


}


function lockUser(userCode) {
    $.get("../userInfo/updStatus", {userCode: userCode, status: 2}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function unLockUser(userCode) {
    $.get("../userInfo/updStatus", {userCode: userCode, status: 1}, function (data) {
        console.log(data);
        if (data.code == 0) {
            $('#myModal').modal('hide');
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function updPlatform() {
    $.get("../userInfo/updPlatform", {userCode: vm.userCode, platform: $("#updPlatform").val()}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}


function putUserCode(userCode) {
    vm.userCode = userCode;

}




