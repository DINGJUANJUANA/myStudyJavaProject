package com.study.velocity.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Mr.xu on 2016/7/21
 * 用途:时间工具类
 */
public class DateTimeUtils {
    /**
     * 日期时间格式 yyyy-MM-dd HH:mm:ss
     */
    public static String dateTimeString = "yyyy-MM-dd HH:mm:ss";

    /**
     * 日期格式 yyyy-MM-dd
     */
    public static String dateString = "yyyy-MM-dd";

    public static String dateSlantString = "yyyy/MM/dd";

    /**
     * 日期格式 yyyyMMddHHmmss
     */
    public static String dateTimeLongString = "yyyyMMddHHmmss";
    /**
     * 日期格式 yyyyMMdd
     */
    public static String dateLongString = "yyyyMMdd";


    /**
     * 日期时间格式For 文件名 yyyy_MM_dd_HH_mm_ss
     */
    public static String dateTimeString4FileName = "yyyy_MM_dd_HH_mm_ss";

    public final static String YYYY = "yyyy";
    public final static String YYYY_MM = "yyyy-MM";
    public final static String YYYY_MM_DD = "yyyy-MM-dd";
    public final static String YYYY_MM_DD_HH = "yyyy-MM-dd HH";
    public final static String YYYY_MM_DD_HH_mm = "yyyy-MM-dd HH:mm";
    public final static String YYYY_MM_DD_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
    public final static String YYYY_MM_DD_HH_mm_ss_SSS = "yyyy-MM-dd HH:mm:ss:SSS";
    public final static String MM_DD_HH_mm = "MM-DD HH:mm";

    /**
     * 日
     */
    public final static int INTERVAL_DAY = 1;
    /**
     * 周
     */
    public final static int INTERVAL_WEEK = 2;
    /**
     * 月
     */
    public final static int INTERVAL_MONTH = 3;
    /**
     * 年
     */
    public final static int INTERVAL_YEAR = 4;
    /**
     * 小时
     */
    public final static int INTERVAL_HOUR = 5;
    /**
     * 分钟
     */
    public final static int INTERVAL_MINUTE = 6;
    /**
     * 秒
     */
    public final static int INTERVAL_SECOND = 7;

    private static final Logger logger = LoggerFactory.getLogger(DateTimeUtils.class);

    /**
     * 解决日期字符串,默认日期格式为： yyyy-MM-dd HH:mm:ss，如果出现解析错误，自动尝试其他格式
     *
     * @param dateStr
     * @return
     */
    public static Date parseStr(String dateStr) {
        return parseStr(dateStr, dateTimeString);
    }

    /**
     * 解决日期字符串
     *
     * @param dateStr
     * @param pattern
     * @return
     */
    public static Date parseStr(String dateStr, String pattern) {
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        Date resultDate = null;
        try {
            resultDate = df.parse(dateStr);
        } catch (ParseException e) {
            for (String key : DATE_REGEX_MAP.keySet()) {
                String regex = DATE_REGEX_MAP.get(key);
                Pattern p = Pattern.compile(regex);
                Matcher m = p.matcher(dateStr);
                if (m.matches()) {
                    try {
                        df = new SimpleDateFormat(key);
                        resultDate = df.parse(dateStr);
                    } catch (ParseException e1) {
                        logger.error("日期解析错误,dateStr:" + dateStr);
                    }
                }
            }
        }
        return resultDate;
    }

    /**
     * @param date
     * @param pattern
     * @return
     */
    public static String format(Date date, String pattern) {
        if (date == null || pattern == null) {
            return "";
        }
        SimpleDateFormat df = new SimpleDateFormat(pattern);
        String result = df.format(date);
        if (result.equalsIgnoreCase("0001-01-01 00:00:00") || result.equalsIgnoreCase("0001-01-01")) {
            result = "";
        }
        return result;
    }

    /**
     * @param date
     * @param
     * @return
     */
    public static String format(Date date) {
        return format(date, dateTimeString);
    }

    /**
     * @param date
     * @return 例如： 12-29 12:30
     * @Title: noYearSecondFormat
     * @Description: 获取无年和秒数的时间格式
     * @author 周成龙
     */
    public static String noYearSecondFormat(Date date) {
        return format(date, MM_DD_HH_mm);
    }

    public static String nowFormat() {
        return format(new Date(), dateTimeString);
    }

    /**
     * 两date比较
     *
     * @param beforeDate
     * @param afterDate
     * @return
     */
    public static int compareDate(Date beforeDate, Date afterDate) {
        Calendar beforeCalendar = Calendar.getInstance();
        Calendar afterCalendar = Calendar.getInstance();
        beforeCalendar.setTime(beforeDate);
        afterCalendar.setTime(afterDate);
        return beforeCalendar.compareTo(afterCalendar);
    }

    /**
     * 判断目标日期是否在时间段类
     *
     * @param beforeDate
     * @param afterDate
     * @param targetDate
     * @return
     */
    public static boolean isBetweenDate(Date beforeDate, Date afterDate, Date targetDate) {
        if (targetDate == null) {
            throw new RuntimeException("targetDate should not be null!");
        }
        if (beforeDate == null && afterDate == null) {
            return false;
        }
        if (afterDate == null) {
            return (compareDate(beforeDate, targetDate) <= 0);
        }
        if (beforeDate == null) {
            return (compareDate(targetDate, afterDate) <= 0);
        }
        return (compareDate(beforeDate, targetDate) <= 0) && (compareDate(targetDate, afterDate) <= 0);
    }

    /**
     * @param date
     * @param month
     * @return
     */
    public static Date dateOperateByMonth(Date date, int month) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date == null ? new Date() : date);
        calendar.add(Calendar.MONTH, month);
        return calendar.getTime();
    }

    public static Date dateOperateByDay(Date date, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date == null ? new Date() : date);
        calendar.add(Calendar.DAY_OF_MONTH, day);
        return calendar.getTime();
    }

    /**
     * 邮箱激活，时间操作，对验证时间+24H
     *
     * @param date 需要操作的时间，如果为null,就去当前时间
     * @param hour 小时，对操作时间增加或减少的量
     * @author chj
     */
    public static Date dateOperateByHour(Date date, int hour) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date == null ? new Date() : date);
        calendar.add(Calendar.HOUR_OF_DAY, hour);
        return calendar.getTime();
    }

    /**
     * 验证手机验证码过期，时间操作，对验证时间+有效时间
     *
     * @param date   需要操作的时间，如果为null,就去当前时间
     * @param minute 分钟，对操作时间增加或减少的量
     * @author chj
     */
    public static Date dateOperateByMinute(Date date, int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date == null ? new Date() : date);
        calendar.add(Calendar.MINUTE, minute);
        return calendar.getTime();
    }

    public static Date dateOperateBySecond(Date date, int second) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date == null ? new Date() : date);
        calendar.add(Calendar.SECOND, second);
        return calendar.getTime();
    }

    public static Date getDateWithoutTime(Date date) {
        Date result = null;
        String dateStr = format(date, dateString);
        result = parseStr(dateStr, dateString);
        return result;
    }

    /**
     * 增加时间
     *
     * @param interval [INTERVAL_DAY,INTERVAL_WEEK,INTERVAL_MONTH,INTERVAL_YEAR,
     *                 INTERVAL_HOUR,INTERVAL_MINUTE]
     * @param date
     * @param n        可以为负数
     * @return
     */
    public static Date dateAdd(int interval, Date date, int n) {
        long time = (date.getTime() / 1000); // 单位秒
        switch (interval) {
            case INTERVAL_DAY:
                time = time + n * 86400;// 60 * 60 * 24;
                break;
            case INTERVAL_WEEK:
                time = time + n * 604800;// 60 * 60 * 24 * 7;
                break;
            case INTERVAL_MONTH:
                time = time + n * 2678400;// 60 * 60 * 24 * 31;
                break;
            case INTERVAL_YEAR:
                time = time + n * 31536000;// 60 * 60 * 24 * 365;
                break;
            case INTERVAL_HOUR:
                time = time + n * 3600;// 60 * 60 ;
                break;
            case INTERVAL_MINUTE:
                time = time + n * 60;
                break;
            case INTERVAL_SECOND:
                time = time + n;
                break;
            default:
        }

        Date result = new Date();
        result.setTime(time * 1000);
        return result;
    }

    /**
     * 计算两个时间间隔
     *
     * @param interval [INTERVAL_DAY,INTERVAL_WEEK,INTERVAL_MONTH,INTERVAL_YEAR,
     *                 INTERVAL_HOUR,INTERVAL_MINUTE]
     * @param begin
     * @param end
     * @return
     */
    public static int dateDiff(int interval, Date begin, Date end) {
        long beginTime = (begin.getTime() / 1000); // 单位：秒
        long endTime = (end.getTime() / 1000); // 单位: 秒
        long tmp = 0;
        if (endTime == beginTime) {
            return 0;
        }

        // 确定endTime 大于 beginTime 结束时间秒数 大于 开始时间秒数
        if (endTime < beginTime) {
            tmp = beginTime;
            beginTime = endTime;
            endTime = tmp;
        }

        long intervalTime = endTime - beginTime;
        long result = 0;
        switch (interval) {
            case INTERVAL_DAY:
                result = intervalTime / 86400;// 60 * 60 * 24;
                break;
            case INTERVAL_WEEK:
                result = intervalTime / 604800;// 60 * 60 * 24 * 7;
                break;
            case INTERVAL_MONTH:
                result = intervalTime / 2678400;// 60 * 60 * 24 * 31;
                break;
            case INTERVAL_YEAR:
                result = intervalTime / 31536000;// 60 * 60 * 24 * 365;
                break;
            case INTERVAL_HOUR:
                result = intervalTime / 3600;// 60 * 60 ;
                break;
            case INTERVAL_MINUTE:
                result = intervalTime / 60;
                break;
            case INTERVAL_SECOND:
                result = intervalTime / 1;
                break;
            default:
        }

        // 做过交换
        if (tmp > 0) {
            result = 0 - result;
        }
        return (int) result;
    }

    /**
     * 日期格式正则map
     */
    public static final Map<String, String> DATE_REGEX_MAP = new HashMap<String, String>();

    static {
        // DATE_REGEX_MAP.put("yyyy-MM-dd",
        // "(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)");
        DATE_REGEX_MAP.put(dateString, "(\\d{4})-(\\d{2}|\\d{1})-(\\d{2}|\\d{1})");
        DATE_REGEX_MAP.put(dateLongString, "(\\d{4})(\\d{2})(\\d{2})");
        DATE_REGEX_MAP.put(dateTimeLongString, "(\\d{4})(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{2})");
        DATE_REGEX_MAP.put(dateTimeString,
                "(\\d{4})-(\\d{2}|\\d{1})-(\\d{2}|\\d{1}) (\\d{2}|\\d{1}):(\\d{2}|\\d{1}):(\\d{2}|\\d{1})");
    }

    /**
     * 获取日期当天为星期几
     *
     * @param date
     * @return String
     * @author LIRUI
     */
    public static String getDayOfWeek(Date date) {
        if (date == null)
            throw new NullPointerException("the param 'date' can not be null!");
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.SUNDAY)
            return "日";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY)
            return "一";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.TUESDAY)
            return "二";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.WEDNESDAY)
            return "三";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.THURSDAY)
            return "四";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.FRIDAY)
            return "五";
        if (c.get(Calendar.DAY_OF_WEEK) == Calendar.SATURDAY)
            return "六";
        return "";
    }

    public static void main(String[] args) {
        String dateString1 = "1234-5-06 11:22:33";
        Pattern p = Pattern.compile(DATE_REGEX_MAP.get("yyyy-MM-dd HH:mm:ss"));
        Matcher m = p.matcher(dateString1);
        boolean b = m.matches();
        System.out.println(b);
        System.out.println(format(parseStr(dateString1)));
        Date d = new Date();
        System.out.println(getDayOfWeek(d));
    }

    public static String getSystemDateTime() {
        Date result = new Date();
        String dateStr = format(result, dateTimeString);
        // result = parseStr(dateStr, dateTimeString);
        return dateStr;
    }

    public static Date getCurrentDate() {
        return new Date();
    }

    /**
     * 获取当月最小时间
     *
     * @param
     * @return Date
     * @author liwu
     */
    public static Date getMonthMinTime() {
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.MONTH) + 1;
        int year = calendar.get(Calendar.YEAR);
        String dateStr = year + "-" + month + "-01 00:00:00";
        return parseStr(dateStr);
    }

    /**
     * 计算两个日期的时间差,返回天-小时-分钟
     *
     * @param formatTime1
     * @param formatTime2
     * @return
     */
    public static String getTimeDifference(Timestamp formatTime1, Timestamp formatTime2) {
        SimpleDateFormat timeformat = new SimpleDateFormat("yyyy-MM-dd,HH:mm:ss");
        long t1 = 0L;
        long t2 = 0L;
        try {
            t1 = timeformat.parse(getTimeStampNumberFormat(formatTime1)).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        try {
            t2 = timeformat.parse(getTimeStampNumberFormat(formatTime2)).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        // 因为t1-t2得到的是毫秒级,所以要初3600000得出小时.算天数或秒同理
        int hours = (int) ((t1 - t2) / 3600000);
        int minutes = (int) (((t1 - t2) / 1000 - hours * 3600) / 60);
        int second = (int) ((t1 - t2) / 1000 - hours * 3600 - minutes * 60);
        return "" + hours + "小时" + minutes + "分" + second + "秒";
    }

    /**
     * 计算两个日期的时间差,返回分钟
     *
     * @param formatTime1
     * @param formatTime2
     * @return
     */
    public static int getTimeMinutes(Timestamp formatTime1, Timestamp formatTime2) {
        SimpleDateFormat timeformat = new SimpleDateFormat("yyyy-MM-dd,HH:mm:ss");
        long t1 = 0L;
        long t2 = 0L;
        try {
            t1 = timeformat.parse(getTimeStampNumberFormat(formatTime1)).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        try {
            t2 = timeformat.parse(getTimeStampNumberFormat(formatTime2)).getTime();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        // 因为t1-t2得到的是毫秒级,所以要初3600000得出小时.算天数或秒同理
        int minutes = (int) ((t1 - t2) / (1000 * 60));
        return minutes;
    }

    /**
     * 格式化时间 Locale是设置语言敏感操作
     *
     * @param formatTime
     * @return
     */
    public static String getTimeStampNumberFormat(Timestamp formatTime) {
        SimpleDateFormat m_format = new SimpleDateFormat("yyyy-MM-dd,HH:mm:ss", new Locale("zh", "cn"));
        return m_format.format(formatTime);
    }


    /**
     * 增加天数
     *
     * @param curDateType
     * @param days
     * @return
     */
    public static Date addDays(Date curDateType, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDateType);
        calendar.add(Calendar.DAY_OF_MONTH, days);
        return calendar.getTime();
    }

    public static Date subDays(Date curDateType, int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(curDateType);
        calendar.add(Calendar.DAY_OF_MONTH, -days);
        return calendar.getTime();
    }

    /**
     * 获取两时间相差的天数
     *
     * @param beginDate
     * @param endDate
     * @return
     */
    public static int getDateDifference(Date beginDate, Date endDate) {
        return (int) ((endDate.getTime() / 86400000L) - (beginDate.getTime() / 86400000L));
    }
    //生成时间戳
    public static String getDateTimeString(){
        return new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
    }

}
