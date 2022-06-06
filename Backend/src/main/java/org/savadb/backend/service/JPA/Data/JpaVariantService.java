package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.VariantEntity;
import org.savadb.backend.repo.Data.JpaVariantRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Optional;

@Service
public class JpaVariantService {
    @Resource
    private JpaVariantRepo jpaVariantRepo;

    public VariantEntity findVariantById(Integer id) {
        Optional<VariantEntity> optionalVariantEntity = jpaVariantRepo.findById(id);
        if (optionalVariantEntity.isEmpty()) {
            return null;
        }
        return optionalVariantEntity.get();
    }

    public void saveVariant(VariantEntity variant) {
        jpaVariantRepo.save(variant);
    }
}
