package com.ptp.framework.util;

import java.util.UUID;

/**
 * Created by Administrator on 2018-08-17.
 */
public class UUIDUtil {

    public static String getUUID() {
        String uuidString = UUID.randomUUID().toString();
        uuidString = uuidString.substring(0, 8);
        return uuidString;
    }

}
