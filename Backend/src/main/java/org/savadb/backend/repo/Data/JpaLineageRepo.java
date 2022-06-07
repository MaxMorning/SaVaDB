package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.LineageEntity;
import org.savadb.backend.entity.LineageEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaLineageRepo extends JpaRepository<LineageEntity, LineageEntityPK> {
    @Query("select l from LineageEntity l where l.parentVariantId = ?1")
    List<LineageEntity> getAllChildren(Integer parentVariantId);

    @Query(value = "select count(*) from lineage where parent_variant_id = ?1", nativeQuery = true)
    long getChildrenCnt(Integer parentVariantId);

    LineageEntity findByChildVariantId(Integer childVId);
}
