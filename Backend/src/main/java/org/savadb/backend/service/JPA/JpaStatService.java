package org.savadb.backend.service.JPA;

import org.savadb.backend.repo.JpaStatRepo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JpaStatService {
    @Resource
    private JpaStatRepo jpaStatRepo;

    public Map<String, Integer> getCurrentWorldStat() {
        Map<String, Object> queryResult = jpaStatRepo.getCurrentWorldStat();

        Map<String, Integer> result = new HashMap<>();
        result.put("confirmed_cnt", (Integer) queryResult.get("existing_confirmed_cnt"));

        result.put("death_cnt", (Integer) queryResult.get("death_cnt"));

        result.put("cured_cnt", (Integer) queryResult.get("cured_cnt"));
        return result;
    }
}
