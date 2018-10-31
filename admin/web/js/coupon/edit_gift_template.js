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
    var edit_giftCode = localStorage.getItem("edit_giftCode");
    var edit_giftName = localStorage.getItem("edit_giftName");
    console.log(edit_giftCode)
    var isAdd = !edit_giftCode ? true : false;
    console.log("isAdd:" + isAdd);

    vm = new Vue({
        el: '#rrapp',
        data: {
            showone: true,
            showtwo: true,
            giftName: edit_giftName,
            giftCode: edit_giftCode,
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
            clicktag: '0'
        },
        methods: {
            query: function () {
                vm.reloadGiftTemplate();
            },
            back: function (event) {
                window.location.href = "../coupon/gift_template_list.html";
            },
            addGiftTemplate: function () {
                vm.showone = false;
                vm.showtwo = false;
                vm.reloadGiftTemplate();
            },
            reloadGiftTemplate: function () {
                $("#jqGridGift").setGridParam({
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
            cancelGift: function () {
                vm.showone = true;
                if (!isAdd) {
                    vm.showtwo = true;
                }
            },
            selectGift: function () {
                var codes = $("#jqGridGift").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length == 0) {
                    alert("至少勾选一项");
                    return;
                }
                var arr = [];
                for (var i in codes) {
                    console.log(codes[i]);
                    var rowData = $("#jqGridGift").jqGrid("getRowData", codes[i]);
                    console.log(rowData);
                    couponDetail = {
                        id: rowData.id,
                        coupon_code: rowData.coupon_code,
                        coupon_name: rowData.coupon_name,
                        type: rowData.type,
                        borrow_type: rowData.borrow_type,
                        coupon_num: 1,
                        coupon_amount: rowData.coupon_amount,
                        investRange: rowData.investRange,
                        daysRange: rowData.daysRange,
                        status: rowData.status,
                        create_time: rowData.create_time
                    }
                    arr.push(couponDetail);
                }
                console.log(arr);
                $("#jqGrid2").jqGrid('clearGridData');  //清空表格
                $("#jqGrid2").jqGrid('setGridParam', {  // 重新加载数据
                    datatype: 'local',
                    data: arr,
                    page: 1
                }).trigger("reloadGrid");
                vm.showone = true;
                vm.showtwo = true;
            },
            sumbit: function () {
                if (vm.clicktag == 0) {
                    vm.clicktag = 1;
                    setTimeout(function () { vm.clicktag = 0 }, 5000);
                }
                else{
                    alert('请勿频繁操作');
                    return false;
                }

                var couponCodeArr = [];
                var couponNumArr = [];
                var startDateArr = [];
                var endDateArr = [];
                $("span[id^='coupon_code_']").each(function () {
                    couponCodeArr.push($(this).html());
                });
                $("input[id^='coupon_num_']").each(function () {
                    couponNumArr.push($(this).val());
                });
                $("input[id^='start_date_']").each(function () {
                    startDateArr.push($(this).val());
                });
                $("input[id^='end_date_']").each(function () {
                    endDateArr.push($(this).val());
                });

                var couponDatas = [];
                for (var i = 0; i < couponCodeArr.length; i++) {
                    couponDatas.push({
                        couponCode: couponCodeArr[i],
                        couponNum: couponNumArr[i],
                        startDate: startDateArr[i],
                        endDate: endDateArr[i]
                    });
                }

                //check
                if (!vm.giftName || $.trim(vm.giftName).length == 0) {
                    alert("请输入礼包模版名称");
                    return false;
                }
                if ($.trim(vm.giftName).length > 40) {
                    alert("礼包模版名称最大长度为40个字符");
                    return false;
                }
                if (couponCodeArr.length < 1) {
                    alert("礼包中至少添加一个红包");
                    return false;
                }
                for (var i = 0; i < couponDatas.length; i++) {
                    var item = couponDatas[i];
                    if (!item.couponNum || parseInt(item.couponNum) < 1) {
                        alert("红包数量输入不正确");
                        return false;
                    }
                    if (!$.trim(item.startDate)) {
                        alert("请输入红包有效期开始时间");
                        return false;
                    }
                    if (!$.trim(item.endDate)) {
                        alert("请输入红包有效期结束时间");
                        return false;
                    }
                    if (new Date(item.startDate) > new Date(item.endDate)) {
                        alert("请输入红包有效期结束时间必须大于开始时间");
                        return false;
                    }
                }
                console.log(couponDatas);
                var method = !isAdd ? "updateTemplateByGiftCode" : "addTemplate";
                $.ajax({
                    type: "post",
                    url: "../HKGiftTemplate/" + method,
                    data: {
                        giftCode: vm.giftCode,
                        giftName: vm.giftName,
                        couponJsonData: JSON.stringify(couponDatas)
                    },
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    success: function (r) {
                        console.log(r);
                        if (r.code != 0) {
                            alert(r.msg);
                            return false;
                        }
                        vm.back();
                    },
                    error: function (err) {
                        alert("操作失败,请刷新重试");
                        console.log(err);
                    }
                });
            }
        }
    })

    //添加红包模版
    $("#jqGridGift").jqGrid({
        url: '../HKCouponTemplate/getAllEffectiveList',
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
        height: 300,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        jsonReader: {
            root: "list",
            total: "count",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridGift").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridGift").jqGrid("setGridWidth", $("#jqGridGiftParent").width())
        }
    });

    //删除关联红包模版
    window.deleteCoupon = function (rowId) {
        $("#jqGrid2").jqGrid("delRowData", rowId);
        // var rowNum = $("#jqGrid2").jqGrid('getGridParam', 'records');
        // if (rowNum <= 1) {
        //     alert("礼包中至少添加一个红包,删除失败");
        //     return;
        // }
        // var rowData = $("#jqGrid2").jqGrid("getRowData", rowId);
        // $("#jqGrid2").jqGrid("delRowData", rowId);
        // $.ajax({
        //     type: "post",
        //     url: "../HKGiftTemplate/deleteCoupon",
        //     data: {
        //         id: rowData.id,
        //         giftCode:edit_giftCode
        //     },
        //     contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        //     success: function (r) {
        //         console.log(r);
        //         if(r.code != 0){
        //             alert(r.msg);
        //             return;
        //         }
        //         $("#jqGrid2").jqGrid("delRowData", rowId);
        //     },
        //     error: function (err) {
        //         alert("操作失败,请刷新重试");
        //         console.log(err);
        //     }
        // });
    }

    $("#jqGrid2").jqGrid({
        url: '../HKGiftTemplate/getCouponListOfTemplate',
        postData: {
            giftCode: edit_giftCode
        },
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', width: 50, key: true, hidden: true},
            {
                label: '红包模板ID',
                name: 'coupon_code',
                width: 100,
                hidden: true,
                formatter: function (value, options, row) {
                    return '<span  id=\"coupon_code_' + options.rowId + '\" >' + row.coupon_code + '</span>';
                }
            },
            {label: '红包模板名称', name: 'coupon_name', width: 200},
            {label: '红包模板类型', name: 'type', width: 150},
            {label: '适用产品类型', name: 'borrow_type', width: 150},
            {
                label: '红包数量', name: 'coupon_num', width: 150, formatter: function (value, options, row) {
                return '<input type="number" min="1" id=\"coupon_num_' + options.rowId + '\" value="' + value + '"/>';
            }
            },
            {label: '金额/比例', name: 'coupon_amount', width: 120},
            {label: '投资金额限制(元)', name: 'investRange', width: 200},
            {label: '适用期限(天)', name: 'daysRange', width: 140},
            {
                label: '红包有效期', name: 'start_end_date', width: 500, formatter: function (value, options, row) {
                var start_date = !row.start_date ? "" : row.start_date;
                var end_date = !row.end_date ? "" : row.end_date;
                var inputStart = '<input type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" id=\"start_date_' + options.rowId + '\" value="' + start_date + '"/>';
                var inputEnd = '<input type="text"  onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})" id=\"end_date_' + options.rowId + '\" value="' + end_date + '"/>';
                return inputStart + " - " + inputEnd;
            }
            },
            {
                label: '状态', name: 'status', width: 100
            },
            {
                label: '操作', name: 'opt', width: 100, formatter: function (value, options, row) {
                return '<a class="btn btn-xs btn-primary" href="javascript:void(0);" onclick="deleteCoupon(\'' + options.rowId + '\')">删除</a>';
            }
            }
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
            $("#jqGrid2").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

});
