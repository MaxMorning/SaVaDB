package org.savadb.backend.service.JPA;

import org.savadb.backend.entity.InfoMapEntity;
import org.savadb.backend.repo.JpaInfoMapRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class JpaInfoMapService {
    @Resource
    private JpaInfoMapRepo jpaInfoMapRepo;

    public String getValue(String key) {
        InfoMapEntity infoMapEntity = jpaInfoMapRepo.findByKey(key);

        if (infoMapEntity == null) {
            return null;
        }

        return infoMapEntity.getValue();
    }
}
