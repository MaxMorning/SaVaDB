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
    List<CompRecordEntity> findSameSeq(String seqSha1Value);

//    @Query(value = "select * from comp_record where seq_sha1_value = ?1 limit 1", nativeQuery = true)
//    CompRecordEntity findSameSeq(String seqSha1Value);

    @Deprecated
    @Query(value = "select * from comp_record where status = 0 limit 1 order by comp_date", nativeQuery = true)
    CompRecordEntity findOneCompareTask();

    @Query("select c from CompRecordEntity c where c.status = 0 order by c.compDate")
    List<CompRecordEntity> findAllCompareTask();

    @Query(value = "select count(*) from comp_record where status = 1", nativeQuery = true)
    Integer getComparingTaskCount();
}
