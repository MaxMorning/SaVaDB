package org.savadb.backend.service.JPA.Account;

import org.savadb.backend.entity.CompRecordEntity;
import org.savadb.backend.repo.Account.JpaCompRecordRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaCompRecordService {
    @Resource
    private JpaCompRecordRepo jpaCompRecordRepo;

    public List<CompRecordEntity> getUserRecords(Integer usrId) {
        return jpaCompRecordRepo.getUserRecords(usrId);
    }

    public CompRecordEntity getSingleRecord(Integer idxOfUsr, Integer usrId) {
        return jpaCompRecordRepo.getSingleRecord(idxOfUsr, usrId);
    }

    public CompRecordEntity findSameSeq(String seqSha1Value) {
        return jpaCompRecordRepo.findSameSeq(seqSha1Value);
    }

    public void insertRecord(CompRecordEntity compRecord) {
        jpaCompRecordRepo.save(compRecord);
    }
}
