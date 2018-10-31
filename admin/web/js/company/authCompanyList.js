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
            companyName:"",
            requestNo:"",
            serviceName:"",
            keySerial:"",
            sign:"",
            platformNo:"",
            platformUserNo:"",
            showList:true,
            reqData:""
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
                        companyName: encodeURI(vm.companyName)
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            back: function (event) {
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
            uploadFile:function(){
                var fileName=$("#file").val();
                var end=fileName.substring(fileName.lastIndexOf(".")+1,fileName.length)
                if(end!="zip"&&end!="ZIP"){
                    alert("只能上传zip文件");
                    return;
                }
                /*$.ajax({
                    //cache: true,
                    type: "POST",
                    url:"../company/getUploadParams?requestNo="+vm.requestNo+"&platformUserNo="+vm.platformUserNo,
                    //data:{'requestNo':vm.requestNo,'platformUserNo':vm.platformUserNo},
                    //data:{'companyInfo':res,'customType':res.userType,'attachmentStr':'[]'},
                    async: false,
                    dataType: "json",
                    success: function(data) {
                        console.log(data);
                        if(data.code!=0){
                            alert(data.msg);
                        }else{
                            vm.serviceName=data.result.serviceName;
                            vm.keySerial=data.result.keySerial;
                            vm.sign=data.result.sign;
                            vm.platformNo=data.result.platformNo;
                            $("#serviceName").val(data.result.serviceName);
                            $("#keySerial").val(data.result.keySerial);
                            $("#sign").val(data.result.sign);
                            $("#platformNo").val(data.result.platformNo);
                            $("#reqData").val(data.result.reqData);


                            $("#uploadFileForm").attr("action",data.result.url);
                            $("#uploadFileForm").submit();
                        }
                    }
                });*/

                /*$.ajaxFileUpload({
                    fileElementId: "file",    //需要上传的文件域的ID，即<input type="file">的ID。
                    url: $("#uploadFileForm").attr("action"),
                    type: 'post',   //当要提交自定义参数时，这个参数要设置成post
                    data:JSON.stringify($("#uploadFileForm").serialize()),
                    dataType: 'jsonp',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
                    async : false,   //是否是异步
                    success: function(data) {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
                        console.log(data)
                        if(data.code==0){
                            alert("上传成功");
                        }

                    },
                    error: function(data, status, e) {  //提交失败自动执行的处理函数。
                        console.log(e);
                    }
                });*/

                $.ajaxFileUpload({
                    fileElementId: "file",    //需要上传的文件域的ID，即<input type="file">的ID。
                    url: "../company/uploadFileToBank?requestNo="+vm.requestNo+"&platformUserNo="+vm.platformUserNo, //后台方法的路径
                    type: 'post',   //当要提交自定义参数时，这个参数要设置成post
                    //dataType: 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
                    async : false,   //是否是异步
                    success: function(data) {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
                        console.log(data)
                        if(data.result.code==0){
                            alert("上传成功");
                        }else{
                            alert("上传失败");
                        }

                    },
                    error: function(data, status, e) {  //提交失败自动执行的处理函数。
                        console.log(e);
                    }
                });
            }
        }
    })
    $("#jqGrid").jqGrid({
        url: '../company/getAuthCompanyList',
        datatype: "json",
        colModel: [
            {label: '企业存管编码', name: 'accountId', width: 40},
            {label: '企业名称', name: 'companyName', width: 40},
            {label: '统一社会信用代码', name: 'unifiedCode', width: 80},
            {label: '组织机构代码', name: 'organizationCode', width: 80},
            {label: '营业执照', name: 'businessLicenceCode',width: 80},
            {label: '税务登记证', name: 'taxNo', width: 80},
            {label: '操作', name: 'companyId', width: 40, formatter: formatFun}
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
    console.log(rowObjec)
    if(hasPermission('reconciliation:userAccount:detail')) {

        var str='<p class="btn btn-success btn-xs" onclick="zqgx(\'' + rowObjec.orderNo + '\',\''+rowObjec.accountId+'\')"><i class="fa fa-money"></i>&nbsp;上传</p>';
        return str;
    }else {
        return '';
    }

}



function zqgx(orderNo,accountId) {
    //vm.showList = false;
    vm.requestNo=orderNo;
    vm.platformUserNo=accountId;
    var obj={};
    obj.requestNo=orderNo;
    obj.platformUserNo=accountId;
    vm.reqData=JSON.stringify(obj);

    $('#myModal').modal('show');
}







$("#ajaxFrame").load(function(){
    $("#ajaxFrame").attr("src","http://www.baidu.com");
});
