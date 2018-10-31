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
            id: "",
            couponNo: "",
            platform: "",
            type: "",
            name: "",
            deliverAmt: "",
            usedAmt: "",
            status : "",
            createTime : "",
            showList: true,
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
                    	/* platform : plt,*/
                         type : vm.type,
                         name : vm.name,
                         status : vm.status
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                /*vm.showList = true;
                $.jgrid.gridUnload('jqGrid');
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").trigger("reloadGrid");
                $("#jqGrid").setGridParam({
                    postData: {
                    	id:vm.id,
                        receiveId:vm.receiveId,
                        userName:vm.userName,
                        type:vm.type,
                        status:vm.status,
                        startTime:vm.startTime,
                        endTime:vm.endTime,
                    },
                    page:1
                }).trigger("reloadGrid");*/
            	window.location.href="../coupon/coupon_list.html";
            },
            exports : function(){
            	window.open("../coupon/export");
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../coupon/list?platform='+plt,
        datatype: "json",
        colModel: [
        	{label: '卡券id', name: 'id', width: 10, key: true,hidden:true},
            {label: '卡券标识', name: 'couponNo', width: 100},
            {label: '归属业务线', name: 'platform', width: 60,formatter:function(a,b,c){
            	var oname = a;
            	$.each(platfroms, function (i, n) {
            		if (n.platform == a) {
            			oname=n.name;
					}
                })
                return oname;
            }},
            {label: '类型', name: 'type', width: 60,formatter:function(a,b,c){
            	if (a == "1") {
					return "加息券"; 
				}else if (a == "2"){
					return "返现券 ";
				}else if (a == "3"){
					return "提现券";
				}
            	return a;
            }},
            {label: '卡券名称', name: 'name', width: 60},
            {label: '卡券发放数量', name: 'deliverAmt', width: 40},
            {label: '卡券已使用数量', name: 'usedAmt', width: 50},
            {label: '状态', name: 'status', width: 40,formatter:function(a,b,c){
            	if (a == "0") {
					return "已禁用";
				}else if (a == "1"){
					return "已启用";
				} else if(a == "2"){
					return "已过期";
				}
            	return a;
            }},
            {label: '创建时间', name: 'createTime', width: 60},
            
            {
                label: '操作', name: null, width: 120, formatter: function (a, b, row) {
                var res;
                if (hasPermission('coupon:update')) {
                    if (row.status == 0) {//显示启用
                        res = "<p class='btn btn-success btn-sm' onclick=\"active('" + row.id + "')\"><i class='fa fa-money'></i>&nbsp;启用</p> ";
                    } else if (row.status == 1) {//显示禁用
                        res = "<p class='btn btn-danger btn-sm' onclick=\"forbid('" + row.id + "')\"><i class='fa fa-money'></i>&nbsp;禁用</p> ";
                    } else if(row.status == 2){//显示过期
                    	res = "<p class='btn btn-danger btn-sm' onclick=\"expire('" + row.id + "')\"><i class='fa fa-money'></i>&nbsp;已过期</p> ";
                    }
                }else {
                    res = '';
                }
                if (hasPermission('coupon:detail')) {
                    res += "<p class=\"btn btn-success btn-sm\" onclick=\"detail('" + row.id + "' )\"><i class=\"fa fa-money\"></i>&nbsp;详情</p>&nbsp;"
                }else {
                    res += '';
                }
                if (hasPermission('coupon:deliver')) {
                    res += "<p class=\"btn btn-success btn-sm\" onclick=\"deliver('" + row.couponNo + "' )\"><i class=\"fa fa-money\"></i>&nbsp;发放</p>&nbsp;"
                }else {
                    res += '';
                }
                if (hasPermission('coupon:record')) {
                	 res += "<p class=\"btn btn-success btn-sm\" onclick=\"record('" + row.id +"' ,'"+row.couponNo+"')\"><i class=\"fa fa-money\"></i>&nbsp;报表</p>&nbsp;"
                }else {
                    res += '';
                }
                return res;
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
});

function detail(id) {
    vm.showList = false;
    $("#select_panel").hide();
    $.jgrid.gridUnload('jqGrid');
    $.get("../coupon/info?id=" + id, function (r) {
        vm.couponDetail = r.data;
        if(r.data.type == 1){
        	$("#cp_pm_4").hide();
        	$("#cp_pm_5").hide();
        	$("#cp_pm_3").show();
        	$("#cp_pm_7").show();
        	$("#cp_pm_8").show();
        	$("#cp_pm_9").show();
        	$("#cp_pm_10").show();
        	$("#cp_pm_11").show();
        	$("#cp_pm_12").show();
        }
        
        if(r.data.type == 2){
        	$("#cp_pm_3").hide();
        	$("#cp_pm_5").hide();
        	
        	$("#cp_pm_4").show();
        	$("#cp_pm_7").show();
        	$("#cp_pm_8").show();
        	$("#cp_pm_9").show();
        	$("#cp_pm_10").show();
        	$("#cp_pm_11").show();
        	$("#cp_pm_12").show();
        }

        if(r.data.type == 3){
        	$("#cp_pm_3").hide();
        	$("#cp_pm_4").hide();
        	$("#cp_pm_7").hide();
        	$("#cp_pm_10").hide();
        	$("#cp_pm_11").hide();
        	
        	$("#cp_pm_5").show();
        	$("#cp_pm_8").show();
        	$("#cp_pm_9").show();
        	$("#cp_pm_12").show();
        }
        
    });
}
function deliver(couponNo){
	deliverCouponNo = couponNo; 
	$("#select_panel").hide();
	$("#coupon_detail_n").hide();
	$("#coupn_send_show").show();
	
}

function record(id,couponNo){
	window.location.href="../coupon/coupon_record.html?couponNo="+couponNo
}

function forbid(id){
    confirm('确定禁用这个卡券？', function () {
        $.ajax({
            type: "GET",
            url: "../coupon/forbid?id="+id,
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
    
}

function active(id){
    confirm('确定启用这个卡券？', function () {
    	console.debug(id);
        $.ajax({
            type: "GET",
            url: "../coupon/active?id="+id,
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
}

function upload(){
	if ($( "#coupon_batch_file").val() != '') {
		var formData = new FormData();
		formData.append("file",$("#coupon_batch_file")[0].files[0]);
    	$.ajax({  
    		url: '../coupon/upload',
    		type: 'POST',  
    		data: formData,  
    		async: false,  
    		cache: false,  
    		contentType: false,  
    		processData: false,  
    		resultType : "json",
    		success: function (r) {  
    			reloadSendData(r.data);
    		},  
    		error: function (r) {  
    			reloadSendData(r.data);
    		}  
    	});  
	}
}

function  deliver_singleton(){
	$("#panel-362008").hide();
	$("#panel-847098").show();
}

function deliver_singleton_sure(){
	var mobile = $("#deliver_single_mobile").val();
	if (mobile == null || "" == mobile ) {
		alert("手机号不能为空");
	}else{
		confirm('确定给'+mobile+"用户发放卡券"+deliverCouponNo+"吗", function () {
		$.ajax({
            type: "GET",
            url: "../coupon/deliver?couponNo="+deliverCouponNo+"&mobile="+mobile,
            success: function (r) {
            	if (r.code == 0) {
            		alert("发放成功");
                } else {
                	alert(r.msg);
                }
            }
        });
	});
	}
	
}

function deliver_batch_sure(){
	
	if ($( "#coupon_batch_file").val() != '') {
		var formData = new FormData();
		formData.append("file",$("#coupon_batch_file")[0].files[0]);
		formData.append("couponNo",deliverCouponNo);
		
		showLoading("卡券发放中，请勿进行其他操作",  function() {
			$.ajax({  
	    		url: '../coupon/deliverBatch',
	    		type: 'POST',  
	    		data: formData,  
	    		async: false,  
	    		cache: false,  
	    		contentType: false,  
	    		processData: false,  
	    		resultType : "json",
	    		success: function (r) {  
	    			reloadSendData(r.data);
	    		},  
	    		error: function (r) {  
	    			reloadSendData(r.data);
	    		}  
	    	});  
		});
	}
}

function  deliver_prototype(){
	$("#panel-847098").hide();
	$("#panel-362008").show();
	$.jgrid.gridUnload('sendDetailGrid');
	$("#sendDetailGrid").jqGrid({
		url: "../coupon/send_history",
        datatype: "json",
        colModel: [
        	{label: '注册手机号', name: 'mobile', width: 60},
            {label: '发送状态', name: 'msg', width: 100},
        ],
        viewrecords: true,
        height: 500,
        rownumbers: true,
        rownumWidth: 50,
        autowidth: true,
        multiselect: false,
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        }
    });
}

function reloadSendData(data){
	$.jgrid.gridUnload('sendDetailGrid');
	$("#sendDetailGrid").jqGrid({
		datatype : "local",
        data : data,
        colModel: [
        	{label: '注册手机号', name: 'mobile', width: 60},
            {label: '发送状态', name: 'msg', width: 100},
        ],
        viewrecords: true,
        height: 500,
        rowNum : 17976931348623157,
        rownumWidth: 50,
        autowidth: true,
        multiselect: false,
        rownumbers: true
    });
}

function showLoading(message, callback) {
    var msg = $("<div/>").css({
        position : 'absolute',
        'background-color': '#ffffff',
        'border-width': '1px',
        'border-style': 'solid',
        'font-size': '20px',
        display : 'none',
        'z-index' : 1000,
        padding: 10
    }).html(message).appendTo("body");
    var top = ($(window).height() / 2 - msg.height()) / 2;
    var left = ($(window).width() - msg.width()) / 2;
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    msg.css({
        top : top + scrollTop,
        left : left + scrollLeft
    }).fadeIn("fast", function() {
        callback();
        msg.fadeOut("fast", function() {
            msg.remove();
        });
    });
    return msg;
}