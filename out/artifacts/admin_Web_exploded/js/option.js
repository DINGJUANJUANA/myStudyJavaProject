function bankOption(){
    var arr=[
        {bankName: "中国工商银行", value: "ICBK"},
        {bankName: "中国农业银行", value: "ABOC"},
        {bankName: "中国光大银行", value: "EVER"},
        {bankName: "广发银行", value: "GDBK"},
        {bankName: "华夏银行", value: "HXBK"},
        {bankName: "中国建设银行", value: "PCBC"},
        {bankName: "交通银行", value: "COMM"},
        {bankName: "中国民生银行", value: "MSBC"},
        {bankName: "上海浦东发展银行", value: "SPDB"},
        {bankName: "兴业银行", value: "FJIB"},
        {bankName: "中国邮政储蓄银行", value: "PSBC"},
        {bankName: "招商银行", value: "CMBC"},
        {bankName: "中国银行", value: "BKCH"},
        {bankName: "中信银行", value: "CIBK"},
        {bankName: "北京银行", value: "BJCN"},
        {bankName: "平安银行", value: "SZDB"}
        //{bankName: "厦门银行", value: "CBXM"}
    ];
    return arr;
}


function userRoleOption(){
    var arr=[
        {"value":2,"role":"企业投资人"},
        {"value":3,"role":"企业借款人"},
        {"value":4,"role":"超级放款人"},
        {"value":5,"role":"担保机构"},
        {"value":6,"role":"合作机构"},
        {"value":7,"role":"供应商"},
        {"value":8,"role":"居间人"}

    ];
    return arr;
}