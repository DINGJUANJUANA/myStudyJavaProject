/**
 * Created by zhaojianhua on 2017/10/17.
 */
var vm;

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

(function ($) {
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };
})(jQuery);

$(function () {
    vm = new Vue({
        el: '#rrapp',
        data: {
            queryCreateTime:'',
            queryCompanyName:'',
            newBankCardNo:'',
            newBankCode:'',
            uniqueCode:'',
            userCode:'',
            dzId: "",
            status: "",
            showList: true,
            title: null,
            detail: {},
            userRoleOption:"",
            bankOption:"",
            userCode:"",
            attachArray:[]
        },
        mounted: function(){
            //console.log(bankOption());
            this.bankOption = bankOption();
            this.userRoleOption = userRoleOption();
        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                // 送出後
                vm.submitStartDate  = "";
                vm.submitEndDate  = "";
                vm.status  = "";
            },
            reload: function (event) {
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        queryCreateTime: vm.queryCreateTime,
                        queryCompanyName:encodeURI(vm.queryCompanyName)
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
                /*vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {
                        submitStartDate: vm.submitStartDate,
                        submitEndDate: vm.submitEndDate,
                        status: vm.status
                    },
                    page:page
                }).trigger("reloadGrid");*/
                location.reload();
            },
            downAuthDetail:function (event) {
                console.log(vm)
                window.open('../userAccountOrder/downloadAuthCheckInfo/'+ vm.detail.batchNo+'?'+'dzStaus='+vm.dzStaus);
            },
            downloadAuth:function (event) {
                console.log(vm)
                var url = '../userAccountOrder/downloadAuthCheck?'+$("#auth").serialize();
                window.open(url);
            },
            outDzInfoDown: function (event) {
                var url = '../userAccountOrder/downloadMakeupInfo/' + vm.detail.batchNo+'?type=1';
                window.open(url);
            },
            submit:function(type){
                submit(type);
            },
            addInputFile:function(){
                addInputFile()
            },
            bankChange:function(){
                vm.companyData.bankCode = $("#bankName").find("option:selected").val();
            },
            changeCardModel:function(){
                $('#changeCardModel').modal('show');
            },
            cancelModel:function(){
                $('#changeCardModel').modal('hide');
            },
            submitModel:function(){
                $.ajax({
                    //cache: true,
                    type: "POST",
                    url:"../companyChangeCard/changeCompanyBankCard?userCode="+userCode+"&bankCardNo="+vm.newBankCodeNo+"&bankCode="+vm.new,
                    //data:{'userCode':userCode},
                    async: false,
                    dataType: "json",
                    success: function(data) {
                        console.log(data);

                    }
                });
            },
            cancelModel:function(){
                vm.newBankCardNo="";
                vm.newBankCode="";
                $('#changeCardModel').modal('hide');
            },
            submitModel:function(){
                var newBankCardNo=vm.newBankCardNo;
                var newBankCode=vm.newBankCode;
                if(!newBankCardNo){
                    alert("银行卡号必填!");
                    return;
                }
                if(!newBankCode){
                    alert("所属银行必选");
                    return;
                }

                $.ajax({
                    //cache: true,
                    type: "POST",
                    url:"../companyChangeCard/changeCompanyBankCard?userCode="+vm.userCode+"&bankCardNo="+vm.newBankCardNo+"&bankCode="+vm.newBankCode+"&uniqueCode="+vm.uniqueCode,
                    //data:{'userCode':userCode},
                    async: false,
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        if(data.code==0&&data.result.result==true){
                            window.location.href="../companyChangeCard/companyChangeCardList.html";
                        }else{
                            alert(data.result.msg);
                        }

                    }
                });
            }
        }
    })
    $("#jqGrid").jqGrid({
        url: '../companyChangeCard/getCompanyCardChangeList',
        datatype: "json",
        colModel: [
            {label: '提交时间', name: 'createTime', width: 80},
            {label: '企业名称', name: 'companyName', width: 40},
            {label: '角色', name: 'userType', width: 40,formatter:userTypeFormat},
            {label: '原绑定银行卡', name: 'bankCardChangeBefore', width: 80},
            {label: '原开户行', name: 'bankCodeChangeBefore', width: 80,formatter:bankCodeFormat},
            {label: '新绑定银行卡', name: 'bankCardChangeAfter',width: 80},
            {label: '新开户行', name: 'bankCodeChangeAfter', width: 80,formatter:bankCodeFormat},
            {label: '操作', name: 'userCode', width: 40, formatter: formatFun}
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

function formatFun(cellvalue, options, rowObjec) {
    rowObjec['result']=dzResultFormat(rowObjec['result']);
    setH5Session('auth'+rowObjec.batchNo,rowObjec);

    vm.detail = rowObjec;

    var str='<p class="btn btn-success btn-xs" onclick="zqgx(\'' + cellvalue + '\',\'edit\')"><i class="fa fa-money"></i>&nbsp;编辑</p>';

    return str;

}

function reload1 () {
    $("#jqGridAccountIn").setGridParam({
        postData: {
            dzStaus: $("#selectdzStaus").val()
        },
        page:1
    }).trigger("reloadGrid");
}

function zqgx(userCode,mode) {

    $.ajax({
        //cache: true,
        type: "GET",
        url:"../companyChangeCard/getChangeCardInfo?userCode="+userCode,
        //data:{'userCode':userCode},
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data)
            if(data.code==0){
                vm.newBankCardNo=data.result.bankCardChangeAfter;
                vm.newBankCode=data.result.bankCodeChangeAfter;
                vm.userCode=data.result.userCode;
                vm.uniqueCode=data.result.uniqueCode;
                $('#changeCardModel').modal('show');
            }

        }
    });

}

function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function submitbtn_click(){
    var userInfo = getH5Session('userInfo');
    var data = $("#middle").serializeJson();
    var datas = $.extend({recDetailId:vm.dzId},userInfo,data);
    $.ajax({
        cache: true,
        type: "GET",
        url:"../userAccountOrder/saveAuthMiddle",
        data:datas,
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.code == 0) {
                reload1();
                $('#myModal').modal('hide');
            }else{
                alert("干涉失败");
            }
        }
    });
    return false;
}

function submit(type){


    console.log(vm.companyData.contractName)
    console.log(vm.companyData.mobile)
    var unifiedCode=vm.companyData.unifiedCode;
    var taxNo = vm.companyData.taxNo;
    var businessLicenceCode = vm.companyData.businessLicenceCode;
    console.log(unifiedCode);

    var bankLicense = vm.companyData.bankLicense;
    if(!bankLicense||bankLicense==""){
        alert("银行许可证号必填");
        return;
    }

    var organizationCode=vm.companyData.organizationCode;
    if(!unifiedCode&&(!organizationCode||!taxNo||!businessLicenceCode)){
        alert("三证或统一社会信用代码必填");
        return;
    }

    if(unifiedCode!=""&&unifiedCode!=null){
        if(unifiedCode.length!=18){
            //console.log("统一社会信用代码长度不正确");
            //vm.unifiedCodeErr="统一社会信用代码长度不正确";
            alert("统一社会信用代码长度不正确");
            return;
        }
        organizationCode="";
        taxNo="";
        businessLicenceCode="";

    }


    var userCode=vm.companyData.userCode;
    var companyName = vm.companyData.companyName;
    var registerTime = vm.companyData.registerTime;
    if(registerTime==""||registerTime==null){
        alert("未填写注册时间");
        return;
    }
    var scope = vm.companyData.scope;
    var email = vm.companyData.email;
    var mobile = vm.companyData.mobile;
    var companyAddress = vm.companyData.companyAddress;
    var userType = vm.companyData.userType;
    var contractName = vm.companyData.contractName;
    var legalPerson = vm.companyData.legalPerson;
    var legalPersonIdcard = vm.companyData.legalPersonIdcard;
    var legalPersonPhone = vm.companyData.legalPersonPhone;

    var bankName = $("#bankName").find("option:selected").text().trim();
    var bankBranchName = vm.companyData.bankBranchName;
    var bankCardCode = vm.companyData.bankCardCode;
    var bankCode = $("#bankName").find("option:selected").val();

    var profile = vm.companyData.profile;

    if(!bankCardCode||bankCardCode==""){
        //$scope.bankCardCodeErr="银行卡号位数或格式不正确！";
        alert("银行卡号必填！");
        return false;
    }
    var res = {
        doType: type,
        userId: vm.companyData.userCode,
        companyName: encodeURI(encodeURI(companyName)),
        //registerTime: new Date(registerTime).getTime(),
        registerTime: registerTime,
        scope: encodeURI(encodeURI(scope)),
        email: email,
        mobile: mobile,
        companyAddress: encodeURI(encodeURI(companyAddress)),
        userType: userType,
        contactName: encodeURI(encodeURI(contractName)),
        legalPerson: encodeURI(encodeURI(legalPerson)),
        legalPersonIdcard: legalPersonIdcard,
        legalPersonPhone: legalPersonPhone,
        bankLicense: bankLicense,
        bankName: encodeURI(encodeURI(bankName)),
        bankBranchName: encodeURI(encodeURI(bankBranchName)),
        bankCardCode: bankCardCode,
        bankCode: bankCode,
        unifiedCode: unifiedCode,
        businessLicenceCode: businessLicenceCode,
        organizationCode: organizationCode,
        taxNo: taxNo,
        profile: encodeURI(encodeURI(profile)),
        attachJson: encodeURIComponent(JSON.stringify(vm.attachArray)),
        userCode:userCode
    };

    $.ajax({
        //cache: true,
        type: "POST",
        url:"../company/addCompanyCertification"+paramConvert(res),
        //data:{'companyInfo':res,'customType':res.userType,'attachmentStr':'[]'},
        async: false,
        dataType: "json",
        success: function(data) {
            console.log(data);
            if(data.code!=0){
                alert(data.msg);
            }else{
                //reload();
                location.reload();
            }
            /*if(data.code == 0) {
                reload1();
                $('#myModal').modal('hide');
            }else{
                alert("干涉失败");
            }*/
        }
    });
   /* console.log("../company/addCompanyCertification"+paramConvert(res))
    $.get("../company/addCompanyCertification"+paramConvert(res),function(r){
        console.log(r.code);
    });*/
}
var z = 3;
function addInputFile(){
    z++;
    var obj = '<div class="col-lg-3 col-md-3">' +
        '<img id="ImgPr' + z + '">' +
        '<input id="file' + z + '" type="file" name="file" accept="image/jpeg,image/jpg,image/png" required>' +
        '<button class="btn btn-primary btn-lg">选择图片</button>' +
        '<a class="remove"><img src="../statics/img/fail.png"></a>' +
        '</div>';
    $(".file-sec").append(obj);

    $(".remove").click(function(){
        $(this).parent('div').remove();
    });

    $("input[type=file]").change(function(){
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $(this).prev().attr("src", objUrl);
        }
        var file = $(this).val();
        var fileName = file.substring(file.lastIndexOf('\\')+1,file.lastIndexOf('.'));
        $(this).next().text(fileName);
    });
}

function getObjectURL(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

function  paramConvert(obj){
    var tmp="?";
    for(attribute in obj){
        tmp+=attribute+"="+obj[attribute]+"&"
    }
    return tmp.substring(0,tmp.length-1);
}

function dzId(id) {
    vm.dzId = id;
}

function saveReport() {
    var arr=[];
    $(".companyAttachment").each(function(){
        var url=$(this).attr("src");
        arr.push(url);
    });

    $("#showDataForm").ajaxSubmit(function(data) {
        console.log('files===='+data.files);


        //return;
        if(data.files==''&&arr.length==0){
            alert("请选择需要上传的文件");
            return;
        }
        $.ajax({
            //cache: true,
            type: "POST",
            contentType: "application/json",
            data:JSON.stringify({'userCode':vm.companyData.userCode,'attachmentJson':data.files,'files':arr.join(",")}),
            //url:"../company/saveCompanyFiles?attachmentJson="+JSON.stringify(data.files)+"&userCode="+vm.userCode,
            url:"../company/saveCompanyFiles",
            //data:{'companyInfo':res,'customType':res.userType,'attachmentStr':'[]'},
            dataType: "json",
            success: function(data) {
                console.log(data);
                if(data.code==0){
                    alert("上传成功");
                }else{
                    alert("上传失败");
                }
            }
        });
    });
    return false;
}


function bankCodeFormat(cellvalue, options, rowObject){
    var option=bankOption();
    if(cellvalue == null){
        return " ";
    }
    var obj={};
    for(var i=0;i<option.length;i++){
        obj[option[i].value]=option[i].bankName;
    }

    return obj[cellvalue];

}