

$(function () {
    $(".date-comp").on({
        click:function(){
            var $t = $(this);
            WdatePicker({
                dateFmt:'yyyy-MM-dd HH:mm:ss',
                minDate:new Date().toLocaleString(),
                onpicking:function(dp){
                    if ($t.is("[ab-release-date]"))  vm.appointmentBorrow.publishTime = dp.cal.getNewDateStr();
                },
                oncleared:function(dp){
                    if ($t.is("[ab-release-date]"))  vm.appointmentBorrow.publishTime = null;
                }
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "../reserveBorrow/config",
        success: function(r){
            if(r.code === 0){
                var ary = new Array();
                ary.push({code:"", name:"请选择"});
                var first = "";
                for (var i=0; i<r.reserveProducts.length; i++){
                    var rp = r.reserveProducts[i];
                    ary.push({code:rp.productNo, name:rp.productName});
                    if (i == 0) first = rp.productNo;
                }
                vm.config.productNos = ary;
                vm.appointmentBorrow.productNo = first;
            }else{
                alert("获取配置数据失败");
            }
        }
    });
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        appointmentBorrow:{ // 新增
            borrowName: null, // 标的名称
            productNo: null, // 所属产品配置
            investAmount: null, // 募集金额
            appendRate: null, // 平台加息
            raisePeriod: 1, // 募集期
            lockPeriod: 99999, // 锁定期
            publishTime: null, // 发布时间
//            transferRate: null, // 主动转让手续费
//            discountMaxRate: 5, // 转让折让上限
//            discountMinRate: 0.5, // 转让折让下限
            thresholdAmount: 50, // 复投阙值
            investMinAmount: 100, // 起投金额
            investAscendingAmount: null, // 递增金额
            investMaxAmount: null, // 单笔额度上限
            interestDateInt: 0, // 起息时间
            redeemFeeRate: 0, // 赎回手续费率
            remark: null // 备注
        },
        config:{
            productNos:null // 产品类型
        },
        title: "新增"
    },
    methods: {
        backBorrow: function(){
            location.href = "appointment_borrow.html";
        },
        saveOrUpdate: function (event) {
            var url = "../reserveBorrow/addReserveBorrowInfo";

            var param = vm.appointmentBorrow;
            if (isBlank(param.borrowName)) { alert("标的名称不能为空"); return; }
            if (isBlank(param.productNo)) { alert("请选择所属产品配置"); return; }
            if (isBlank(param.investAmount) || !isInt(param.investAmount)) { alert("请填写正确的募集金额"); return; }
            //if (isBlank(param.appendRate) || !isNumber(param.appendRate)) { alert("请填写正确的平台加息"); return; }
            if (isBlank(param.raisePeriod) || !isNumber(param.raisePeriod)) { alert("请填写正确的募集期"); return; }
            if (isBlank(param.lockPeriod) || !isNumber(param.lockPeriod)) { alert("请填写正确的锁定期"); return; }
            if (isBlank(param.publishTime)) { alert("发布时间不能为空"); return; }
//            if (isBlank(param.transferRate) || !isNumber(param.transferRate)) { alert("请填写正确的主动转让手续费"); return; }
//            if (isBlank(param.discountMaxRate) || !isNumber(param.discountMaxRate)) { alert("请填写正确的转让折让上限"); return; }
//            if (isBlank(param.discountMinRate) || !isNumber(param.discountMinRate)) { alert("请填写正确的转让折让下限"); return; }
            if (isBlank(param.thresholdAmount) || !isInt(param.thresholdAmount)) { alert("请填写正确的复投阙值"); return; }
            if (isBlank(param.investMinAmount) || !isInt(param.investMinAmount)) { alert("请填写正确的起投金额"); return; }
            if (isBlank(param.investAscendingAmount) || !isInt(param.investAscendingAmount)) { alert("请填写正确的递增金额"); return; }
            if (isBlank(param.investMaxAmount) || !isInt(param.investMaxAmount)) { alert("请填写正确的单笔额度"); return; }
            // if (isBlank(param.interestDateInt) || !isInt(param.interestDateInt)) { alert("请填写正确的起息时间"); return; }
            if (isBlank(param.redeemFeeRate) || !isNumber(param.redeemFeeRate)) { alert("请填写正确的赎回手续费率"); return; }
            // if (isBlank(param.remark)) { alert("备注不能为空"); return; }

            var rm = parseInt(param.investAmount);
            if (rm < 100 || (rm % 100) != 0) { alert("募集金额应大于等于100并且为100的整数倍"); return; }
            var rp = parseFloat(param.raisePeriod);
            if (rp < 1 || (rp % 1) != 0) { alert("募集期最低为1小时且按1小时递增"); return; }
            var lp = parseInt(param.lockPeriod);
            if (lp < 10) { alert("锁定期应大于等于10"); return; }
//            var tc = parseFloat(param.transferRate);
//            if (tc < 0 || tc > 10) { alert("主动转让手续费应该在0%~10%"); return; }
//            var tul = parseFloat(param.discountMaxRate);
//            if (tul < 0 || tul > 10) { alert("转让折让上限应该在0%~10%"); return; }
//            var tll = parseFloat(param.discountMinRate);
//            if (tll < 0 || tul > 10) { alert("转让折让下限应该在0%~5%"); return; }
            var rl = parseFloat(param.thresholdAmount);
            if (rl < 0 || rl > 1000) { alert("复投阀值应在0到1000元内（含1000不含0）"); return; }
            var mm = parseInt(param.investMinAmount);
            if (mm < 100) { alert("起投金额应大于等于100"); return; }
            var sm = parseInt(param.investAscendingAmount);
            if (sm % 100 != 0) { alert("递增金额应为100的倍数"); return; }
            var maxm = parseInt(param.investMaxAmount);
            if (maxm < 100 || maxm > 10000000) { alert("单笔额度上限应在起投金额到1千万内（含起投金额及1千万）"); return; }

            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/x-www-form-urlencoded",
                data: vm.appointmentBorrow,
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                        	location.href = "borrow/appointment_borrow.html";
                        });
                        $("#formTab")[0].reset();
                        resetText();
                    }else{
                        alert(r.msg);
                    }
                }
            });
        }
    }
});

function isBlank(v){
    if (v == null || $.trim(v) == ""){
        return true;
    }
    return false;
}

function isNumber(str){
    return !isNaN(str);
}

function isInt(str){
    if (str == null || str == "")
        return false;
    var result=str.toString().match(/^(-|\+)?\d+$/);
    if(result==null) return false;
    return true;
}

function resetText() {
    vm.appointmentBorrow.borrowName = null; // 标的名称
    vm.appointmentBorrow.productNo = null; // 所属产品配置
    vm.appointmentBorrow.investAmount = null; // 募集金额
    vm.appointmentBorrow.appendRate = null; // 平台加息
    vm.appointmentBorrow.raisePeriod = 1; // 募集期
    vm.appointmentBorrow.lockPeriod = 99999; // 锁定期
    vm.appointmentBorrow.publishTime = null; // 发布时间
//    vm.appointmentBorrow.transferRate = null; // 主动转让手续费
//    vm.appointmentBorrow.discountMaxRate = 5; // 转让折让上限
//    vm.appointmentBorrow.discountMinRate = 0.5; // 转让折让下限
    vm.appointmentBorrow.thresholdAmount = 50; // 复投阙值
    vm.appointmentBorrow.investMinAmount = 100; // 起投金额
    vm.appointmentBorrow.investAscendingAmount = null; // 递增金额
    vm.appointmentBorrow.investMaxAmount = null; // 单笔额度上限
    vm.appointmentBorrow.interestDateInt = 0; // 起息时间
    vm.appointmentBorrow.redeemFeeRate = 0; // 平台加息
    vm.appointmentBorrow.remark = null; // 备注
}