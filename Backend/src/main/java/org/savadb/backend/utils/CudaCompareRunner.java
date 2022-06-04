package org.savadb.backend.utils;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
@Order(10)
public class CudaCompareRunner implements ApplicationRunner {
    @Resource
    private CudaCompareThread cudaCompareThread;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.cudaCompareThread.start();
    }
}
