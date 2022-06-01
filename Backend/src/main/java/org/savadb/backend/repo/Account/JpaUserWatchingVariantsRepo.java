package org.savadb.backend.repo.Account;

import org.savadb.backend.entity.UserWatchingEntity;
import org.savadb.backend.entity.UserWatchingEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaUserWatchingVariantsRepo extends JpaRepository<UserWatchingEntity, UserWatchingEntityPK> {
    @Query("select u from UserWatchingEntity u where u.usrId = ?1")
    List<UserWatchingEntity> findAllByUsrId(Integer usrId);

}
