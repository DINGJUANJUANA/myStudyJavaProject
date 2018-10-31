var ifMobileSuccess = false;
var ifPasswordSuccess = false;

$(function () {

	// 查看是否有路径导航
	if ($(".js-path").html()) {
		var path = $(".js-path").html();
		// 将路径导航添加到页面二级导航栏处
		$(window.parent.document).find(".navbar-menu .wrap").each(function (index, element) {
			if ($(element).css("display") == "block") {
				// 删除可能已经存在的导航
				$(element).find(".path-nav").remove();
				$(element).find(".menu-title").after(path);
			}
		});
	} else {
		// 删除页面二级导航栏处的路径导航
		$(window.parent.document).find(".navbar-menu .wrap").each(function (index, element) {
			$(element).find(".path-nav").remove();
		});
	}

	//初始化获取图片尺寸
	img_info();
});

// 弹出层——操作结果显示方法
function showOperateResult(title, time, content) {
	var addHtml = '';
	addHtml += '<div class="wrap pop-tips" style="display: block">';
	addHtml += '<p class="pop-title">' + title + '</p>';
	addHtml += '<div class="pop-content">';
	if (time == "") {
		addHtml += '<p class="tips">' + content + '</p>';
	} else {
		addHtml += '<p><small>' + time + '</small></p>';
		addHtml += '<p>' + content + '</p>';
	}
	addHtml += '</div>';
	addHtml += '<div class="btn-block">';
	addHtml += '<div class="btn btn-lg btn-default" onclick="closeOperateResult(this)" style="padding-top: 4px">确认</div>';
	addHtml += '</div>';
	addHtml += '</div>';
	// 弹出层后面的不可滚动
	$(".container-padding").css({"overflow-y": "hidden"});
	$(".pop").fadeIn(500).append(addHtml);
}
// 弹出层——操作结果关闭方法
function closeOperateResult(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).parents(".pop").fadeOut(700);
	setTimeout(function () {
		$(closeObj).parents(".pop-tips").remove();
	}, 700);
}

// 弹出层——提示框显示、隐藏
function showPopTips(showObj) {
	// 弹出层后面的不可滚动
	$(".container-padding").css({"overflow-y": "hidden"});
	$(showObj).parents(".pop").fadeIn(500);
	$(showObj).show().siblings().hide();
}
function closePopTips(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).parents(".pop").fadeOut(700);
	$(closeObj).parents(".pop-tips").hide();
}

// 弹出层——侧边栏显示、隐藏
function showPopSlide(showObj) {
    $(".popup").hide();
	$(".container-padding").css({"overflow-y": "hidden"});
	$(showObj).parent().show();
	$(showObj).show().siblings().hide();
	setTimeout(function () {
		$(showObj).addClass("active");
	}, 200);
}
function closePopSlide(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).removeClass("active");
	setTimeout(function () {
		$(closeObj).parent().parent().parent().hide();
	}, 500);
}

function closePopSlideV2(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).removeClass("active");
	setTimeout(function () {
		$(closeObj).parent().hide();
	}, 500);
}


// 弹出层——中间浮层显示、隐藏且居中
function showPopCenter(showObj) {
    $(".popup").hide();
	$(".container-padding").css({"overflow-y": "hidden"});
	$(showObj).parent(".popup").fadeIn(500);
	$(showObj).show().siblings().hide();
	var scrolltop = $(parent.document).scrollTop();//父类滚动条高度
	showObj.css('top',scrolltop+'px');//就是你滚动了多少px你top设定加上去
}
function closePopCenter(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).parents(".popup-center").hide();
	$(".popup").fadeOut(700);
}

function showPopCenterV2(showObj) {
    $(".popup").hide();
	$(".container-padding").css({"overflow-y": "hidden"});
	$(showObj).parent(".popup").fadeIn(500);
	$(showObj).show().siblings().hide();
	$(showObj).css("margin-top","70px");
}
/**
 * Created by 张智
 * Date: 2017/12/15
 * Time: 16:06
 * Description: 关闭弹窗
 */
function closePopCenterV2(closeObj) {
	$(".container-padding").css({"overflow-y": "auto"});
	$(closeObj).hide().parent(".popup").fadeOut(700);
}

// ~~~~~~~~~~  表单验证  ~~~~~~~~~~
// 表单必填项检验
function formCheck() {
	// 必填项输入框、下拉框或者文本框获得焦点时, 清除可能存在的提示信息
	$(".page-content").on("focus", ".required input, .required select, .required textarea", function () {
			$(this).parents(".form-group").removeClass("has-warning").removeClass("has-error").find(".alert").remove();
		})
		// 必填项输入框、下拉框或者文本框失去焦点时, 检查输入是否为空
		.on("blur", ".required input, .required select, .required textarea", function () {
			formCheckNull($(this));
		});
}
// 检验单个必填项是否填写
function formCheckNull(checkObj) {
	// 如果当前输入框为不可修改状态, 退出验证
	if ($(checkObj).prop("disabled")) {
		return true;
	}

	var $formBlock = $(checkObj).parents(".form-group");
	// 如果当前输入框已有其他提示信息, 退出验证
	if ($formBlock.hasClass("has-warning") || $formBlock.hasClass("has-error")) {
		return false;
	}

	// 如果必填项未填写, 显示提示信息
	if (!$(checkObj).val() || $(checkObj).val().trim() == "") {
		formShowTips($(checkObj), "请输入");
		return false;
	}

	// 验证手机号码是否符合规范
	if ($(checkObj).hasClass("mobile")) {
		if (!isMobile($(checkObj).val().trim())) {
			formShowTips($(checkObj), "请输入正确的");
			return false;
		}
		// 连接数据库检验手机号码
		formCheckMobile($(checkObj));
	}

	// 检验密码长度是否在至少6位之间
	if ($(checkObj).hasClass("password")) {
		if (!isPassword($(checkObj).val().trim())) {
			$formBlock.addClass("has-warning").append('<div class="alert alert-warning">请输入至少6位字母、数字、符号</div>');
			return false;
		}
	}

	return true;
}

// 显示表单错误信息
function formShowTips(checkObj, tips) {
	var $formBlock = $(checkObj).parents(".form-group");
	var tipsText = $formBlock.find(".control-label").html();
	$formBlock.addClass("has-warning");
	// 如果有label内容(不管是否隐藏), 就把错误信息显示在后面
	if (tipsText && tipsText.length > 0) {
		tipsText = tipsText.substring(tipsText.lastIndexOf(">") + 1, tipsText.length);
		$formBlock.append('<div class="alert alert-warning">' + tips + tipsText + '</div>');
	}
}

// 连接数据库检验手机号码
function formCheckMobile(checkObj) {
	ifMobileSuccess = false;
	// 正式情况下, 下面那句话应该被注释掉, 这里放着为了前端测试用
	ifMobileSuccess = true;
	var mobile = $(checkObj).val().trim();
	// // !!!!!!!!!!!!!!!!!举例, 需要修改!!!!!!!!!!!!!!!!!
	// // !!!! 这里是以判断唯一性为例子的, 如果接口是判断存在的, 则得出的结论相反 !!!!
	// $.ajax({
	// 	type: "get",
	// 	url: "........................" + phone,
	// 	success: function (data) {
	// 		if (data.ok) {
	// 			// 这里是判断手机号码是否存在的
	// 			if ($(checkObj).hasClass("exist")) {
	// 				ifMobileSuccess = false;
	// 				$(checkObj).parents(".form-group").addClass("has-error").append('<div
	// class="col-sm-3 alert alert-danger">该手机号码未注册</div>'); } // 这里是判断手机号码唯一性的 else if (checkType
	// == "unique") { ifMobileSuccess = true; } }

	// 		else {
	// 			// 这里是判断手机号码是否存在的
	// 			if ($(checkObj).hasClass("exist")) {
	// 				ifMobileSuccess = true;
	// 			}
	// 			// 这里是判断手机号码唯一性的
	// 			else if (checkType == "unique") {
	// 				ifMobileSuccess = false;
	// 				$(checkObj).parents(".form-group").addClass("has-error").append('<div
	// class="col-sm-3 alert alert-danger">该手机号码已被注册</div>'); } }


	// 			ifPhoneSuccess = false;
	// 			$(checkObj).parents(".form-group").addClass("has-error").append('<div
	// class="col-sm-3 alert alert-danger">' + data.resDescription + '</div>'); } } });
}

// 检验密码/确认密码
function formCheckPassword(checkObj) {
	// 清除可能存在的两次输入密码不一致的提示框
	$("#repeatPassword").parents(".form-group").removeClass("has-error").find(".alert-danger").remove();
	ifPasswordSuccess = false;
	// 首先判断是否不为空且符合密码规范
	if (!formCheckNull($(checkObj))) {
		return;
	}

	// 最后检验两次输入的密码是否一致
	if ($("#repeatPassword").val().trim() != "") {
		formCheckPasswordSame();
	}
}

// 检验两次输入的密码是否一致
function formCheckPasswordSame() {
	var newPassword = $("#newPassword").val();
	var repeatPassword = $("#repeatPassword").val();
	if (newPassword == repeatPassword) {
		ifPasswordSuccess = true;
	}
	else {
		ifPasswordSuccess = false;
		$("#repeatPassword").parents(".form-group").addClass("has-error").append('<div class="alert alert-warning">密码和确认密码不一致</div>');
	}
}

// 手机号码验证
function isMobile(mobile) {
	return /^1[3|4|5|7|8]\d{9}$/.test(mobile);
	// return /^1\d{10}$/.test(mobile);
}

// 密码验证
function isPassword(password) {
	if (password.length < 6 || password.length > 20) {
		return false;
	}
	return true;
}
// 类似于Alert的弹框，需要回调传入回调函数名，不需要回调的不需要传
//使用中对应页面不需要增加<div class="popup"></div>
//针对modal窗口之上的dialog提示进行处理
function alertMsg(confirmText, callback) {
	$("popup").hide();
	$('body').append('<div class="popup popup-out-div"></div>');
	var alertPopup = $(".popup-out-div");
	var addHtml = '';
	addHtml += '<div class="popup-confirm">';
	addHtml += '<p class="popup-text">' + confirmText + '</p>';
	addHtml += '<div class="btn-block">';
	addHtml += '<div class="btn btn-lg btn-success js-confirmOperate">确认</div>';
	addHtml += '</div>';
	addHtml += '</div>';
	var modalDialog = $('.modal-dialog');
	if (modalDialog.length != 0) {
		modalDialog.hide();
	}
	alertPopup.append(addHtml).show();
	alertPopup.find(".popup-confirm").siblings().hide();
	var popHeight = $(".popup .popup-confirm").height();
	$(".popup .popup-confirm").css("margin-top", -popHeight);
	alertPopup.on("click", ".js-confirmOperate", function () {
		alertPopup.remove();
        $(".popup").hide();
		if (callback) {
			callback();
		}
		$(".container-padding").css({"overflow-y":"auto"});
		alertPopup.off("click", ".js-confirmOperate");
		if (modalDialog.length != 0) {
			modalDialog.show();
		}
	});
}


function alertMsgV2(confirmText, callback) {
    $(".popup").hide();
	$('body').append('<div class="popup popup-out-div"></div>');
	var alertPopup = $(".popup-out-div");
	var addHtml = '';
	addHtml += '<div class="popup-confirm">';
	addHtml += '<p class="popup-text">' + confirmText + '</p>';
	addHtml += '<div class="btn-block">';
	addHtml += '<div class="btn btn-lg btn-success js-confirmOperate" id="true_button">确认</div>&nbsp;';
	addHtml += '<div class="btn btn-lg btn-default js-no-confirmOperate">取消</div>';
	addHtml += '</div>';
	addHtml += '</div>';
	var modalDialog = $('.modal-dialog');
	if (modalDialog.length != 0) {
		modalDialog.hide();
	}
	alertPopup.append(addHtml).show();
	alertPopup.find(".popup-confirm").siblings().hide();
	var popHeight = $(".popup .popup-confirm").height();
	$(".popup .popup-confirm").css("margin-top", -popHeight);
	alertPopup.on("click", ".js-confirmOperate", function () {
		alertPopup.remove();
        $(".popup").hide();
		if (callback) {
			callback();
		}
		$(".container-padding").css({"overflow-y": "auto"});
		alertPopup.off("click", ".js-confirmOperate");
		if (modalDialog.length != 0) {
			modalDialog.show();
		}
	});

	alertPopup.on("click", ".js-no-confirmOperate", function () {
		alertPopup.remove();
		$(".container-padding").css({"overflow-y": "auto"});
	});
}


function alertMsg3(confirmText,btnText, callback) {
    $(".popup").hide();
    $('body').append('<div class="popup popup-out-div"></div>');
    var alertPopup = $(".popup-out-div");
    var addHtml = '';
    addHtml += '<div class="popup-confirm">';
    addHtml += '<p class="popup-text">' + confirmText + '</p>';
    addHtml += '<div class="btn-block">';
    addHtml += '<div class="btn btn-lg btn-success js-confirmOperate" id="true_button">'+btnText+'</div>&nbsp;';
    addHtml += '<div class="btn btn-lg btn-default js-no-confirmOperate">取消</div>';
    addHtml += '</div>';
    addHtml += '</div>';
    var modalDialog = $('.modal-dialog');
    if (modalDialog.length != 0) {
        modalDialog.hide();
    }
    alertPopup.append(addHtml).show();
    alertPopup.find(".popup-confirm").siblings().hide();
    var popHeight = $(".popup .popup-confirm").height();
    $(".popup .popup-confirm").css("margin-top", -popHeight);
    alertPopup.on("click", ".js-confirmOperate", function () {
        alertPopup.remove();
        $(".popup").hide();
        if (callback) {
            callback();
        }
        $(".container-padding").css({"overflow-y": "auto"});
        alertPopup.off("click", ".js-confirmOperate");
        if (modalDialog.length != 0) {
            modalDialog.show();
        }
    });

    alertPopup.on("click", ".js-no-confirmOperate", function () {
        alertPopup.remove();
        $(".container-padding").css({"overflow-y": "auto"});
    });
}


//获取图片长宽的方法
function img_info() {
	$("img.img_size").each(function () {
		var url = $(this).attr("data-src");
		if (typeof(url) == "undefined" || url == ""){
			return;
		}
		url = url.split('@')[0] + "@info";

		var o = $(this);
		$.ajax({
				   url: url,
				   data: {},
                   method: "get",
				   success: function (data) {
					   try {
						   // console.log("img_info:"+data);
						   o.parent().append("<div class='img_desc'><dl>" + data.width + "*" + data.height + "</dl></div>");
					   } catch (e) {
					   }
				   }
			   })
	});
}

//模拟 alert dialog 提示信息
function alertShow(content) {
	var alertShow = $('.alert_show');
	if (alertShow.length != 0) {
		alertShow.modal('hide');
		alertShow.remove();
	}

	$("body").append('<div class="modal modal-dialog modal-content fade alert_show" role="dialog"  aria-hidden="true"></div>');
	alertShow = $('.alert_show');
	alertShow.append('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">×</button><h4 class="modal-title">提示</h4></div>');
	alertShow.append('<div class="modal-body" style="height: 50%">' + content + '</div>');
	alertShow.append('<div class="modal-footer"><button class="btn btn-lg btn-success alert_show_btn" data-dismiss="modal" aria-hidden="true">确认</button></div>');

	$('.alert_show_btn').click(function () {
		alertShow.modal('hide');
		$('.in').fadeOut(400, function () {
			$('.in').hide();
		});
		alertShow.remove();
	});

	$('.alert_show').modal({
							   keyboard: false,
							   backdrop: 'static',
							   show: true
						   });
}
/*列表中鼠标悬停具体信息事件*/
function onmouth(cellvalue, options, rowObject) {
	/* return "<a href='javascript:void(0)' class='tooltip_js' title="+cellvalue+"  onmouseover='showtitle(&quot;"+cellvalue+"&quot;)'>"+cellvalue.substring(0,3)+"...</a>";*/
	var text = "";
	if (cellvalue != undefined && cellvalue != null && cellvalue.length >= 7) {
		text = cellvalue.substring(0, 7) + "...</a>";
	} else if (null == cellvalue || NaN == cellvalue) {
		text = "...</a>";
	} else {
		text = cellvalue + "</a>";
	}
	return "<a href='javascript:void(0)' class='tooltip_js' title=" + cellvalue + " >" + text

};