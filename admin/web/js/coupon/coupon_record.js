var vm;
var platfroms;
var couponNoq = ""; 
function serializeObject(form) {
    var o = {};
    // form.find(".ui-select").each(function(r){
    //     var name=$(this).attr("name");
    //     var value=$(this).attr("data-value");
    //     o[name]= value;
    // })

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
	
	String.prototype.startWith=function(str){    
	  var reg=new RegExp("^"+str);    
	  return reg.test(this);       
	}  
	
	var cpn = "";
	var html = $("#init_cpn").html();
	if (html!=null && html.length>15) {
		cpn = $("#init_cpn").html();
		couponNoq = $("#init_cpn").html();
	}
	
    vm = new Vue({
        el: '#rrapp',
        data: {
            id: "",
            receiveId: "",
            userName: "",
            type: "",
            status: "",
            startTime: "",
            endTime: "",
            couponNo:cpn,
            showList: true,
            title: null,
            rechargeDetail: {}
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                     vm.id = "";
                     vm.receiveId  = "";
                     vm.userName  = "";
                     vm.type  = "";
                     vm.status  = "";
                     vm.startTime  = "";
                     vm.endTime  = "";
                     vm.couponNo = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        id:vm.id,
                        receiveId:vm.receiveId,
                        userName:vm.userName,
                        type:vm.type,
                        status:vm.status,
                        startTime:vm.startTime,
                        endTime:vm.endTime,
                        couponNo:vm.couponNo
                    },
                    datatype : "json",
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                    	id:vm.id,
                        receiveId:vm.receiveId,
                        userName:vm.userName,
                        type:vm.type,
                        status:vm.status,
                        startTime:vm.startTime,
                        endTime:vm.endTime,
                        couponNo:vm.couponNo
                    },
                    page:page
                }).trigger("reloadGrid");
            },
            download:function (event) {
                var url = '';
                window.open(url);
            }
        }
    })

    $("#jqGrid").jqGrid({
        url: '../coupon/record',
        datatype: "local",
        colModel: [
            {label: '用户姓名', name: 'userName', width: 80, key: true},
            {label: '卡券编号', name: 'receiveId', width: 80},
            {label: '归属业务线', name: 'platform', width: 80,formatter:function(a,b,c){
            	var oname = a;
            	$.each(platfroms, function (i, n) {
            		if (n.platform == a) {
            			oname=n.name;
					}
                })
                return oname;
            }},
            {label: '类型', name: 'type', width: 80,formatter:function(a,b,c){
            	if (a == "1") {
					return "加息券"; 
				}else if (a == "2"){
					return "返现券 ";
				}else if (a == "3"){
					return "提现券";
				}
            	return a;
            }},
            {label: '卡券名称', name: 'name', width: 80},
            {label: '使用时间', name: 'useTime', width: 80},
            {label: '状态', name: 'status', width: 80,formatter:function(a,b,c){
            	if (a == "1") {
					return "未使用"; 
				}else if (a == "2"){
					return "已使用 ";
				}else if (a == "3"){
					return "已过期";
				}
            	return a;
            }},
            {label: '发放时间', name: 'createTime', width: 80},
            {label: '使用标的', name: 'investOrderName', width: 80}
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
    platfroms = getH5Session('platforms');
    $.each(platfroms, function (i, n) {
        var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
        $("#platform").append(htmlStr);
    })
    
    vm.reload();
});

function formatFun(cellvalue, options, rowObjec) {
    return '<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\')"><i class="fa fa-money"></i>&nbsp;详情</p>';
}

function zqgx(id) {
    vm.showList = false;
    $.get("../userRecharge/info/" + id, function (r) {
        vm.rechargeDetail = r.rechargeDetail;
    });

    $.jgrid.gridUnload('jqGridAccountIn');
    $("#jqGridAccountIn").jqGrid({
        url: "../userRecharge/accountIn/" + id,
        datatype: "json",
        colModel: [
            {label: '入金流水ID', name: 'accountOrgOrderNo', width: 80},
            {label: '入金账户编码', name: 'accountOrgId', width: 80},
            {label: '入金账户客户身份证号', name: 'idno', width: 80},
            {label: '入金账户客户', name: 'realname', width: 80},
            {label: '入金具体金额', name: 'operationAmount', width: 80}
        ],
        viewrecords: true,
        height: 60,
        width: 1000,
        rowNum: 1,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        pager: "#jqGridPagerAccountIn",
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
            $("#jqGridZqgx").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $.jgrid.gridUnload('jqGridAccountOut');
    $("#jqGridAccountOut").jqGrid({
        url: "../userRecharge/accountOut/"  + id,
        datatype: "json",
        colModel: [
            {label: '出金流水ID', name: 'accountOrgOrderNo', width: 80},
            {label: '出金账户编码', name: 'accountOrgId', width: 80},
            {label: '出金账户客户身份证号', name: 'idno', width: 80},
            {label: '出金账户客户', name: 'realname', width: 80},
            {label: '出金具体金额', name: 'operationAmount', width: 80}
        ],
        viewrecords: true,
        height: 60,
        width: 1000,
        rowNum: 1,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        pager: "#jqGridPagerAccountOut",
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
            $("#jqGridZqgx").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
}