function dzStatusFormat(cellvalue, options, rowObject){
    var obj={
        1:'对账成功',
        2:'信息不等',
        3:'我方单边',
        4:'第三方单表'
    }
    return obj[cellvalue];
}

function meddleStatusFormat(cellvalue, options, rowObject){
    var obj={
        0:'无需干涉',
        1:'未干涉',
        2:'已干涉'
    }
    return obj[cellvalue];
}

function ourAuthTypeFormat(cellvalue, options, rowObject){
    var obj={
        1:'开户',
        2:'绑卡'
    }
    return obj[cellvalue];
}

function thirdAuthTypeFormat(cellvalue, options, rowObject){
    var obj={
        1:'个人注册',
        2:'存量激活',
        3:'个人绑卡',
        4:'预留手机号',
        5:'快捷充值鉴权',
        6:'批量鉴权',
        7:'委托开户',
        8:'银行卡鉴权'
    }
    return obj[cellvalue];
}

function ourOptStatus(cellvalue, options, rowObject){
    var obj={
        1:'未开户',
        2:'开户成功',
        3:'开户失败',
        4:'开户处理中',
        5:'开户异常'
    }
    return obj[cellvalue];
}

function transTatFormat(cellvalue, options, rowObject){
    var obj={
        '01':'成功',
        '02':'失败'
    }
    return obj[cellvalue];
}

function dzResultFormat(cellvalue, options, rowObject){
    var obj={
        0:'正常',
        1:'异常'
    }
    return obj[cellvalue];
}

function busiTypeFormat(cellvalue, options, rowObject){
   if(cellvalue == null){
       return " ";
   }
    var obj={
        03 :'投标',
        04 :'还款',
        09 :'代偿还款',
        19 :'平台服务费',
        22 :'平台佣金',
    }
    return obj[cellvalue];
}

function companyCertificationFormat(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        0 :'待处理',
        1 :'待确认',
        3 :'已反馈',
        4 :'已认证',
        5 :'未通过',
        6 :'编辑中',
        7 :'存管审核中',
        8 :'存管审核回退'
    }
    return obj[cellvalue];
}
function activityGiftStatus(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        0 :'未发送',
        1 :'发送中',
        2 :'已发送',
        3 :'已作废'
    }
    return obj[cellvalue];
}

function busGiftStatus(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'启用',
        2 :'作废',
    }
    return obj[cellvalue];
}

function busNode(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'注册',
        2 :'开户',
        3 :'首次投资',
        4 :'首次充值',
    }
    return obj[cellvalue];
}

function busClient(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        0 :'全部',
        1 :'PC',
        2 :'APP',
        3 :'微信',

    }
    return obj[cellvalue];
}

function qrcodeGift(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    if(rowObject.active==2){
        return "已作废";
    }
    var obj={
        1 :'未生成',
        2 :'生成中',
        3 :'已生成',
    }
    return obj[cellvalue];
}
function giftStatus(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'启用',
        2 :'作废',
        3 :'删除'
    }
    return obj[cellvalue];
}

function channelStatus(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'PC',
        2 :'微信',
        3 :'iOS',
        4 :'安卓'
    }
    return obj[cellvalue];
}

function nowUse(cellvalue, options, rowObject) {

    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'当前使用版本号',
        2 :'非当前使用版本',
    }
    return obj[cellvalue];
}
function client(cellvalue, options, rowObject) {

    if(cellvalue == null){
        return " ";
    }
    var obj={
        3 :'iOS',
        4 :'Android',
    }
    return obj[cellvalue];
}
function setDescriptionFlag(cellvalue, options, rowObject) {

    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'是',
        2 :'否',
    }
    return obj[cellvalue];
}

function forcedUpdate(cellvalue, options, rowObject) {

    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'强制',
        2 :'不强制',
    }
    return obj[cellvalue];
}

function cmsZd(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'置顶',
        2 :'不置顶',
    }
    return obj[cellvalue];
}

function cmsZt(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        1 :'显示',
        2 :'删除',
    }
    return obj[cellvalue];
}


function userTypeFormat(cellvalue, options, rowObject) {

    if(cellvalue == null){
        return " ";
    }
    var obj={
        2:'投资人',
        3:'借款人',
        4:'超级放款人',
        5:'担保机构',
        6:'合作机构',
        7:'供应商',
        8:'居间人'
    }
    return obj[cellvalue];
}

function amountType(cellvalue, options, rowObject){
    if(cellvalue == null){
        return " ";
    }
    var obj={
        2001:'充值',
        200101:'充值佣金',
        200102:'充值手续费',
        200301:'提现冻结',
        200302:'提现解冻',
        200303:'提现扣除',
        200304:'提现手续费',
        200305:'提现手续费回退',
        9919:'提现回退',
        200306:'提现佣金',
        200307:'待提现金额',
        200308:'待提现手续费金额',
        3013:'资金冻结',
        3014:'资金解冻',
        30031:'投标冻结',
        300600:'投标解冻',
        30032:'还款冻结',
        300601:'还款解冻',
        30033:'债权认购冻结',
        300602:'债权认购解冻',
        30034:'代偿冻结',
        300603:'代偿解冻',
        300604:'借款',
        30060401:'借款冻结',
        30060402:'借款解冻',
        300605:'本金回款',
        300606:'利息回款',
        300607:'罚息退回',
        300608:'还派息款',
        300609:'贷后管理费',
        300610:'罚息',
        300611:'投标扣除',
        300612:'还款扣除',
        300613:'债权认购扣除',
        300614:'代偿扣除',
        300615:'分润',
        300617:'平台服务费',
        300624:'还代偿款',
        300625:'派息',
        300626:'代充值',
        300627:'平台资金划拨',
        30041:'取消投标冻结',
        30042:'取消还款冻结',
        30043:'取消债权认购冻结',
        30044:'取消代偿冻结',
        30101:'授权投标冻结',
        30102:'授权还款冻结',
        30103:'授权债权认购冻结',
        30104:'授权代偿冻结',
        300628:'平台调整',
        300629:'银行调整',
        300630:'履约保证金',
        300631:'风险缓释金',
        300632:'风险计提金',
        300633:'存钱罐收益',
        3006:'活动返现',
        310001:'出借人投资金额扣除',
        310002:'借款人收取放款金额',
        310003:'平台收取服务费',
        310005:'代提现',
        310006:'代提现手续费',
        320003:'承接人承接债权资金冻结',
        320005:'承接人承接债权资金解冻',
        320006:'承接人承接债权资金扣除',
        320008:'债权人主动转让',
        320009:'平台收取服务费',
        320010:'债权人自动转让',
        330003:'平台商户号代充值',
        330005:'借款人还款本金',
        330007:'投资人回款本金',
        350006:'借款人还款利息',
        350007:'投资人回款利息',
        360006:'投资人回款本金',
        360007:'投资人回款利息',
        500101:'预约标回款',
        500102:'收益补差',
        500003:'加息券',
        500005:'返现券',
        500006:'提现券'
    }
    return obj[cellvalue];
}