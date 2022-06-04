package org.savadb.backend.repo;

import org.savadb.backend.entity.InfoMapEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaInfoMapRepo extends JpaRepository<InfoMapEntity, String> {
    InfoMapEntity findByKey(String key);
}
