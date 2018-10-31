var vm;
var platfroms;
var deliverCouponNo;
var plt;

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

$(function () {

    vm = new Vue({
        el: '#rrapp',
        data: {
            showList: true,
            giftCode: '',
            giftName: '',
            createTimeMin: '',
            createTimeMax: '',
            status: '',
            relationCouponGridShow: false,
            relationCouponGridShowInstance: false,//grid是否实例化了
        },
        methods: {
            //重新查询列表
            query: function () {
                vm.reload();
            },
            //重新查询列表
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        giftCode: vm.giftCode,
                        giftName: vm.giftName,
                        createTimeMin: vm.createTimeMin,
                        createTimeMax: vm.createTimeMax,
                        status: vm.status
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            //取消新增,修改
            back: function (event) {
                vm.closeEdit();
            },
            //关闭新增画面,修改画面
            closeEdit: function () {
                vm.showList = true;
                vm.relationCouponGridShow = false;
            },
            //显示新增画面
            showEdit: function (type) {
                vm.showList = false;
                //1:查看关联红包;
                vm.relationCouponGridShow = false;
                switch (type) {
                    //查看关联红包
                    case 1:
                        vm.relationCouponGridShow = true;
                        break;
                }
            },
            //显示:新增画面
            add: function () {
                localStorage.setItem('edit_giftCode', "");
                localStorage.setItem('edit_giftName', "");
                window.location.href = "../coupon/edit_gift_template.html?dt"+new Date();
            },
            //显示:修改画面
            edit: function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowId = $("#jqGrid").jqGrid("getGridParam", "selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
                localStorage.setItem('edit_giftCode', rowData.gift_code);
                localStorage.setItem('edit_giftName', rowData.gift_name);
                window.location.href = "../coupon/edit_gift_template.html?dt"+new Date();
            },
            //作废,启用
            updateTemplateStatus: function (type) {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowId = $("#jqGrid").jqGrid("getGridParam", "selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
                var final_status = "";
                //作废/启用
                if (type == 1) {
                    switch (rowData.status) {
                        case "启用":
                            final_status = "2";
                            break;
                        case "作废":
                            final_status = "1";
                            break;
                        default:
                            alert("状态更新失败,请刷新重试");
                            return;
                    }
                }
                $.ajax({
                    type: "post",
                    url: "../HKGiftTemplate/updateTemplateStatus",
                    data: {
                        status: final_status,
                        giftCodes: rowData.gift_code
                    },
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    success: function (r) {
                        console.log(r)
                        if (r.code != 0) {
                            alert(r.msg);
                            return;
                        }
                        vm.reload();
                    },
                    error: function (err) {
                        alert("操作失败,请刷新重试");
                        console.log(err);
                    }
                });
            },
            //导出
            exports: function () {
                var serialize = $("#listQueryForm").serialize();
                window.open("../HKGiftTemplate/exportExcelList?"+serialize);
            },
            //查看关联红包
            viewRelationCouponShow: function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowId = $("#jqGrid").jqGrid("getGridParam", "selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
                $("#relation_giftName").html(rowData.gift_name);
                showCouponListOfTemplate(rowData.gift_code);
            }
        }
    })

    //礼包模版列表
    $("#jqGrid").jqGrid({
        url: '../HKGiftTemplate/getPage',
        datatype: "json",
        colModel: [
            {label: '礼包模板ID', name: 'gift_code', width: 50, key: true, hidden: false},
            {label: '礼包模板名称', name: 'gift_name', width: 100},
            {
                label: '状态', name: 'status', width: 60, formatter: function (value, options, row) {
                var format = "未知"
                switch (value) {
                    case 1:
                        format = "启用";
                        break;
                    case 2:
                        format = "作废";
                        break;
                }
                return format;
            }
            },
            {label: '创建时间', name: 'create_time', width: 150},
            {label: '操作员', name: 'create_user_name', width: 60}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
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

    //关联红包模版列表
    function showCouponListOfTemplate(giftCode) {
        //grid没有实例化,则实例化,否则reload即可
        if (vm.relationCouponGridShowInstance) {
            $("#jqGrid_relationCoupon").setGridParam({
                postData: {
                    giftCode: giftCode
                },
                page: 1
            }).trigger("reloadGrid");
        }

        vm.relationCouponGridShowInstance = true;

        $("#jqGrid_relationCoupon").jqGrid({
            url: '../HKGiftTemplate/getCouponListOfTemplate',
            postData: {
                giftCode: giftCode
            },
            datatype: "json",
            colModel: [
                {label: 'id', name: 'id', width: 50, key: true, hidden: true},
                {label: '红包模板ID', name: 'coupon_code', width: 100,hidden: true},
                {label: '红包模板名称', name: 'coupon_name', width: 200},
                {label: '红包模板类型', name: 'type', width: 120},
                {label: '适用产品类型', name: 'borrow_type', width: 120},
                {label: '红包数量', name: 'coupon_num', width: 80},
                {label: '金额/比例', name: 'coupon_amount', width: 120},
                {label: '投资金额限制(元)', name: 'investRange', width: 150},
                {label: '适用期限(天)', name: 'daysRange', width: 100},
                {
                    label: '状态', name: 'status', width: 100, formatter: function (value, options, row) {
                    var format = "未知"
                    switch (value) {
                        case 1:
                            format = "启用";
                            break;
                        case 2:
                            format = "作废";
                            break;
                    }
                    return format;
                }
                },
                {
                    label: '红包有效期', name: 'start_end_date', width: 350, formatter: function (value, options, row) {
                    var start_date = !row.start_date ? "" : row.start_date;
                    var end_date = !row.end_date ? "" : row.end_date;
                    var inputStart = '<input type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" id=\"start_date_' + options.rowId + '\" value="' + start_date + '"/>';
                    var inputEnd = '<input type="text"  onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" id=\"end_date_' + options.rowId + '\" value="' + end_date + '"/>';
                    return inputStart + " - " + inputEnd;
                }
                },
                {label: '创建时间', name: 'create_time', width: 150}
            ],
            viewrecords: false,
            height: 500,
            autowidth: true,
            multiselect: true,
            jsonReader: {
                root: "list",
                total: "total"
            },
            gridComplete: function () {
                //隐藏grid底部滚动条
                $("#jqGrid_relationCoupon").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                vm.showEdit(1);
            }
        });
    }

});









