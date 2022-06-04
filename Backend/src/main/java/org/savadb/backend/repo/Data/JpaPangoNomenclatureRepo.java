package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.PangoNomenclatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JpaPangoNomenclatureRepo extends JpaRepository<PangoNomenclatureEntity, Integer> {
    PangoNomenclatureEntity findByVariant(String variant);

    @Query("select p from PangoNomenclatureEntity p " +
            "where upper(p.variant) like upper(concat('%', ?1, '%')) " +
            "order by p.variant")
    List<PangoNomenclatureEntity> findLineageContains(String variant);


}
