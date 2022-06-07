package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.ApiInfoEntity;
import org.savadb.backend.repo.Data.JpaAPIInfoRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaAPIInfoService {
    @Resource
    private JpaAPIInfoRepo jpaAPIInfoRepo;

    public List<ApiInfoEntity> getAllAPI() {
        return jpaAPIInfoRepo.getAllAPI();
    }

    public List<ApiInfoEntity> searchAPI(String key) {
        return jpaAPIInfoRepo.searchAPI(key);
    }
}
