package com.ssmstudy.serviceimpl;

import com.ssmstudy.mapper.BillMapper;
import com.ssmstudy.po.Bill;
import com.ssmstudy.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018-10-31.
 */

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private BillMapper billMapper;
    @Override
    public List<Bill> getList() {
        return  billMapper.selectList();
    }
}
