package org.savadb.backend.service.JPA;

import org.savadb.backend.repo.JpaStatRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Service
public class JpaStatService {
    @Resource
    private JpaStatRepo jpaStatRepo;

    @Resource
    private JpaInfoMapService jpaInfoMapService;

    public Map<String, Object> getCurrentWorldStat() {
        Map<String, Object> queryResult = jpaStatRepo.getCurrentWorldStat();
        Map<String, Object> yesterdayQueryResult = jpaStatRepo.getYesterdayWorldStat();

        Map<String, Object> result = new HashMap<>();
        result.put("confirmedTotal", queryResult.get("existing_confirmed_cnt"));
        result.put("confirmedYesterday", (Integer) queryResult.get("existing_confirmed_cnt") - (Integer) yesterdayQueryResult.get("existing_confirmed_cnt"));

        result.put("deathTotal", queryResult.get("death_cnt"));
        result.put("deathYesterday", (Integer) queryResult.get("death_cnt") - (Integer) yesterdayQueryResult.get("death_cnt"));

        result.put("curedTotal", queryResult.get("cured_cnt"));
        result.put("curedYesterday", (Integer) queryResult.get("cured_cnt") - (Integer) yesterdayQueryResult.get("cured_cnt"));

        result.put("updateTime", jpaInfoMapService.getValue("stat_update_time"));

        return result;
    }
}
