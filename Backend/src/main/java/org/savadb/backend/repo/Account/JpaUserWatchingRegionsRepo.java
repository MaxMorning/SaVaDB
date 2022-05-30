package org.savadb.backend.repo.Account;

import org.savadb.backend.entity.UserWatchingRegions;
import org.savadb.backend.entity.UserWatchingRegionsPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaUserWatchingRegionsRepo extends JpaRepository<UserWatchingRegions, UserWatchingRegionsPK> {
    @Query("select u from UserWatchingRegions u where u.usrId = ?1")
    List<UserWatchingRegions> findAllByUsrId(Integer usrId);
}
