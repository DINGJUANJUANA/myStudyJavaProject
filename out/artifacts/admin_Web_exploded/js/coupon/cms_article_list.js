var editor;

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

$(function () {
    var vm =new Vue({
        el:'#rrapp',
        data:{
            showList:true,
            showDetail:false,
            editShow:false,
            status:'',//是否启用
            title:'',
            clicktag:'0',//防重复提交
            wz:{
                id:'',
                title:'',
                top:'',
                content:'',
                status:'1',
                orderId:'',

            }

        },
        methods:{
            query:function(){
                vm.reload();
            },
            reload:function () {
                $("#jqGrid").setGridParam({
                    postData: {
                        title : vm.title
                    },
                    page:1
                }).trigger("reloadGrid");
            },
            add:function(){
                vm.showList=false;
                vm.showDetail=true;
                // 初始化编辑器
                initEdit();
            },
            edit:function(){
                var ids=$("#jqGrid").jqGrid("getGridParam","selarrrow");
                if(ids.length != 1){
                    alert("请勾选一项礼包模版");
                    return;
                }

                var id=ids[0];
                console.log(id);
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../article/queryForEdit",
                    data:{
                        id:id
                    },
                    dataType: "json",
                    success: function (r) {
                        console.log(r);
                        if(r.code!=0){
                            alert("参数错误");
                            return false;
                        }

                        vm.showList=false;
                        vm.showDetail=true;

                        vm.editShow=true;


                        // vm.wz.content = cmsArticle.content;
                        // 初始化编辑器
                        initEdit();

                        var cmsArticle=r.retMap;
                        vm.wz.id=cmsArticle.id;
                        vm.wz.title=cmsArticle.title;
                        vm.wz.top=cmsArticle.top;
                        editor.txt.html(cmsArticle.content);
                        vm.wz.status=cmsArticle.status;
                        vm.wz.orderId=cmsArticle.order_id;
                        $("#jqGrid").jqGrid('clearGridData');  //清空表格
                        // $("#jqGridGiftRelation").jqGrid('setGridParam',{  // 重新加载数据
                        //     datatype:'local',
                        //     data:vm.giftDetail.giftRelation,
                        //     page:1
                        // }).trigger("reloadGrid");
                    },
                    error:function (err) {
                        console.log(err);
                        alert("操作失败");
                    }
                });

            },
            submit:function () {
                if (vm.clicktag == 0) {
                    vm.clicktag = 1;
                    setTimeout(function () { vm.clicktag = 0 }, 5000);
                }
                else{
                    alert('请勿频繁点击！');
                    return false;
                }
                var title = this.wz.title;
                console.log(title);
                var top = this.wz.top;
                console.log(top);
                var content = editor.txt.html();
                console.log(content);
                if(!title){
                    alert("标题不能为空");
                    return false;
                }
                if(!content){
                    alert("内容不能为空");
                    return false;
                }
                var data= {
                    id:vm.wz.id.toString(),
                    title:vm.wz.title.toString(),
                    top:vm.wz.top.toString(),
                    // content:vm.wz.content.toString(),
                    content:editor.txt.html().toString(),
                    status:this.wz.status.toString(),
                    orderId:this.wz.orderId.toString(),
                };
                console.log(data);
                var method=!vm.editShow?"addCms":"updateCms";
                $.ajax({
                    type: "post",
                    contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                    url: "../article/"+method,
                    data: data,
                    dataType: "json",
                    success: function (r) {
                        vm.showList=true;
                        vm.showDetail=false;
                        vm.editShow=false;
                        console.log(r);
                        if (r.code == 0) {
                            window.location.href = "../article/cmsArtcleList.html";
                            return false;
                        }
                    },
                    error:function (r) {
                        alert("操作失败,请刷新重试");
                        console.log(r)
                    }
                });

            },
            cal:function () {
                vm.wz={
                    title:'',
                    top:'',
                    content:'',
                    status:''
                }
            }
        },

    });


    function initEdit(){
        var E = window.wangEditor;
        editor = new E('#div2') ; // 两个参数也可以传入 elem 对象，class 选择器
        editor.customConfig.zIndex = 100;
        // 自定义字体
        editor.customConfig.fontNames = [
            '宋体',
            '微软雅黑',
            'Arial',
            'Tahoma',
            'Verdana'
        ];
        // 自定义配置颜色（字体颜色、背景色）
        editor.customConfig.colors = [
            '#000000',
            '#eeece0',
            '#1c487f',
            '#4d80bf',
            '#c24f4a',
            '#8baa4a',
            '#7b5ba1',
            '#46acc8',
            '#f9963b',
            '#ffffff'
        ];
        editor.customConfig.lang = {
            '设置标题': 'title',
            '正文': 'p',
            '链接文字': 'link text',
            '链接': 'link',
            '上传图片': '上传图片',
            '上传': '上传',
            '创建': 'init'
            // 还可自定添加更多
        },
        editor.customConfig.uploadImgServer = '/upload';
        editor.create();
        editor.txt.html('<p>请输入</p>');
    }

    $("#jqGrid").jqGrid({
        url: '../article/queryCmsArticles',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'id', width: 20, key: true,hidden:true},
            {label: '公告标题', name: 'title', width: 40 },
            {label: '排序ID', name: 'orderId', width: 20 },
            {label: '是否置顶', name: 'top', width: 20,formatter:cmsZd},
            {label: '状态', name: 'status', width: 20,formatter:cmsZt},
            {label: '操作时间', name: 'upTime', width: 20},
            {label: '操作员', name: 'upUser', width: 20},
        ],
        viewrecords: true,
        height: 500,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
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


})