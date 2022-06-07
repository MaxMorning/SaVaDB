package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.ApiInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaAPIInfoRepo extends JpaRepository<ApiInfoEntity, String> {
    @Query("select a from ApiInfoEntity a")
    List<ApiInfoEntity> getAllAPI();

    @Query("select a from ApiInfoEntity a " +
            "where upper(a.url) like upper(concat('%', ?1, '%')) or upper(a.descZhCn) like upper(concat('%', ?1, '%')) or upper(a.descEnUs) like upper(concat('%', ?1, '%'))")
    List<ApiInfoEntity> searchAPI(String key);


}
