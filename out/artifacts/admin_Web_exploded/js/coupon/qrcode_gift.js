var vm;
var platfroms;
var plt;

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

/*

 $("#jqqueryUserReceive").jqGrid({
        url: '../QrCodeController/getQrcodeGiftListByUser',
        datatype: "json",
        colModel: [
            {label: '用户id', name: 'userCode', width: 45, key: true },
            {label: '手机号', name: 'mobile', width: 100},
            {label: '领取日期', name: 'updateTime', width: 100},
            {label: '领取渠道', name: 'channel', width: 100}
*
*
* */




function viewCoupon(giftCode){
    vm.showGiftRelation=false;
    vm.showCouponRelation=true;
    $("#jqGridCoupon").jqGrid('clearGridData');  //清空表格
    $("#jqGridCoupon").jqGrid('setGridParam',{  // 重新加载数据
        datatype:'json',
        url: '../HKGiftTemplate/getCouponListOfTemplate',
        postData: {
            giftCode:giftCode
        },
        page:1,
        jsonReader: {
            root: "list",
            total: "total"
        }
    }).trigger("reloadGrid");
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
    $.ajax({
        type: "GET",
        url: "../coupon/platform",
        data: null,
        async: false,
        success: function (r) {
            if (r.code == 0) {
                var model = r.data;
                if(model != null && model.platform != null){
                    var htmlStr = "<option value='" + model.platform + "'>" + model.name + "</option>";
                    plt = model.platform;
                    $("#platform").append(htmlStr);
                }
            } else {
                alert("系统异常");
            }
        }
    });

    vm = new Vue({
        el: '#rrapp',
        data: {
            giftName:"",
            qrCode:"",
            status:"",
            startDate:"",
            endDate:"",
            active:"",
            qrcodeCode:"",
            userCode:"",
            mobile:"",

            downloadUrl:"",
            downloadCode:"",
            id: "",
            couponNo: "",
            platform: "",
            type: "",
            name: "",
            deliverAmt: "",
            usedAmt: "",
            createTime : "",
            showList: true,
            showGiftRelation:false,
            showCouponRelation:false,
            showDownloadQRcode:false,
            showQueryUserReceive:false,
            title: null,
            couponDetail: {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                vm.platform = "";
                vm.type  = "";
                vm.name = "";
                vm.status  = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        qrcodeName : encodeURI(vm.giftName),
                        status : vm.status,
                        startDate:vm.startDate,
                        endDate:vm.endDate,
                        qrCode : vm.qrCode
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                window.location.href="../coupon/coupon_list.html";
            },
            exports : function(){
                window.open("../QrCodeController/export");
            },
            addQrcodeGift:function () {
                window.location.href = "../coupon/addQrcodeGift.html";
            },
            invalidation:function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowId=$("#jqGrid").jqGrid("getGridParam","selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData",rowId);
                var confirmText ="";
                if(rowData.active==2){
                     confirmText ="确定启用这个卡券?";
                }else{
                    confirmText ="确定作废这个卡券?";
                }
                confirm(confirmText, function () {
                    $.ajax({
                        type: "GET",
                        url: "../QrCodeController/active?qrcodeCode="+rowData.qrcodeCode+"&active="+rowData.active,
                        data: null,
                        success: function (r) {
                            if (r.code == 0) {
                                alert('操作成功', function (index) {
                                    $("#jqGrid").trigger("reloadGrid");
                                });
                            } else {
                                alert(r.msg +"--->"+r.nos);
                            }
                        }
                    });
                });

            },
            loadRelation:function(){
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowData = $("#jqGrid").jqGrid("getRowData",codes[0]);
                vm.showList=false;
                vm.showQueryUserReceive=false;
                vm.showDownloadQRcode=false;
                vm.showGiftRelation=true;
                $("#jqGridRelation").jqGrid('clearGridData');  //清空表格
                $("#jqGridRelation").jqGrid('setGridParam',{  // 重新加载数据
                    datatype:'json',
                    url:"../activityGift/getActivityGiftRelation",
                    postData: {
                        giftCode:rowData.qrcodeCode
                    },
                    page:1,
                    jsonReader: {
                        root: "relationData",
                        page: "page.currPage",
                        total: "page.totalPage",
                        records: "page.totalCount"
                    },
                    prmNames: {
                        page: "page",
                        rows: "limit",
                        order: "order"
                    }
                }).trigger("reloadGrid");
            },cancelGiftRelation:function () {
                vm.showList=true;
                vm.showGiftRelation=false;
            },downloadQRcode:function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowData = $("#jqGrid").jqGrid("getRowData",codes[0]);
                if(rowData.qrcodeNum != rowData.productionNum){
                    alert("此礼包还未生成完数据");
                    return;
                }
                vm.showList=false;
                vm.showGiftRelation=false;
                vm.showCouponRelation=false;
                vm.showDownloadQRcode=true;
                vm.downloadCode = rowData.qrcodeCode;

            },submitDownloadQRcode:function () {
                if(vm.downloadUrl==""||vm.downloadUrl==null){
                    alert("二维码链接前缀不可为空!")
                    return;
                }
               window.open("../QrCodeController/getQrcodeImg?qrcodeCode="+vm.downloadCode+"&url="+vm.downloadUrl);
                vm.showList=true;
                vm.showDownloadQRcode=false;
            },onlyCodeDownload:function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowData = $("#jqGrid").jqGrid("getRowData",codes[0]);
                if(rowData.qrcodeNum != rowData.productionNum){
                    alert("此礼包还未生成完数据");
                    return;
                }
                vm.downloadCode = rowData.qrcodeCode;
                window.open("../QrCodeController/getOnlyCode?qrcodeCode="+vm.downloadCode);

            },queryUserReceive:function () {
                vm.showList=false;
                vm.showDownloadQRcode=false;
                vm.showGiftRelation=false;
                vm.showCouponRelation=false;
                vm.showQueryUserReceive=true;

                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一项礼包模版");
                    return;
                }
                var rowData = $("#jqGrid").jqGrid("getRowData",codes[0]);
                $("#jqqueryUserReceive").jqGrid('clearGridData');  //清空表格
                $("#jqqueryUserReceive").jqGrid('setGridParam',{
                    datatype:'json',
                    postData:{'qrcodeCode':rowData.qrcodeCode}, //发送数据
                    page:1
                }).trigger("reloadGrid"); //重新载入

            },queryUser:function () {
                $("#jqqueryUserReceive").jqGrid('clearGridData');  //清空表格
                $("#jqqueryUserReceive").jqGrid('setGridParam',{
                    datatype:'json',
                    postData:{'userCode':vm.userCode,'mobile':vm.mobile}, //发送数据
                    page:1
                }).trigger("reloadGrid"); //重新载入
            }
        }
    })




    $("#jqqueryUserReceive").jqGrid({
        url: '../QrCodeController/getQrcodeGiftListByUser',
        datatype: "json",
        colModel: [
            {label: '用户id', name: 'userCode', width: 45, key: true },
            {label: '手机号', name: 'mobile', width: 100},
            {label: '领取日期', name: 'updateTime', width: 100},
            {label: '领取渠道', name: 'channel', width: 100,formatter:channelStatus}


        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        pager: "#jqqueryUserReceivePager",
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
            $("#jqqueryUserReceive").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqqueryUserReceive").jqGrid("setGridWidth",$(window).width())
        }
    });



    $("#jqGridCoupon").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: '红包模版ID', name: 'coupon_code', width: 45, key: true,hidden:true },
            {label: '红包模版名称', name: 'coupon_name', width: 100},
            {label: '红包数量', name: 'coupon_num', width: 100}


        ],
        viewrecords: true,
        height: 350,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridCoupon").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridCoupon").jqGrid("setGridWidth",$(window).width())

        }
    });

    $("#jqGridRelation").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: '礼包模版ID', name: 'giftCode', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'giftName', width: 100},
            {label: '礼包数量', name: 'giftCount', width: 100},
            {label: '操作', name: 'giftCode', width: 60,formatter:function (value, options, row){
                return '<button class="btn btn-xs btn-primary" style="margin-left: 10px"  onClick="viewCoupon(\'' + options.rowId + '\')">查看关联礼包</button>';

            }}

        ],
        viewrecords: true,
        height: 350,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridRelation").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridRelation").jqGrid("setGridWidth",$(window).width())

        }
    });

    $("#jqGrid").jqGrid({
        url: '../QrCodeController/getQrcodeGiftListLimitPage',
        datatype: "json",
        colModel: [
            {label: '唯一码礼包id', name: 'id', width: 10, key: true,hidden:true},
            {label: '唯一码礼包名称', name: 'qrcodeName', width: 100},
            {label: '礼包状态', name: 'status', width: 100,formatter:qrcodeGift},
            {label: '作废/启用', name: 'active', width: 80,hidden:true},
            {label: 'Code', name: 'qrcodeCode', width: 100,hidden:true},
            {label: '设置总数', name: 'qrcodeNum', width: 50},
            {label: '生成总数', name: 'productionNum', width: 50},
            {label: '已兑换数量', name: 'exchangeNum', width: 60},
            {label: '唯一码有效期开始时间', name: 'startDate', width: 115},
            {label: '唯一码有效期结束时间', name: 'endDate', width: 115},
            {label: '创建时间', name: 'createTime', width: 115},
            {label: '操作员', name: 'createUserName', width: 100},


        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        multiboxonly:true,
        gridComplete: hideSelectAll,
        beforeSelectRow: beforeSelectRow,
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

    function hideSelectAll() {
        $("#jqGrid").hide();
        return(true);
    }

    function beforeSelectRow() {
        $("#jqGrid").jqGrid('resetSelection');
        return(true);
    }

    /**
     * 全选框设置为不可选
     *
     */
    document.getElementById("cb_jqGrid").disabled=true;
});
