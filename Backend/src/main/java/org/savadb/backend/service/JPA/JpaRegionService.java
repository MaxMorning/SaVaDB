package org.savadb.backend.service.JPA;

import org.savadb.backend.entity.RegionEntity;
import org.savadb.backend.repo.JpaRegionRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaRegionService {
    @Resource
    private JpaRegionRepo jpaRegionRepo;

    public RegionEntity findByRegionName(String name) {
        return jpaRegionRepo.findByRegionName(name);
    }

    public List<RegionEntity> findAllContains(String key) {
        return jpaRegionRepo.findAllContains(key);
    }
}
