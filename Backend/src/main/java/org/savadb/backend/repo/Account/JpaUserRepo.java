package org.savadb.backend.repo.Account;

import org.savadb.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaUserRepo extends JpaRepository<UserEntity, Integer> {
    List<UserEntity> findAllByUsrName(String name);

    UserEntity findFirstByUsrName(String name);

    @Query("select u from UserEntity u where u.email = ?1")
    UserEntity getUserByEmail(String email);


}
