package org.savadb.backend.service.JPA.Data;

import org.savadb.backend.entity.StatisticEntity;
import org.savadb.backend.repo.Data.JpaStatRepo;
import org.savadb.backend.service.JPA.JpaInfoMapService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
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

    public List<StatisticEntity> getStatByArgs(Long regionId, Date startDate, Date endDate, Long step) {
        return jpaStatRepo.getStatByArgs(regionId, startDate, endDate, step);
    }
}
