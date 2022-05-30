package org.savadb.backend.service.JPA.Account;

import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.repo.Account.JpaUserRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class JpaUserService {
    @Resource
    private JpaUserRepo jpaUserRepo;

    public UserEntity findById(int id) {
        Optional<UserEntity> optionalUser = jpaUserRepo.findById(id);
        return optionalUser.orElse(null);
    }

    public List<UserEntity> findAllByUsrName(String name) {
        return jpaUserRepo.findAllByUsrName(name);
    }

    public UserEntity findByUsrName(String name) {
        return jpaUserRepo.findFirstByUsrName(name);
    }

    public void insertUser(UserEntity user) {
        jpaUserRepo.save(user);
    }
}
