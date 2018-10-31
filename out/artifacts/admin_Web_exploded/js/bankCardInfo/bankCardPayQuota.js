/**
 * Created by zhaojianhua on 2017/10/27
 */
var vm;
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
    $("#jqGrid").jqGrid({
        url: '../bank/queryBankPayQuotaInfo',
        datatype: "json",
        colModel: [
            {label: '银行简称', name: 'bankCode', width: 40},
            {label: '银行全称', name: 'bankName', width: 40},
            {label: '单笔最大额', name: 'SingleTransQuota', width: 40},
            {label: '每天最大额', name: 'CardDailyTransQuota', width: 80}
        ],
        viewrecords: true,
        height: 700,
        rowNum: 30,
        rowList: [30],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: false,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});