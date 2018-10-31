var vm;
$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            showList: false,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
            },
            expand: function () {
                vm.showList=true;
            },
            close: function () {
                vm.showList=false;
            },
            reload: function (event) {
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").jqGrid('setGridParam', {
                    page: page
                }).trigger("reloadGrid");

            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../ruleForNew/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id',hidedlg:true,hidden:true},
            {label: '状态', name: 'status',hidedlg:true,hidden:true},
            {label: '周期单位', name: 'periodUnit',hidedlg:true,hidden:true},
            {label: '标的期限', name: 'periodLength', width: 40,formatter: function (value, options, row) {
                switch (row.periodUnit){
                    case 1:
                        return value + '天';
                    case 2:
                        return value + '周';
                    case 3:
                        return value + '个月';
                    case 4:
                        return value + '年';
                }

            }},
            {label: '加息利率', name: 'appendRate', width: 60,formatter: function (value, options, row) {
                return value+'%';
            }
            },
            {label: '最高投资金额', name: 'investMaxAmount', width: 80},
            {label: '操作', name: 'id', width: 40, formatter: formatFun}
        ],
        viewrecords: true,
        height: 400,
        rowNum: 10,
        rowList: [10, 30, 50],
        autowidth: true,
        multiselect: true,
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

    var rsltUpd = '';
    var rsltDelete = '<p class="btn btn-success btn-xs" onclick="deleteRule(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;删除</p> &nbsp;';
    switch (rowObjec.status) {
        case 1:
            rsltUpd = '<p class="btn btn-success btn-xs" onclick="ban(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;禁用</p> &nbsp;';
            break;
        case 2:
            rsltUpd = '<p class="btn btn-success btn-xs" onclick="openRule(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;启用</p> &nbsp;';
    }

    return rsltUpd + rsltDelete;
}

function ban(id) {
    $.get("../ruleForNew/updRule", {id: id, status: 2}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function openRule(id) {
    $.get("../ruleForNew/updRule", {id: id, status: 1}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function deleteRule(id) {
    $.get("../ruleForNew/updRule", {id: id, status: 3}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}

function addRule() {
    $.get("../ruleForNew/addRule", {periodLength: $("#periodLength").val(), periodUnit: $("#periodUnit").val(),appendRate:$("#appendRate").val(),investMaxAmount:$("#investMaxAmount").val()}, function (data) {
        console.log(data);
        if (data.code == 0) {
            vm.reload();
        } else {
            alert(data.msg);
        }
    });
}
