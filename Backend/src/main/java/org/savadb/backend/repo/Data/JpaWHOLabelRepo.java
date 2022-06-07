package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.WhoLabelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaWHOLabelRepo extends JpaRepository<WhoLabelEntity, Integer> {
    @Query("select w from WhoLabelEntity w where upper(w.label) like upper(concat('%', ?1, '%'))")
    List<WhoLabelEntity> findAllLabelContains(String label);


}
