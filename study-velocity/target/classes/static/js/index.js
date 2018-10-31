// timeOut: 控制计时
var timeOut;

$(function() {
	// 左侧导航栏鼠标滑过显示二级分类
	$(".slidebar-title").on("mouseenter", function() {
		$(this).find(".slidebar-list").show();
	}).bind("mouseleave", function() {
		$(this).find(".slidebar-list").hide();
	});
	// 左侧导航栏二级分类点击隐藏
	$(".slidebar-list li").on("click", function() {
		$(this).parents(".slidebar-list").hide().parents(".slidebar-title").addClass("active").siblings().removeClass("active");
	});

	// 检验必填项是否为空——表单中
	$(".body-form .form-group.required input, .body-form .form-group.required textarea").blur(function() {
		if ($(this).val() == "") {
			$(this).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-standard">请输入</div>');
		}
		else {
			$(this).parents(".form-group").removeClass("has-warning").find(".alert-standard").remove();
		}
	});
	// 检验必填项是否为空——弹出层中
	$(".popup-fill .form-group.required input, .popup-fill .form-group.required textarea").blur(function() {
		if ($(this).val() == "") {
			$(this).parents(".form-group").addClass("has-warning");
		}
		else {
			$(this).parents(".form-group").removeClass("has-warning");
		}
	});

	// 表格中的全选
	$(".table thead input[type=checkbox]").click(function() {
		// 全选
		if ($(this).is(':checked')) {
			$(".table tbody input[type=checkbox]").prop("checked", true).append('ddd');
		}
		// 全不选
		else {
			$(".table tbody input[type=checkbox]").prop("checked", false);
		}
	});
});

// 提交表单前检验是否有未填必填项
function checkForm() {
	var flag = true;
	$(".body-form .form-group.required input, .body-form .form-group.required textarea").each(function() {
		$(this).parents(".form-group").removeClass("has-warning").find(".alert-standard").remove();
		if ($(this).val() == "") {
			$(this).parents(".form-group").addClass("has-warning").append('<div class="col-sm-2 alert alert-standard">请输入</div>');
			flag = false;
		}
	});
	$(".popup-fill .form-group.required input, .popup-fill .form-group.required textarea").each(function() {
		$(this).parents(".form-group").removeClass("has-warning");
		if ($(this).val() == "") {
			$(this).parents(".form-group").addClass("has-warning");
			flag = false;
		}
	});
	return flag;
}

// 显示弹出层信息
function showPopTips(showObj) {
	$(showObj).show().siblings().hide();
	$(".pop").show();
	timeOut = setTimeout(function() { closePop(); }, 3000);
}

// 关闭弹出层
function closePop() {
	$(".pop").hide();
}

// 关闭弹出层并取消计时
function closeMessage() {
  clearTimeout(timeOut);
  closePop();
}

function imgClick(t) {
	var imgsrc = t.src;
	$(".imgpreview0 img").attr("src", imgsrc);
	$(".imgpreview0").show();
	//点击图片，新打开一个页面显示图片
	$(".imgpreview0 img").attr("onclick", "window.open('"+imgsrc+"');");
	$(".imgshelter").off().on("click",function(){
		$(".imgpreview0").hide();
	})
	/*setTimeout(function () {
	 $(".imgpreview0").hide();
	 }, 2000)*/
}