var vm;
$(function () {
	$.ajax({
        type: "GET",
        url: "../coupon/platform",
        data: null,
        success: function (r) {
            if (r.code == 0) {
            	var model = r.data;
            	if(model != null && model.platform != null){
            		var htmlStr = "<option value='" + model.platform + "'>" + model.name + "</option>";
            		$("#platform").append(htmlStr);
            	}
            } else {
                alert("系统异常");
            }
        }
    });
	
	/*var platfroms = getH5Session('platforms');
    $.each(platfroms, function (i, n) {
    	if(n.type != null && n.type ==1){
    		var htmlStr = "<option value='" + n.platform + "'>" + n.name + "</option>";
    		$("#platform").append(htmlStr);
    	}
     })*/

    vm = new Vue({
        el:'#rrapp',
        data:{
            coupon:{ // 新增
                type : null, //卡券类型
                platform : null, //归属业务线
                name : null, //卡券名称
                profit : null, //加息幅度
                rule : null, // 规则
                endDate : null, //截至日期
                effectiveDays : null, //有效天数
                number :null, //最大领取数量
                amount : null,//返现金额
                fee : null, // 减免金额
                symbol : null, //符号
                periodLength : null //投资周期 (天)
            },
            config:{
                types:null, // 卡券类型
                businesses:null, // 归属业务线
            },
            title: "新增"
        },
        methods: {
            commit : function(event){
            	var url = "../coupon/add";
                var selectedPlatforms = [];
            	 $('input[name="checkbox_platform"]:checked').each(function(){    
            		 selectedPlatforms.push($(this).val());    
            	 });  
            	 vm.coupon.clients = selectedPlatforms;
            	 
            	 var selectedProducts = [];
            	 $('input[name="lcp_checkbox_platform"]:checked').each(function(){    
            		 selectedProducts.push($(this).val());    
            	 });  
            	 vm.coupon.products = selectedProducts;
            	 
            	//if (selectedPlatforms.length <= 0) {alert("适用端口不能为空"); return;}
            	//if (!$("#cond_input_1").is(":checked") && !$("#cond_input_2").is(":checked")) {alert("使用条件没有勾选");return;}
            	//if ($("#cond_input_1").is(":checked") && isBlank(vm.coupon.maxAmount)) { alert("单笔投资金额不能为空"); return; }
            	//if ($("#cond_input_2").is(":checked") && isBlank(vm.coupon.periodLength)) { alert("投资周期不能为空"); return; }
            	//if (!$("#coupon_end_time").is(":checked") && !$("#coupon_eff_days").is(":checked")) {alert("卡券有效期没有勾选");return;}
            	/*if ($("#coupon_end_time").is(":checked") && isBlank(vm.coupon.endDate)) {alert("截至时间不能为空");return;}
            	if ($("#coupon_eff_days").is(":checked") && isBlank(vm.coupon.effectiveDays)) {alert("有效天数不能为空");return;}*/
            	if(isBlank(vm.coupon.rule)) {alert("使用规则不能为空");return;}
            	if(isBlank(vm.coupon.name)) {alert("卡券名称不能为空");return;}
            	if(vm.coupon.profit!=null && (parseInt(vm.coupon.profit)>parseInt("20"))){alert("加息幅度不能超过20%");return;}
            	if(vm.coupon.profit!=null && (parseFloat(vm.coupon.profit)<=parseInt("0"))){alert("加息幅度不能为负数");return;}
            	//if (selectedProducts <= 0) {alert("适用理财产品不能为空"); return;}
            	
            	
            	if ($("#coupon_end_time").is(":checked")) {
            		vm.coupon.effectiveDays=null;
				}
            	if ($("#coupon_eff_days").is(":checked")) {
					vm.coupon.endDate=null;
				}
            	
            	if (vm.coupon.type == 3) {
					//vm.coupon.clients = [];
					vm.coupon.products = [];
					vm.coupon.symbol = null;
					vm.coupon.endDate = null;
					vm.coupon.endDate = null;
	                vm.coupon.effectiveDays = null;
	                vm.coupon.periodLength = null;
	                vm.coupon.number = null;
	                vm.coupon.maxAmount = null;
				}
            	
            	$.ajax({
                    type: "POST",
                    url: url,
                    contentType: "application/x-www-form-urlencoded",
                    data: vm.coupon,
                    success: function(r){
                        if(r.code === 0){
                            alert('操作成功', function(index){
                            	window.location.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            	
            },
            backBorrow: function(){
                location.href = "index.html";
            },
        }
    });

    function isBlank(v){
        if (v == null || $.trim(v) == ""){
            return true;
        }
        return false;
    }

    function isNumber(str){
        return !isNaN(str);
    }

    function isInt(str){
        if (str == null || str == "")
            return false;
        var result=str.toString().match(/^(-|\+)?\d+$/);
        if(result==null) return false;
        return true;
    }

    $(".date-comp").on({
        click:function(){
            var $t = $(this);
            WdatePicker({
                dateFmt:'yyyy-MM-dd HH:mm:ss',
                onpicking:function(dp){
                    if ($t.is("[ab-release-date]"))  vm.coupon.publishTime = dp.cal.getNewDateStr();
                }
            });
        }
    });

    
    $("#coupon_type").change(function(){
        var checkvalue = $("#coupon_type").find("option:selected").val();
        if (checkvalue == 1) {
        	$('#coupon_profit').show();
        	$('#coupon_amount').hide();
        	$('#coupon_fee').hide();
        	$('#id_191617').show();
        	$('#id_192013').show();
        	$('#id_192216').show();
        	$('#id_192331').show();
        	$('#id_192433').show();
		}else if(checkvalue == 2){
			$('#coupon_profit').hide();
			$('#coupon_amount').show();
			$('#coupon_fee').hide();
			$('#id_191617').show();
			$('#id_192013').show();
			$('#id_192216').show();
			$('#id_192331').show();
			$('#id_192433').show();
		}else if(checkvalue == 3){
			$('#coupon_profit').hide();
			$('#coupon_amount').hide();
			$('#coupon_fee').show();
			$('#id_191617').hide();
			$('#id_192013').hide();
			$('#id_192216').hide();
			$('#id_192331').show();
			$('#id_192433').hide();
		}
     });
    
	
	$("#coupon_end_time").click(function () {
        if ($(this).is(":checked")) {
        	$("#coupon_eff_days").removeAttr("checked"); 
        	$("#coupon_effective_days").val("");
        } 
    });
	
	$("#coupon_eff_days").click(function () {
        if ($(this).is(":checked")) {
        	$("#coupon_end_time").removeAttr("checked"); 
        	$("#coupon_end_date").val("");
        } 
    });
	
	$("#platform").change(function(){  
		
		$("[name='lcp_label']").remove();
		
		var platform = $("#platform").val();
		$.ajax({
            type: "GET",
            url: "../coupon/lcproduct?platform="+platform,
            data: null,
            success: function (r) {
                if (r.code == 0) {
                    var data = r.data;
                    for(item in data){
                    	var lcp = data[item];
                        var s = "<label name='lcp_label'><input type='checkbox' name='lcp_checkbox_platform' value='"+lcp.id+"'/> "+lcp.productName+"</label>";
                         $("#lcproduct_list").append(s);
                    }
                } else {
                    alert("理财产品加载失败");
                }
            }
        });
		
	});
});
