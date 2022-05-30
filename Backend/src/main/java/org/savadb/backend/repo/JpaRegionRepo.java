package org.savadb.backend.repo;

import org.savadb.backend.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaRegionRepo extends JpaRepository<RegionEntity, Long> {
    RegionEntity findByRegionName(String regionName);
}
