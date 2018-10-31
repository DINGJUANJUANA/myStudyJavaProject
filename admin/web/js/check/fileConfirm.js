/**
 * Created by zhaojianhua on 2017/10/17.
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
            submitConfrim:{queryDate:"",
                            remarks:"",
            },
            submitStartDate: "",
            submitEndDate: "",
            status: "",
            showList: true,
            title: null,
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                vm.submitStartDate = "";
                vm.submitEndDate = "";
                vm.status = "";
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
                    page: 1
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
                    page: page
                }).trigger("reloadGrid");
            },
            submitConfirm:function () {
                document.getElementById("submitConfirmBtn").disabled=true;
                if(vm.submitConfrim.queryDate==""||vm.submitConfrim.queryDate==null){
                    document.getElementById("submitConfirmBtn").disabled=false;
                    alert("日期不可为空")
                    return;
                }
                $.ajax({
                    type: "POST",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../check/submitConfirm",
                    data:{
                        queryDate:vm.submitConfrim.queryDate,
                        remarks:vm.submitConfrim.remarks
                    },
                    dataType: "json",
                    success: function (r) {
                        alert("对账成功 "+vm.submitConfrim.queryDate);
                        console.log(r.queryDate);
                    },complete:function () {
                        vm.submitConfrim.queryDate="";
                        vm.submitConfrim.remarks="";
                        $("#confirmG").modal('hide');
                        document.getElementById("submitConfirmBtn").disabled=false;
                    }
                });
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../check/queryCheckResult',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', width: 40,hidden:true},
            {label: '操作用户', name: 'operator', width: 40},
            {label: '创建时间', name: 'crDate', width: 40},
            {label: '账单时间', name: 'fileDate', width: 40},
            {label: '操作结果', name: 'result', width: 80,formatter:function (value, options, row) {
                 var str="签名失败";
                 if("success" == value){
                     str="签名成功";
                 }
                return str;
            }},
            {label: '备注', name: 'remark', width: 150}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
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


function  setFileConfirmId(rowId) {
    var rowData = $("#jqGrid").jqGrid('getRowData',rowId);
    setH5Session('recordId',rowData.recordId);
    $("#checkDate").val(rowData.datetime.substr(0,10));
}

function confirmCheck_click(){
    var data = $("#middle").serializeJson();
    data.recordId=getH5Session('recordId');
    if(!data.recordId){
        alert("对账文件签名失败");
        return false;
    }
    if(!data.remark){
        alert("请输入备注");
        return false;
    }
    $.ajax({
        cache: false,
        type: "POST",
        url:"../check/confirmCheckfile?recordId="+data.recordId+"&remark="+data.remark,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            $('#myModal').modal('hide');
            if(!data || data.code != 0) {
                alert("对账文件签名失败");
                return false;
            }
            alert("对账文件签名成功");
            vm.reload();
            return true;
        }
    });
    return false;
}

