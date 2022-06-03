package org.savadb.backend.repo.Account;

import org.savadb.backend.entity.CompRecordEntity;
import org.savadb.backend.entity.CompRecordEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaCompRecordRepo extends JpaRepository<CompRecordEntity, CompRecordEntityPK> {
    @Query("select c from CompRecordEntity c where c.usrId = ?1 order by c.compDate DESC")
    List<CompRecordEntity> getUserRecords(Integer usrId);

    @Query("select c from CompRecordEntity c where c.idxOfUsr = ?1 and c.usrId = ?2")
    CompRecordEntity getSingleRecord(Integer idxOfUsr, Integer usrId);

    @Query("select c from CompRecordEntity c where c.seqSha1Value = ?1")
    CompRecordEntity findSameSeq(String seqSha1Value);


}
