

$(function () {
    $("#jqGrid").jqGrid({
        url: '../fromproductasset/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', width: 50, key: true },
			{ label: '产品标识', name: 'productNo', width: 80 }, 			
			{ label: '产品名称', name: 'productName', width: 80 }, 			
			{ label: '借款周期', name: 'periodUnit', width: 80,formatter:function(value,b,row){

				return row.periodLength + getConfigValByCode2Key('period_unit',value);
			} },
			/*{ label: '投资周期长度', name: 'periodLength', width: 80 }, */
			{ label: '年化利率', name: 'annualizedRate', width: 80 ,formatter:function (value,b,row) {
				return value + '%';
            }},
			{ label: '还款方式', name: 'returnType', width: 80,formatter: function(value, b, row){
				return getConfigValByCode2Key('return_type',value);
			} },
			{ label: '最小借款额', name: 'minBorrowAmount', width: 80 }, 			
			{ label: '最大借款额', name: 'maxBorrowAmount', width: 80 }, 			
			{ label: '资产平台', name: 'platform', width: 80,formatter : function(value, b, row){
				var res, plators = getH5Session('platforms');
				for(var i in plators){
					if(plators[i].platform == value){
						res = plators[i].name;
					}
				}
				if(typeof (res) == 'undefined'){
					return row.platform;
				}
				return res;
			} }

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


    // 平台类型
    var ary = new Array();
    ary.push({code:"", name:"全部"});
    var platforms = getH5Session('platforms');
    console.log(platforms);
    for (var i=0; i<platforms.length; i++){
        var rp = platforms[i];
        if (rp.type == 2) ary.push({code:rp.platform, name:rp.name});
    }
    vm.platforms = ary;
    vm.q.platform = "";
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		fromProductAsset: {},
        q: {
            productName:null,
            periodLength:null,
            periodUnit:null,
            returnType:null,
            rate:null,
			platform:null
        },
		platforms:null,
        pfVal:null,
		configs : getH5Session("configs")
	},
	methods: {
        query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.fromProductAsset = {};
         },
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id);

		},
		saveOrUpdate: function (event) {
			if ($("#sub").is(".disabled")) return;
			$("#sub").addClass("disabled");
			var url = vm.fromProductAsset.id == null ? "../fromproductasset/save" : "../fromproductasset/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.fromProductAsset),
			    success: function(r){
			    	if(r.code === 0 && r.boolean == true){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}

                    $("#sub").removeClass("disabled");
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../fromproductasset/delete",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get("../fromproductasset/info/"+id, function(r){
                vm.fromProductAsset = r.fromProductAsset;
            });
		},
		reload: function (event) {
          	vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:1,
				postData:{'productName':vm.q.productName, 'platform':vm.q.platform, 'periodLength':vm.q.periodLength,
					'periodUnit':vm.q.periodUnit,'returnType':vm.q.returnType}
            }).trigger("reloadGrid");
		},
        resetData: function() {
            this.$data = Object.assign(this.$data, this.defaultData)
        }
	}
});