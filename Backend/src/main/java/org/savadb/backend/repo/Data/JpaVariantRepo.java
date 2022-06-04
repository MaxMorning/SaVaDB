package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.VariantEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaVariantRepo extends JpaRepository<VariantEntity, Integer> {
}
