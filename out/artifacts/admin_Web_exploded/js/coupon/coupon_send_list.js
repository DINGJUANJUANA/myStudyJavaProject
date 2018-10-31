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
            user_code: '',
            mobile: '',
            coupon_code: '',
            coupon_name: '',
            start_date: '',
            end_date: '',
            gift_code: '',
            gift_name: '',
            channel: '',
            type: '',
            status: '',
            is_return: false,
            couponDetailShow: false,
            giftDetailShow: false,
            investDetailShow: false,
            bizGiftShow: false,
            activityGiftShow: false,
            qrcodeShow: false,
            couponRelationShow: false
        },
        methods: {
            //重新查询列表
            reload: function (event) {
                vm.closeDetail();
                $("#jqGrid").setGridParam({
                    postData: {
                        user_code: vm.user_code,
                        mobile: vm.mobile,
                        coupon_code: vm.coupon_code,
                        coupon_name: vm.coupon_name,
                        start_date: vm.start_date,
                        end_date: vm.end_date,
                        gift_code: vm.gift_code,
                        gift_name: vm.gift_name,
                        channel: vm.channel,
                        type: vm.type,
                        status: vm.status
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            //返回
            back: function (event) {
                vm.closeDetail();
            },
            //关闭:显示红包详情,礼包详情,投资详情
            closeDetail: function () {
                vm.showList = true;
                vm.couponDetailShow = false;
                vm.giftDetailShow = false;
                vm.investDetailShow = false;
                vm.bizGiftShow = false;
                vm.activityGiftShow = false;
                vm.qrcodeShow = false;
                vm.couponRelationShow = false;
            },
            //显示:红包详情,礼包详情,投资详情
            showDetail: function (type) {
                vm.showList = false;
                vm.couponDetailShow = false,
                    vm.giftDetailShow = false,
                    vm.investDetailShow = false;
                vm.bizGiftShow = false;
                vm.activityGiftShow = false;
                vm.qrcodeShow = false;
                vm.couponRelationShow = false;
                switch (type) {
                    //红包详情
                    case 1:
                        vm.couponDetailShow = true;
                        break;
                    //投资详情
                    case 2:
                        vm.investDetailShow = true;
                        break;
                    //礼包详情-业务礼包
                    case 3:
                        vm.bizGiftShow = true;
                        vm.giftDetailShow = true;
                        vm.couponRelationShow = true;
                        break;
                    //礼包详情-活动礼包
                    case 4:
                        vm.activityGiftShow = true;
                        vm.giftDetailShow = true;
                        vm.couponRelationShow = true;
                        break;
                    //礼包详情-唯一码礼包
                    case 5:
                        vm.qrcodeShow = true;
                        vm.giftDetailShow = true;
                        vm.couponRelationShow = true;
                        break;
                }
            },
            //导出
            exports: function () {
                var serialize = $("#listQueryForm").serialize();
                window.open("../querySend/exportSendCouView?" + serialize);
            }
        }
    });

    //发放列表实例化
    $("#jqGrid").jqGrid({
        url: '../querySend/getSendCouView',
        datatype: "json",
        colModel: [
            {label: '记录标识', name: 'record_code', width: 50, key: true, hidden: true},
            {label: '用户ID', name: 'user_code', width: 50, hidden: true},
            {label: '用户手机号', name: 'mobile', width: 50},
            {label: '礼包ID', name: 'gift_code', width: 60, hidden: true},
            {
                label: '礼包名称', name: 'gift_name', width: 150, formatter: function (value, options, row) {
                return '<a href="javascript:void(0);" onclick="giftDetail(\'' + options.rowId + '\')">' + value + '</a>';
            }
            },
            {
                label: '礼包类型', name: 'channel', width: 50, formatter: function (value, options, row) {
                //1:唯一码礼包 2:业务礼包 3:活动礼包
                var format = "未知";
                switch (value) {
                    case 1:
                        format = "唯一码礼包";
                        break;
                    case 2:
                        format = "业务礼包";
                        break;
                    case 3:
                        format = "活动礼包";
                        break;
                }
                return format;
            }
            },
            {label: '红包ID', name: 'coupon_code', width: 60, hidden: true},
            {
                label: '红包名称', name: 'coupon_name', width: 150, formatter: function (value, options, row) {
                return '<a href="javascript:void(0);" onclick="couponDetail(\'' + options.rowId + '\')">' + value + '</a>';
            }
            },
            {
                label: '红包类型', name: 'type', width: 50, formatter: function (value, options, row) {
                //卡卷类型 1:加息券 2:抵扣卷 3:返现券
                var format = "未知";
                switch (value) {
                    case 1:
                        format = "加息红包";
                        break;
                    case 2:
                        format = "抵扣红包";
                        break;
                    case 3:
                        format = "返现红包";
                        break;
                }
                return format;
            }
            },
            {label: '红包有效期', name: 'staEndDate', width: 160},
            {label: '领取时间', name: 'create_time', width: 80},
            {
                label: '状态', name: 'status', width: 50, formatter: function (value, options, row) {
                var format = "未知";
                switch (value) {
                    //未使用
                    case 1:
                    case 3:
                        format = "未使用";
                        break;
                    //已使用
                    case 2:
                    case 4:
                        format = "已使用";
                        format = '<a href="javascript:void(0);" onclick="investDetail(\'' + options.rowId + '\')">' + format + '</a>';
                        break;
                }
                return format;
            }
            }
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
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

    //指定礼包，关联的红包列表实例化
    $("#jqGrid2").jqGrid({
        url: '../xxx/xxx',
        datatype: "local",
        colModel: [
            {label: 'id', name: 'id', width: 50, key: true, hidden: true},
            {label: '红包模板名称', name: 'coupon_name', width: 200},
            {label: '红包模板类型', name: 'type', width: 150},
            {label: '适用产品类型', name: 'borrow_type', width: 150},
            {
                label: '红包数量', name: 'coupon_num', width: 150
            },
            {label: '金额/比例', name: 'coupon_amount', width: 120},
            {label: '投资金额限制(元)', name: 'investRange', width: 200},
            {label: '适用期限(天)', name: 'daysRange', width: 140},
            {
                label: '红包有效期', name: 'start_end_date', width: 500, formatter: function (value, options, row) {
                var start_date = !row.start_date ? "" : row.start_date;
                var end_date = !row.end_date ? "" : row.end_date;
                return start_date + " - " + end_date;
            }
            },
            {
                label: '状态', name: 'status', width: 100
            }
        ],
        viewrecords: false,
        height: 250,
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

//获取: 红包详情
function couponDetail(rowId) {
    var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
    $.ajax({
        type: "GET",
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: "json",
        url: "../querySend/getCouponDetail",
        data: {
            record_code: rowData.record_code
        },
        success: function (r) {
            if (r.code != 0) {
                alert("系统出错");
                return;
            }
            var couponDetail = r.couponDetail;

            //红包模板类型
            var coupon_type = "";
            switch (couponDetail.type) {
                case 1:
                    coupon_type = "加息红包";
                    break;
                case 2:
                    coupon_type = "抵扣红包";
                    break;
                case 3:
                    coupon_type = "返现红包";
                    break;
                default:
                    coupon_type = "未知";
            }
            $("#couponDetailShow_type").html(coupon_type);

            $("#couponDetailShow_coupon_name").html(couponDetail.coupon_name);

            $("#couponDetailShow_coupon_amount").html(couponDetail.coupon_amount);

            //投资金额限制
            var min_amount = !couponDetail.min_amount ? 0 : couponDetail.min_amount;
            var max_amount = !couponDetail.max_amount ? 0 : couponDetail.max_amount;
            var investRange = "";
            if (min_amount == 0 && max_amount == 0) {
                investRange = "(∞,∞)";
            }
            if (min_amount == 0 && max_amount != 0) {
                investRange = "(∞," + max_amount + "]";
            }
            if (min_amount != 0 && max_amount == 0) {
                investRange = "[" + min_amount + ",∞)";
            }
            if (min_amount != 0 && max_amount != 0) {
                investRange = "[" + min_amount + "," + max_amount + "]"
            }
            $("#couponDetailShow_investRange").html(investRange);

            //适用期限
            var min_days = !couponDetail.min_days ? 0 : couponDetail.min_days;
            var max_days = !couponDetail.max_days ? 0 : couponDetail.max_days;
            var daysRange = "";
            if (min_days == 0 && max_days == 0) {
                daysRange = "(∞,∞)";
            }
            if (min_days == 0 && max_days != 0) {
                daysRange = "(∞," + max_days + "]";
            }
            if (min_days != 0 && max_days == 0) {
                daysRange = "[" + min_days + ",∞)"
            }
            if (min_days != 0 && max_days != 0) {
                daysRange = "[" + min_days + "," + max_days + "]"
            }
            $("#couponDetailShow_daysRange").html(daysRange);

            //红包有效期
            var start_time = couponDetail.start_time;
            var end_time = couponDetail.end_time;
            $("#couponDetailShow_effectiveRange").html(start_time + ' ' + end_time);
            vm.showDetail(1);
        },
        error: function (err) {
            alert("系统出错");
        }
    });
}

//获取: 投资详情
function investDetail(rowId) {
    var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
    $.ajax({
        type: "GET",
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: "json",
        url: "../querySend/getInvetDetail",
        data: {
            record_code: rowData.record_code
        },
        success: function (r) {
            if (r.code != 0) {
                alert("系统出错");
                return;
            }
            var invetDetail = r.invetDetail;

            //折扣类型：1:加息券 2:抵扣卷 3:返现券',
            var investDetailShow_title = "";
            switch (invetDetail.discount_type) {
                case 1:
                    investDetailShow_title = "使用加息红包";
                    break;
                case 2:
                    investDetailShow_title = "使用抵扣红包";
                    break;
                case 3:
                    investDetailShow_title = "使用返现红包";
                    break;
            }
            $("#investDetailShow_title").html(investDetailShow_title);

            $("#investDetailShow_borrowNo").html(invetDetail.borrow_no);
            $("#investDetailShow_borrowName").html(invetDetail.borrow_name);
            $("#investDetailShow_rate").html(invetDetail.annualized_rate);

            //标的期限
            var period_unit = "";
            switch (invetDetail.period_unit) {
                case 1:
                    period_unit = "天";
                    break;
                case 2:
                    period_unit = "周";
                    break;
                case 3:
                    period_unit = "个月";
                    break;
                case 4:
                    period_unit = "年";
                    break;
            }
            $("#investDetailShow_borrowTime").html(invetDetail.period_length + period_unit);

            $("#investDetailShow_investAmount").html(invetDetail.invest_amount);
            if (invetDetail.discount_type == 3) {
                $("#investDetailShow_returnAmount").html(invetDetail.coupon_profit);
                vm.is_return = true;
            }
            $("#investDetailShow_investTime").html(invetDetail.create_time);
            vm.showDetail(2);
        },
        error: function (err) {
            alert("系统出错");
        }
    });
}

//获取: 礼包详情
function giftDetail(rowId) {
    var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
    //1:唯一码礼包 2:业务礼包 3:活动礼包
    debugger
    var channel = "";
    var showType = 0;
    switch (rowData.channel) {
        case "业务礼包":
            channel = 2;
            showType = 3;
            break;
        case "活动礼包":
            channel = 3;
            showType = 4;
            break;
        case "唯一码礼包":
            channel = 1;
            showType = 5;
            break;
    }

    $.ajax({
        type: "GET",
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        dataType: "json",
        url: "../querySend/getGiftDetail",
        data: {
            gift_code: rowData.gift_code,
            channel: channel
        },
        success: function (r) {
            if (r.code != 0) {
                alert("系统出错");
                return;
            }
            var head = r.giftDetail.head;
            var list = r.giftDetail.list;

            //礼包基本信息
            switch (rowData.channel) {
                case "业务礼包":
                    $("#bizGiftShow_giftName").html(head.big_gift_name);
                    $("#bizGiftShow_businessNode").html(head.business_node);
                    $("#bizGiftShow_client").html(head.client);
                    $("#investDetailShow_effectiveRange").html(head.staEndDate);
                    break;
                case "活动礼包":
                    $("#activityGiftShow_giftName").html(head.big_gift_name);
                    $("#activityGiftShow_operator").html(head.sender_name);
                    $("#activityGiftShow_acquireTimeRange").html(head.create_time);
                    break;
                case "唯一码礼包":
                    $("#qrcodeShow_giftName").html(head.big_gift_name);
                    $("#qrcodeShow_useTimeRange").html(head.create_time);
                    break;
            }

            //指定礼包，关联的红包列表
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                var couponDetail = list[i];
                arr.push({
                    coupon_code: couponDetail.coupon_code,
                    coupon_name: couponDetail.coupon_name,
                    type: couponDetail.type,
                    borrow_type: couponDetail.borrow_type,
                    coupon_num: couponDetail.count,
                    coupon_amount: couponDetail.coupon_amount,
                    investRange: couponDetail.investRange,
                    daysRange: couponDetail.daysRange,
                    start_date: couponDetail.start_time,
                    end_date: couponDetail.end_time,
                    create_time: couponDetail.create_time
                });
            }
            $("#jqGrid2").jqGrid('clearGridData');  //清空表格
            $("#jqGrid2").jqGrid('setGridParam', {  // 重新加载数据
                datatype: 'local',
                data: arr,
                page: 1
            }).trigger("reloadGrid");

            vm.showDetail(showType);
        },
        error: function (err) {
            alert("系统出错");
        }
    });
}









