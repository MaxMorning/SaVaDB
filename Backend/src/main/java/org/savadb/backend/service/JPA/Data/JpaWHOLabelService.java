package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.WhoLabelEntity;
import org.savadb.backend.repo.Data.JpaWHOLabelRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class JpaWHOLabelService {
    @Resource
    private JpaWHOLabelRepo jpaWHOLabelRepo;

    public void saveWHOLabel(WhoLabelEntity whoLabel) {
        jpaWHOLabelRepo.save(whoLabel);
    }

    public void deleteWHOLabel(WhoLabelEntity whoLabel) {
        jpaWHOLabelRepo.delete(whoLabel);
    }

    public List<WhoLabelEntity> findAllLabelContains(String label) {
        return jpaWHOLabelRepo.findAllLabelContains(label);
    }
}
