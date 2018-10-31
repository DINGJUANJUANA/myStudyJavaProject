/**********************************************************************************************
 *
 * created by xby
 * 初步构造了一个通用的函数，后续可扩展
 *
 **********************************************************************************************/

//获取随机数
function randomNum(prefix) {
    if (!prefix) {
        prefix = '';
    }
    return prefix + Math.ceil(Math.random() * 100000000000000);
}

function bsTableEx(option) {
    var options = {
        width: "100%",
        pageSize: 10,
        toolbar: "#toolbar",
        search: true,
        striped: true,
        pageList: [10, 30, 50, 100],
        clickToSelect: true,
        rownumbers: true,
        pagination: true,
        singleSelect: false,
        sortName: 'ConfigId',
        sortOrder: 'asc',
        idField: 'ConfigId',
        method: 'post',
        tableId: "dataGrid",
        showRefresh: true,
        fitColumns: true,
        checkboxEnabled: true,
        checkboxHeader: false,
        maintainSelected: true,
        showColumns: true,
        sidePagination: "client",//server
        columns: [],
        dataJson: {},
        bsTableFill: true,
        detailView: false,
        detailFormatter: function (index, row) {
            return "";
        }
    };

    if (option.columns) {
        $.each(option.columns, function (idx, item) {
            if (item.sortable != false) {
                $.extend(true, item, {sortable: true});
            }
        })
        if(options.checkboxEnabled) {
            option.columns.unshift({checkbox: true});
        }
    }

    options = $.extend(true, options, option || {});
    options.columns = [option.columns];

    options.toolbar = $.trim(options.toolbar);
    if (options.toolbar.indexOf("#") != 0) {
        options.toolbar = "#" + options.toolbar;
    }

    var $dataGridTable = $('#' + options.tableId);
    $dataGridTable.bootstrapTable(options);


    //是否填数
    if (bsTableFill) {
        bsTableFill({"tableId": options.tableId, "dataJson": options.dataJson});
    }
}

function bsTableFill(option) {

    var options = {
        tableId: "dataGrid",
        dataJson: {}
    };

    options = $.extend(true, options, option || {});

    var $dataGridTable = $('#' + options.tableId);
    $dataGridTable.bootstrapTable('removeAll'); //必选先清除选择项 再重新加载数据

    if (options && options.dataJson && !$.isEmptyObject(options.dataJson)) {
        $dataGridTable.bootstrapTable('refreshOptions', {"data": options.dataJson.rows});
    }

}

/*com.shortFormatTime = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd');
}*/

//Tab 标签切换时间
function tabClickEventInit(option) {

    var options = {
        callbackEvent: function () {
        },
        processTabs: true
    }

    options = $.extend(true, options, option || {});

    $('a[data-toggle=\"tab\"]').bind("click", function (e) {

        if (options.processTabs) {
            $(this).parents("ul:first").find("li").removeClass("active");
            $(this).parents("ul>li:first").addClass("active");

            var tabId = $(this).attr("href");
            $(".tab-content > .tab-pane").removeClass("active").removeClass("in");
            $(tabId).removeClass("active").removeClass("in").addClass("active").addClass("in");
        }

        if (typeof options.callbackEvent == 'function') {

            var thisId = $(this).attr("id");
            if (!thisId) {
                thisId = randomNum("aId");
                $(this).attr("id", thisId);
            }

            var params = {
                "thisId": thisId //当前点击的tab标签页
            };
            options.callbackEvent(params);
        }

        if (options.processTabs) {
            return false;
        }
    })
}

function tabClickEventInit2() {
    $("a[data-toggle=\"tab\"]").bind("click", function () {
        var parentId = $(this).attr("parentid");
        $("#tab" + parentId).find("li.active").removeClass("active");
        $(this).parents("li:first").addClass("active");

        $("#tabContent" + parentId).find("div.tab-pane").removeClass("active").removeClass("in");
        var divId = $(this).attr("href");
        var allInDivTabActivehrefs = $(divId).removeClass("active").removeClass("in").addClass("active").addClass("in").find(".nav.nav-tabs").find("li.active").find("a[data-toggle=\"tab\"]:first");
        if (allInDivTabActivehrefs && allInDivTabActivehrefs.length > 0) {
            $.each(allInDivTabActivehrefs, function (idx, item) {
                var inDiveTabActiveHrefId = $(this).attr("href");
                $(inDiveTabActiveHrefId).removeClass("active").removeClass("in").addClass("active").addClass("in");
            });
        }

        if (typeof callbackEvent == 'function') {

            var thisId = randomNum("aId");
            $(this).attr("id", thisId);

            var params = {
                "thisId": thisId, //当前点击的tab标签页
                "numId": parentId
            };
            callbackEvent(params);
        }

        return false;
    });
}


function allTabsInit(option, optionKey) {

    var options = {
        subDetail: false,
        tabActivedIndex: 0,
        tabSub: true,
        tabList: [],
        callbackEvent: function (params) {
        }
    };

    options = $.extend(true, options, {}, !optionKey ? option : option[optionKey]);

    var html = createPanel(options);
    $("#panelId").html(html);

    console.log(html);

    //allTabsEvent();
    gridTableInit(options);
    tabClickEventInit2(options.callbackEvent);
}

function gridTableInit(options) {
    if (!options) {
        return;
    }

    $.each(options.tabList, function (idx, item) {
        var tableId = "gt" + item.tableId;
        if ($("#" + tableId).length <= 0) {
            return true;
        }
        bsTableEx({
            tableId: tableId,
            columns: item.columns,
            dataJson: item.dataJson,
            onClickRow: function (rowIndex, rowData) {
            }
        });
        gridTableInit(item.options);

        return true;
    })
}

function createPanel(options) {

    if ($.trim(options.subDetail) == "") {
        options.subDetail = false;
    }

    if (!options.tabActivedIndex) {
        options.tabActivedIndex = 0;
    }

    var ulTabContentId = randomNum();
    var html = '<ul id="tab' + ulTabContentId + '" class="nav nav-tabs">';
    $.each(options.tabList, function (idx, item) {
        var randomId = randomNum();
        html += '<li ' + (idx == options.tabActivedIndex ? "class = \"active\"" : "") + '><a href="#' + ("tabId" + randomId) + '" data-toggle="tab" parentid="' + ulTabContentId + '">' + item.title + '</a></li>';
        item.tableId = randomId;
    });
    html += '</li>';
    html += '</ul>';

    html += '<div id="tabContent' + ulTabContentId + '" class="tab-content">';
    $.each(options.tabList, function (idx, item) {

        var subOrNextTabs = '';
        if (!(!item.options || !item.options.tabList || item.options.tabList.length <= 0)) {
            subOrNextTabs += createPanel(item.options);
        }

        if (options.tabSub) {
            var vars = {"actived": idx <= 0, "subTabs": subOrNextTabs};
            html += createGridTable(item, vars);
        } else {
            var vars = {"actived": idx <= 0};
            html += createGridTable(item, vars);
            html += subOrNextTabs;
        }

    });
    html += '</div>';

    return html;
}

//创建dataGridTable
function createGridTable(options, vars) {

    var html = '<div class="tab-pane fade ' + (vars.actived ? "in active" : "") + '" id="tabId' + options.tableId + '">';
    // if (options.toolbar) {
    //     html += '<div class="row">';
    //     html += '<div class="col-xs-4 searchClear">';
    //     html += '<div class="input-group">';
    //
    //     html += '<input class="form-control" type="text" placeholder="输入产品名称，产品编码或者合同名称..."/>';
    //     html += '<div class="input-group-btn">';
    //     html += '<button class="btn btn-primary btn-md" type="button"><i class="fa fa-fw fa-search"></i>搜索</button>';
    //     html += '</div>';
    //
    //     html += '</div>';
    //     html += '</div>';
    //     html += '<div class="col-xs-8 col-md-8">';
    //     html += '<div class="input-group pull-right">';
    //     html += '<span style="font-weight: bold;">企业数:共计 3 家</span>';
    //     html += '</div>';
    //     html += '</div>';
    //     html += '</div>';
    // }

    html += '<div class="gridPanelBankInfo">';
    html += '<table id="gt' + options.tableId + '"></table>';
    html += '</div>';

    if (vars.subTabs) {
        html += vars.subTabs;
    }

    html += '</div>';

    return html;
}

function ajaxSync(option) {

    var options = {
        url: "",
        sync: false
    }

    options = $.extend(true, options, option || {});

    var returnData = "";
    $.ajax({
        url: options.url,
        async: options.sync,
        success: function (result) {
            returnData = result;
        }
    });
    return returnData;
}