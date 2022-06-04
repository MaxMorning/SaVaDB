package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.GeneInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaGeneInfoRepo extends JpaRepository<GeneInfoEntity, Integer> {

}
