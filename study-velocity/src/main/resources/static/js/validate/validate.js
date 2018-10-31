(function ($) {
    var valid_attr = 'valid';//自定义属性值
    $.fn.validate = function (options) {
        var res = true;
        this.find('[' + valid_attr + ']').each(
            function (index) {
                var valid_type = $(this).attr(valid_attr).trim();//标签属性
                if (valid_type != '') {
                    var json_valid_type = validate.getJson(valid_type);
                    //required
                    if (typeof(json_valid_type.required) != 'undefined') {
                        $(this).bind("keyup mouseout change focus", function () {
                            validate.validRequired(this, index, json_valid_type.required, messages.required);
                        });
                        var _res = validate.validRequired(this, index, json_valid_type.required, messages.required);
                        res = res && (_res > 0 ? true : false);
                    }
                    //email
                    if (typeof(json_valid_type.email) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validEmail(this, index, messages.email);
                        });
                        var _res = validate.validEmail(this, index, messages.email);
                        res = res && (_res > 0 ? true : false);
                    }
                    //idCard
                    if (typeof(json_valid_type.idCard) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validIdCard(this, index, messages.idCard);
                        });
                        var _res = validate.validIdCard(this, index, messages.idCard);
                        res = res && (_res > 0 ? true : false);
                    }
                    
                    //url
                    if (typeof(json_valid_type.url) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validUrl(this, index, messages.url);
                        });
                        var _res = validate.validUrl(this, index, messages.url);
                        res = res && (_res > 0 ? true : false);
                    }
                    //number
                    if (typeof(json_valid_type.number) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validNumber(this, index, json_valid_type.number, messages.number);
                        });
                        var _res = validate.validNumber(this, index, json_valid_type.number, messages.number);
                        res = res && (_res > 0 ? true : false);
                    }
                    //minlength
                    if (typeof(json_valid_type.minlength) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validMinlength(this, index, json_valid_type.minlength, validate.formatMsg(messages.minlength, json_valid_type.minlength));
                        });
                        var _res = validate.validMinlength(this, index, json_valid_type.minlength, validate.formatMsg(messages.minlength, json_valid_type.minlength));
                        res = res && (_res > 0 ? true : false);
                    }
                    //maxlength
                    if (typeof(json_valid_type.maxlength) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validMaxlength(this, index, json_valid_type.maxlength, validate.formatMsg(messages.maxlength, json_valid_type.maxlength));
                        });
                        var _res = validate.validMaxlength(this, index, json_valid_type.maxlength, validate.formatMsg(messages.maxlength, json_valid_type.maxlength));
                        res = res && (_res > 0 ? true : false);
                    }
                    //rangelength
                    if (typeof(json_valid_type.rangelength) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validRangelength(this, index, json_valid_type.rangelength, validate.formatMsg(messages.rangelength, json_valid_type.rangelength));
                        });
                        var _res = validate.validRangelength(this, index, json_valid_type.rangelength, validate.formatMsg(messages.rangelength, json_valid_type.rangelength));
                        res = res && (_res > 0 ? true : false);
                    }
                    //min
                    if (typeof(json_valid_type.min) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validMin(this, index, json_valid_type.min, validate.formatMsg(messages.min, json_valid_type.min));
                        });
                        var _res = validate.validMin(this, index, json_valid_type.min, validate.formatMsg(messages.min, json_valid_type.min));
                        res = res && (_res > 0 ? true : false);
                    }
                    //max
                    if (typeof(json_valid_type.max) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validMax(this, index, json_valid_type.max, validate.formatMsg(messages.max, json_valid_type.max));
                        });
                        var _res = validate.validMax(this, index, json_valid_type.max, validate.formatMsg(messages.max, json_valid_type.max));
                        res = res && (_res > 0 ? true : false);
                    }
                    //range
                    if (typeof(json_valid_type.range) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validRange(this, index, json_valid_type.range, validate.formatMsg(messages.range, json_valid_type.range));
                        });
                        var _res = validate.validRange(this, index, json_valid_type.range, validate.formatMsg(messages.range, json_valid_type.range));
                        res = res && (_res > 0 ? true : false);
                    }
                    //phone
                    if (typeof(json_valid_type.phone) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validPhone(this, index, messages.phone);
                        });
                        var _res = validate.validPhone(this, index, messages.phone);
                        res = res && (_res > 0 ? true : false);
                    }
                    //dubbo
                    if (typeof(json_valid_type.dubbo) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validDubbo(this, index, messages.dubbo);
                        });
                        var _res = validate.validDubbo(this, index, messages.dubbo);
                        res = res && (_res > 0 ? true : false);
                    }

                    //number_float_2
                    if (typeof(json_valid_type.number_float_2) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validNumberFloat2(this, index, messages.number_float_2);
                        });
                        var _res = validate.validNumberFloat2(this, index, messages.number_float_2);
                        res = res && (_res > 0 ? true : false);
                    }
                    //nonzero_int
                    if (typeof(json_valid_type.nonzero_int) != 'undefined') {
                        $(this).bind("keyup mouseout change", function () {
                            validate.validNonzeroInt(this, index, messages.nonzero_int);
                        });
                        var _res = validate.validNonzeroInt(this, index, messages.nonzero_int);
                        res = res && (_res > 0 ? true : false);
                    }
                }
            }
        );
        return res;
    }
})(jQuery);

var messages = {
    required: "该项目为必填项.",
    required_num: "至少选择[0]项.",
    idCard:"请填写正确身份证号码",
    email: "请按照正确邮箱格式填写.",
    url: "请输入正确网址.",
    number: "",
    number_int: "请输入正确整数数字.",
    number_float: "输入不正确",
    maxlength: "请输入最长为[0]个字符",
    minlength: "请输入最短[0]个字符",
    rangelength: "请输入字符长度在[0]至[1]长度",
    max: "输入的最大值不得超过[0]",
    min: "输入的最小值不得小于[0]",
    range: "请输入值范围必须为[0]～[1].",
    phone: "请输入正确的电话号码,如02187654321",
    number_float_2: "请输入大于0的数值，精确2位小数",
    nonzero_int: "请输入大于0的整数数字",
    dubbo:"请输入整数或者两位小数"
}

var validate = {
    formatMsg: function (msg, val) {
        var _val = ('' + val).split('_');
        for (var i = 0; i < _val.length; i++) {
            msg = msg.replace("[" + i + "]", _val[i]);
        }
        return msg;
    },
    getJson: function (text) {
        var jsons = "{";
        var val_array = text.split(',');
        for (var i = 0; i < val_array.length; i++) {
            var option = val_array[i].trim();
            if (option != '') {
                var key = option.split(':')[0];
                var val = option.split(':')[1];
                var _key_val = "\"" + key + "\":" + "\"" + val + "\"";
                if (i != 0) {
                    jsons += "," + _key_val;
                }
                else {
                    jsons += _key_val;
                }

            }
        }
        jsons += "}";
        return $.parseJSON(jsons);
    },
    addTips: function (obj, index, msg) {
        $(obj).addClass('valid_error');
        $(obj).after('<div class="valid_tips" id="tips_' + index + '"><div class="valid_tips_arrow"></div><div class="valid_tips_title"><i class="vaild_waring"></i>&nbsp;' + msg + '</div></div>');
        // 必填验证绑定focus事件，因此此处注销，以免trigger('focus')迭代引起死循环
        // $(obj).trigger('focus');
    },
    removeTips: function (obj, index) {
        $('#tips_' + index).remove();
        $(obj).removeClass('valid_error');
    },
//required
    validRequired: function (obj, index, val, msg) {
        var item_name = $(obj).attr('name');
        var  item_type =$(obj).attr('type');
        var valid_val = $(obj).val().trim();
        var items = $('input[name=' + item_name + ']');
        if (item_type=='checkbox'||item_type=='radio') {//多选
            var checked_num = $('input[name=' + item_name + ']:checked').length;
            var _checked_num = 1;
            try {
                _checked_num = parseInt(val);
            } catch (e) {
                _checked_num = 1;
            }
            _checked_num = isNaN(_checked_num) ? 1 : _checked_num;
            if (checked_num < _checked_num) {
                validate.removeTips(obj, item_name);
                validate.addTips(obj, item_name, validate.formatMsg(messages.required_num, _checked_num));
                return -1;
            } else {
                validate.removeTips(obj, item_name);
            }
        } else {//单个
            if (valid_val.length == 0) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
//email
    validEmail: function (obj, index, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var reg = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
            if (!reg.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
 //idCard   
    validIdCard: function (obj, index, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
            var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if (!isIDCard1.test(valid_val)&&!isIDCard2.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    //dubbo
    validDubbo:function (obj,index,msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var isIDCard1=/^\d+(\.\d{1,2})?$/;
            if (!isIDCard1.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    
    
    
//url
    validUrl: function (obj, index, msg) {

        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var reg = /^((https?|ftp|news):\/\/)+(.)+(:d+)?(\/[\w\-./?%&=]*)?$/i;
            if (!reg.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
//number
    validNumber: function (obj, index, val, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            $(obj).val(valid_val.replace(/[^\d.]/g, ""));
            var float_reg = /^[0-9]+\.{0,1}[0-9]*$/;
            //匹配整数
            // var int_reg = /^-?\d+$/;
            //匹配非负正整数
            var int_reg = /^\d+$/;
            //此处不可改为number,不然小数输入不了。
            // if($(obj).attr('type')=='text'){
            //     $(obj).attr('type','number');
            // }
            if (val == 'int') {
                if ((!int_reg.test(valid_val))) {
                    validate.removeTips(obj, index);
                    validate.addTips(obj, index, messages.number_int);
                    return -1;
                } else {
                    validate.removeTips(obj, index);
                }
            } else if (val == 'float') {
                if ((!float_reg.test(valid_val))) {
                    validate.removeTips(obj, index);
                    validate.addTips(obj, index, messages.number_float);
                    return -1;
                } else {
                    validate.removeTips(obj, index);
                }
            }
        }
        return 1;
    },
//minlength
    validMinlength: function (obj, index, length, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            if (valid_val.length < length) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 11;
    },
//maxlength
    validMaxlength: function (obj, index, length, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            if (valid_val.length > length) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    validRangelength: function (obj, index, length, msg) {
        var valid_val = $(obj).val().trim();
        var _length = length.split('_');
        if (valid_val.length != 0) {
            if (valid_val.length < _length[0] || valid_val.length > _length[1]) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
//min
    validMin: function (obj, index, min, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            if (parseFloat(valid_val) < parseFloat(min)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
//max
    validMax: function (obj, index, max, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            if (parseFloat(valid_val) > parseFloat(max)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
//range
    validRange: function (obj, index, range, msg) {
        var valid_val = $(obj).val().trim();
        var _range = range.split('_');
        if (valid_val.length != 0) {
            if (parseFloat(valid_val) < _range[0] || parseFloat(valid_val) > _range[1]) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    //phone
    validPhone: function (obj, index, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var reg = /^1[3|4|5|7|8]\d{9}$/;
            var tel=/^0\d{2,3}[1-9]\d{6,7}$/;
            if (!reg.test(valid_val)&&!tel.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    //number_float_2
    validNumberFloat2: function (obj, index, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var reg = /^\d+(\.\d{2})$/;
            if (!reg.test(valid_val) || valid_val<=0) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    },
    //nonzero_int
    validNonzeroInt: function (obj, index, msg) {
        var valid_val = $(obj).val().trim();
        if (valid_val.length != 0) {
            var reg = /^\+?[1-9][0-9]*$/;
            if (!reg.test(valid_val)) {
                validate.removeTips(obj, index);
                validate.addTips(obj, index, msg);
                return -1;
            } else {
                validate.removeTips(obj, index);
            }
        }
        return 1;
    }
}



