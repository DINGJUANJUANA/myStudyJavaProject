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
            couponCode: '',
            couponName: '',
            type: '',
            couponAmountMin: '',
            couponAmountMax: '',
            minAmount: '',
            maxAmount: '',
            minDays: '',
            maxDays: '',
            status: '',
            discountShow: false,
            returnShow: false,
            incrementRateShow: false,
            rate_type: 1,
            dis_type: 2,
            return_type: 3,
            clicktag: 0
        },
        methods: {
            //重新查询列表
            query: function () {
                vm.reload();
            },
            //重新查询列表
            reload: function (event) {
                vm.showList = true;
                $("#jqGrid").setGridParam({
                    postData: {
                        couponCode: vm.couponCode,
                        couponName: vm.couponName,
                        type: vm.type,
                        couponAmountMin: vm.couponAmountMin,
                        couponAmountMax: vm.couponAmountMax,
                        minAmount: vm.minAmount,
                        maxAmount: vm.maxAmount,
                        minDays: vm.minDays,
                        maxDays: vm.maxDays,
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
                vm.discountShow = false,
                    vm.returnShow = false,
                    vm.incrementRateShow = false
            },
            //显示新增画面
            showEdit: function (type) {
                this.rate_type = 1;
                this.dis_type = 2;
                this.return_type = 3;
                vm.showList = false;
                vm.discountShow = false;
                vm.returnShow = false;
                vm.incrementRateShow = false;
                switch (type) {
                    //加息券
                    case 1:
                        vm.incrementRateShow = true;
                        //$("#rate_type").find("option:contains('加息券')").attr("selected", true);
                        break;
                    //抵扣券
                    case 2:
                        vm.discountShow = true;
                        //$("#dis_type").find("option:contains('抵扣券')").attr("selected", true);
                        break;
                    //返现券
                    case 3:
                        vm.returnShow = true;
                        //$("#return_type").find("option:contains('返现券')").attr("selected", true);
                        break;
                }
            },
            resetShow: function () {
                $("#rateForm").find("input").val("");
                $("#rateForm").find("select").find("option:contains('加息券')").attr("selected", true);
                $("#rateForm").find("select").removeAttr("disabled");

                $("#returnForm").find("input").val("");
                $("#returnForm").find("select").find("option:contains('返现券')").attr("selected", true);
                $("#returnForm").find("select").removeAttr("disabled");

                $("#disForm").find("input").val("");
                $("#disForm").find("select").find("option:contains('抵扣券')").attr("selected", true);
                $("#disForm").find("select").removeAttr("disabled");
            },
            //显示:新增画面
            add: function () {
                vm.resetShow();
                vm.showEdit(2);
            },
            //根据卡券类型,显示不同新增画面
            changeShow: function (ele) {
                this.value = ele;
                console.log(this.value);
                vm.showEdit(parseInt(this.value));

            },
            //显示:修改画面
            edit: function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项红包模版");
                    return;
                }
                var rowId = $("#jqGrid").jqGrid("getGridParam", "selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
                $.ajax({
                    type: "GET",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../HKCouponTemplate/getTemplateByCouponCode?couponCode=" + rowData.coupon_code,
                    dataType: "json",
                    success: function (r) {
                        console.log(r)
                        if (r.code != 0) {
                            alert("操作失败,请刷新重试");
                            return;
                        }
                        //卡券类型 1:加息券 2:抵扣券 3:返现券
                        typeName = "";
                        switch (r.template.type) {
                            case 1:
                                typeName = "rate";
                                break;
                            case 2:
                                typeName = "dis";
                                break;
                            case 3:
                                typeName = "return";
                                break;
                        }
                        $("#" + typeName + "_couponCode").val(r.template.couponCode);
                        $("#" + typeName + "_couponName").val(r.template.couponName);
                        $("#" + typeName + "_type").val(r.template.type);
                        $("#" + typeName + "_borrowType").val(r.template.borrowType);
                        $("#" + typeName + "_couponAmount").val(r.template.couponAmount);
                        $("#" + typeName + "_minAmount").val(r.template.minAmount);
                        $("#" + typeName + "_maxAmount").val(r.template.maxAmount);
                        $("#" + typeName + "_minDays").val(r.template.minDays);
                        $("#" + typeName + "_maxDays").val(r.template.maxDays);
                        $("#" + typeName + "_showText").val(r.template.showText);

                        $("#" + typeName + "_type").attr("disabled", "disabled");
                        vm.showEdit(r.template.type);
                    },
                    error: function (err) {
                        alert("操作失败,请刷新重试");
                        console.log(err);
                    }
                });
            },
            //作废,启用,删除
            updateTemplateStatus: function (type) {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项红包模版");
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
                //删除
                if (type == 2) {
                    final_status = "3";
                }
                $.ajax({
                    type: "post",
                    url: "../HKCouponTemplate/updateTemplateStatus",
                    data: {
                        status: final_status,
                        couponCodes: rowData.coupon_code
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
                window.open("../HKCouponTemplate/exportExcelList?" + serialize);
            },
            lock:function () {

            },
            //提交保,更新
            submit: function (type) {
                if (vm.clicktag == 0) {
                    vm.clicktag = 1;
                    setTimeout(function () { vm.clicktag = 0 }, 5000);
                }
                else{
                    alert('请勿频繁操作');
                    return false;
                }

                var optType = "edit";
                //卡券类型 1:加息券 2:抵扣券 3:返现券
                var typeName = "";
                switch (type) {
                    case 1:
                        typeName = "rate";
                        if (!$("#" + typeName + "_couponCode").val()) optType = "add";
                        break;
                    case 2:
                        typeName = "dis";
                        if (!$("#" + typeName + "_couponCode").val()) optType = "add";
                        break;
                    case 3:
                        typeName = "return";
                        if (!$("#" + typeName + "_couponCode").val()) optType = "add";
                        break;
                }

                var data = {
                    couponCode: $("#" + typeName + "_couponCode").val(),
                    couponName: $("#" + typeName + "_couponName").val(),
                    type: $("#" + typeName + "_type").val(),
                    borrowType: $("#" + typeName + "_borrowType").val(),
                    couponAmount: $("#" + typeName + "_couponAmount").val(),
                    minAmount: $("#" + typeName + "_minAmount").val(),
                    maxAmount: $("#" + typeName + "_maxAmount").val(),
                    minDays: $("#" + typeName + "_minDays").val(),
                    maxDays: $("#" + typeName + "_maxDays").val(),
                    showText: $("#" + typeName + "_showText").val()
                };

                //check
                if (!data.couponName && $.trim(data.couponName).length == 0) {
                    alert("红包模板名称必填");
                    return;
                }

                if (!data.couponAmount && $.trim(data.couponAmount).length == 0) {
                    alert("红包金额(或加息比例)必填");
                    return;
                }
                if (parseFloat(data.couponAmount) <= 0) {
                    alert("红包金额(或加息比例)输入不正确");
                    return;
                }

                if (!data.minAmount && $.trim(data.minAmount).length == 0) {
                    alert("投资金额限制必填");
                    return;
                }
                if (parseFloat(data.minAmount) < 0) {
                    alert("投资金额限制输入不正确");
                    return;
                }

                if (!data.maxAmount && $.trim(data.maxAmount).length == 0) {
                    alert("投资金额限制必填");
                    return;
                }
                if (parseFloat(data.maxAmount) < 0) {
                    alert("投资金额限制输入不正确");
                    return;
                }

                if (!data.minDays && $.trim(data.minDays).length == 0) {
                    alert("适用期限必填");
                    return;
                }
                if (parseInt(data.minDays) < 0) {
                    alert("适用期限输入不正确");
                    return;
                }

                if (!data.maxDays && $.trim(data.maxDays).length == 0) {
                    alert("适用期限必填");
                    return;
                }
                if (parseInt(data.maxDays) < 0) {
                    alert("适用期限输入不正确");
                    return;
                }

                if (!data.showText && $.trim(data.showText).length == 0) {
                    alert("适用项目文案展示必填");
                    return;
                }
                var method = "add" == optType ? "addTemplate" : "updateTemplateByCouponCode";
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../HKCouponTemplate/" + method,
                    data: data,
                    dataType: "json",
                    success: function (r) {
                        console.log(r)
                        if (r.code != 0) {
                            alert("操作失败");
                            return;
                        }
                        vm.closeEdit();
                        vm.reload();
                    },
                    error: function (err) {
                        alert("操作失败,请刷新重试");
                        console.log(err);
                    }
                });
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../HKCouponTemplate/getPage',
        datatype: "json",
        colModel: [
            {label: '红包模板ID', name: 'coupon_code', width: 50, key: true, hidden: false},
            {label: '红包模板名称', name: 'coupon_name', width: 100},
            {label: '红包模板类型', name: 'type', width: 60},
            {label: '适用产品类型', name: 'borrow_type', width: 60},
            {label: '金额/比例', name: 'coupon_amount', width: 60},
            {label: '投资金额限制(元)', name: 'investRange', width: 60},
            {label: '适用期限(天)', name: 'daysRange', width: 80},
            {label: '状态', name: 'status', width: 50},
            {label: '创建日期', name: 'create_time', width: 150},
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
});









