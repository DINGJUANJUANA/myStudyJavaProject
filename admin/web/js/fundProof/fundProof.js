/**
 * Created by chenchunchuan on 2017/11/3.
 */
var vm;

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
            thirdUserId: "",
            userCode: "",
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
                vm.thirdUserId = "";
                vm.userCode = "";
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
                        thirdUserId: vm.thirdUserId,
                        userCode: vm.userCode,
                        mobile: vm.mobile,
                        platform: vm.platform
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            download: function (event) {
                var url = '../fundProof/downloadExcelList?' + $("#fundProof").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../fundProof/list',
        datatype: "json",
        colModel: [
            {label: '会员编号', name: 'id', width: 40},
            {label: '编号', name: 'userCode', width: 60},
            {label: '用户名', name: 'realName', width: 80},
            {label: '手机号', name: 'mobile', width: 50},
            {label: '托管账户', name: 'thirdUserId', width: 80},
            {label: '本地可用余额', name: 'availableAmount', width: 80},
            // {label: '冻结不可见金额', name: 'frozenAmountHidden', width: 80},
            {label: '本地冻结金额', name: 'frozenAmount', width: 80},
            {label: '本地总额', name: 'totalAmount', width: 80,cellattr: addCellAttr},
            {label: '第三方可用余额', name: 'AvlBal', width: 80},
            {label: '第三方冻结金额', name: 'FrzBal', width: 80},
            {label: '第三方总额', name: 'AcctBal', width: 80,cellattr: addCellAttr}
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

function addCellAttr(rowId, val, rawObject, cm, rdata) {
    if(rawObject.totalAmount != rawObject.AcctBal ){
        return "style='color:red;font-weight:bold '";
    }
}



