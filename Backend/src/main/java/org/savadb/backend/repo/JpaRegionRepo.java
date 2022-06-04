package org.savadb.backend.repo;

import org.savadb.backend.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaRegionRepo extends JpaRepository<RegionEntity, Long> {
    RegionEntity findByRegionName(String regionName);

    @Query("select r from RegionEntity r " +
            "where upper(r.regionName) like upper(concat('%', ?1, '%')) " +
            "order by r.regionName")
    List<RegionEntity> findAllContains(String regionName);
}
