package com.ptp.framework.cache;

/**
 * Created by Administrator on 2018-08-23.
 */
public interface Cache<K, V> {

    void put(K key, V value);

    void put(K key, V value, long expired);

    V get(K key);

    boolean exists(K key);

    long size();

    void del(K key);

    void del(K... keys);

    void clear();

    long ttl(K key);
}

