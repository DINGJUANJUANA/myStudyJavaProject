var vm;
var platfroms;
var plt;

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

function nowUseConvert(nowUse) {
    if("当前使用版本号"==nowUse){
        return 1;
    }else if("非当前使用版本"==nowUse){
        return 2;
    }
}

function forcedUpdateConVert(forcedUpdate) {

    if("强制"==forcedUpdate){
        return 1;
    }else if("不强制"==forcedUpdate){
        return 2;
    }
}
function setDescriptionFlagConvert(flag) {
    if("是"==flag){
        return 1;
    }else if("否"==flag){
        return 2;
    }
}

function clientConvert(client) {
    if("iOS"==client){
        return 3;
    }
    if("Android"==client){
        return 4;
    }

}

$(function () {

    $.ajax({
        type: "GET",
        url: "../coupon/platform",
        data: null,
        async: false,
        success: function (r) {
            if (r.code == 0) {
                var model = r.data;
                if(model != null && model.platform != null){
                    var htmlStr = "<option value='" + model.platform + "'>" + model.name + "</option>";
                    plt = model.platform;
                    $("#platform").append(htmlStr);
                }
            } else {
                alert("系统异常");
            }
        }
    });

    vm = new Vue({
        el: '#rrapp',
        data: {
            root:true,
            add:false,
            updateHtml:false,
            app:{
                appVersion:"",
                nowUse:"",
                forcedUpdate:"",
                description:"",
                setDescriptionFlag:"",
                client:"",
                downLoadUrl:"",
                createUser:"",
                updateUser:"",
                createTime:"",
                updateTime:""
            },
            update:{
                id:"",
                appVersion:"",
                nowUse:"",
                forcedUpdate:"",
                description:"",
                setDescriptionFlag:"",
                client:"",
                downLoadUrl:"",
                createUser:"",
                updateUser:"",
                createTime:"",
                updateTime:""
            }

        },
        methods: {
            query: function () {
                vm.reload();
            },
            reset: function() {
                vm.platform = "";
                vm.type  = "";
                vm.name = "";
                vm.status  = "";
            },
            reload: function (event) {
                vm.root = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").setGridParam({
                    postData: {

                    },
                    page:1
                }).trigger("reloadGrid");
            },
            addVersion:function () {
                vm.root = false;
                vm.add= true;

            },
            updateVersion:function () {

                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一条数据");
                    return;
                }
                var rowId=$("#jqGrid").jqGrid("getGridParam","selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData",rowId);

                vm.update.id = rowData.id;
                vm.update.appVersion = rowData.appVersion;
                vm.update.nowUse = nowUseConvert(rowData.nowUse);
                vm.update.forcedUpdate = forcedUpdateConVert(rowData.forcedUpdate);
                vm.update.description = rowData.description;
                vm.update.setDescriptionFlag = setDescriptionFlagConvert(rowData.setDescriptionFlag);
                vm.update.client = clientConvert(rowData.client);
                vm.update.downLoadUrl = rowData.downLoadUrl;
                vm.update.createUser = rowData.createUser;
                vm.update.updateUser = rowData.updateUser;
                vm.update.createTime = rowData.CreateTime
                vm.update.updateTime = rowData.updateTime;

                document.getElementById("appVersionUpdate").disabled=true;

                vm.root = false;
                vm.add= false;
                vm.updateHtml=true;

            },
            UpdateSubmit:function () {


                document.getElementById("UpdateBtn").disabled=true;

                if(vm.update.appVersion==""||vm.update.appVersion==null){
                    document.getElementById("UpdateBtn").disabled=false;
                    alert("版本号 不可为空")
                    return;
                }

                if(vm.update.nowUse==""||vm.update.nowUse==null){
                    document.getElementById("UpdateBtn").disabled=false;
                    alert("是否设为当前使用 不可为空")
                    return;
                }

                if(vm.update.forcedUpdate==""||vm.update.forcedUpdate==null){
                    document.getElementById("UpdateBtn").disabled=false;
                    alert("是否强制更新 不可为空")
                    return;
                }

                if(vm.update.description==""||vm.update.description==null){
                    document.getElementById("UpdateBtn").disabled=false;
                    alert("版本更新描述 不可为空")
                    return;
                }

                if(vm.update.setDescriptionFlag==""||vm.update.setDescriptionFlag==null){
                    document.getElementById("UpdateBtn").disabled=false;
                    alert("版本更新描述是否显示 不可为空")
                    return;
                }

                $.ajax({
                    type: "post",
                    url: "../appVersion/updateVersion",
                    data: JSON.stringify(vm.update),
                    async: false,
                    success: function (r) {
                        if (r.code == 0) {
                            vm.root = true;
                            vm.add= false;
                            vm.updateHtml=false;
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            alert(r.msg);
                        }
                        document.getElementById("UpdateBtn").disabled=false;
                        vm.update.appVersion=null;
                        vm.update.client=null;
                        vm.update.description=null;
                        vm.update.downLoadUrl=null;
                        vm.update.nowUse=null;
                        vm.update.forcedUpdate=null;
                        vm.update.setDescriptionFlag=null;
                    }
                });


            },
            submit:function () {
                document.getElementById("submitBtn").disabled=true;

                if(vm.app.appVersion==""||vm.app.appVersion==null){
                    document.getElementById("submitBtn").disabled=false;
                    alert("版本号 不可为空")
                    return;
                }

                if(vm.app.nowUse==""||vm.app.nowUse==null){
                    document.getElementById("submitBtn").disabled=false;
                    alert("是否设为当前使用 不可为空")
                    return;
                }

                if(vm.app.forcedUpdate==""||vm.app.forcedUpdate==null){
                    document.getElementById("submitBtn").disabled=false;
                    alert("是否强制更新 不可为空")
                    return;
                }

                if(vm.app.description==""||vm.app.description==null){
                    document.getElementById("submitBtn").disabled=false;
                    alert("版本更新描述 不可为空")
                    return;
                }

                if(vm.app.setDescriptionFlag==""||vm.app.setDescriptionFlag==null){
                    document.getElementById("submitBtn").disabled=false;
                    alert("版本更新描述是否显示 不可为空")
                    return;
                }

                vm.app.client=3;
                $.ajax({
                    type: "post",
                    url: "../appVersion/addAppVersion",
                    data: JSON.stringify(vm.app),
                    async: false,
                    success: function (r) {
                        if (r.code == 0) {
                            vm.root = true;
                            vm.add= false;
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            alert(r.msg);
                        }
                        document.getElementById("submitBtn").disabled=false;
                        vm.app.appVersion=null;
                        vm.app.client=null;
                        vm.app.description=null;
                        vm.app.downLoadUrl=null;
                        vm.app.nowUse=null;
                        vm.app.forcedUpdate=null;
                        vm.app.setDescriptionFlag=null;
                    }
                });
            },
            cancelUpdate:function () {
                vm.root = true;
                vm.add= false;
                vm.updateHtml=false;

            },
            cancel:function () {
                vm.root = true;
                vm.add= false;
            },
            updateNowUse:function () {
                var codes = $("#jqGrid").jqGrid("getGridParam", "selarrrow");
                if (!codes || codes.length != 1) {
                    alert("请勾选一条数据");
                    return;
                }
                var rowId=$("#jqGrid").jqGrid("getGridParam","selrow");
                var rowData = $("#jqGrid").jqGrid("getRowData",rowId);
                if(rowData.nowUse=="当前使用版本号"){
                    alert("已是当前使用版本 无需再设置!!!");
                }
                $.ajax({
                    type: "GET",
                    url: "../appVersion/updateNowUse?id="+rowData.id,
                    success: function (r) {
                        if (r.code == 0) {
                            $("#jqGrid").trigger("reloadGrid");
                            alert("修改成功");
                        } else {
                            alert("修改失败");
                        }

                    }
                });

            }

        }
    })
    $("#jqGrid").jqGrid({
        url: '../appVersion/getAppVersionControlListiOS',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', width: 10, key: true,hidden:true},
            {label: '版本号', name: 'appVersion', width: 100},
            {label: '是否当前使用', name: 'nowUse', width: 100,formatter:nowUse},
            {label: '是否强制更新', name: 'forcedUpdate', width: 80,formatter:forcedUpdate},
            {label: '版本更新描述', name: 'description', width: 100},
            {label: '更新描述是否展示', name: 'setDescriptionFlag', width: 50,formatter:setDescriptionFlag},
            {label: '客户端', name: 'client', width: 50,formatter:client},
            {label: 'app下载地址', name: 'downLoadUrl', width: 60},
            {label: '创建人', name: 'createUser', width: 115},
            {label: '修改人', name: 'updateUser', width: 115},
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        multiboxonly:true,
        gridComplete: hideSelectAll,
        beforeSelectRow: beforeSelectRow,
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

    function hideSelectAll() {
        $("#jqGrid").hide();
        return(true);
    }

    function beforeSelectRow() {
        $("#jqGrid").jqGrid('resetSelection');
        return(true);
    }


    /**
     * 全选框设置为不可选
     *
     */
    document.getElementById("cb_jqGrid").disabled=true;
});
