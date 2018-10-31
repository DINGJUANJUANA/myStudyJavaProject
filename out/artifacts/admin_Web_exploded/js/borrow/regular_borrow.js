
$(function () {
    var ConstantConfig = {
        //1:未到期 2:部分还款 3：提前结清 4:已结清 5: 已逾期
        Statuses:[{code:"1", name:"未到期"},{code:"2", name:"部分还款"},{code:"3", name:"提前结清"},{code:"4", name:"已结清"},{code:"5", name:"已逾期"}], // 期供状态
    };

    var ConstantMethod = {
        getVal:function(cont, val){
            for (var i=0; i<cont.length; i++){
                if (cont[i].code == val){
                    return cont[i];
                }
            }
            return null;
        }
    };

    var ConstantUtils = {
        getStatuses:function(val){
            return ConstantMethod.getVal(ConstantConfig.Statuses, val);
        }
    };

    var vm = new Vue({
        el:'#rrapp',
        data:{
        },
        created: function(){
        },
        methods: {
            query: function () {
                this.reload();
            },
            reload: function (event) {

                var page = $("#jqGrid").jqGrid('getGridParam','page');
                $("#jqGrid").jqGrid('setGridParam',{
                    page:1
                }).trigger("reloadGrid");
            }
        }
    });

    $("#jqGrid").jqGrid({
        url: '../reserveBorrow/queryReserveBorrowPeriodInfo',
        datatype: "json",
        postData: {"borrowNo":sessionStorage.getItem("borrowNo")},
        colModel: [
            { label: '标的ID', name: 'borrowNo', width: 50, key:true },
            { label: '期数', name: 'curStageNo', width: 50 },
            { label: '应收本金', name: 'receiveCorpus', width: 80 },
            { label: '实收本金', name: 'realCorpus', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '应收利息', name: 'receiveInterest', width: 80 },
            { label: '实收利息', name: 'realInterest', width: 80, formatter: function(cellvalue){
                return null == cellvalue ? "0" : cellvalue;
            }},
            { label: '到期时间', name: 'billDate', width: 80 },
            { label: '回款时间', name: 'realReceiveTime', width: 80 },
            { label: '状态', name: 'periodStatus', width: 80, formatter: function(cellvalue, options, rowObjec){
                var m = ConstantUtils.getStatuses(cellvalue);
                return m != null ? m.name : "";
            }}
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: true,
        // rownumWidth: 25,
        autowidth:true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"pageNum",
            rows:"pageSize",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });

    $("#jqGrid").on({
        click:function(){
            var $t = $(this);
            console.log($t.siblings("input").val());
            location.href = "regular_source.html";
        }
    }, ".source-btn");
});