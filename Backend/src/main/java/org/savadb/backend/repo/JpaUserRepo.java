package org.savadb.backend.repo;

import org.savadb.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaUserRepo extends JpaRepository<UserEntity, Integer> {
    List<UserEntity> findAllByUsrName(String name);

    UserEntity findFirstByUsrName(String name);
}
