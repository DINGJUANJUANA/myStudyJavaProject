package com.webspringboot.po;

import java.util.List;
import java.util.Set;

/**
 * Created by Administrator on 2018-09-12.
 */
public class Role {
    private Integer rid;

    private String rname;

    public Set<Module> getModules() {
        return modules;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    private Set<Module> modules;

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public String getRname() {
        return rname;
    }

    public void setRname(String rname) {
        this.rname = rname;
    }
}
