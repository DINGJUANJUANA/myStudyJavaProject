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
            outId: "",
            outType: "",
            inId: "",
            inType: "",
            submitStartDate:"",
            submitEndDate:"",
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.outId = "";
                vm.outType = "";
                vm.inId = "";
                vm.inType = "";
                vm.submitStartDate="";
                vm.submitEndDate="";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        outId: vm.outId,
                        outType: vm.outType,
                        inId: vm.inId,
                        inType: vm.inType,
                        startDate:vm.submitStartDate,
                        endDate:vm.submitEndDate
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            exportExcel:function(){
                window.open("../merchantMag/exportTranferLog?outId="+vm.outId+"&outType="+vm.outType+"&inId="+vm.inId+"&inType="+vm.inType+"&startDate="+vm.submitStartDate+"&endDate="+vm.submitEndDate)
            }
        }
    });

    $("#jqGrid").jqGrid({
        url: '../merchantMag/tranferLog',
        datatype: "json",
        colModel: [
            {label: '出资账户ID', name: 'creditAccountOrgId', width: 40},
            {label: '出资账户名称', name: 'creditType', width: 60},
            {label: '入资账户ID', name: 'debitAccountOrgId', width: 80},
            {label: '入资账户名称', name: 'debitType', width: 50},
            {label: '调拨金额', name: 'amount', width: 80},
            {label: '调拨时间', name: 'updateTime', width: 80},
            {label: '状态', name: 'status', width: 80},
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


