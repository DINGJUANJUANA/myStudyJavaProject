/**
 *序列化form表单
 *@param  要序列化的表单的名称
 *@return 返回对象
 ***/
function serializeObject(form){
    var o = {};
    $.each(form.serializeArray(),function(index){
        if(o[this['name']]){
            o[this['name']] = o[this['name']] + ","+this['value'];
        }else{
            o[this['name']] =  this['value'];
        }
    });
    return o;
}

function hasPermission(permission) {
    var ispermission ='';
    $.ajaxSettings.async = false;
    $.get("../sys/role/hasPermission",{permission:permission}, function (r) {
        ispermission = r;
    });
    return ispermission;
}

/**
 * 表单重载
 */
function borrowReload() {
    // var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam',{
        page : 1,
        postData : serializeObject($("#borrowOnSaleForm"))
    }).trigger("reloadGrid");
}

/**
 * 初始化
 */
$(function(){

    $("#borrowList").collapse('show');
    $("#borrowInfo").collapse('hide');
    $("#borrowInfoHKD").collapse('hide');

    var user = getH5Session('userInfo');

    $("#jqGrid").jqGrid({
        url : '../borrowOnSale/findBidList',
        datatype : "json",
        colModel : [
            {label: '标的ID', name: 'id',align:"center", width: 50, key: true},
            {label: '借款项目编号', name: 'borrowNo',align:"center", width: 110},

          /*  {label: 'productNo', name: 'productNo',align:"center", width: 110},*/

            {label: '借款项目名称', name: 'borrowName',align:"center", width: 100},
            {label: '年化利率', name: 'annualizedRate', align:"center", width: 50,formatter:function (value, options, row){
                return value+'%';
                }},
            {label: '借款项目合同编号', name: 'contractNo',align:"center", width: 180},
            {label: '创建时间', name: 'createTime',align:"center", width: 110},
            {label: '合同金额', name: 'contractAmount',align:"center", width: 110},
            {label: '还款方式', name: 'returnType', width: 110,align:"center",formatter:function (value, options, row) {
                    var str = 'error';
                    switch (value) {
                        case 1:
                            str = '等额本息';
                            break;
                        case 2:
                            str = '等额本金';
                            break;
                        case 3:
                            str = '按期付息，到期还本';
                            break;
                        case 4:
                            str = '一次性还款';
                            break;
                    }
                    return str;
                }},
            {label: '操作', width: 110,align:"center",formatter:function (value, options, row){
                    setH5Session('borrow'+row.id,row);
                    var returnStr = '';
                    if(hasPermission('balance:borrowOnSale:detail')){
                        returnStr ='<button class="btn btn-xs btn-primary" style="margin-left: 10px" onclick="showInfoSCD(\'' + row.id + '\',\''+row.productNo+'\')">查看详情</button>';
                    }
                    return returnStr;
                }}
        ],
        viewrecords: true,
        width: 1200,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth: true,
        //multiselect: true,
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

$("#choose").click(function () {
    borrowReload();
});

function back() {
    //查询列表
    $("#borrowList").collapse('show');
    //SCD详情
    $("#borrowInfo").collapse('hide');
    $("#changeInfo").collapse('hide');
    $("#submitInfo").collapse('hide');
    //HKD详情-企业标
    $("#borrowInfoHKD").collapse('hide');
    $("#changeInfoHKD").collapse('hide');
    $("#submitInfoHKD").collapse('hide');

}

function setBorrowNo(borrowNo) {
    localStorage.setItem("borrowNo",borrowNo);
}
function getBorrowNo() {
    return localStorage.getItem("borrowNo");
}

function setBorrowOnSale(id,productNo) {
    localStorage.setItem("borrowOnSale_id",id);
    localStorage.setItem("borrowOnSale_productNo",productNo);
}
function getBorrowOnSale() {
    return {
        "id":localStorage.getItem("borrowOnSale_id"),
        "productNo":localStorage.getItem("borrowOnSale_productNo")
    };
}


function showInfoSCD(id,productNo){
    var borrowOnSale = getH5Session('borrow'+id);
    setBorrowOnSale(id,productNo);
    //获取标的详情信息
    $.get("../borrowOnSale/getBidInfo?timestamp="+new Date(),{borrow:borrowOnSale.borrowNo},function (data) {
        if (!data.code==0){
            alert("标的详情信息查询异常,请联系管理员!");
            return;
        }
        var borrowNo=borrowOnSale.borrowNo;
        setBorrowNo(borrowNo);
        if(productNo == '闪车贷'){
            //标的信息概览
            $("#borrowNo1").val(borrowOnSale.borrowNo);
            var periodUnit='error';
            switch (data.bidInfo.borrowDetail.periodUnit){
                case '1':
                    periodUnit = '天';
                    break;
                case '2':
                    periodUnit = '周';
                    break;
                case '3':
                    periodUnit = '月';
                    break;
                case '4':
                    periodUnit = '年';
                    break;
            };
            $("#borrowName1").text(data.bidInfo.borrowDetail.borrowName+data.bidInfo.borrowDetail.borrowNo);
            $("#borrowTime1").text(data.bidInfo.borrowDetail.periodLength+periodUnit);
            $("#borrowRate1").text(data.bidInfo.borrowDetail.annualizedRate+"%");
            var returnType = 'error';
            switch (data.bidInfo.borrowDetail.profitPlan) {
                case 1:
                    returnType = '等额本息';
                    break;
                case 2:
                    returnType = '等额本金';
                    break;
                case 3:
                    returnType = '按期付息，到期还本';
                    break;
                case 4:
                    returnType = '一次性还款';
                    break;
            }
            $("#returnType1").text(returnType);
            $("#amount1").text(data.bidInfo.borrowDetail.contractAmount+'元');
            $("#beginAmount1").text(data.bidInfo.borrowDetail.investMinAmount+'元');
            $("#endTime1").text(data.bidInfo.borrowDetail.endDate);
            //借款人信息
            $("#username1").val(data.bidInfo.borrowerInfo.username);
            var sex='error';
            switch (data.bidInfo.borrowerInfo.sex){
                case 1:
                    sex = '男';
                    break;
                case 2:
                    sex = '女';
                    break;
            };
            $("#sex1").val(sex);
            $("#education1").val(data.bidInfo.borrowerInfo.education);
            $("#maritalStatus1").val(data.bidInfo.borrowerInfo.maritalStatus);
            $("#area1").val(data.bidInfo.borrowerInfo.area);
            $("#idCard1").val(data.bidInfo.borrowerInfo.idcard);
            $("#mobile1").val(data.bidInfo.borrowerInfo.phone);
            $("#payment1").val(data.bidInfo.borrowerInfo.payment);
            $("#monthlyIncome1").val(data.bidInfo.borrowerInfo.monthlyIncome);
            $("#annualEarnings1").val(data.bidInfo.borrowerInfo.annualEarnings);
            //借款车辆信息
            $("#brand1").val(data.bidInfo.borrowCar.brand);
            $("#model1").val(data.bidInfo.borrowCar.model);
            $("#productionDate1").val(data.bidInfo.borrowCar.productionDate);
            $("#milege1").val(data.bidInfo.borrowCar.milege);
            $("#years1").val(data.bidInfo.borrowCar.years);
            $("#compulsoryInsuranceDate1").val(data.bidInfo.borrowCar.compulsoryInsuranceDate);
            $("#motTestDate1").val(data.bidInfo.borrowCar.motTestDate);
            $("#accident1").val(data.bidInfo.borrowCar.accident);
            $("#assessPrice1").val(data.bidInfo.borrowCar.assessPrice);
            $("#newCarPrice1").val(data.bidInfo.borrowCar.newCarPrice);
            $("#transferNum1").val(data.bidInfo.borrowCar.transferNum);
            $("#maintenance1").val(data.bidInfo.borrowCar.maintenance);
            //公示材料
            $("#imgBox").empty();
            $(JSON.parse(data.bidInfo.borrowCar.showImgUrl).showImgUrlList).each(function (index,element) {
                //var html = '<div class="pull-left" style="text-align:center"><a href=\''+this+'\' class="example-image-link" style="margin-top: 10px;margin-right: 15px" data-lightbox="example-1" ><img src=\''+this+'\' style="height: 150px;width: 150px;border: solid 1px" class="example-image" ></a><div><button type="button" style="margin-top: 5px;margin-bottom: 6px" class="btn btn-primary">删除图片</button></div></div></div>';
                //$("#imgBox").append(html);
                var html = '<div class="pull-left" style="text-align:center"><a href="imgsrc" class="example-image-link" style="margin-top: 10px;margin-right: 15px" data-lightbox="example-1" ><img src="imgsrc" style="height: 150px;width: 150px;border: solid 1px" class="example-image" ></a><div><button type="button" style="margin-top: 5px;margin-bottom: 6px" class="btn btn-primary" id="delImg">删除图片</button></div></div></div>';
                html=html.replace(/imgsrc/g,this)
                         .replace(/delImg/g,"delImgSCD"+index)
                         ;
                $("#imgBox").append(html);
            });
            $("#borrowList").collapse('hide');
            $("#borrowInfo").collapse('show');
        }

        if(productNo == '豪康贷'){
                var hkd  = data.bidInfo.borrowHkd;
                var user  = data.bidInfo.userAccount;
                //标的信息概览
                $("#borrowNo1").val(borrowOnSale.borrowNo);
                var periodUnit='error';
                switch (data.bidInfo.borrowDetail.periodUnit){
                    case '1':
                        periodUnit = '天';
                        break;
                    case '2':
                        periodUnit = '周';
                        break;
                    case '3':
                        periodUnit = '月';
                        break;
                    case '4':
                        periodUnit = '年';
                        break;
                };
                $("#borrowName2").text(data.bidInfo.borrowDetail.borrowName+data.bidInfo.borrowDetail.borrowNo);
                $("#borrowTime2").text(data.bidInfo.borrowDetail.periodLength+periodUnit);
                $("#borrowRate2").text(data.bidInfo.borrowDetail.annualizedRate+"%");
                var returnType = 'error';
                switch (data.bidInfo.borrowDetail.profitPlan) {
                    case 1:
                        returnType = '等额本息';
                        break;
                    case 2:
                        returnType = '等额本金';
                        break;
                    case 3:
                        returnType = '按期付息，到期还本';
                        break;
                    case 4:
                        returnType = '一次性还款';
                        break;
                }
                $("#returnType2").text(returnType);
                $("#amount2").text(data.bidInfo.borrowDetail.contractAmount+'元');
                $("#beginAmount2").text(data.bidInfo.borrowDetail.investMinAmount+'元');
                $("#endTime2").text(data.bidInfo.borrowDetail.endDate);
                //借款人信息
                $("#username2").val(user.realName);
                var sex='error';
                switch (data.bidInfo.borrowerInfo.sex){
                    case 1:
                        sex = '男';
                        break;
                    case 2:
                        sex = '女';
                        break;
                };

                $("#borrowNo1HKD").val(hkd.borrowNo);
                $("#registeredCapital2").val(hkd.registeredCapital);
                $("#businessIncom2").val(hkd.businessIncom);
                $("#periodLength2").val(data.bidInfo.borrowDetail.periodLength+periodUnit);
                $("#loanPurpose2").val(hkd.loanPurpose);
                $("#assetStatu2").val(hkd.assetStatus);
                $("#creditStatus2").val(hkd.creditStatus);
                $("#idCard2").val(data.bidInfo.borrowerInfo.idcard);
                $("#mobile2").val(data.bidInfo.borrowerInfo.phone);
                $("#payment2").val(data.bidInfo.borrowerInfo.payment);
                $("#monthlyIncome2").val(data.bidInfo.borrowerInfo.monthlyIncome);
                $("#annualEarnings2").val(data.bidInfo.borrowerInfo.annualEarnings);
                $("#borrowList").collapse('hide');
                $("#borrowInfoHKD").collapse('show');
                //公式资料
                $("#imgBoxHKD").empty();
                $(JSON.parse(hkd.showImgUrl)).each(function (index,element) {
                    // var html = '<div class="pull-left" style="text-align:center"><a href=\''+this+'\' class="example-image-link" style="margin-top: 10px;margin-right: 15px" data-lightbox="example-1" ><img src=\''+this+'\' style="height: 150px;width: 150px;border: solid 1px" class="example-image" ></a><div><button type="button" style="margin-top: 5px;margin-bottom: 6px" class="btn btn-primary">删除图片</button></div></div></div>';
                    // $("#imgBoxHKD").append(html);
                    var html = '<div class="pull-left" style="text-align:center"><a href="imgsrc" class="example-image-link" style="margin-top: 10px;margin-right: 15px" data-lightbox="example-1" ><img src="imgsrc" style="height: 150px;width: 150px;border: solid 1px" class="example-image" ></a><div><button type="button" style="margin-top: 5px;margin-bottom: 6px" class="btn btn-primary" id="delImg">删除图片</button></div></div></div>';
                    html=html.replace(/imgsrc/g,this)
                             .replace(/delImg/g,"delImgHKD"+index)
                             ;
                    $("#imgBoxHKD").append(html);
                });
                $("#borrowList").collapse('hide');
                $("#borrowInfoHKD").collapse('show');
            }

        //图片删除功能
        $("button[id^='delImg']").bind("click",function () {
            $this=$(this);
            var borrowNo=borrowOnSale.borrowNo;
            //当前选中的图片url
            var thisImgsrc=null;
            $this.parent().parent().find("img").each(function () {
                thisImgsrc=$(this).attr("src");
            });
            $.ajax({
                type: "POST",
                url: "../borrowOnSale/delImg",
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                data: {
                    "borrowNo":borrowNo,
                    "thisImgsrc":thisImgsrc
                },
                success: function(result){
                    console.log(result);
                    if(result.code != '0'){
                        alert("图片删除失败")
                        return;
                    }
                    //移除当前图片整体标签
                    $this.parent().parent().remove();
                }
            });
        });
    });

}

//SCD
$("#changeInfo").click(function () {
    $(".changeInfo").each(function () {
        var id=$(this).attr("id");
        //筛选可编辑详情 - SCD
        if(!filterSCDChangeInfoForMofiy(id)){
            return;
        }
        $(this).removeAttr("readonly");
        $(this).css("border","");
    });
    $(this).toggle();
    $("#submitInfo").toggle();
});

//筛选可编辑详情-SCD
function filterSCDChangeInfoForMofiy(id){
  var flg=true;
    switch (id){
        //姓名
      case "username1":
          flg=false;
          break;
        //手机号
      case "mobile1":
            flg=false;
            break;
        //身份证号
      case "idCard1":
            flg=false;
            break;
  }
  return flg;
}

//提交-SCD
$("#submitInfo").click(function () {
    //提交表单
    $.ajax({
        type: "GET",
        url: "../borrowOnSale/updateBidInfo",
        data: $("#changeForm").serialize(),
        success: function(msg){
            console.log(msg)
        }
    });

    $(".changeInfo").each(function () {
        $(this).attr("readonly","readonly");
        $(this).css("border","none");
    });
    $(this).toggle();
    $("#changeInfo").toggle();
});

//HKD
$("#changeInfoHKD").click(function () {
    $(".changeInfo2").each(function () {
        var id=$(this).attr("id");
        //筛选可编辑详情 - HKD
        if(!filterHKDChangeInfoForMofiy(id)){
            return;
        }
        $(this).removeAttr("readonly");
        $(this).css("border","");
    });
    $(this).toggle();
    $("#submitInfoHKD").toggle();
});

//筛选可编辑详情-HKD
function filterHKDChangeInfoForMofiy(id){
    var flg=true;
    switch (id){
        //企业名称
        case "username2":
            flg=false;
            break;
        //借款期限
        case "periodLength2":
            flg=false;
            break;
    }
    return flg;
}

//提交-HKD
$("#submitInfoHKD").click(function () {
    //提交表单
    $.ajax({
        type: "GET",
        //url: "../borrowOnSale/updateBidInfoHkd?borrowNo="+$("#borrowNo1HKD").val()+"&creditStatus="+$("#creditStatus2").val()+"&assetStatus="+ $("#assetStatus2").val()+"&loanPurpose="+$("#loanPurpose2").val()+"&registeredCapital="+$("#registeredCapital2").val()+"&businessIncom="+$("#businessIncom2").val(),
        url: "../borrowOnSale/updateBidInfoHkd",
        contentType: 'application/x-www-form-urlencoded;charset=utf-8',
        data: $("#changeFormHKD").serialize(),
        success: function(msg){
            console.log(msg)
        }
    });

    $(".changeInfo2").each(function () {
        $(this).attr("readonly","readonly");
        $(this).css("border","none");
    });
    $(this).toggle();
    $("#changeInfoHKD").toggle();
});

//上传公示资料:模态窗体打开
function openUploadImgModel() {
    $("#myModal").modal('show');
}

//上传公示资料:保存图片URL
function saveImgUrl() {
    $("#uploadImgForm").ajaxSubmit(function(data) {
        if(data.files==''&&arr.length==0){
            alert("请选择需要上传的文件");
            return false;
        }
        var thisImgsrc=data.files[0].url;
        $.ajax({
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            data:{
                "borrowNo":getBorrowNo(),
                "imgUrl":thisImgsrc
            },
            url:"../borrowOnSale/saveImgUrl",
            dataType: "json",
            success: function(data) {
                if(data.code != 0){
                    alert("上传失败");
                }
                $("#myModal").modal('hide');
                $("#file").val("");
                //重新加载页面数据
                var obj=getBorrowOnSale()
                showInfoSCD(obj.id,obj.productNo);
            },
            error:function (res) {
                alert("上传失败");
            }
        });
    });
    return false;
}








