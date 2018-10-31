$(function () {
    //window.onload = function () {
    //    Loading(true);
    //}

    $(".ui-filter-text").click(function () {
        if ($(this).next('.ui-filter-list').is(":hidden")) {
            $(this).css('border-bottom-color', '#fff');
            $(".ui-filter-list").slideDown(10);
            $(this).addClass("active")
        } else {
            $(this).css('border-bottom-color', '#ccc');
            $(".ui-filter-list").slideUp(10);
            $(this).removeClass("active")
        }
    });
    $(".profile-nav li").click(function () {
        $(".profile-nav li").removeClass("active");
        $(".profile-nav li").removeClass("hover");
        $(this).addClass("active")
    }).hover(function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("hover")
        }
    }, function () {
        $(this).removeClass("hover")
        }) 

})
/*页签操作*/
tablist = {
    newTab: function (item) {
        var dataId = item.id;
        var dataUrl = item.url;
        var menuName = item.title;
        var moduleid = top.$('#admui-siteConTabs').find('li.active > a').attr('module-id'); //当前页面判断是否有权限
        if (item.moduleid != "" && moduleid != null) {
            moduleid = item.moduleid;
        }
        $.site.contentTabs.buildTab({ name: menuName, url: dataUrl, moduleid: moduleid });
    },
    close: function () {
        top.$('.con-tabs').find('li.active i').trigger("click");
    }
}

Loading = function (bool, text) {
    var ajaxbg = top.$("#loading_background,#loading_manage");
    if (bool) {
        ajaxbg.show();
    } else {
        if (top.$("#loading_manage").attr('istableloading') == undefined) {
            ajaxbg.hide();
            top.$(".ajax-loader").remove();
        }
    }
    if (!!text) {
        top.$("#loading_manage").html(text);
    } else {
        top.$("#loading_manage").html("正在加载…");
    }
    top.$("#loading_manage").css("left", (top.$('body').width() - top.$("#loading_manage").width()) / 2 - 54);
    top.$("#loading_manage").css("top", (top.$('body').height() - top.$("#loading_manage").height()) / 2);
}
tabiframeId = function () {
    var iframeId = top.$('#admui-siteConTabs').find('li.active > a').attr('module-id');
    return iframeId;
}

$.fn.ComboBoxMultiple = function (options) {
    //options参数： height,data,valueField,textField
    var $select = $(this);
    if (!$select.attr('id')) {
        return false;
    }
    $select.combobox({
        data: options.data, //后台获取下拉框数据的url   
        panelHeight: options.height,//设置为固定高度，combobox出现竖直滚动条  
        valueField: options.valueField,
        textField: options.textField,
        multiple: true,
        formatter: function (row) { //formatter方法就是实现了在每个下拉选项前面增加checkbox框的方法  
            var opts = $(this).combobox('options');
            return '<input type="checkbox" class="combobox-checkbox">' + row[opts.textField]
        },
        onLoadSuccess: function () {  //下拉框数据加载成功调用  
            var opts = $(this).combobox('options');
            var target = this;
            var values = $(target).combobox('getValues');//获取选中的值的values  
            $.map(values, function (value) {
                var el = opts.finder.getEl(target, value);
                el.find('input.combobox-checkbox')._propAttr('checked', true);
            })
        },
        onSelect: function (row) { //选中一个选项时调用  
            var opts = $(this).combobox('options');
            //获取选中的值的values  
            $select.val($(this).combobox('getValues'));

            //设置选中值所对应的复选框为选中状态  
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', true);
        },
        onUnselect: function (row) {//不选中一个选项时调用  
            var opts = $(this).combobox('options');
            //获取选中的值的values  
            $select.val($(this).combobox('getValues'));
            var el = opts.finder.getEl(this, row[opts.valueField]);
            el.find('input.combobox-checkbox')._propAttr('checked', false);
        }
    });
}

$.fn.ComboBoxList = function (options) {
    var $select = $(this);
    if (!$select.attr('id')) {
        return false;
    }
    var selectid = $select.attr('id');
    $select.bind("keyup", function (e) {
        if (e.which != 13 && e.which != 40 && e.which != 38) {
            DataSource();
        }
    }).focus(function () {
        $(this).select();
        DataSource();
    });
    //上，下键盘回调
    autocompletekeydown(selectid, function (data) {
        $select.attr('data-value', data[options.id]);
        $select.attr('data-text', data[options.text]);
        $select.val(data[options.text]);
        if (options.changedata != undefined) {
            $.each(options.changedata, function (j) {
                var row = options.changedata[j];
                $("#" + row.idfield).val(data[row.valuefield]);

            });
        }

    });
    //获取数据源
    function DataSource() {
        AjaxJson(options.url, { keywords: $select.val() }, function (DataJson) {
            var html = "";
            html += "<thead>";
            $.each(options.tddata, function (j) {
                var row = options.tddata[j];
                html += '<td style="height:22px;" id="' + row.field + '" style="width: ' + row.width + 'px;">' + row.title + '</td>';
            });
            html += "</thead>";
            $.each(DataJson, function (i) {
                html += "<tr>";
                $.each(options.tddata, function (j) {
                    var row = options.tddata[j];
                    html += '<td id="' + row.field + '" style="width: ' + row.width + 'px;">' + DataJson[i][row.field] + '</td>';
                });
                html += "</tr>";

            });
            //点击事件回调
            autocomplete(selectid, $select.width() + 5 + "px", options.height, html, function (data) {
                $select.attr('data-value', data[options.id]);
                $select.attr('data-text', data[options.text]);
                $select.val(data[options.text]);
                if (options.changedata != undefined) {
                    $.each(options.changedata, function (k) {
                        var row = options.changedata[k];
                        $("#" + row.idfield).val(data[row.valuefield]);
                    });
                }
            });
        });
    }

}

$.fn.ComboBox = function (options) {
    //options参数：description,height,width,allowSearch,url,param,data
    var $select = $(this);
    if (!$select.attr('id')) {
        return false;
    }
    if (options) {
        if ($select.find('.ui-select-text').length == 0) {
            var $select_html = "";
            $select_html += "<div class=\"ui-select-text\" style='color:#999;'>" + options.description + "</div>";
            $select_html += "<div class=\"ui-select-option\">";
            $select_html += "<div class=\"ui-select-option-content\" style=\"max-height: " + options.height + "\">" + $select.html() + "</div>";
            if (options.allowSearch) {
                $select_html += "<div class=\"ui-select-option-search\"><input type=\"text\" class=\"form-control\" placeholder=\"搜索关键字\" /><span class=\"input-query\" title=\"Search\"><i class=\"fa fa-search\"></i></span></div>";
            }
            $select_html += "</div>";
            $select.html('');
            $select.append($select_html);
        }
    }
    var $option_html = $($("<p>").append($select.find('.ui-select-option').clone()).html());
    $option_html.attr('id', $select.attr('id') + '-option');
    $select.find('.ui-select-option').remove();
    if ($option_html.length > 0) {
        $('body').find('#' + $select.attr('id') + '-option').remove();
    }
    $('body').prepend($option_html);
    var $option = $("#" + $select.attr('id') + "-option");
    if (options.url != undefined) {
        $option.find('.ui-select-option-content').html('');
        $.ajax({
            url: options.url,
            data: options.param,
            type: "GET",
            dataType: "json",
            async: false,
            success: function (data) {
                options.data = data;
                var json = data;
                loadComboBoxView(json);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                dialogMsg(errorThrown, -1);
            }
        });
    }
    else if (options.data != undefined) {
        var json = options.data;
        loadComboBoxView(json);
    }
    else {
        $option.find('li').css('padding', "0 5px");
        $option.find('li').click(function (e) {
            var data_text = $(this).text();
            var data_value = $(this).attr('data-value');
            $select.attr("data-value", data_value).attr("data-text", data_text);
            $select.find('.ui-select-text').html(data_text).css('color', '#000');
            $option.slideUp(150);
            $select.trigger("change");
            e.stopPropagation();
        }).hover(function (e) {
            if (!$(this).hasClass('liactive')) {
                $(this).toggleClass('on');
            }
            e.stopPropagation();
        });
    }
    function loadComboBoxView(json, searchValue, m) {

        if (json.length > 0) {
            var $_html = $('<ul></ul>');
            if (options.description) {
                $_html.append('<li data-value="">' + options.description + '</li>');
            }
            $.each(json, function (i) {
                var row = json[i];
                var title = row[options.title];
                if (title == undefined) {
                    title = "";
                }
                var id = options.id;
                if (id == undefined) {
                    id = "id";
                }

                var text = options.text;
                if (text == undefined) {
                    text = "text";
                }
                if (searchValue != undefined) {
                    if (row[text].indexOf(searchValue) != -1) {
                        $_html.append('<li data-value="' + row[id] + '" title="' + title + '">' + row[text] + '</li>');
                    }
                }
                else {
                    $_html.append('<li data-value="' + row[id] + '" title="' + title + '">' + row[text] + '</li>');
                }
            });
            $option.find('.ui-select-option-content').html($_html);
            $option.find('li').css('padding', "0 5px");
            $option.find('li').click(function (e) {
                var data_text = $(this).text();
                var data_value = $(this).attr('data-value');
                $select.attr("data-value", data_value).attr("data-text", data_text);
                $select.find('.ui-select-text').html(data_text).css('color', '#000');
                $option.slideUp(150);
                $select.trigger("change");
                e.stopPropagation();
            }).hover(function (e) {
                if (!$(this).hasClass('liactive')) {
                    $(this).toggleClass('on');
                }
                e.stopPropagation();
            });
        }
    }
    //操作搜索事件
    if (options.allowSearch) {
        $option.find('.ui-select-option-search').find('input').bind("keypress", function (e) {
            if (event.keyCode == "13") {
                var value = $(this).val();
                loadComboBoxView($(this)[0].options.data, value, $(this)[0].options);
            }
        }).focus(function () {
            $(this).select();
        })[0]["options"] = options;
    }

    $select.unbind('click');
    $select.bind("click", function (e) {
        if ($select.attr('readonly') == 'readonly' || $select.attr('disabled') == 'disabled') {
            return false;
        }
        $(this).addClass('ui-select-focus');
        if ($option.is(":hidden")) {
            $select.find('.ui-select-option').hide();
            $('.ui-select-option').hide();
            var left = $select.offset().left;
            var top = $select.offset().top + 40;
            var width = $select.width();
            if (options.width) {
                width = options.width;
            }
            if (($option.height() + top) < $(window).height()) {
                $option.slideDown(150).css({ top: top, left: left, width: width });
            } else {
                var _top = (top - $option.height() - 32)
                $option.show().css({ top: _top, left: left, width: width });
                $option.attr('data-show', true);
            }
            $option.css('border-top', '1px solid #ccc');
            $option.find('li').removeClass('liactive');
            $option.find('[data-value=' + $select.attr('data-value') + ']').addClass('liactive');
            $option.find('.ui-select-option-search').find('input').select();
        } else {
            if ($option.attr('data-show')) {
                $option.hide();
            } else {
                $option.slideUp(150);
            }
        }
        e.stopPropagation();
    });
    $(document).click(function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (!$(tar).hasClass('form-control')) {
            if ($option.attr('data-show')) {
                $option.hide();
            } else {
                $option.slideUp(150);
            }
            $select.removeClass('ui-select-focus');
            e.stopPropagation();
        }
    });
    return $select;
}
$.fn.ComboBoxSetValue = function (value) {
    //if ($.isNullOrEmpty(value)) {
    //    return;
    //}
    var $select = $(this);
    var $option = $("#" + $select.attr('id') + "-option");
    $select.attr('data-value', value);
    var data_text = $option.find('ul').find('[data-value=' + value + ']').html();
    if (data_text) {
        $select.attr('data-text', data_text);
        $select.find('.ui-select-text').html(data_text).css('color', '#000');
        $option.find('ul').find('[data-value=' + value + ']').addClass('liactive')
    }
    return $select;
}
$.fn.ComboBoxTree = function (options) {
    //options参数：description,height,allowSearch,appendTo,click,url,param,method,icon
    var $select = $(this);
    if (!$select.attr('id')) {
        return false;
    }
    if ($select.find('.ui-select-text').length == 0) {
        var $select_html = "";
        $select_html += "<div class=\"ui-select-text\"  style='color:#999;'>" + options.description + "</div>";
        $select_html += "<div class=\"ui-select-option\">";
        $select_html += "<div class=\"ui-select-option-content\" style=\"max-height: " + options.height + "\"></div>";
        if (options.allowSearch) {
            $select_html += "<div class=\"ui-select-option-search\"><input type=\"text\" class=\"form-control\" placeholder=\"搜索关键字\" /><span class=\"input-query\" title=\"Search\"><i class=\"fa fa-search\" title=\"按回车查询\"></i></span></div>";
        }
        $select_html += "</div>";
        $select.append($select_html);
    }


    var $option_html = $($("<p>").append($select.find('.ui-select-option').clone()).html());
    $option_html.attr('id', $select.attr('id') + '-option');
    $select.find('.ui-select-option').remove();
    if (options.appendTo) {
        $(options.appendTo).prepend($option_html);
    } else {
        $('body').prepend($option_html);
    }
    var $option = $("#" + $select.attr('id') + "-option");
    var $option_content = $("#" + $select.attr('id') + "-option").find('.ui-select-option-content');
    loadtreeview(options.url);
    function loadtreeview(url) {
        $option_content.treeview({
            onnodeclick: function (item) {
                $select.attr("data-value", item.id).attr("data-text", item.text);
                $select.find('.ui-select-text').html(item.text).css('color', '#000');
                $select.trigger("change");
                if (options.click) {
                    options.click(item);
                }
            },
            height: options.height,
            url: url,
            param: options.param,
            method: options.method,
            description: options.description
        });
    }
    if (options.allowSearch) {
        $option.find('.ui-select-option-search').find('input').attr('data-url', options.url);
        $option.find('.ui-select-option-search').find('input').bind("keypress", function (e) {
            if (event.keyCode == "13") {
                var value = $(this).val();
                var url = changeUrlParam($option.find('.ui-select-option-search').find('input').attr('data-url'), "keyword", escape(value));
                loadtreeview(url);
            }
        }).focus(function () {
            $(this).select();
        });
    }
    if (options.icon) {
        $option.find('i').remove();
        $option.find('img').remove();
    }
    $select.find('.ui-select-text').unbind('click');
    $select.find('.ui-select-text').bind("click", function (e) {
        if ($select.attr('readonly') == 'readonly' || $select.attr('disabled') == 'disabled') {
            return false;
        }
        $(this).parent().addClass('ui-select-focus');
        if ($option.is(":hidden")) {
            $select.find('.ui-select-option').hide();
            $('.ui-select-option').hide();
            var left = $select.offset().left;
            var top = $select.offset().top + 40;
            var width = $select.width();
            if (options.width) {
                width = options.width;
            }
            if (($option.height() + top) < $(window).height()) {
                $option.slideDown(150).css({ top: top, left: left, width: width });
            } else {
                var _top = (top - $option.height() - 32);
                $option.show().css({ top: _top, left: left, width: width });
                $option.attr('data-show', true);
            }
            $option.css('border-top', '1px solid #ccc');
            if (options.appendTo) {
                $option.css("position", "inherit")
            }
            $option.find('.ui-select-option-search').find('input').select();
        } else {
            if ($option.attr('data-show')) {
                $option.hide();
            } else {
                $option.slideUp(150);
            }
        }
        e.stopPropagation();
    });
    $select.find('li div').click(function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (!$(tar).hasClass('bbit-tree-ec-icon')) {
            $option.slideUp(150);
            e.stopPropagation();
        }
    });
    $(document).click(function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (!$(tar).hasClass('bbit-tree-ec-icon') && !$(tar).hasClass('form-control')) {
            if ($option.attr('data-show')) {
                $option.hide();
            } else {
                $option.slideUp(150);
            }
            $select.removeClass('ui-select-focus');
            e.stopPropagation();
        }
    });
    return $select;
}
$.fn.ComboBoxTreeSetValue = function (value) {
    //if (value == "") {
    //    return;
    //}
    var $select = $(this);
    var $option = $("#" + $select.attr('id') + "-option");
    $select.attr('data-value', value);
    var data_text = $option.find('ul').find('[data-value=' + value + ']').html();
    if (data_text) {
        $select.attr('data-text', data_text);
        $select.find('.ui-select-text').html(data_text).css('color', '#000');
        $option.find('ul').find('[data-value=' + value + ']').parent().parent().addClass('bbit-tree-selected');
    }
    return $select;
}
$.fn.GetWebControls = function (keyValue) {
    var reVal = "";
    $(this).find('input,select,textarea,.ui-select').each(function (r) {
        var id = $(this).attr('id');
        var type = $(this).attr('type');
        if (id) {
            switch (type) {
                case "checkbox":
                    if ($("#" + id).is(":checked")) {
                        reVal += '"' + id + '"' + ':' + 'true,'
                    } else {
                        reVal += '"' + id + '"' + ':' + 'false,'
                    }
                    break;
                case "select":
                    var value = $("#" + id).attr('data-value');
                    if ($("#" + id).hasClass('combogrid')) {
                        value = $("#" + id).combogrid('getValue');
                    }
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                    break;
                case "selectTree":
                    var value = $("#" + id).attr('data-value');
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                    break;
                default:
                    var value = $("#" + id).val();
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                    break;
            }
        }

    });
    reVal = reVal.substr(0, reVal.length - 1);
    reVal = reVal.replace(/&nbsp;/g, '');
    reVal = reVal.replace(/\\/g, '\\\\');
    reVal = reVal.replace(/\n/g, '\\n');
    var postdata = jQuery.parseJSON('{' + reVal + '}');
    //阻止伪造请求
    //if ($('[name=__RequestVerificationToken]').length > 0) {
    //    postdata["__RequestVerificationToken"] = $('[name=__RequestVerificationToken]').val();
    //}
    return postdata;
};
$.fn.SetWebControls = function (data) {
    var $id = $(this)
    for (var key in data) {
        var id = $id.find('#' + key);
        if (id.attr('id')) {
            var type = id.attr('type');
            if (id.hasClass("input-datepicker")) {
                type = "datepicker";
            }
            var value = $.trim(data[key]).replace(/&nbsp;/g, '');
            switch (type) {
                case "checkbox":
                    if (value == "true") {
                        id.attr("checked", 'checked');
                    } else {
                        id.removeAttr("checked");
                    }
                    break;
                case "select":
                    if (id.hasClass('combogrid')) {
                        id.combogrid("setValue", value)
                    }
                    else {
                        id.ComboBoxSetValue(value);
                    }
                    break;
                case "selectTree":
                    id.ComboBoxTreeSetValue(value);
                    break;
                case "datepicker":
                    id.val(formatDate(value, 'yyyy-MM-dd'));
                    break;
                default:
                    id.val(value);
                    break;
            }
        }
    }
}

//清空搜索栏中所有的元素  data中的元素表示 贡献者 张磊2017.9.25
$.fn.clearAllSearchPanel = function () {
    var $id = $(this);
    $id.find(".form-control").each(function (index, element) {
        var type = $(this).attr('type');
        switch (type) {
            case type = "text":
                $(this).val("")
                break;
        }
    });
    $id.find(".input-datepicker").each(function (index, element) {
        var type = $(this).attr('type');
        switch (type) {
            case type = "datepicker":
                $(this).val('');
                break;
        }
    });
    $id.find(".ui-select").each(function (index, element) {
        var type = $(this).attr('type');
        switch (type) {
            case type = "select":
                if ($(this).hasClass('combogrid')) {
                    $(this).combogrid("setValue", "")
                }
                else {
                    $(this).ComboBoxSetValue("");
                }
                break;
        }
    });
    $id.find(".ui-checkbox").each(function (index, element) {
        var type = $(this).attr('type');
        switch (type) {
            case type = "checkbox":
                if ($(this).is(":checked")) {
                    $(this).removeAttr("checked");

                } else {
                    $(this).attr("checked", 'checked');
                }
                break;
        }
    });
}
$.fn.Contextmenu = function () {
    var element = $(this);
    var oMenu = $('.contextmenu');
    $(document).click(function () {
        oMenu.hide();
    });
    $(document).mousedown(function (e) {
        if (3 == e.which) {
            oMenu.hide();
        }
    })
    var aUl = oMenu.find("ul");
    var aLi = oMenu.find("li");
    var showTimer = hideTimer = null;
    var i = 0;
    var maxWidth = maxHeight = 0;
    var aDoc = [document.documentElement.offsetWidth, document.documentElement.offsetHeight];
    oMenu.hide();
    for (i = 0; i < aLi.length; i++) {
        //为含有子菜单的li加上箭头
        aLi[i].getElementsByTagName("ul")[0] && (aLi[i].className = "sub");
        //鼠标移入
        aLi[i].onmouseover = function () {
            var oThis = this;
            var oUl = oThis.getElementsByTagName("ul");
            //鼠标移入样式
            oThis.className += " active";
            //显示子菜单
            if (oUl[0]) {
                clearTimeout(hideTimer);
                showTimer = setTimeout(function () {
                    for (i = 0; i < oThis.parentNode.children.length; i++) {
                        oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
                            (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
                    }
                    oUl[0].style.display = "block";
                    oUl[0].style.top = oThis.offsetTop + "px";
                    oUl[0].style.left = oThis.offsetWidth + "px";

                    //最大显示范围					
                    maxWidth = aDoc[0] - oUl[0].offsetWidth;
                    maxHeight = aDoc[1] - oUl[0].offsetHeight;

                    //防止溢出
                    maxWidth < getOffset.left(oUl[0]) && (oUl[0].style.left = -oUl[0].clientWidth + "px");
                    maxHeight < getOffset.top(oUl[0]) && (oUl[0].style.top = -oUl[0].clientHeight + oThis.offsetTop + oThis.clientHeight + "px")
                }, 300);
            }
        };
        //鼠标移出	
        aLi[i].onmouseout = function () {
            var oThis = this;
            var oUl = oThis.getElementsByTagName("ul");
            //鼠标移出样式
            oThis.className = oThis.className.replace(/\s?active/, "");

            clearTimeout(showTimer);
            hideTimer = setTimeout(function () {
                for (i = 0; i < oThis.parentNode.children.length; i++) {
                    oThis.parentNode.children[i].getElementsByTagName("ul")[0] &&
                        (oThis.parentNode.children[i].getElementsByTagName("ul")[0].style.display = "none");
                }
            }, 300);
        };
    }
    //自定义右键菜单
    $(element).bind("contextmenu", function () {
        var event = event || window.event;
        oMenu.show();
        oMenu.css('top', event.clientY + "px");
        oMenu.css('left', event.clientX + "px");
        //最大显示范围
        maxWidth = aDoc[0] - oMenu.width();
        maxHeight = aDoc[1] - oMenu.height();
        //防止菜单溢出
        if (oMenu.offset().top > maxHeight) {
            oMenu.css('top', maxHeight + "px");
        }
        if (oMenu.offset().left > maxWidth) {
            oMenu.css('left', maxWidth + "px");
        }
        return false;
    }).bind("click", function () {
        oMenu.hide();
    });
}
$.fn.panginationEx = function (options) {
    var $pager = $(this);
    if (!$pager.attr('id')) {
        return false;
    }
    var defaults = {
        firstBtnText: '首页',
        lastBtnText: '尾页',
        prevBtnText: '上一页',
        nextBtnText: '下一页',
        showInfo: true,
        showJump: true,
        jumpBtnText: '跳转',
        showPageSizes: true,
        infoFormat: '{start} ~ {end}条，共{total}条',
        sortname: '',
        url: "",
        success: null,
        beforeSend: null,
        complete: null
    };
    var options = $.extend(defaults, options);
    var params = $.extend({ sidx: options.sortname, sord: "asc" }, options.params);
    options.remote = {
        url: options.url,  //请求地址
        params: params,       //自定义请求参数
        beforeSend: function (XMLHttpRequest) {
            if (options.beforeSend != null) {
                options.beforeSend(XMLHttpRequest);
            }
        },
        success: function (result, pageIndex) {
            //回调函数
            //result 为 请求返回的数据，呈现数据
            if (options.success != null) {
                options.success(result.rows, pageIndex);
            }
        },
        complete: function (XMLHttpRequest, textStatu) {
            if (options.complete != null) {
                options.complete(XMLHttpRequest, textStatu);
            }
            //...
        },
        pageIndexName: 'page',     //请求参数，当前页数，索引从0开始
        pageSizeName: 'rows',       //请求参数，每页数量
        totalName: 'records'              //指定返回数据的总数据量的字段名
    }
    $pager.page(options);
}
$.fn.LeftListShowOfemail = function (options) {
    var $list = $(this);
    if (!$list.attr('id')) {
        return false;
    }
    $list.append('<ul  style="padding-top: 10px;"></ul>');
    var defaults = {
        id: "id",
        name: "text",
        img: "fa fa-file-o",

    };
    var options = $.extend(defaults, options);
    $list.height(options.height);
    $.ajax({
        url: options.url,
        data: options.param,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            $.each(data, function (i, item) {
                var $_li = $('<li class="" data-value="' + item[options.id] + '"  data-text="' + item[options.name] + '" ><i class="' + options.img + '" style="vertical-align: middle; margin-top: -2px; margin-right: 8px; font-size: 14px; color: #666666; opacity: 0.9;"></i>' + item[options.name] + '</li>');
                if (i == 0) {
                    $_li.addClass("active");
                }
                $list.find('ul').append($_li);
            });
            $list.find('li').click(function () {
                var key = $(this).attr('data-value');
                var value = $(this).attr('data-text');
                $list.find('li').removeClass('active');
                $(this).addClass('active');
                options.onnodeclick({ id: key, name: value });
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg(errorThrown, -1);
        }
    });
}
$.fn.authorizeButton = function () {
    var $element = $(this);
    $element.find('a.btn').attr('authorize', 'no')
    $element.find('ul.dropdown-menu').find('li').attr('authorize', 'no')
    var moduleId = tabiframeId();
    var data = top.authorizeButtonData[moduleId];
    if (data != undefined) {
        $.each(data, function (i) {
            $element.find("#" + data[i].EnCode).attr('authorize', 'yes');
        });
    }
    $element.find('[authorize=no]').remove();
}



$.fn.jqGridEx = function (options) {
    var $jqGrid = $(this);
    var _selectedRowIndex;
    if (!$jqGrid.attr('id')) {
        return false;
    }
    var defaults = {
        url: "",
        datatype: "json",
        height: $(window).height() - 139.5,
        autowidth: true,
        colModel: [],
        viewrecords: true,
        rowNum: 30,
        rowList: [30, 50, 100],
        pager: "#gridPager",
        sortname: 'CreateDate desc',
        rownumbers: true,
        shrinkToFit: false,
        gridview: true,
        onSelectRow: function () {
            _selectedRowIndex = $("#" + this.id).getGridParam('selrow');
        },
        gridComplete: function () {
            $("#" + this.id).setSelection(_selectedRowIndex, false);
        }
    };
    var options = $.extend(defaults, options);
    $jqGrid.jqGrid(options);
}
$.fn.jqGridRowValue = function (code) {
    var $jgrid = $(this);
    var json = [];
    var selectedRowIds = $jgrid.jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != undefined && selectedRowIds != "") {
        var len = selectedRowIds.length;
        for (var i = 0; i < len; i++) {
            var rowData = $jgrid.jqGrid('getRowData', selectedRowIds[i]);
            json.push(rowData[code]);
        }
    } else {
        var rowData = $jgrid.jqGrid('getRowData', $jgrid.jqGrid('getGridParam', 'selrow'));
        json.push(rowData[code]);
    }
    return String(json);
}
$.fn.jqGridRow = function () {
    var $jgrid = $(this);
    var json = [];
    var selectedRowIds = $jgrid.jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != "") {
        var len = selectedRowIds.length;
        for (var i = 0; i < len; i++) {
            var rowData = $jgrid.jqGrid('getRowData', selectedRowIds[i]);
            json.push(rowData);
        }
    } else {
        var rowData = $jgrid.jqGrid('getRowData', $jgrid.jqGrid('getGridParam', 'selrow'));
        json.push(rowData);
    }
    return json;
}

dialogTop = function (content, type) {
    $(".tip_container").remove();
    var bid = parseInt(Math.random() * 100000);
    $("body").prepend('<div id="tip_container' + bid + '" class="container tip_container"><div id="tip' + bid + '" class="mtip"><i class="micon"></i><span id="tsc' + bid + '"></span><i id="mclose' + bid + '" class="mclose"></i></div></div>');
    var $this = $(this);
    var $tip_container = $("#tip_container" + bid);
    var $tip = $("#tip" + bid);
    var $tipSpan = $("#tsc" + bid);
    //先清楚定时器
    clearTimeout(window.timer);
    //主体元素绑定事件
    $tip.attr("class", type).addClass("mtip");
    $tipSpan.html(content);
    $tip_container.slideDown(300);
    //提示层隐藏定时器
    window.timer = setTimeout(function () {
        $tip_container.slideUp(300);
        $(".tip_container").remove();
    }, 4000);
    $("#tip_container" + bid).css("left", ($(window).width() - $("#tip_container" + bid).width()) / 2);
}
dialogOpen = function (options) {
    Loading(true);
    var defaults = {
        id: null,
        title: '系统窗口',
        width: "100px",
        height: "100px",
        url: '',
        shade: 0.3,
        btn: ['确认', '关闭'],
        callBack: null
    };
    var options = $.extend(defaults, options);
    var _url = options.url;
    var _width = top.$.windowWidth() > parseInt(options.width.replace('px', '')) ? options.width : top.$.windowWidth() + 'px';
    var _height = top.$.windowHeight() > parseInt(options.height.replace('px', '')) ? options.height : top.$.windowHeight() + 'px';
    top.layer.open({
        id: options.id,
        type: 2,
        shade: options.shade,
        title: options.title,
        fix: false,
        area: [_width, _height],
        content: top.contentPath + _url,
        btn: options.btn,
        yes: function () {
            options.callBack(options.id)
        }, cancel: function () {
            if (options.cancel != undefined) {
                options.cancel();
            }
            return true;
        }
    });
}
dialogContent = function (options) {
    var defaults = {
        id: null,
        title: '系统窗口',
        width: "100px",
        height: "100px",
        content: '',
        btn: ['确认', '关闭'],
        callBack: null
    };
    var options = $.extend(defaults, options);
    top.layer.open({
        id: options.id,
        type: 1,
        title: options.title,
        fix: false,
        area: [options.width, options.height],
        content: options.content,
        btn: options.btn,
        yes: function () {
            options.callBack(options.id)
        }
    });
}
dialogAlert = function (content, type) {
    if (type == -1) {
        type = 2;
    }
    top.layer.alert(content, {
        icon: type,
        title: "提示"
    });
}
dialogConfirm = function (content, callBack) {
    top.layer.confirm(content, {
        icon: 7,
        title: "提示",
        btn: ['确认', '取消'],
    }, function () {
        callBack(true);
    }, function () {
        callBack(false)
    });
}
dialogMsg = function (content, type) {
    if (type == -1) {
        type = 2;
    }
    top.layer.msg(content, { icon: type, time: 4000, shift: 5 });
}
dialogClose = function () {
    try {
        var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        var $IsdialogClose = top.$("#layui-layer" + index).find('.layui-layer-btn').find("#IsdialogClose");
        var IsClose = $IsdialogClose.is(":checked");
        if ($IsdialogClose.length == 0) {
            IsClose = true;
        }
        if (IsClose) {
            top.layer.close(index);
        } else {
            location.reload();
        }
    } catch (e) {
        alert(e)
    }
}
reload = function () {
    location.reload();
    return false;
}
newGuid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) guid += "-";
    }
    return guid;
}
formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
toDecimal = function (num) {
    if (num == null) {
        num = "0";
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '' +
            num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
Date.prototype.DateAdd = function (strInterval, Number) {
    //y年 q季度 m月 d日 w周 h小时 n分钟 s秒 ms毫秒
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}
request = function (keyValue) {
    var search = location.search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == keyValue) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
changeUrlParam = function (url, key, value) {
    var newUrl = "";
    var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
    var tmp = key + "=" + value;
    if (url.match(reg) != null) {
        newUrl = url.replace(eval(reg), tmp);
    } else {
        if (url.match("[\?]")) {
            newUrl = url + "&" + tmp;
        }
        else {
            newUrl = url + "?" + tmp;
        }
    }
    return newUrl;
}




$.currentIframe = function () {
    var iframeId = top.$('#admui-pageContent').find('iframe.active').attr('name');
    return top.window.frames[iframeId];   //top.frames[iframeId].document 
}
$.isbrowsername = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        if (window.navigator.webkitPersistentStorage.toString().indexOf('DeprecatedStorageQuota') > -1) {
            return "Chrome";
        } else {
            return "360";
        }
    }//判断是否Chrome浏览器//360浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}
$.download = function (url, data, method) {
    if (url && data) {
        data = typeof data == 'string' ? data : jQuery.param(data);
        var inputs = '';
        $.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        $('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>').appendTo('body').submit().remove();
    };
};
$.standTabchange = function (object, forid) {
    $(".standtabactived").removeClass("standtabactived");
    $(object).addClass("standtabactived");
    $('.standtab-pane').css('display', 'none');
    $('#' + forid).css('display', 'block');
}
$.isNullOrEmpty = function (obj) {
    if ((typeof (obj) == "string" && obj == "") || obj == null || obj == undefined) {
        return true;
    }
    else {
        return false;
    }
}
$.arrayClone = function (data) {
    return $.map(data, function (obj) {
        return $.extend(true, {}, obj);
    });
}
$.windowWidth = function () {
    return $(window).width();
}
$.windowHeight = function () {
    return $(window).height();
}
IsNumber = function (obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}

//Tab标签切换
function Tabchange(id) {
    $('.ScrollBar').find('.tabPanel').hide();
    $('.ScrollBar').find("#" + id).show();
    $(".tab_list_top div").removeClass("actived");
    $(".tab_list_top").find("#Tab" + id).addClass("actived"); //添加选中样式  
    $("#gridTable").datagrid("resize");
}

function RootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    //return (prePath + postPath);如果发布IIS，有虚假目录用用这句
    return (prePath);
}

//自动补全表格
var IndetableRow_autocomplete = 0;
var scrollTopheight = 0;
function autocomplete(Objkey, width, height, data, callBack) {
    if ($('#' + Objkey).attr('readonly') == 'readonly') {
        return false;
    }
    if ($('#' + Objkey).attr('disabled') == 'disabled') {
        return false;
    }
    IndetableRow_autocomplete = 0;
    scrollTopheight = 0;
    var X = $("#" + Objkey).offset().top;
    var Y = $("#" + Objkey).offset().left;
    $("#div_gridshow_" + Objkey).html("");
    if ($("#div_gridshow_" + Objkey).attr("id") == undefined) {
        $('body').append('<div id="div_gridshow_' + Objkey + '" style="overflow: auto;z-index: 1000;border: 1px solid #A8A8A8;width:' + width + ';height:' + height + ';position: absolute; background-color: #fff; display: none;"></div>');
    } else {
        $("#div_gridshow_" + Objkey).height(height);
        $("#div_gridshow_" + Objkey).width(width);
    }
    var sbhtml = '<table class="grid" style="width: 100%;">';
    if (data != "") {
        sbhtml += '<tbody>' + data + '</tbody>';
    } else {
        sbhtml += '<tbody><tr><td style="color:red;text-align:center;width:' + width + ';">没有找到您要的相关数据！</td></tr></tbody>';
    }
    sbhtml += '</table>';
    $("#div_gridshow_" + Objkey).html(sbhtml);
    $("#div_gridshow_" + Objkey).css("left", Y).css("top", X + $('#' + Objkey).height()).show();
    $("#div_gridshow_" + Objkey + " .grid td").css("border-left", "none").css("padding-left", "2px");
    if (data != "") {
        $("#div_gridshow_" + Objkey).find('tbody tr').each(function (r) {
            if (r == 0) {
                $(this).addClass('selected');
            }
        });
    }
    $("#div_gridshow_" + Objkey).find('tbody tr').click(function () {
        var parameter = "";
        $(this).find('td').each(function (i) {
            parameter += '"' + $(this).attr('id') + '"' + ':' + '"' + $.trim($(this).text()) + '",'
        });
        if ($('#' + Objkey).attr('readonly') == 'readonly') {
            return false;
        }
        if ($('#' + Objkey).attr('disabled') == 'disabled') {
            return false;
        }
        callBack(JSON.parse('{' + parameter.substr(0, parameter.length - 1) + '}'));
        $("#div_gridshow_" + Objkey).hide();
    });
    $("#div_gridshow_" + Objkey).find('tbody tr').hover(function () {
        $(this).addClass("selected");
    }, function () {
        $(this).removeClass("selected");
    });
    //任意键关闭
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != 'div_gridshow_' + Objkey) {
            if ($(tar).attr("id") == 'div_gridshow_' + Objkey || $(tar).attr("id") == Objkey) {
                $("#div_gridshow_" + Objkey).show();
            } else {
                $("#div_gridshow_" + Objkey).hide();
            }
        }
    }
}
//方向键上,方向键下,回车键
//方向键上,方向键下,回车键
function autocompletekeydown(Objkey, callBack) {
    $("#" + Objkey).keydown(function (e) {
        switch (e.keyCode) {
            case 38: // 方向键上
                if (IndetableRow_autocomplete > 0) {
                    IndetableRow_autocomplete--
                    $("#div_gridshow_" + Objkey).find('tbody tr').removeClass('selected');
                    $("#div_gridshow_" + Objkey).find('tbody tr').each(function (r) {
                        if (r == IndetableRow_autocomplete) {
                            scrollTopheight -= 22;
                            $("#div_gridshow_" + Objkey).scrollTop(scrollTopheight);
                            $(this).addClass('selected');
                        }
                    });
                }
                break;
            case 40: // 方向键下
                var tindex = $("#div_gridshow_" + Objkey).find('tbody tr').length - 1;
                if (IndetableRow_autocomplete < tindex) {
                    IndetableRow_autocomplete++;
                    $("#div_gridshow_" + Objkey).find('tbody tr').removeClass('selected');
                    $("#div_gridshow_" + Objkey).find('tbody tr').each(function (r) {
                        if (r == IndetableRow_autocomplete) {
                            scrollTopheight += 22;
                            $("#div_gridshow_" + Objkey).scrollTop(scrollTopheight);
                            $(this).addClass('selected');
                        }
                    });
                }
                break;
            case 13:  //回车键
                var parameter = "";
                $("#div_gridshow_" + Objkey).find('tbody tr').each(function (r) {
                    if (r == IndetableRow_autocomplete) {
                        $(this).find('td').each(function (i) {
                            parameter += '"' + $(this).attr('id') + '"' + ':' + '"' + $.trim($(this).text()) + '",'
                        });
                    }
                });
                if ($('#' + Objkey).attr('readonly') == 'readonly') {
                    return false;
                }
                if ($('#' + Objkey).attr('disabled') == 'disabled') {
                    return false;
                }
                callBack(JSON.parse('{' + parameter.substr(0, parameter.length - 1) + '}'));
                $("#div_gridshow_" + Objkey).hide();
                break;
            default:
                break;
        }
    })
}
function AjaxJson(url, postData, callBack) {
    $.ajax({
        url: RootPath() + url,
        type: "GET",
        data: postData,
        dataType: "json",
        async: false,
        success: function (data) {
            callBack(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            dialogMsg(errorThrown, -1);
        }
    });
}

IsMoney = function (obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).bind("keydown", function (e) {
        var key = window.event ? e.keyCode : e.which;
        if (isFullStop(key)) {
            return $(this).val().indexOf('.') < 0;
        }
        return (isSpecialKey(key)) || ((isNumber(key) && !e.shiftKey));
    });
    function isNumber(key) {
        return key >= 48 && key <= 57
    }
    function isSpecialKey(key) {
        return key == 8 || key == 46 || (key >= 37 && key <= 40) || key == 35 || key == 36 || key == 9 || key == 13
    }
    function isFullStop(key) {
        return key == 190 || key == 110;
    }
}
checkedArray = function (id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        dialogMsg('您没有选中任何项,请您选中后再操作。', 0);
    }
    return isOK;
}
checkedRow = function (id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        dialogMsg('您没有选中任何数据项,请选中后再操作！', 0);
    } else if (id.split(",").length > 1) {
        isOK = false;
        dialogMsg('很抱歉,一次只能选择一条记录！', 0);
    }
    return isOK;
}

function IsDelData(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    }
    return isOK;
}
function IsChecked(id) {
    var isOK = true;
    if (id == undefined || id == "" || id == 'null' || id == 'undefined') {
        isOK = false;
        tipDialog('您没有选中任何项,请您选中后再操作。', 4, 'warning');
    } else if (id.split(",").length > 1) {
        isOK = false;
        tipDialog('很抱歉,一次只能选择一条记录。', 4, 'warning');
    }
    return isOK;
}

/*
grid表格扩展Begin
*/

/**获取表格选择行
**/
function GetJqGridRowIndx(jgrid) {
    return $(jgrid).jqGrid('getGridParam', 'selrow')
}
/**获取JqGrid表格列值
jgrid：ID，code：列字段
**/
function GetJqGridRowValue(jgrid, code) {
    var KeyValue = "";
    var selectedRowIds = $(jgrid).jqGrid("getGridParam", "selarrrow");
    if (selectedRowIds != "") {
        var len = selectedRowIds.length;
        for (var i = 0; i < len; i++) {
            var rowData = $(jgrid).jqGrid('getRowData', selectedRowIds[i]);
            KeyValue += rowData[code] + ",";
        }
        KeyValue = KeyValue.substr(0, KeyValue.length - 1);
    } else {
        var rowData = $(jgrid).jqGrid('getRowData', $(jgrid).jqGrid('getGridParam', 'selrow'));
        KeyValue = rowData[code];
    }
    return KeyValue;
}
/**获取JqGrid表格列值
jgrid：ID，RowIndx:行ID,code：列字段
**/
function GetJqGridValue(jgrid, RowIndx, code) {
    var rowData = $(jgrid).jqGrid('getRowData', RowIndx);
    return rowData[code];
}


/*easyui gird 取列用户数据*/
function GetGridColumnsByUser(columnsAll) {
    columnsdatabase = [];
    //判断数据里是否有Grid表格数据
    var tabid = top.tabiframeId;
    $.SetForm({
        url: "/SysManage/GirdSetting/GetDataColumnJson",
        param: { girdid: tabid },
        success: function (data) {
            if (data.columnsAll.length > 0) {
                columnsRoload = [];
                for (var i = 0; i < data.columnsAll.length; i++) {
                    var row = data.columnsAll[i];
                    //判断定义是与缓存中一样
                    var icount = GridColumnsCheck(row.ColumnField, columnsAll)
                    if (icount == 1) {
                        var row1 = {};
                        if (row.ColumnField == "ck") {
                            row1 = { title: '选择', field: 'ck', checkbox: true };
                        }
                        else {
                            if (row.ColumnField) {
                                row1["field"] = row.ColumnField;
                            }
                            else {
                                row1["field"] = "";
                            }
                            if (row.ColumnTitle) {
                                row1["title"] = row.ColumnTitle;
                            }
                            else {
                                row1["title"] = "";
                            }
                            if (row.ColumnAlign) {
                                row1["align"] = row.ColumnAlign;
                            }
                            else {
                                row1["align"] = "center";
                            }
                            if (row.ColumnWidth) {
                                row1["width"] = row.ColumnWidth;
                            }
                            else {
                                row1["width"] = "150";
                            }

                            if (row.ColumnSortable) {
                                row1["sortable"] = row.ColumnSortable == 1 ? true : false;
                            }
                            if (row.ColumnHidden) {
                                row1["hidden"] = row.ColumnHidden == 1 ? true : false;
                            }
                            if (row.ColumnFormatter) {
                                row1["formatter"] = GetFormatter(row.ColumnField, columnsAll);
                            }
                        }
                        columnsRoload.push(row1);
                    }
                }
                //判断缓存中没有，新定义字段
                var newRow = GridColumnsfromCheck(columnsAll, data.columnsAll);
                for (var j = 0; j < newRow.length; j++) {
                    var row2 = newRow[j];
                    columnsRoload.push(row2);
                }
                columnsdatabase = columnsRoload;
            }
        }
    });
    return columnsdatabase;
}

function GetSearchData(search) {
    var JsonData = [];
    search.find(".row").each(function () {
        if ($(this).find(".col-xs-3").length > 0) {
            $(this).find(".col-xs-3").each(function () {
                var labelname = $(this).find("label").html().trim();
                var inputid = $(this).find('input,select').attr("id");
                if (inputid == undefined) {
                    inputid = $(this).find('.ui-select')[0].attributes["id"].value;
                }
                //保存查询div
                var d1 = { id: inputid, text: $(this).html() };
                JsonData.push(d1);
            });
        }
        else {
            $(this).find(".col-xs-4").each(function () {
                var labelname = $(this).find("label").html().trim();
                var inputid = $(this).find('input,select').attr("id");
                if (inputid == undefined) {
                    inputid = $(this).find('.ui-select')[0].attributes["id"].value;
                }
                //保存查询div
                var d1 = { id: inputid, text: $(this).html() };
                JsonData.push(d1);

            });
        }
    });
    return JsonData;
}

function GetSearchDiv(id, searchData) {
    var txt = "";
    $.each(searchData, function (i, item) {
        if (id == item.id) {
            txt = item.text;
            return false;//等价于break
        }
    });
    return txt;
}
/*取用户查询条件设置 */
function GetSerachByUser(search) {
    var JsonData = [];
    var showData = [];
    JsonData = GetSearchData(search);
    var varmoduleid = top.$('#admui-siteConTabs').find('li.active > a').attr('module-id'); //当前页面判断是否有权限
    $.SetForm({
        url: "/SysManage/GirdSetting/GetDataSearchJson",
        param: { moduleid: varmoduleid },
        success: function (data) {
            if (data.SerachAll.length > 0) {
                var setwidth = data.SerachAll[0].SetWidth;
                var _html = "";
                var colxs = "";
                var j = (setwidth == "col-xs-3") ? 4 : 3;
                var i = 1;
                for (var k = 0; k < data.SerachAll.length; k++) {
                    var row = data.SerachAll[k];
                    //row begin
                    if (i == 1) {
                        _html += '<div class="row">';
                    }
                    //col-xs-3 begin
                    colxs = '<div class="' + setwidth + '">'
                    var coltxt = GetSearchDiv(row.SearchId, JsonData);
                    colxs += coltxt;
                    colxs += '</div>';
                    //col-xs-3 end
                    _html += colxs;
                    //row end
                    showData.push(row.SearchId);
                    if (i == j) {
                        _html = _html + '</div>';
                        i = 1;
                    }
                    else {
                        i = i + 1;
                    }
                }
                if (i != 1) {
                    _html = _html + '</div>';
                }

                var i = 1;
                //当前隐藏内容
                $.each(JsonData, function (k, item) {
                    if (showData.indexOf(item.id) < 0) {
                        //row begin
                        if (i == 1) {
                            _html += '<div class="row" style="display:none;">';
                        }
                        //col-xs-3 begin
                        colxs = '<div class="' + setwidth + '">'
                        var coltxt = GetSearchDiv(item.id, JsonData);
                        colxs += coltxt;
                        colxs += '</div>';
                        //col-xs-3 end
                        _html += colxs;

                        //row end
                        if (i == j) {
                            _html = _html + '</div>';
                            i = 1;
                        }
                        else {
                            i = i + 1;
                        }
                    }
                });
                if (i != 1) {
                    _html = _html + '</div>';
                }
                //界面更新
                top.$('#admui-pageContent').find('iframe.active').contents().find(".searchPanel").empty();
                top.$('#admui-pageContent').find('iframe.active').contents().find(".searchPanel").append(_html);
            }
        }
    });
}

function btn_SetRestSerach() {
    var tabUrl = top.$('#admui-siteConTabs').find('li.active > a').attr('href');
    var varmoduleid = top.$('#admui-siteConTabs').find('li.active > a').attr('module-id'); //当前页面判断是否有权限
    $.SetForm({
        url: "/SysManage/GirdSetting/SetRestSearchForm",
        param: { moduleid: varmoduleid },
        success: function (data) {
            top.$.site.contentTabs.$content.children('[src="' + tabUrl + '"]').attr('src', tabUrl);
        }
    });
}

function btn_SetRestGrid() {
    var tabUrl = top.$('#admui-siteConTabs').find('li.active > a').attr('href');
    $.SetForm({
        url: "/SysManage/GirdSetting/SetRestColumnForm",
        param: { gridid: top.tabiframeId },
        success: function (data) {
            top.$.site.contentTabs.$content.children('[src="' + tabUrl + '"]').attr('src', tabUrl);
        }
    });
}


function GetFormatter(field, data) {
    for (var i = 0; i < data.length; i++) {
        row = data[i];
        if (row["field"] == field) {
            return row["formatter"];
        }
    }
}



//判断是否增加字段(主要columns变化)
function GridColumnsfromCheck(fromcolumnsAll, dbcolumnsAll) {
    var returnrow = [];
    for (var i = 0; i < fromcolumnsAll.length; i++) {
        var row = fromcolumnsAll[i];
        k = 0;
        for (var j = 0; j < dbcolumnsAll.length; j++) {
            var rowdb = dbcolumnsAll[j]
            if (row.field == rowdb.ColumnField) {
                k = 1;
                break;
            }
        }
        if (k == 0) {
            var row1 = {};
            row1["field"] = row.field;
            row1["title"] = row.title;
            row1["align"] = "center";
            if (row.align) {
                row1["align"] = row.align;
            }
            else {
                row1["align"] = "center";
            }
            if (row.width) {
                row1["width"] = row.width;
            }
            else {
                row1["width"] = "150";
            }
            if (row.sortable) {
                row1["sortable"] = row.sortable == 1 ? true : false;
            }
            if (row.hidden) {
                row1["hidden"] = row.hidden == 1 ? true : false;
            }
            if (row.formatter) {
                row1["formatter"] = GetFormatter(row.field, columnsAll);
            }
            returnrow.push(row1);
        }
    }
    return returnrow;
}

//判断是否咸少字段(主要columns变化)
function GridColumnsCheck(ColumnField, columnsAll) {
    k = 0;
    for (var j = 0; j < columnsAll.length; j++) {
        var rowdb = columnsAll[j]
        if (ColumnField == rowdb.field) {
            k = 1;
            break;
        }
    }
    return k;
}

/*grid设置按钮*/

function btn_girdsetting() {
    dialogOpen({
        id: 'GridForm',
        title: '表格设置',
        url: top.contentPath + '/Utility/EditGrid',
        width: "650px",
        height: "550px",
        callBack: function (iframeId) {
            top.frames[iframeId].AcceptClick();
        }
    });
}


/*查询条件设置*/
function btn_searchsetting() {
    dialogOpen({
        id: 'SearchForm',
        title: '查询设置',
        url: top.contentPath + '/Utility/SearchWhereSetup',
        width: "850px",
        height: "600px",
        callBack: function (iframeId) {
            top.frames[iframeId].AcceptClick();
        }
    });
}


/*报表打印预览按钮 projectId模板目录，objectId模板名称，dataUrl数据地址，dataKey数据参数*/
function btn_PrintPreview(projectId, objectId, dataUrl, dataKey) {
    var url = escape(dataUrl);
    var key = escape(dataKey);
    //打开报表
    top.tablist.newTab({
        id: "Print",
        title: "打印报表",
        closed: true,
        replace: true,
        icon: "fa fa-file-text-o",
        url: top.contentPath + '/Utility/Report?projectId=' + escape(projectId) + '&objectId=' + escape(objectId) + '&dataUrl=' + url + '&dataKey=' + key,
    });
}

/*报表打印导出PDF按钮 projectId模板目录，objectId模板名称，dataUrl数据地址，dataKey数据参数*/
function btn_PrintExportPDF(projectId, objectId, dataUrl, dataKey) {
    var url = escape(dataUrl);
    var key = escape(dataKey);
    //打开报表
    //导出PDF
    top.tablist.newTab({
        id: "ExportPdf",
        title: "导出报表PDF",
        closed: true,
        replace: true,
        icon: "fa fa-file-text-o",
        url: top.contentPath + '/Utility/ReportPDF?projectId=' + escape(projectId) + '&objectId=' + escape(objectId) + '&dataUrl=' + url + '&dataKey=' + key,
    });
}


function tabRemoveMessage() {
    $('.has-error').removeClass();
    $('.poptip').remove();
    $('.input-error').remove();
}

function wmshotkey() {
    var a = window.event.keyCode;
    //查询(Q 81 113)
    if (((a == 81) || (a == 113)) && (event.altKey)) {
        btn_search();
    }
    //新增(A 65 97)
    if (((a == 65) || (a == 97)) && (event.altKey)) {
        btn_add();
    }
    //编辑(U 85 117)
    if (((a == 85) || (a == 117)) && (event.altKey)) {
        btn_edit();
    }
    //保存(S 83 115)
    //if (((a == 83) || (a == 115)) && (event.altKey)) {
    //    btn_save();
    //}
    //删除(R 82 114)
    if (((a == 82) || (a == 114)) && (event.altKey)) {
        btn_delete();
    }
    //导出(T 84 116)
    if (((a == 84) || (a == 116)) && (event.altKey)) {
        btn_export();
    }
    //关闭(X 88 120)
    if (((a == 88) || (a == 120)) && (event.altKey)) {
        btn_close();
    }
}