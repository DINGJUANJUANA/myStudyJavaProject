/// <reference path="utils.js" />

/**
 * 模块名：共通脚本
 * 程序名: 通用方法common.js

 **/

var com = {};
var EditState = { "Find": 0, "Add": 1, "Modify": 2, "Delete": 3, "Init": 4, "Browse": 5, "NavigateAdd": 6 };

//格式化时间
com.formatDate = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd');
};
com.success = function (value) {
    if (value == '1') {
        return "<span class=\"label label-success\">成功</span>";
    } else {
        return "<span class=\"label label-danger\">失败</span>";
    }
}

com.gender = function (value) {
    if (value == '1') {
        return "男";
    } else {
        return "女";
    }
}

com.enabledmark = function (value, row) {
    if (value == 1) {
        return '<span onclick=\"btn_disabled(\'' + row.UserId + '\')\" class=\"label label-success\" style=\"cursor: pointer;\">正常</span>';
    } else if (value == 0) {
        return '<span onclick=\"btn_enabled(\'' + row.UserId + '\')\" class=\"label label-default\" style=\"cursor: pointer;\">禁用</span>';
    }
}
com.formatTime = function (value) {
    return utils.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
};

//格式化金额
com.formatMoney = function (value) {
    var sign = value < 0 ? '-' : '';
    return sign + utils.formatNumber(Math.abs(value), '#,##0.00');
};

//格式化汇率
com.formatRate = function (value) {
    var sign = value < 0 ? '-' : '';
    return sign + utils.formatNumber(Math.abs(value), '#,##0.0000');
};

//格式化checkbox
com.formatCheckbox = function (value) {
    var checked = (value || 'false').toString() == 'true';
    return utils.formatString('<img value={0} src="/Content/images/{1}"/>', checked, checked ? "checkmark.gif" : "checknomark.gif");
};


com.formatCheckbox1 = function (value) {
    var checked = (value || '0').toString() == '1';
    return utils.formatString('<img value={0} src="/Content/images/{1}"/>', checked, checked ? "checkmark.gif" : "checknomark.gif");
};


com.formatAuthorize = function (value) {
    if (value == 0) {
        return '<span value=' + value + ' class=\"label label-danger\">拒绝</span>';
    } else {
        return '<span value=' + value + ' class=\"label label-success\">授权</span>';
    }
};








com.query = function (element) {
    var query = $;
    if ($(document).find(element).length == 0 && element != document) {
        if ($(parent.document).find(element)) {
            query = parent.$;
        }
    }
    return query;
};

com.gridValidate = function (context) {
    context = context || document;
    var query = com.query(context);
    if (query.fn.validatebox) {
        var box = query(".validatebox-text", context);
        if (box.length) {
            box.validatebox("validate");
            var valid = $(".validatebox-invalid:first", context).focus();
            return valid.length == 0;
        }
    }
    return true;
};


com.formValidate = function (context) {
    context = context || document;
    var query = com.query(context);
    if (query.fn.validatebox) {
        var box = query(".validatebox-text", context);
        if (box.length) {
            box.validatebox("validate");
            var valid = $(".validatebox-invalid:first", context).focus();
            return valid.length == 0;
        }
    }
    return true;
};

com.formChanges = function (obj1, obj2, reserve) {
    obj1 = ko.toJS(obj1) || {};
    obj2 = ko.toJS(obj2) || {};
    reserve = reserve || [];
    var result = utils.diffrence(obj1, obj2, reserve, ['__ko_mapping__']);

    var length = 0;
    for (var k in result) length++;
    result._changed = length > reserve.length;

    return result;
};

com.editGridViewModel = function (grid) {
    var self = this;
    this.begin = function (index, row) {
        if (index == undefined || typeof index === 'object') {
            row = grid.datagrid('getSelected');
            index = grid.datagrid('getRowIndex', row);
        }
        self.editIndex = self.ended() ? index : self.editIndex;
        grid.datagrid('selectRow', self.editIndex).datagrid('beginEdit', self.editIndex);
    };
    this.ended = function () {
        if (self.editIndex == undefined) return true;
        if (grid.datagrid('validateRow', self.editIndex)) {
            grid.datagrid('endEdit', self.editIndex);
            self.editIndex = undefined;
            return true;
        }
        grid.datagrid('selectRow', self.editIndex);
        return false;
    };
    this.addnew = function (rowData) {
        if (self.ended()) {
            if (Object.prototype.toString.call(rowData) != '[object Object]') rowData = {};
            rowData = $.extend({ _isnew: true }, rowData);
            grid.datagrid('appendRow', rowData);
            self.editIndex = grid.datagrid('getRows').length - 1;
            grid.datagrid('selectRow', self.editIndex);
            self.begin(self.editIndex, rowData);
        }
    };
    this.deleterow = function () {
        var selectRow = grid.datagrid('getSelected');
        if (selectRow) {
            var selectIndex = grid.datagrid('getRowIndex', selectRow);
            if (selectIndex == self.editIndex) {
                grid.datagrid('cancelEdit', self.editIndex);
                self.editIndex = undefined;
            }
            grid.datagrid('deleteRow', selectIndex);
        }
    };
    this.reject = function () {
        grid.datagrid('rejectChanges');
    };
    this.accept = function () {
        grid.datagrid('acceptChanges');
        var rows = grid.datagrid('getRows');
        for (var i in rows) delete rows[i]._isnew;
    };
    this.getChanges = function (include, ignore) {
        if (!include) include = [], ignore = true;
        var deleted = utils.filterProperties(grid.datagrid('getChanges', "deleted"), include, ignore),
            updated = utils.filterProperties(grid.datagrid('getChanges', "updated"), include, ignore),
            inserted = utils.filterProperties(grid.datagrid('getChanges', "inserted"), include, ignore);

        var changes = { deleted: deleted, inserted: utils.minusArray(inserted, deleted), updated: utils.minusArray(updated, deleted) };
        changes._changed = (changes.deleted.length + changes.updated.length + changes.inserted.length) > 0;

        return changes;
    };
    this.isChangedAndValid = function () {
        return self.ended() && self.getChanges()._changed;
    };
};

com.editTreeGridViewModel = function (grid) {
    var self = this, idField = grid.idField;
    this.begin = function (row) {
        var row = row || grid.treegrid('getSelected');
        if (row) {
            self.editIndex = self.ended() ? row[idField] : self.editIndex;
            grid.treegrid('beginEdit', self.editIndex);
        }
    };
    this.ended = function () {
        if (self.editIndex == undefined) return true;
        if (grid.treegrid('validateRow', self.editIndex)) {
            grid.treegrid('endEdit', self.editIndex);
            self.editIndex = undefined;
            return true;
        }
        grid.treegrid('select', self.editIndex);
        return false;
    };
    this.addnew = function (rowData, parentId) {
        if (self.ended()) {
            if (Object.prototype.toString.call(rowData) != '[object Object]') rowData = {};
            rowData = $.extend({ _isnew: true }, rowData), parentId = parentId || '';
            if (!rowData[idField]) rowData[idField] = utils.uuid();
            grid.treegrid('append', { parent: parentId, data: [rowData] });
            grid.$element().data("datagrid").insertedRows.push(rowData);
            grid.treegrid('select', rowData[idField]);
            self.begin(rowData);
        }
    };
    this.deleterow = function () {
        var row = grid.treegrid('getSelected');
        if (row) {
            if (row[idField] == self.editIndex) {
                grid.treegrid('cancelEdit', self.editIndex);
                self.editIndex = undefined;
            }
            grid.treegrid('remove', row[idField]);
            grid.$element().data("datagrid").deletedRows.push(row);
        }
    };
    this.reject = function () {
        throw "未实现此方法！";
    };
    this.accept = function () {
        grid.treegrid('acceptChanges');
        var rows = grid.$element().datagrid('getRows');
        for (var i in rows) delete rows[i]._isnew;
    };
    this.getChanges = function (include, ignore) {
        if (!include) include = [], ignore = true;
        var deleted = utils.filterProperties(grid.$element().datagrid('getChanges', "deleted"), include, ignore),
            updated = utils.filterProperties(grid.$element().datagrid('getChanges', "updated"), include, ignore),
            inserted = utils.filterProperties(grid.$element().datagrid('getChanges', "inserted"), include, ignore);

        var changes = { deleted: deleted, inserted: utils.minusArray(inserted, deleted), updated: utils.minusArray(updated, deleted) };
        changes._changed = (changes.deleted.length + changes.updated.length + changes.inserted.length) > 0;

        return changes;
    };
    this.isChangedAndValid = function () {
        return self.ended() && self.getChanges()._changed;
    };
};


com.readOnlyHandler = function (type) {
    //readonly
    _readOnlyHandles = {};
    _readOnlyHandles.defaults = _readOnlyHandles.input = function (obj, b) {
        b ? obj.addClass("readonly").attr("readonly", true) : obj.removeClass("readonly").removeAttr("readonly");
    };
    _readOnlyHandles.combo = function (obj, b) {
        var combo = obj.data("combo").combo;
        _readOnlyHandles.defaults(combo.find(".combo-text"), b);
        if (b) {
            combo.unbind(".combo");
            combo.find(".combo-arrow,.combo-text").unbind(".combo");
            obj.data("combo").panel.unbind(".combo");
        }
    };
    _readOnlyHandles.spinner = function (obj, b) {
        _readOnlyHandles.defaults(obj, b);
        if (b) {
            obj.data("spinner").spinner.find(".spinner-arrow-up,.spinner-arrow-down").unbind(".spinner");
        }
    };
    return _readOnlyHandles[type || "defaults"];
};

  