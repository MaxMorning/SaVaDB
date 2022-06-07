package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.repo.Data.JpaGeneInfoRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.EntityNotFoundException;

@Service
public class JpaGeneInfoService {
    @Resource
    private JpaGeneInfoRepo jpaGeneInfoRepo;

    public String getPath(Integer vId) {
        try {
            return jpaGeneInfoRepo.getById(vId).getcDnaSequencePath();
        }
        catch (EntityNotFoundException e) {
            return null;
        }
    }
}
