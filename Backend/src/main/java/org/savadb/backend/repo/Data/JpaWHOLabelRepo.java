package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.WhoLabelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWHOLabelRepo extends JpaRepository<WhoLabelEntity, Integer> {
}
