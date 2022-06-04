package org.savadb.backend.repo.Account;

import org.savadb.backend.entity.UserWatchingRegionsEntity;
import org.savadb.backend.entity.UserWatchingRegionsPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaUserWatchingRegionsRepo extends JpaRepository<UserWatchingRegionsEntity, UserWatchingRegionsPK> {
    @Query("select u from UserWatchingRegionsEntity u where u.usrId = ?1")
    List<UserWatchingRegionsEntity> findAllByUsrId(Integer usrId);

    @Query("select u from UserWatchingRegionsEntity u where u.usrId = ?1 and u.watchingRId = ?2")
    UserWatchingRegionsEntity checkSubscribe(Integer usrId, Integer watchingRId);


}
