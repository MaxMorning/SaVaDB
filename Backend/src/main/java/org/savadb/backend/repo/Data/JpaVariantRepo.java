package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.VariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaVariantRepo extends JpaRepository<VariantEntity, Integer> {
    @Query("select v from VariantEntity v where v.monitorLevel = ?1")
    List<VariantEntity> getAllMonitor(String monitorLevel);


}
