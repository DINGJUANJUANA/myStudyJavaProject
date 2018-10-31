var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        smsTemplate: {},
        names: ["满标审核通过"],
        q: {}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.getNames();
            vm.showList = false;
            vm.title = "新增";
            vm.smsTemplate = {};
        },
        update: function (id, platform) {
            vm.getInfo(id);
            vm.getNames(platform);
            vm.showList = false;
            vm.title = "修改";
        },
        saveOrUpdate: function (event) {
            vm.smsTemplate.jkProNos = item_selected;
            console.log(vm.smsTemplate);
            var url = vm.smsTemplate.id == null ? "../smsTemplate/save" : "../smsTemplate/update";
            if (vm.smsTemplate.platform == '好利网') {
                vm.smsTemplate.platform = "HLW"
            }
            if (vm.smsTemplate.platform == '卓投') {
                vm.smsTemplate.platform = "ZZT"
            }
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(vm.smsTemplate),
                success: function (r) {
                    alert(r.code);
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            console.log("111");
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: "../lcproduct/delete",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.ajax({
                async: false,
                type: "get",
                url: "../smsTemplate/findById?id=" + id,
                success: function (r) {
                    if (r.smsTemplate.platform == 'HLW') {
                        r.smsTemplate.platform = "好利网"
                    }
                    if (r.smsTemplate.platform == 'ZZT') {
                        r.smsTemplate.platform = "卓投"
                    }
                    vm.smsTemplate = r.smsTemplate;
                }
            });

        },
        getNames: function (platform) {
            $.ajax({
                async: false,
                type: "get",
                url: "../smsTemplate/findNames?platform=" + platform,
                success: function (r) {
                    vm.names = r.names;
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        },
        resetData: function (event) {

        }
    }
});
function update(no, platform) {
    vm.update(no, platform);
}

var item_selected = Array();//跨页选中变量

function arrContains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function removeArr(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function resume(id, status) {
    status = status == 1 ? 1 : 0;
    var open = '启用';
    var close = '禁用';
    confirm('确定要' + status == 1 ? close : open + '选中的记录？', function () {
        $.ajax({
            type: "POST",
            url: "../smsTemplate/delete?id=" + id + "&status=" + status,
            data: JSON,
            success: function (r) {
                if (r.code == 0) {
                    alert('操作成功', function (index) {
                        $("#jqGrid").trigger("reloadGrid");
                        $("#b1").toggleClass("hide");
                        $("#b2").toggleClass("hide");
                    });
                } else {
                    alert(r.msg);
                }
            }
        });
    });
}
$(function () {
    $("#jqGrid").jqGrid({
        url: '../smsTemplate/list',
        datatype: "json",
        colModel: [
            {label: '序号', name: 'id', width: 30, key: true},
            {label: '短信场景', name: 'name', width: 50},
            {
                label: '业务线', name: null, width: 80, formatter: function (a, b, row) {
                var platform = null;
                platform = "豪康";
                return platform;

            }
            },
            {label: '短信模板', name: 'content', width: 250},
            {label: '备注', name: 'remark', width: 80},
            {
                label: '操作', name: null, width: 80, formatter: function (a, b, row) {

                if (row.status == 1) {
                    return '<p class="btn btn-danger btn-sm" onclick="update(\'' + row.id + '\',\'' + row.platform + '\')"><i class="fa fa-money"></i>&nbsp;修改</p>&nbsp;&nbsp;&nbsp;'
                        +
                        '<p  id="b1" class="btn btn-success btn-sm hide" onclick="resume(\'' + row.id + '\',1)"><i class="fa fa-money"></i>&nbsp;启用</p>'
                        +
                        '<p  id="b2" class="btn btn-danger btn-sm" onclick="resume(\'' + row.id + '\',0)"><i class="fa fa-money"></i>&nbsp;禁用</p>';
                } else {
                    return '<p class="btn btn-danger btn-sm" onclick="update(\'' + row.id + '\',\'' + row.platform + '\')"><i class="fa fa-money"></i>&nbsp;修改</p>&nbsp;&nbsp;&nbsp;'
                        +
                        '<p  id="b1" class="btn btn-success btn-sm" onclick="resume(\'' + row.id + '\',1)"><i class="fa fa-money"></i>&nbsp;启用</p>'
                        +
                        '<p  id="b2" class="btn btn-danger btn-sm hide" onclick="resume(\'' + row.id + '\',0)"><i class="fa fa-money"></i>&nbsp;禁用</p>';
                }

            }
            }
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],

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


