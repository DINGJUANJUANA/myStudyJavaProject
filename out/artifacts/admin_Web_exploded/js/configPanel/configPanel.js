
$(function () {
	
	var platforms = getH5Session('platforms');
	$("#platform_rd_cfg").append("<option value=''></option>");
	$("#platform_ar_cfg").append("<option value=''></option>");
    $.each(platforms, function (i, n) {
         var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
         $("#platform_rd_cfg").append(htmlStr);
         $("#platform_ar_cfg").append(htmlStr);
     })
     
    var vm = new Vue({
        el: '#rrapp',
        data: {
            startDate: "",
            type: "",
            endDate: "",
            operateType: "",
            orderNo: "",
            mobile: "",
            platform: "",
            remark: "",
            id: "",
            showList: true,
            title: null
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function () {
                // 送出後
                vm.startDate = "";
                vm.endDate = "";
                vm.type = "";
                vm.operateType = "";
                vm.orderNo = "";
                vm.mobile = "";
                vm.platform = "";
                vm.remark = "";
                vm.id = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        startDate: vm.startDate,
                        endDate: vm.endDate,
                        type: vm.type,
                        operateType: vm.operateType,
                        orderNo: vm.orderNo,
                        mobile: vm.mobile,
                        platform: vm.platform
                    },
                    page: 1
                }).trigger("reloadGrid");
            },
            download: function (event) {
                var url = '../userAccountOrgLog/downloadExcelList?' + $("#userAccountOrgLog").serialize();
                // console.log(url);
                window.open(url);
            }
        }
    })
	
});

$(function(){

     $("#platform_rd_cfg").change(function(){  
  		var platform = $("#platform_rd_cfg").find("option:selected").val();
  		$.ajax({
            type: "GET",
            url: "../panel/guardFunds?platform="+platform,
            data: null,
            success: function (r) {
                if (r.code == 0) {
                    var model = r.data;
                    if (model != null) {
						var guardFundsAmount = model.guardFundsAmount;
						var unmatchableGuardFundsAmount = model.unmatchableGuardFundsAmount;
						$("#platform_rd_cfg_to").val(guardFundsAmount );
						$("#platform_rd_cfg_pt").val(unmatchableGuardFundsAmount );
						
					}else{
						$("#platform_rd_cfg_to").val("");
						$("#platform_rd_cfg_pt").val("");
					}
                } else {
                    alert("系统异常");
                }
            }
        });
     });
     
     $("#platform_ar_cfg").change(function(){  
    	 var platform = $("#platform_ar_cfg").find("option:selected").val();
    	 $.ajax({
             type: "GET",
             url: "../panel/match?platform="+platform,
             data: null,
             success: function (r) {
                 if (r.code == 0) {
                     var model = r.data;
                     if (model != null) {
                    	 var dtCount = model.dtCount;
                    	 var dtNumber = model.dtNumber;
                    	 var bCount = model.bCount;
                    	 var bNumber = model.bNumber;
                    	 $("#platform_ar_cfg_gs").val(dtCount);
                    	 $("#platform_ar_cfg_my").val(dtNumber);
                    	 $("#platform_ar_cfg_sx").val(bCount);
                    	 $("#platform_ar_cfg_sm").val(bNumber);
 					}else{
 						 $("#platform_ar_cfg_gs").val("");
                    	 $("#platform_ar_cfg_my").val("");
                    	 $("#platform_ar_cfg_sx").val("");
                    	 $("#platform_ar_cfg_sm").val("");
 					}
                 } else {
                     alert("系统异常");
                 }
             }
         });
      });
     
     
     $.ajax({
         type: "GET",
         url: "../panel/guardFunds?platform=HLW",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
						var guardFundsAmount = model.guardFundsAmount;
						var unmatchableGuardFundsAmount = model.unmatchableGuardFundsAmount;
						$("#platform_rd_cfg_to_hlw").val(guardFundsAmount );
						$("#platform_rd_cfg_pt_hlw").val(unmatchableGuardFundsAmount );
						
					}else{
						$("#platform_rd_cfg_to_hlw").val("");
						$("#platform_rd_cfg_pt_hlw").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
	
     
     $.ajax({
         type: "GET",
         url: "../panel/guardFunds?platform=ZZT",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
						var guardFundsAmount = model.guardFundsAmount;
						var unmatchableGuardFundsAmount = model.unmatchableGuardFundsAmount;
						$("#platform_rd_cfg_to_zzt").val(guardFundsAmount );
						$("#platform_rd_cfg_pt_zzt").val(unmatchableGuardFundsAmount );
						
					}else{
						$("#platform_rd_cfg_to_zzt").val("");
						$("#platform_rd_cfg_pt_zzt").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     
     $.ajax({
         type: "GET",
         url: "../panel/match?platform=HLW",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 var dtCount = model.dtCount;
                	 var dtNumber = model.dtNumber;
                	 var bCount = model.bCount;
                	 var bNumber = model.bNumber;
                	 $("#platform_ar_cfg_gs_hlw").val(dtCount);
                	 $("#platform_ar_cfg_my_hlw").val(dtNumber);
                	 $("#platform_ar_cfg_sx_hlw").val(bCount);
                	 $("#platform_ar_cfg_sm_hlw").val(bNumber);
					}else{
						 $("#platform_ar_cfg_gs_hlw").val("");
	                	 $("#platform_ar_cfg_my_hlw").val("");
	                	 $("#platform_ar_cfg_sx_hlw").val("");
	                	 $("#platform_ar_cfg_sm_hlw").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     $.ajax({
         type: "GET",
         url: "../panel/match?platform=ZZT",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 var dtCount = model.dtCount;
                	 var dtNumber = model.dtNumber;
                	 var bCount = model.bCount;
                	 var bNumber = model.bNumber;
                	 $("#platform_ar_cfg_gs_zzt").val(dtCount);
                	 $("#platform_ar_cfg_my_zzt").val(dtNumber);
                	 $("#platform_ar_cfg_sx_zzt").val(bCount);
                	 $("#platform_ar_cfg_sm_zzt").val(bNumber);
					}else{
						 $("#platform_ar_cfg_gs_zzt").val("");
	                	 $("#platform_ar_cfg_my_zzt").val("");
	                	 $("#platform_ar_cfg_sx_zzt").val("");
	                	 $("#platform_ar_cfg_sm_zzt").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     $.ajax({
         type: "GET",
         url: "../panel/debtTransfer?platform=FXD",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 $("#tr_debt_dq_fxd").val(model.bCount);
                	 $("#tr_debt_zd_fxd").val(model.zCount);
                	 $("#tr_debt_me_fxd").val(model.number);
					}else{
						$("#tr_debt_dq_fxd").val("");
	                	$("#tr_debt_zd_fxd").val("");
	                	$("#tr_debt_me_fxd").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     $.ajax({
         type: "GET",
         url: "../panel/debtTransfer?platform=JJT",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 $("#tr_debt_dq_jjt").val(model.bCount);
                	 $("#tr_debt_zd_jjt").val(model.zCount);
                	 $("#tr_debt_me_jjt").val(model.number);
					}else{
						$("#tr_debt_dq_jjt").val("");
	                	$("#tr_debt_zd_jjt").val("");
	                	$("#tr_debt_me_jjt").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     
     $.ajax({
         type: "GET",
         url: "../panel/borrow?platform=FXD",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 $("#wt_cg_nu_fxd").val(model.count);
                	 $("#wt_cg_my_fxd").val(model.number);
					}else{
						$("#wt_cg_nu_fxd").val("");
	                	 $("#wt_cg_my_fxd").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     $.ajax({
         type: "GET",
         url: "../panel/borrow?platform=JJT",
         data: null,
         success: function (r) {
             if (r.code == 0) {
                 var model = r.data;
                 if (model != null) {
                	 $("#wt_cg_nu_jjt").val(model.count);
                	 $("#wt_cg_my_jjt").val(model.number);
					}else{
						$("#wt_cg_nu_jjt").val("");
	                	 $("#wt_cg_my_jjt").val("");
					}
             } else {
                 alert("系统异常");
             }
         }
     });
     
     
     
});