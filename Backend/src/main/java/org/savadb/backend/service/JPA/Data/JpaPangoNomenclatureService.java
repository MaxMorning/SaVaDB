package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.PangoNomenclatureEntity;
import org.savadb.backend.repo.Data.JpaPangoNomenclatureRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class JpaPangoNomenclatureService {
    @Resource
    private JpaPangoNomenclatureRepo jpaPangoNomenclatureRepo;

    public PangoNomenclatureEntity findByVariantName(String name) {
        return jpaPangoNomenclatureRepo.findByVariant(name);
    }

    public List<PangoNomenclatureEntity> findLineageContains(String key) {
        return jpaPangoNomenclatureRepo.findLineageContains(key);
    }

    public PangoNomenclatureEntity getById(Integer id) {
        Optional<PangoNomenclatureEntity> optionalPangoNomenclature = jpaPangoNomenclatureRepo.findById(id);
        if (optionalPangoNomenclature.isEmpty()) {
            return null;
        }
        return optionalPangoNomenclature.get();
    }
}
