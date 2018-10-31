package com.ptp.framework.cache;

import com.ptp.framework.ResConstants;
import com.ptp.framework.exceptions.ZhongyingiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Set;
import java.util.concurrent.TimeUnit;


import java.util.Set;
import java.util.concurrent.TimeUnit;

/**
 * Created with IntelliJ IDEA.
 * User: liuhao
 */
public abstract class BaseRedisMg<K, V> implements Cache<K, V>{


    private static final Logger LOG = LoggerFactory.getLogger(BaseRedisMg.class);

    @Autowired
    protected RedisTemplate<K, V> redisTemplate;

    @Override
    public void put(K key, V value) {
        try {
            BoundValueOperations<K, V> valueOperations = redisTemplate.boundValueOps(key);
            valueOperations.set(value);
        }catch (Exception e) {
            LOG.error(e.getMessage(),e);
            throw new ZhongyingiException(ResConstants.PUT_DATA_CACHE_EXCEPTION.getCode() , ResConstants.PUT_DATA_CACHE_EXCEPTION.getMsg());
        }

    }

    /**
     * Redis 缓存时间单位默认设置为分钟
     *
     * @param key
     * @param value
     * @param expired
     */
    @Override
    public void put(K key, V value, long expired) {
        try {
            BoundValueOperations<K, V> valueOperations = redisTemplate.boundValueOps(key);
            if (expired > 0)
                valueOperations.set(value, expired, TimeUnit.MINUTES);
            else
                valueOperations.set(value);
        }catch (Exception e) {
            LOG.error(e.getMessage(),e);
            throw new ZhongyingiException(ResConstants.PUT_DATA_CACHE_EXCEPTION.getCode() ,ResConstants.PUT_DATA_CACHE_EXCEPTION.getMsg());
        }

    }

    @Override
    public V get(final K key) {
        try {
            BoundValueOperations<K, V> valueOperations = redisTemplate.boundValueOps(key);
            return valueOperations.get();
        }catch (Exception e) {
            LOG.error(e.getMessage(),e);
            throw new ZhongyingiException(ResConstants.GET_DATA_CACHE_EXCEPTION.getCode() ,ResConstants.GET_DATA_CACHE_EXCEPTION.getMsg());
        }

    }

    public Set<K> getKeys(K pattern) {
        return redisTemplate.keys(pattern);
    }

    @Override
    public boolean exists(K key) {
        return redisTemplate.hasKey(key);
    }

    @Override
    public long size() {
        return redisTemplate.execute(new RedisCallback<Long>() {
            @Override
            public Long doInRedis(RedisConnection connection) throws DataAccessException {
                return connection.dbSize();
            }
        });
    }

    @Override
    public void del(K key) {
        if (exists(key))
            redisTemplate.delete(key);
    }

    @Override
    public void del(K... keys) {
        if (keys.length > 0) {
            for (K key : keys) {
                del(key);
            }
        }
    }

    @Override
    public void clear() {
        //TODO
    }

    @Override
    public long ttl(K key) {
        return redisTemplate.getExpire(key);
    }

    public RedisTemplate<K, V> getRedisTemplate() {
        return redisTemplate;
    }

    public void setRedisTemplate(RedisTemplate<K, V> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
}
