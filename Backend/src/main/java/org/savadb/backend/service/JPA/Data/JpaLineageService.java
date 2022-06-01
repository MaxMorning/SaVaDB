package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.LineageEntity;
import org.savadb.backend.repo.Data.JpaLineageRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaLineageService {
    @Resource
    private JpaLineageRepo jpaLineageRepo;

    public List<LineageEntity> getAllChildren(Integer parentVariantId) {
        return jpaLineageRepo.getAllChildren(parentVariantId);
    }

    public long getChildrenCnt(Integer parentVariantId) {
        return jpaLineageRepo.getChildrenCnt(parentVariantId);
    }
}
