package com.ptpstudy.sys.dao;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018-08-31.
 */
public interface BaseDao<T> {

    void save(T t);

    void save(Map<String, Object> map);

    void saveBatch(List<T> list);

    int update(T t);

    int update(Map<String, Object> map);

    int delete(Object id);

    int delete(Map<String, Object> map);

    int deleteBatch(Object[] id);

    T queryObject(Object id);

    List<T> queryList(Map<String, Object> map);

    List<T> queryList(Object id);

    int queryTotal(Map<String, Object> map);

    int queryTotal();
}
