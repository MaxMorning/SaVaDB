package org.savadb.backend.utils;

import org.savadb.backend.entity.CompRecordEntity;
import org.savadb.backend.service.JPA.Account.JpaCompRecordService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Component
public class CudaCompareThread implements Runnable{
    private Thread thread;

    @Resource
    private JpaCompRecordService jpaCompRecordService;

    @Override
    public void run() {
        System.out.println("[LOG]\tCuda Service Start up.");

        while (true) {
            // 要一个匹配任务
            CompRecordEntity compRecord = jpaCompRecordService.findOneCompareTask();

            if (compRecord == null || jpaCompRecordService.getComparingTaskCount() > 0) {
                try {
                    Thread.sleep(5 * 1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    return;
                }
            }
            else {
                // GPU空闲，可以进行匹配
                compRecord.setStatus((byte) 1);
                compRecord.setCompResultPath("F:\\TestCode\\CUDA\\GenomeCompareGPU\\resultDir\\" + compRecord.getSeqSha1Value() + "_result.txt");
                jpaCompRecordService.saveRecord(compRecord);

                System.out.println("[LOG]\tStart compare " + compRecord.getSeqSha1Value());

                Process process = null;
                InputStream errorStream = null;
                InputStream stdOutStream = null;
                try {
                    process = Runtime.getRuntime().exec("F:\\TestCode\\CUDA\\GenomeCompareGPU\\compare.exe " + compRecord.getSeqFilePath() + ' ' + compRecord.getCompResultPath());
                    errorStream = process.getErrorStream();
                    stdOutStream = process.getInputStream();
                    int retValue = process.waitFor();
                    if (retValue != 0) {
                        System.out.println("CudaCompare Return Value : " + retValue);
                    }

                    // 匹配完成
                    System.out.println("stderr: " + Arrays.toString(errorStream.readAllBytes()));
                    System.out.println("stdout: " + Arrays.toString(stdOutStream.readAllBytes()));

                    // 把其他相同seq的任务都标记为Done
                    List<CompRecordEntity> compRecordEntityList = jpaCompRecordService.findSameSeq(compRecord.getSeqSha1Value());
                    for (CompRecordEntity compRecordEntity : compRecordEntityList) {
                        compRecordEntity.setStatus((byte) 2);
                        jpaCompRecordService.saveRecord(compRecordEntity);
                    }

                    System.out.println("[LOG]\tEnd compare " + compRecord.getSeqSha1Value());
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void start () {
        if (thread == null) {
            thread = new Thread (this);
            thread.start ();
        }
    }
}
