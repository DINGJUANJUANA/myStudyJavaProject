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
            lastRow:0,
            lastCell:0,
            showList:true,
            showDetail:true,
            showRelationList:false,
            showGiftRelation:true,
            showCouponRelation:false,
            params:{
                queryGiftName:'',
                queryStatus:'',
                querySendTimeStart:'',
                querySendTimeEnd:'',
                queryCreateTimeStart:'',
                queryCreateTimeEnd:'',
            },

            sendType:'',
            giftDetail: {
                giftCode:'',
                giftName:'',
                sendType:'',
                sendTime:'',
                uploadKey:'',
                giftRelation:[]
            },
            giftTemplate:{
                giftCode:'',
                giftName:'',
                startTime:'',
                endTime:''
            },

        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                     vm.params.queryGiftName = "";
                     vm.params.queryStatus  = "";
                     vm.params.querySendTimeStart = "";
                     vm.params.querySendTimeEnd  = "";
                     vm.params.queryCreateTimeStart  = "";
                     vm.params.queryCreateTimeEnd  = "";
            },
            reload: function (event) {
                console.log(vm.params.queryGiftName)
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                    	/* platform : plt,*/
                        queryGiftName : encodeURI(vm.params.queryGiftName),
                        queryStatus : vm.params.queryStatus,
                        querySendTimeStart : vm.params.querySendTimeStart,
                        querySendTimeEnd : vm.params.querySendTimeEnd,
                        queryCreateTimeStart : vm.params.queryCreateTimeStart,
                        queryCreateTimeEnd : vm.params.queryCreateTimeEnd
                    },

                    autoencode:false,
                    page:1
                }).trigger("reloadGrid");
            },
            reloadGiftTemplate:function(){
                $("#jqGridGift").setGridParam({
                    postData: {
                        /* platform : plt,*/
                        giftCode : vm.giftTemplate.giftCode,
                        giftName : vm.giftTemplate.giftName,
                        createTimeMin : vm.giftTemplate.startTime,
                        createTimeMax : vm.giftTemplate.endTime
                    },
                    page:1
                }).trigger("reloadGrid");
                console.log($("#jqGridGiftParent").width())

            },
            back: function (event) {

                //$("#activityGiftForm").get(0).reset();
                vm.showList = true;
                vm.showDetail=true;
                vm.giftDetail={
                    giftCode:'',
                    giftName:'',
                    sendType:'',
                    sendTime:'',
                    status:'',
                    uploadKey:'',
                    giftRelation:[]
                }
                vm.loadRelationList();
            },
            add:function(){
                vm.showList=false;
            },
            addGift:function(){
                vm.showDetail=false;
                vm.reloadGiftTemplate();
            },
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
            loadRelationList:function(giftCode){
                $("#jqGridGiftRelation").jqGrid('clearGridData');  //清空表格
                $("#jqGridGiftRelation").jqGrid('setGridParam',{  // 重新加载数据
                    datatype:'local',
                    data:vm.giftDetail.giftRelation,
                    page:1
                }).trigger("reloadGrid");
            },
            edit:function(){
                var checkResult=vm.checkSelectOne();
                if(checkResult.code!=0){
                    alert(checkResult.msg);
                    return;
                }
                var giftCode=checkResult.giftCode;
                var rowData = $("#jqGrid").jqGrid("getRowData",giftCode);
                if(rowData.status!="未发送"){
                    alert("礼包状态不可编辑");
                    return;
                }
                $.ajax({
                    type: "post",
                    contentType: "application/json",
                    url: "../activityGift/getActivityGiftDetail?giftCode="+giftCode,
                    //data:{},
                    dataType: "json",
                    success: function (r) {
                        console.log(r)
                        if(r.code==0){
                            var giftData=r.giftData;
                            vm.giftDetail.giftCode=giftData.giftCode;
                            vm.giftDetail.giftName=giftData.giftName;
                            vm.giftDetail.sendType=giftData.sendType;
                            vm.giftDetail.sendTime=giftData.sendTime;
                            vm.giftDetail.status=giftData.status;
                            vm.giftDetail.uploadKey=giftData.giftCode;
                            vm.showList=false;
                            vm.giftDetail.giftRelation=eval("("+giftData.giftRelation+")");
                        }
                        vm.loadRelationList();
                    }
                });
            },
            updateStatus:function(){
                var checkResult=vm.checkSelectOne();
                if(checkResult.code!=0){
                    alert(checkResult.msg);
                    return;
                }
                var giftCode=checkResult.giftCode;
                $.ajax({
                    type: "post",
                    contentType: "application/json",
                    url: "../activityGift/updateActivityGiftStatus?giftCode="+giftCode,
                    //data: JSON.stringify(vm.giftDetail),
                    //data:{},
                    dataType: "json",
                    success: function (r) {
                        console.log(r)
                        if(r.code==0){
                            window.location.href="../activityGift/activityGiftList.html";
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            },
            loadGiftTemplate:function(){
                vm.showDetail=false;
                vm.reloadGiftTemplate();
            },
            queryGift:function(){
                vm.loadGiftTemplate();
            },
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
            cancelGiftRelation:function(){
                vm.showList=true;
                vm.showRelationList=false;
            },
            cancelCouponRelation:function(){
                vm.showCouponRelation=false;
                vm.showGiftRelation=true;
            },
            download:function(){
                var checkResult=vm.checkSelectOne();
                if(checkResult.code!=0){
                    alert(checkResult.msg);
                    return;
                }
                var giftCode=checkResult.giftCode;
                window.open("../activityGift/exportActivityGiftSendDetail?giftCode="+giftCode);
            },
            cancelGift:function(){
                vm.showDetail=true;
                vm.giftTemplate.giftName="";
                vm.giftTemplate.startTime="";
                vm.giftTemplate.endTime="";
            },
            submitGift:function(){
                var giftCodes=$("#jqGridGift").jqGrid("getGridParam","selarrrow");
                if(giftCodes.length==0){
                    alert("请选择礼包");
                    return;
                }

                vm.giftDetail.giftRelation=[];
                console.log(giftCodes);
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
                console.log( vm.giftDetail.giftRelation);
                vm.loadRelationList();
                vm.showDetail=true;
                vm.giftTemplate.giftName="";
                vm.giftTemplate.startTime="";
                vm.giftTemplate.endTime="";

            },
            exports : function(){
            	window.open("../activityGift/exportActivityGiftList?queryGiftName="+vm.params.queryGiftName+"&queryStatus="+
                                vm.params.queryStatus+"&querySendTimeStart="+vm.params.querySendTimeStart+"&querySendTimeEnd="+
                                vm.params.querySendTimeEnd+"&queryCreateTimeStart="+vm.params.queryCreateTimeStart+
                                "&queryCreateTimeEnd="+vm.params.queryCreateTimeEnd);
            },
            submit:function(){

                if(!vm.giftDetail.giftName){
                    alert("礼包名称不可为空");
                    return;
                }
                if(!vm.giftDetail.sendType){
                    alert("发送时间必选");
                    return;
                }
                if(vm.giftDetail.sendType==2&&!vm.giftDetail.sendTime){
                    alert("发送时间不可为空");
                    return;
                }
                if(vm.giftDetail.giftRelation.length==0){
                    alert("请选择关联礼包");
                    return;
                }
                if(vm.giftDetail.uploadKey==''){
                    alert("未上传会员名单");
                    return;
                }

                $("#jqGridGiftRelation").jqGrid("saveCell",vm.lastRow,vm.lastCell);
                console.log(vm.giftDetail.giftRelation);
                //console.log($("#jqGridGiftRelation").jqGrid("getRowData"));
                $.ajax({
                    type: "post",
                    contentType: "application/json",
                    url: "../activityGift/editActivityGift",
                    data: JSON.stringify(vm.giftDetail),
                    //data:{},
                    dataType: "json",
                    success: function (r) {
                        if(r.code==0){
                            window.location.href="../activityGift/activityGiftList.html";
                        }
                    }
                });
            },
            uploadExcel:function(){
                var fileName=$("#coupon_detail_userFile").val();
                if(!fileName){
                    alert("选选择上传会员名单文件");
                    return;
                }
                var end=fileName.substring(fileName.lastIndexOf("."),fileName.length)
                console.log(end);
                if(end!=".xls"&&end!=".xlsx"&&end!=".csv"){
                    alert("上传文件格式错误");
                    return;
                }
                $.ajaxFileUpload({
                    fileElementId: "coupon_detail_userFile",    //需要上传的文件域的ID，即<input type="file">的ID。
                    url: '../activityGift/uploadExcel', //后台方法的路径
                    type: 'post',   //当要提交自定义参数时，这个参数要设置成post
                    //dataType: 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
                    async : false,   //是否是异步
                    success: function(data) {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
                        if(data.code==0){
                            vm.giftDetail.uploadKey=data.uploadKey;
                            alert("上传成功");
                        }

                    },
                    error: function(data, status, e) {  //提交失败自动执行的处理函数。
                        console.log(e);
                    }
                });
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../activityGift/queryActivityGiftList',
        datatype: "json",
        colModel: [
        	{label: '活动礼包标识', name: 'giftCode', width: 10, key: true,hidden:true},
            {label: '活动礼包名称', name: 'giftName', width: 100},
            {label: '发送总数', name: 'sendCount', width: 60},
            {label: '成功发送数', name: 'sendCountSuccess', width: 60},
            {label: '失败发送数', name: 'sendCountFailed', width: 60},
            {label: '未发送数', name: 'sendCountWait', width: 60},
            {label: '状态', name: 'status', width: 80,formatter:activityGiftStatus},
            {label: '发送时间', name: 'sendTime', width: 150},
            {label: '更新时间', name: 'updateTime', width: 150},
            {label: '操作员姓名', name: 'updateUserName', width: 100},
            
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

    $("#jqGridGiftRelation").jqGrid({
        data:[],
        datatype: "local",
        colModel: [
            {label: '礼包模版ID', name: 'giftCode', width: 45, key: true,hidden:true },
            {label: '礼包模版名称', name: 'giftName', width: 100},
            {label: '礼包数量', name: 'giftCount', width: 100,editable: true,edittype:'text'},
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
        cellEdit:true,
        cellsubmit:'clientArray',
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        beforeEditCell:function(rowid,cellname,v,iRow,iCol){
            vm.lastRow = iRow;
            vm.lastCell = iCol;
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGridGiftRelation").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            $("#jqGridGiftRelation").jqGrid("setGridWidth",$(window).width())

        },
        afterSaveCell:function(rowid,cellname,v,iRow,iCol){
            var relationObj=$("#jqGridGiftRelation").jqGrid("getRowData",rowid);
            var giftRelations=vm.giftDetail.giftRelation;
            for(var i in giftRelations){
                if(giftRelations[i].giftCode==rowid){
                    vm.giftDetail.giftRelation[i].giftCount=relationObj.giftCount;
                }
            }
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


function deleteRow(rowId){
    var arr=$("#jqGridGiftRelation").jqGrid("getRowData");
    $("#jqGridGiftRelation").jqGrid("delRowData",rowId);
    var giftRelations=vm.giftDetail.giftRelation;
    for(var i in giftRelations){
        if(giftRelations[i].giftCode==rowId){
            vm.giftDetail.giftRelation.splice(i,1);
        }
    }
    console.log(vm.giftDetail.giftRelation);
}

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

