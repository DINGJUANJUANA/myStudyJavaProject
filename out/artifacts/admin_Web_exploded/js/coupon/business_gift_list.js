var vm;
var platfroms;
var deliverCouponNo;
var plt;

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
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

	/*platfroms = getH5Session('platforms');
	$.each(platfroms, function (i, n) {
		var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
		$("#platform").append(htmlStr);
	})*/
	
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
            showList:true,
            showDetail:true,
            showRelationList:false,
            showGiftRelation:true,
            showCouponRelation:false,
            showJqGridGiftRelation:false,
            searchGift:false,
            businessName:"",
            businessNode:'',
            queryStatus:'',
            client:'0',
            startDate:'',
            endDate:'',
            sendType:'',
            clicktag:'0',
            giftDetailClient: [],
            giftDetail: {
                giftCode:'',
                giftName:'',
                sendNode:'1',
                client:[],
                startDate:'',
                endDate:'',
                giftRelation:[]
            },
            giftTemplate:{
                giftName:'',
                createTime:'',
                endTime:''
            },
            giftData:{"code":0,"list":[]}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            queryGift: function () {
                vm.reloadGiftTemplate();
            },
            reset: function() {
                     vm.businessName = "";
                     vm.businessNode  = "";
                     vm.client = "";
                     vm.startDate  = "";
                     vm.endDate  = "";
            },
            //重新加载列表
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                    	/* platform : plt,*/
                        businessName : vm.businessName,
                        businessNode : vm.businessNode,
                        client : vm.client,
                        startDate : vm.startDate,
                        endDate : vm.endDate
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            //重新加载礼包模版
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
                console.log($("#jqGridGiftParent").width())

            },
            //取消新增或修改
            back: function (event) {
                vm.showList = true;
                vm.showDetail=true;
                vm.giftDetail={
                    giftCode:'',
                    giftName:'',
                    sendType:'',
                    sendTime:'',
                    status:''
                }
            },
            //新增画面
            add:function(){
                vm.showList=false;
                vm.showDetail=true;
                vm.showJqGridGiftRelation=true;
                $("#coupon_detail_n").find("input").val("");
                $("#coupon_detail_n").find("select").val("");
                vm.giftDetail.sendNode='1';
                vm.giftDetail.client=[];
            },
            //添加礼包画面
            addGift:function(){
                vm.showDetail=false;
                vm.searchGift=true;
                vm.reloadGiftTemplate();
            },
            //勾选一个礼包
            checkSelectOne:function(){
                var obj={
                    code:0,
                    msg:'',
                    giftCode:''
                };
                var giftCodes=$("#jqGrid").jqGrid("getGridParam","selarrrow");
                if(giftCodes.length==0){
                    obj.code=-1;
                    obj.msg="请选择礼包";
                }else if(giftCodes.length>1){
                    obj.code=-1;
                    obj.msg="只能选择一个礼包";
                }else{
                    obj.code=0;
                    obj.giftCode=giftCodes[0];
                }
                return obj;
            },
            //重新加载关联的礼包
            loadRelationList:function(giftCode){
                $("#jqGridGiftRelation").jqGrid('clearGridData');  //清空表格
                $("#jqGridGiftRelation").jqGrid('setGridParam',{  // 重新加载数据
                    datatype:'local',
                    data:vm.giftDetail.giftRelation,
                    page:1
                }).trigger("reloadGrid");
            },
            //修改画面回显
            edit:function(){
                var ids=$("#jqGrid").jqGrid("getGridParam","selarrrow");
                if(ids.length != 1){
                    alert("请勾选一项礼包模版");
                    return;
                }
                var businessCode=ids[0];
                console.log(businessCode);
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../businessGift/queryForEdit",
                    data:{
                        businessCode:businessCode
                    },
                    dataType: "json",
                    success: function (r) {
                        console.log(r);
                        if(r.code!=0){
                            alert("参数错误");
                            return false;
                        }

                        vm.showList=false;
                        vm.showDetail=true;
                        vm.showJqGridGiftRelation=true;

                        var businessGift=r.retMap.businessGift;
                        var giftRelations=r.retMap.giftRelations;
                        vm.giftDetail.giftCode=businessGift.businessCode;
                        vm.giftDetail.giftName=businessGift.businessName;
                        vm.giftDetail.sendNode=businessGift.businessNode;
                        var client =[];
                            if(businessGift.client.fontsize()==1){
                                client.push(businessGift.client);
                        }else{
                                client = businessGift.client.split(",");
                            }
                        vm.giftDetail.client=client;
                        vm.giftDetail.startDate=businessGift.startDate;
                        vm.giftDetail.endDate=businessGift.endDate;
                        vm.giftDetail.giftRelation=giftRelations;
                        $("#jqGridGiftRelation").jqGrid('clearGridData');  //清空表格
                        $("#jqGridGiftRelation").jqGrid('setGridParam',{  // 重新加载数据
                            datatype:'local',
                            data:vm.giftDetail.giftRelation,
                            page:1
                        }).trigger("reloadGrid");
                    },
                    error:function (err) {
                        console.log(err);
                        alert("操作失败");
                    }
                });
            },
            //作废,启用业务礼包
            updateStatus:function(){
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("只能勾选一项");
                    return;
                }
                var rowId = $("#jqGrid").jqGrid("getGridParam", "selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData", rowId);
                console.log(rowData);
                var final_status = "";
                //作废/启用
                type=1;
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
                console.log("final_status:" + final_status);
                console.log("businessCode:" + rowData.business_code);
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../businessGift/disableBusGifts",
                    data:{
                        businessCode:rowData.business_code,
                        status: final_status
                    },
                    dataType: "json",
                    success: function (r) {
                        console.log(r)
                        if(r.code==0){
                          vm.reload();
                        }
                    }
                });
            },
            //查看关联礼包
            loadRelation:function(){
                var checkResult=vm.checkSelectOne();
                if(checkResult.code!=0){
                    alert(checkResult.msg);
                    return;
                }
                var giftCode=checkResult.giftCode;
                vm.showRelationList=true;
                vm.showList=false;
                vm.showDetail=false;
                vm.searchGift=false;

                $("#jqGridRelation").jqGrid('clearGridData');  //清空表格
                $("#jqGridRelation").jqGrid('setGridParam',{  // 重新加载数据
                    datatype:'json',
                    url:"../activityGift/getActivityGiftRelation",
                    postData: {
                        giftCode:giftCode
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
            },
            //关闭关联的礼包模版
            cancelGiftRelation:function(){
                vm.showList=true;
                vm.showRelationList=false;
            },
            //关闭关联的红包模版
            cancelCouponRelation:function(){
                vm.showCouponRelation=false;
                vm.showGiftRelation=true;
            },
            //取消勾选的礼包
            cancelGift:function(){
                vm.showDetail=true;
            },
            //添加勾选的礼包
            submitGift2:function(){
                var giftCodes=$("#jqGridGift").jqGrid("getGridParam","selarrrow");
                if(giftCodes.length==0){
                    alert("请选择礼包");
                    return;
                }
                vm.giftDetail.giftRelation=[];
                for(var i in giftCodes){
                    var rowData = $("#jqGridGift").jqGrid("getRowData",giftCodes[i]);
                    var obj={
                        giftCode:rowData.gift_code,
                        giftName:rowData.gift_name,
                        updateTime:rowData.update_time,
                        giftCount:1
                    }
                    vm.giftDetail.giftRelation.push(obj);
                }
                vm.loadRelationList();
                vm.showDetail=true;
            },
            //导出
            exports : function(){
            	window.open("../businessGift/exportActivityGiftList");
            },
            //删除关联礼包
            delGiftRelation:function(id){
                for(var i=0;i<vm.giftDetail.giftRelation.length;i++){
                    if(id==vm.giftDetail.giftRelation[i].giftCode){
                        vm.giftDetail.giftRelation.splice(i,1)
                    }
                }
            },
            //新增,修改保存
            submit:function(){
                if (vm.clicktag == 0) {
                    vm.clicktag = 1;
                    setTimeout(function () { vm.clicktag = 0 }, 5000);
                }
                else{
                    alert('请勿频繁点击！');
                    return false;
                }
                var startDate = this.giftDetail.startDate;
                console.log(startDate);
                var endDate = this.giftDetail.endDate;
                console.log(endDate);
                var cli = this.giftDetail.client;
                console.log(cli);
                //check
                if(!vm.giftDetail.giftName){
                    alert("业务礼包名称不能为空");
                    return false;
                }
                if(!startDate){
                    alert("有效开始时间不能为空");
                    return false;
                }
                if(!endDate){
                    alert("有效结束时间不能为空");
                    return false;
                }
                if(!vm.giftDetail.giftRelation || vm.giftDetail.giftRelation.length == 0){
                    alert("至少添加一个礼包");
                    return false;
                }
                if(!vm.giftDetail.client || vm.giftDetail.client.length == 0){
                    alert("至少添加一个适用渠道");
                    return false;
                }
                for(var i=0;i<vm.giftDetail.giftRelation.length;i++){
                    var giftRelation=vm.giftDetail.giftRelation[i];
                    if(!giftRelation.giftCount || giftRelation.giftCount<1){
                        alert("礼包数量输入不正确");
                        return false;
                    }
                }
                var data= {
                    businessName:vm.giftDetail.giftName.toString(),
                    businessCode:vm.giftDetail.giftCode.toString(),
                    businessNode:vm.giftDetail.sendNode.toString(),
                    client:this.giftDetail.client.toString(),
                    startDate:startDate.toString(),
                    endDate:endDate.toString(),
                    gifts:JSON.stringify(vm.giftDetail.giftRelation)
                };
                console.log(data);
                var method=!$("#giftDetail_giftCode").val()?"addBusGifts":"updateBusGifts";
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../businessGift/"+method,
                    data: data,
                    dataType: "json",
                    success: function (r) {
                        console.log(r);
                        if (r.code == 0) {
                            window.location.href = "../coupon/business_gift_list.html";
                            return false;
                        }
                    },
                    error:function (r) {
                        alert("操作失败,请刷新重试");
                        console.log(r)
                    }
                });
            }
        },
        //查看关联礼包
        loadRelation:function(){
            var checkResult=vm.checkSelectOne();
            if(checkResult.code!=0){
                alert(checkResult.msg);
                return;
            }
            var giftCode=checkResult.giftCode;
            vm.showRelationList=true;
            vm.showList=false;

            $("#jqGridRelation").jqGrid('clearGridData');  //清空表格
            $("#jqGridRelation").jqGrid('setGridParam',{  // 重新加载数据
                datatype:'json',
                url:"../businessGift/queryRelations",
                postData: {
                    giftCode:giftCode
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
        }
    })

    $("#jqGrid").jqGrid({
        url: '../businessGift/queryBusGifts',
        datatype: "json",
        colModel: [
        	{label: '业务礼包标识', name: 'business_code', width: 20, key: true,hidden:true},
            {label: '业务礼包名称', name: 'business_name', width: 20 },
            {label: '礼包发送节点', name: 'business_node', width: 20,formatter:busNode},
            {label: '适用渠道', name: 'client', width: 30},
            {label: '发送起止时间', name: 'staEndDate', width: 60},
            {label: '状态', name: 'status', width: 20,formatter:busGiftStatus},
            {label: '创建时间', name: 'create_time', width: 40},
            {label: '操作员', name: 'create_user_name', width: 20},
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

    $("#jqGridGift").jqGrid({
        url: '../HKGiftTemplate/getAllEffectiveList',
        datatype: "json",
        colModel: [
            {label: '礼包模版标识', name: 'gift_code', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'gift_name', width: 100},
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
    $("#jqGridGiftRelation").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: '礼包模版ID', name: 'giftCode', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'giftName', width: 100},
            {label: '礼包数量', name: 'giftCount', width: 100},
            {label: '更新时间', name: 'updateTime', width: 100},
            {label: '操作', name: 'giftCode', width: 60,formatter:function (value, options, row){
                return '<button class="btn btn-xs btn-primary" style="margin-left: 10px"  onClick="deleteRow(\'' + options.rowId + '\')">删除</button>';

            }}

        ],
        viewrecords: true,
        height: 350,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridGiftRelation").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridGiftRelation").jqGrid("setGridWidth",$(window).width())

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
                return '<button class="btn btn-xs btn-primary" style="margin-left: 10px"  onClick="viewCoupon(\'' + options.rowId + '\')">查看关联红包</button>';

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

    $("#jqGridCoupon").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: 'id', name: 'id', width: 50, key: true, hidden: true},
            //{label: '红包模板ID', name: 'coupon_code', width: 100},
            {label: '红包模板名称', name: 'coupon_name', width: 200},
            {label: '红包模板类型', name: 'type', width: 150},
            {label: '适用产品类型', name: 'borrow_type', width: 150},
            {label: '红包数量', name: 'coupon_num', width: 100},
            {label: '金额/比例', name: 'coupon_amount', width: 200},
            {label: '投资金额限制', name: 'investRange', width: 200},
            {label: '红包有效期', name: 'daysRange', width: 100},
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
            {label: '创建时间', name: 'create_time', width: 200}

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
});

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
function deleteRow(rowId){
    var arr=$("#jqGridGiftRelation").jqGrid("getRowData");
    $("#jqGridGiftRelation").jqGrid("delRowData",rowId);
    var giftRelations=vm.giftDetail.giftRelation;
    for(var i in giftRelations){
        if(giftRelations[i].giftCode==rowId){
            vm.giftRelation.splice(i,1);
        }
    }
    console.log(vm.giftRelation.giftRelation);
}
