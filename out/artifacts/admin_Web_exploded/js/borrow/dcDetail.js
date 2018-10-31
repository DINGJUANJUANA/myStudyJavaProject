function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


var Request = GetRequest();
var billInvestNo = Request['billInvestNo'],curStageNo = Request['curStageNo'];


$(function () {
    $("#jqGrid").jqGrid({
        url: '../fromborrow/dcDetail/' +billInvestNo +'/' +curStageNo,
        datatype: "json",
        colModel: [			
			{ label: '代偿订单号', name: 'order_no', width: 30, key: true },
            { label: '代偿时间', name: 'order_date', width: 60 },
			{ label: '代偿本息', name: 'prepaid_amount', width: 60 },
			{ label: '代偿服务费', name: 'receive_service_fee', width: 100 },
            { label: '还代偿时间', name: 'dcTime', width: 80 },
			{ label: '还代偿金额', name: 'pay_prepaid_amount', width: 80 },
            { label: '还代偿利息', name: 'null', width: 80 },
            { label: '还代偿状态', name: 'dcStatus', width: 80 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null
	}
});