package com.webspringboot.mapper;

import com.webspringboot.po.Module;
import com.webspringboot.po.ModuleExample;
import java.util.List;

public interface ModuleMapper {
    int countByExample(ModuleExample example);

    int deleteByPrimaryKey(Integer mid);

    int insert(Module record);

    int insertSelective(Module record);

    List<Module> selectByExample(ModuleExample example);

    Module selectByPrimaryKey(Integer mid);

    int updateByPrimaryKeySelective(Module record);

    int updateByPrimaryKey(Module record);
}