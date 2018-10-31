/**
 * Admui-iframe v1.1.0 (http://www.admui.com/)
 * Copyright 2015-2018 Admui Team
 * Licensed under the Admui License 1.0 (http://www.admui.com/about/#license)
 */
"use strict";
(function (window, document, $) {

    /* global layer */

    /**
     * 消息通知
     */

    $.notifyFn = $.notifyFn || {};

    $.extend($.notifyFn, {
        init: function () {
            var self = this,
                $msgDom = $('#admui-navbarMessage').find('span.msg-num');

            // 建立websocket连接
            var socket = new WebSocket('ws://' + window.location.host + $.ctx + '/socket');

            socket.onopen = function () {
                socket.send('发送数据');
            };

            socket.onmessage = function (event) {
                var fn, allMsg, msgFn, msgNumber,
                    notifyFn = $.content.window().notifyFn, unReadFn,
                    data = JSON.parse(event.data);

                if (typeof  notifyFn !== 'undefined') {
                    unReadFn = notifyFn.unReadMsg;
                    fn = notifyFn.messagePage;
                    msgFn = notifyFn.messageNum;
                }

                if (data.status) { // 初次链接时未读消息
                    msgNumber = self.firstMsg(data.total, $msgDom);

                    if (unReadFn && $.isFunction(unReadFn)) {
                        unReadFn(msgNumber);
                    }
                    return;
                }

                allMsg = $msgDom.data('message') + 1;

                $msgDom.data('message', allMsg);

                // 未读消息数大于99时
                if (allMsg > 99) {
                    allMsg = '99+';
                }
                $msgDom.text(allMsg);

                toastr.options = {
                    positionClass: 'toast-bottom-right',
                    onclick: function () {
                        self.readMsg(data);
                    }
                };
                toastr.clear();
                toastr.info(data.title);

                // 顶部导航条消息栏展开时
                if ($('#admui-navbarMessage ul').is(':visible')) {
                    self.loading();
                }

                // 存在message页面时相关操作
                if (fn && $.isFunction(fn)) {
                    fn(self);
                }

                // 存在账户信息页面时消息计数
                if (msgFn && $.isFunction(msgFn)) {
                    msgFn('1');
                }
            };

            socket.onclose = function (event) {
                toastr.info('消息通知服务已关闭', event);
            };
        },
        firstMsg: function (count, $el) { // 初次加载未读消息数
            var msgNumber;

            if (count === 0) {
                msgNumber = '';
            } else if (count > 99) {
                msgNumber = '99+';
            } else {
                msgNumber = count;
            }

            $el.data('message', count).text(msgNumber);
            return msgNumber;
        },
        readMsg: function (opts) { // 阅读当前消息，改变消息状态
            var $navNews = $('#admui-navbarMessage').find('span.msg-num'),
                msgsNum = Number($navNews.data('message'));

            toastr.clear();

            layer.alert(opts.content, {
                size: 'small',
                title: opts.title
            });

            if (opts.readFlag) {
                return;
            }

            $.ajax({
                url: $.ctx + '/message/read',
                type: 'POST',
                data: {messageId: opts.messageId},
                dataType: 'JSON',
                success: function (data) {
                    var msgNumber,
                        notifyFn = $.content.window().notifyFn, fn, msgFn;

                    if (typeof notifyFn !== 'undefined') {
                        fn = notifyFn.msgStatus;
                        msgFn = notifyFn.messageNum;
                    }

                    if (data.success) {
                        msgsNum -= 1;
                        msgNumber = msgsNum;

                        if (msgsNum > 99) { // 未读消息数
                            msgNumber = '99+';
                        } else if (msgNumber === 0) {
                            msgNumber = '';
                        }

                        $navNews.data('message', msgsNum).text(msgNumber);

                        if (fn && $.isFunction(fn)) {
                            fn(opts.messageId);
                        }

                        if (msgFn && $.isFunction(msgFn)) { // 存在账户信息页面时消息计数
                            msgFn();
                        }
                    } else {
                        toastr.error('出错了，请重试！');
                    }
                },
                error: function () {
                    toastr.error('服务器异常，请稍后再试！');
                }
            });
        },
        loading: function () { // 加载最近5条通知
            var self = this;

            template.helper('iconType', function (type) {
                switch (type) {
                    case 'SYSTEM':
                        return 'fa-desktop system';
                    case 'TASK':
                        return 'fa-tasks task';
                    case 'SETTING':
                        return 'fa-cog setting';
                    case 'EVENT':
                        return 'fa-calendar event';
                    default:
                        return 'fa-comment-o other';
                }
            });

            template.helper('timeMsg', function (date) {
                var msgTime, arr,
                    currentTime = new Date();

                // ios new Data兼容
                arr = date.split(/[- : \/]/);
                msgTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);

                return self.timeDistance(msgTime, currentTime);

            });

            $.ajax({
                url: $.ctx + '/message/queryUnread',
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    if (data.success) {
                        var html = template('admui-messageTpl', data);
                        $('#admui-messageContent').html(html);
                    } else {
                        toastr.error('出错了，请重试！');
                    }
                },
                error: function () {
                    toastr.error('服务器异常，请稍后再试！');
                }
            });
        },
        timeDistance: function (reference, current) { // 间隔时间
            var time;

            time = current.getTime() - reference.getTime();

            for (var i = 0; i < 6; i++) {
                switch (i) {
                    case 0:
                        time = time / 1000;
                        if (time >= 1 && time < 60) {
                            return time.toFixed(0) + '秒前';
                        } else if (time < 1) {
                            return '刚刚';
                        }
                        break;
                    case 1:
                        time = time / 60;
                        if (time >= 0 && time < 60) {
                            return time.toFixed(0) + '分钟前';
                        }
                        break;
                    case 2:
                        time = time / 60;
                        if (time >= 0 && time < 60) {
                            return time.toFixed(0) + '小时前';
                        }
                        break;
                    case 3:
                        time = time / 24;
                        if (time >= 0 && time < 60) {
                            return time.toFixed(0) + '天前';
                        }
                        break;
                    case 4:
                        time = time / 30;
                        if (time >= 0 && time < 60) {
                            return time.toFixed(0) + '月前';
                        }
                        break;
                    case 5:
                        time = time / 365;
                        if (time >= 0 && time < 60) {
                            return time.toFixed(0) + '年前';
                        }
                        break;
                }
            }
        }
    });

    // 需配合后端使用
    //$.notifyFn.init();

    // 获取消息
    $(document).on('click', '#admui-navbarMessage > .msg-btn', function () {
        $.notifyFn.loading();
    });

    // 查看未读消息
    $(document).on('click', '#admui-messageContent > a', function (e) {
        $.notifyFn.readMsg($(this).data());
        e.preventDefault();
    });
})(window, document, jQuery);