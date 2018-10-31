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
            submitStartDate:"",
            submitEndDate:"",
            queryOrderNo:"",
            queryAccountId:"",
            queryType:"",
            queryOperateType:"",
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                vm.submitStartDate="";
                vm.submitEndDate="";
                vm.queryOrderNo="";
                vm.queryAccountId="";
                vm.queryType="";
                vm.queryOperateType="";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        orderNo: vm.queryOrderNo,
                        accountId: vm.queryAccountId,
                        operateType: vm.queryOperateType,
                        type: vm.queryType,
                        startDate:vm.submitStartDate,
                        endDate:vm.submitEndDate
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            exportExcel:function(){
                window.open("../userAccount/exportPlatformAccountLog?orderNo="+vm.queryOrderNo+"&accountId="+vm.queryAccountId+"&operateType="+vm.queryOperateType+"&type="+vm.queryType+"&startDate="+vm.submitStartDate+"&endDate="+vm.submitEndDate)
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../userAccount/platformAccountLog',
        datatype: "json",
        colModel: [
            {label: '交易时间', name: 'createTime', width: 70},
            {label: '交易流水号', name: 'orderNo', width: 80},
            {label: '交易金额', name: 'operationAmount', width: 40},
            {label: '交易类型', name: 'type', width: 70},
            {label: '账户名称', name: 'realName', width: 60},
            {label: '可用余额', name: 'availableCreditAfter', width: 80},
            {label: '备注', name: 'remark', width: 80}
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
});


