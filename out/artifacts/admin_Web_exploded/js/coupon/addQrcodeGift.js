

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
function deleteRow(rowId){
    var arr=$("#jqGridGiftOne").jqGrid("getRowData");
    $("#jqGridGiftOne").jqGrid("delRowData",rowId);
    var giftRelations=vm.couponGiftAdd.giftData;
    for(var i in giftRelations){
        if(giftRelations[i].giftCode==rowId){
            vm.couponGiftAdd.giftData.splice(i,1);
        }
    }
}


function getJQAllData(table) {
    var o = jQuery(table);
    //获取当前显示的数据
    var rows = o.jqGrid('getRowData');
    var rowNum = o.jqGrid('getGridParam', 'rowNum'); //获取显示配置记录数量
    var total = o.jqGrid('getGridParam', 'records'); //获取查询得到的总记录数量
    //设置rowNum为总记录数量并且刷新jqGrid，使所有记录现出来调用getRowData方法才能获取到所有数据
    o.jqGrid('setGridParam', { rowNum: total }).trigger('reloadGrid');
    var rows = o.jqGrid('getRowData');  //此时获取表格所有匹配的
    o.jqGrid('setGridParam', { rowNum: rowNum }).trigger('reloadGrid'); //还原原来显示的记录数量
    return rows;
}

$(function () {
    vm = new Vue({
        el: '#rrapp',
        data: {
            qrcodeName:"",
            qrcodeNum:"",
            startDate:"",
            endDate:"",
            rowData:"",
            queryGiftName:"",
            queryStatus:"",
            querySendTimeStart:"",
            querySendTimeEnd:"",
            queryCreateTimeStart:"",
            queryCreateTimeStart:"",
            couponGiftAdd:{
                createTime:'',
                endTime:'',
                qrcodeName:'',
                giftCode:'',
                giftName:'',
                giftNum:'',
                startDate:'',
                endDate:'',
                giftData:[],
                giftDatas:[]
            },
            cou:{
                giftCode:'',
                giftName:'',
                giftNum:'',
                startDate:'',
                endDate:'',
                createUserName:''
            },
            showone:true,
            showtwo:false,
            giftTemplate:{},
            couponDetail: {},
            data:[],
            giftData:[]
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
            back: function (event) {
                window.location.href="../coupon/qrcode_gift.html";
            },
            exports : function(){
                window.open("../coupon/export");
            },
            addQrcodeGift:function () {
                vm.showone=false;
                vm.reloadGiftTemplate();
            },
            reloadGiftTemplate:function(){
                $("#jqGridGift").setGridParam({
                    postData: {
                        /* platform : plt,*/
                        queryGiftName : vm.queryGiftName,
                        queryStatus : vm.queryStatus,
                        querySendTimeStart : vm.querySendTimeStart,
                        querySendTimeEnd : vm.querySendTimeEnd,
                        queryCreateTimeStart : vm.queryCreateTimeStart,
                        queryCreateTimeEnd : vm.queryCreateTimeEnd
                    },
                    page:1
                }).trigger("reloadGrid");

            },cancelGift:function(){
                vm.showone=true;
            },
            loadRelationList:function(){
                $("#jqGridGiftOne").jqGrid('clearGridData');  //清空表格
                $("#jqGridGiftOne").jqGrid('setGridParam',{  // 重新加载数据
                    datatype:'local',
                    data : vm.couponGiftAdd.giftData,   //  newdata 是符合格式要求的需要重新加载的数据
                    page:1
                }).trigger("reloadGrid");
            },
            submitGift:function () {
                var codes = $("#jqGridGift").jqGrid("getGridParam", "selarrrow");
                for(var i=0;i<codes.length;i++){
                    var rowData = $("#jqGridGift").jqGrid("getRowData",codes[i]);
                    console.log(rowData);
                    var obj={
                        gift_code:rowData.gift_code,
                        gift_name:rowData.gift_name,
                        update_time:rowData.update_time,
                        status:rowData.status,
                        create_user_name:rowData.create_user_name,
                        giftCount:1
                    }
                    vm.couponGiftAdd.giftData.push(obj);
                }
                vm.loadRelationList();
                vm.showone=true;
            },
            SaveQrCodeGift:function(){
                document.getElementById("SaveQrCodeGiftBtn").disabled=true;

                if(vm.couponGiftAdd.qrcodeName==""||vm.couponGiftAdd.qrcodeName==null){
                    document.getElementById("SaveQrCodeGiftBtn").disabled=false;
                    alert("名称不可为空")
                    return;
                }

                if(vm.couponGiftAdd.giftNum==""||vm.couponGiftAdd.giftNum==null){
                    document.getElementById("SaveQrCodeGiftBtn").disabled=false;
                    alert("数量不可为空")
                    return;
                }
                if(vm.couponGiftAdd.giftNum <= 0){
                    alert("数量必须大于0")
                    return;
                }

                if(vm.couponGiftAdd.startDate==""||vm.couponGiftAdd.startDate==null){
                    document.getElementById("SaveQrCodeGiftBtn").disabled=false;
                    alert("有效期开始时间不可为空")
                    return;
                }
                if(vm.couponGiftAdd.endDate==""||vm.couponGiftAdd.endDate==null){
                    alert("有效期结束时间不可为空")
                    document.getElementById("SaveQrCodeGiftBtn").disabled=false;
                    return;
                }

                if(vm.couponGiftAdd.giftData==""||vm.couponGiftAdd.giftData==null){
                    alert("礼包不可为空")
                    document.getElementById("SaveQrCodeGiftBtn").disabled=false;
                    return;
                }


                $("#jqGridGiftOne").jqGrid("saveCell",vm.lastRow,vm.lastCell);
                for(var i =0;i<vm.couponGiftAdd.giftData.length;i++){
                    var code = vm.couponGiftAdd.giftData[i].gift_code;
                    var rowData = $("#jqGridGiftOne").jqGrid("getRowData",code);
                    rowData.giftCode=code;
                    vm.couponGiftAdd.giftDatas.push(rowData);
                }
                $.ajax({
                    type: "post",
                    contentType: "application/json;charset=utf-8",
                    url: "../QrCodeController/saveQrCodeGift",
                    data: JSON.stringify(vm.couponGiftAdd),
                    dataType: "json",
                    success: function (r) {
                        if(r.code==0){
                            window.location.href="../coupon/qrcode_gift.html";
                        }
                    },ajaxComplete:function () {
                        document.getElementById("SaveQrCodeGiftBtn").disabled=false;

                    }
                });
            },queryCoupon:function () {
                $("#jqGridGift").setGridParam({
                    postData: {
                        /* platform : plt,*/
                        giftName : vm.couponGiftAdd.giftName,
                        queryStatus : vm.queryStatus,
                        querySendTimeStart : vm.querySendTimeStart,
                        querySendTimeEnd : vm.querySendTimeEnd,
                        queryCreateTimeStart : vm.couponGiftAdd.createTime,
                        queryCreateTimeEnd : vm.giftTemplate.endTime
                    },
                    page:1
                }).trigger("reloadGrid");
            }

        }
    });



    $("#jqGridGiftOne").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: '礼包模版标识', name: 'gift_code', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'gift_name', width: 100},
            {label: '礼包数量', name: 'giftCount', width: 100,editable: true,edittype:'text'},
            {label: '状态', name: 'status', width: 60},
            {label: '更新时间', name: 'update_time', width: 100},
            {label: '操作员', name: 'create_user_name', width: 60},
            {label: '操作', name: 'giftCode', width: 60,formatter:function (value, options, row){
                return '<button class="btn btn-xs btn-primary" style="margin-left: 10px"  onClick="deleteRow(\'' + options.rowId + '\')">删除</button>';
            }}
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        cellEdit:true,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        cellsubmit:'clientArray',
        beforeEditCell:function(rowid,cellname,v,iRow,iCol){
            vm.lastRow = iRow;
            vm.lastCell = iCol;
        },
        afterSaveCell:function(rowid,cellname,v,iRow,iCol){
            var relationObj=$("#jqGridGiftOne").jqGrid("getRowData",rowid);
            var giftRelations=vm.couponGiftAdd.giftData;
            for(var i in giftRelations){
                if(giftRelations[i].giftCode==rowid){
                    vm.couponGiftAdd.giftData[i].giftCount=relationObj.giftCount;
                }
            }
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridGiftOne").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridGiftOne").jqGrid("setGridWidth",$(window).width());
        }
    });


    $("#jqGridGift").jqGrid({
        url: '../HKGiftTemplate/getAllEffectiveList',
        datatype: "json",
        colModel: [
            {label: '礼包模版标识', name: 'gift_code', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'gift_name', width: 100},
            {label: '状态', name: 'status', width: 60,formatter:giftStatus},
            {label: '更新时间', name: 'update_time', width: 100},
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
        //pager: "#jqGridPager",
        jsonReader: {
            root: "list",
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
            $("#jqGridGift").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridGift").jqGrid("setGridWidth",$("#jqGridGiftParent").width())
        }
    });
});
