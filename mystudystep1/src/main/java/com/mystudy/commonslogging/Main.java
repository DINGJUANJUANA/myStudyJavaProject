package com.mystudy.commonslogging;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.log4j.Logger;

/**
 * Created by Administrator on 2018-10-30.
 */
public class Main {
    private final static Log log = LogFactory.getLog(Main.class);

    private final static Logger LOGGER=Logger.getLogger(Main.class);
    public static void main(String[] args){
        log.info("begin :main run");
        log.error("this is error");

        log.debug("DEBUG ...");
        log.info("INFO ...");
        log.error("ERROR ...");

        LOGGER.debug("testabc");

    }
}
