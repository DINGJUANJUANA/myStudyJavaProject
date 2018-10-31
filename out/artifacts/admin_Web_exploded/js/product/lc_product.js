var item_selected = new Array();//跨页选中变量

function arrContains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

function removeArr(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function resume(productNo,rstatus,platform,productType){
    confirm('禁用/启用这个产品？', function () {
        $.ajax({
            type: "GET",
            url: "../lcproduct/resume/"+productNo+"/"+rstatus+"/"+platform+"/"+productType,
            data: null,
            success: function (r) {
                if (r.code == 0) {
                    alert('操作成功', function (index) {
                        $("#jqGrid").trigger("reloadGrid");
                    });
                } else {

                    alert(r.msg + (r.nos != null ? "--->"+r.nos:""));
                }
            }
        });
    });
}

$(function () {
    $("#jqGrid").jqGrid({
        url: '../lcproduct/list',
        datatype: "json",
        colModel: [
            {label: '产品标识', name: 'productNo', width: 80, key: true},
            {label: '产品名称', name: 'productName', width: 80},
            {label: '基础类型', name: 'productType', width: 80,formatter:function(a,b,c){
                return getConfigValByCode2Key('product_type',a);
            }},
            {label: '归属平台', name: 'platform', width: 80},
            {label: '投资周期', name: 'periodUnit', width: 80,formatter:function(a,b,c){
                return c.periodLength + getConfigValByCode2Key('period_unit',a);
            }},
            /*{label: '投资周期长度', name: 'periodLength', width: 80},*/
            {label: '年化利率', name: 'annualizedRate', width: 80,formatter:function(a,b,c){
                return a + '%';
            }},
            {label: '还款方式', name: 'profitPlan', width: 80,formatter : function(a,b,c){
                return getConfigValByCode2Key('return_type',a);
            }},
            {
                label: '资产配置', name: null, width: 80, formatter: function (a, b, c) {
                var arr = c.jkProNames;
                return arr.join();
            }
            },
            {label: '状态', name: 'status', width: 80,formatter:function(a,b,c){
                return getConfigValByCode2Key('product_status',a);
                //return a;
            }},

            {
                label: '操作', name: null, width: 80, formatter: function (a, b, row) {
                var res, rstatus;

                if (row.status == 0 || row.status == 2) {//显示启用
                    rstatus = 1;
                    res = "<p class='btn btn-success btn-sm' onclick=\"resume('" + row.productNo + "','" + rstatus + "','" +row.platform + "','" +row.productType +"')\"><i class='fa fa-money'></i>&nbsp;启用</p> ";
                    if(row.status == 0){
                        res = "<p class='btn btn-success btn-sm' onclick=\"resume('" + row.productNo + "','" + rstatus + "','" +row.platform + "','" +row.productType +"')\"><i class='fa fa-money'></i>&nbsp;启用</p> "
                            + "<p class=\"btn btn-primary btn-sm\" onclick=\"update('" + row.productNo +"' )\"><i class=\"fa fa-pencil-square-o\"></i>&nbsp;修改</p>"
                    }
                } else if (row.status == 1) {//显示禁用
                    rstatus = 2;
                    res = "<p class='btn btn-danger btn-sm' onclick=\"resume('" + row.productNo + "','" + rstatus + "','" +row.platform + "','" +row.productType +"')\"><i class='fa fa-money'></i>&nbsp;禁用</p> ";
                }
                return res;
            }
            }
        ],
        viewrecords: true,
        height: 385,
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
});

function drawFromTable() {
    $.jgrid.gridUnload("#jqGridFrom");
    $("#jqGridFrom").jqGrid({
        url: '../lcproduct/fromProList',
        datatype: "json",
        colModel: [
            {label: '产品标识', name: 'productNo', width: 80, key: true},
            {label: '产品名称', name: 'productName', width: 80},
            {label: '投资周期', name: 'periodUnit', width: 80, formatter:function(a,b,c){
                return c.periodLength + getConfigValByCode2Key('period_unit',a);
            }},
            {label: '年化利率', name: 'annualizedRate', width: 80,formatter:function(a,b,c){
                return a + '%';
            }},
            {label: '还款方式', name: 'returnType', width: 80,formatter : function(a,b,c){
                return getConfigValByCode2Key('return_type',a);
            }},
            {label: '资产平台', name: 'platform', width: 80},
            {
                label: '已配置平台方', name: null, width: 100, formatter: function (cellvalue, options, rowObjec) {
                var arr = new Array(), rstr, h5platform;
                var list = rowObjec.matchPlatforms;
                if (list.length > 0) {
                    for (rstr in list) {
                        var plist = getH5Session("platforms")
                        for (h5platform in plist) {
                            if (list[rstr] == plist[h5platform].platform) {
                                arr.push(plist[h5platform].name);
                            }
                        }
                    }
                }
                return arr.join();
            }
            }


        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPagerFrom",
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
            $("#jqGridFrom").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
            var _this = this;
            if (item_selected.length > 0) {
                for (var i = 0; i < item_selected.length; i++) {
                    $(_this).jqGrid('setSelection', item_selected[i]);
                }
            }

            // 隐藏多选按钮
            var gridId="jqGridFrom";
            $("#cb_"+gridId).hide();//隐藏全选按钮

        },
        onSelectAll: function (aRowids, status) {
            var _this = this;
            item_selected.clear();
            if (status) {
                item_selected = item_selected.push(aRowids);
            }
        },
        onSelectRow:function(aRowids, status){
            item_selected.length = 0;
            if (status){
                item_selected.push(aRowids);
            }
            console.log(item_selected);
        },
        beforeSelectRow: function (rowid, e) {
            $("#jqGridFrom").jqGrid('resetSelection');
            return (true);
        }
    });

    $("[name=productType]").click(function(){
        var o = $(this);
        var v = o.val();
        if (v == 1){
            $("#profitPlanDiv").hide();
            $("#periodLengthDiv").hide();
            $("#annualizedRateDiv").hide();
        }else{
            $("#profitPlanDiv").show();
            $("#periodLengthDiv").show();
            $("#annualizedRateDiv").show();
        }
    });
}

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        productDto: {},
        q: {}
    },
    created:function(){
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.productDto = {};
            drawFromTable();
            vm.productDto.platform = getH5Session("userInfo").platform;
            vm.productDto.platformCn = getH5Session("userInfo").deptName;
        },
        update: function (id) {
            vm.getInfo(id)
            vm.showList = false;
            vm.title = "修改";
            drawFromTable();
        },
        saveOrUpdate: function (event) {
            if ($("#sub").is(".disabled")) return;
            $("#sub").addClass("disabled");
            vm.productDto.jkProNos = item_selected;
            console.log(vm.productDto.jkProNos);
            var url = vm.productDto.id == null ? "../lcproduct/save" : "../lcproduct/update";
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(vm.productDto),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                    $("#sub").removeClass("disabled");
                }
            });
        },
        del: function (event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: "../lcproduct/delete",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getInfo: function (id) {
            $.ajax({
                async:false,
                url:"../lcproduct/info/" + id,
                success:function (r) {
                    vm.productDto = r.product;

                    vm.productDto.platform = getH5Session("userInfo").platform;
                    vm.productDto.platformCn = getH5Session("userInfo").deptName;

                    item_selected = r.pList;

                    // 散标，则清空数据
                    if (vm.productDto.productType == 1){
                        vm.productDto.profitPlan = null;
                        vm.productDto.periodLength = null;
                        vm.productDto.periodUnit = null;
                        vm.productDto.annualizedRate = null;
                    }
                    $("[name=productType][value="+vm.productDto.productType+"]").click();
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        },
        resetData: function(event){

        }
    }
});
function update(no){
    vm.update(no);
}

