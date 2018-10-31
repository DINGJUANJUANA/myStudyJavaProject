var vm,s,e
$(function () {
		vm = new Vue({
	    el:'#rrapp',
	    data:{
	    	name:"",
	    	url:"",
	    	start:"",
	    	end:"",
	        showList: true
	    },
	    methods: {
			query: function () {
	            vm.reload();
	        },
	        reload: function (event) {
	            vm.showList = true;
	            var page = $("#jqGrid").jqGrid('getGridParam','page');
	            $("#jqGrid").setGridParam({
	                postData: {
	                     name : vm.name,
	                     url : vm.url,
	                     start : vm.start,
	                     end : vm.end
	                },
	                page:1
	            }).trigger("reloadGrid");
	            
	        }
	    }
	});
	
    $("#jqGrid").jqGrid({
        url: '../sys/operate/data',
        datatype: "json",
        colModel: [
        	
            { label: 'id', name: 'id', width: 50, key: true },
            { label: '操作url', name: 'operateUrl', width: 50 },
            { label: '操作数据', name: 'operateData', width: 80 },
            { label: '操作业务', name: 'operateBusiness', width: 80 },
            { label: '操作描述备注', name: 'operateDesc', width: 50 },
            { label: '操作人IP', name: 'operateIp', width: 50 },
            { label: '操作人', name: 'operateUser', width: 50 },
            { label: '操作时间', name: 'operateTime', width: 50 },

        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: false,
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
    
    
    $("#btn_qy").click(function (){
    	vm.url = $("#opt_url").val();
    	vm.name = $("#opt_name").val();
    	vm.start = $("#start").val();
    	vm.end = $("#end").val();
		vm.reload();
	});
    
    
});