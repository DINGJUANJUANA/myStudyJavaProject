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
            borrowNo: "",
            contractNo: "",
            period: "",
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.borrowNo = "";
                vm.contractNo = "";
                vm.period = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        borrowNo: vm.borrowNo,
                        contractNo: vm.contractNo,
                        period: vm.period
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
        url: '../verificationRecord/list',
        datatype: "json",
        colModel: [
            {label: '标的编号', name: 'borrowNo', width: 40},
            {label: '标的名称', name: 'borrowName', width: 60},
            {label: '资产合同编号', name: 'contractNo', width: 80},
            {label: '还款期数', name: 'period', width: 50},
            {label: '还款金额（元）', name: 'amount', width: 80}
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
