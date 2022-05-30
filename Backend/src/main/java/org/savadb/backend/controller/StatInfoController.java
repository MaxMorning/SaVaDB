package org.savadb.backend.controller;

import org.savadb.backend.entity.RegionEntity;
import org.savadb.backend.entity.StatisticEntity;
import org.savadb.backend.service.JPA.Data.JpaStatService;
import org.savadb.backend.service.JPA.JpaRegionService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StatInfoController {
    @Resource
    private JpaStatService jpaStatService;

    @Resource
    private JpaRegionService jpaRegionService;

    @GetMapping("/data/getGlobalLatestStat")
    public Result<Map<String, Object>> getCurrentWorldStat() {
        return Result.resultFactory(EResult.SUCCESS, jpaStatService.getCurrentWorldStat());
    }

    @GetMapping("data/getStat")
    public Result<List<Long[]>> getStat(@RequestParam String region, @RequestParam Date startDate, @RequestParam Date endDate, @RequestParam Long step) {
        RegionEntity regionEntity = jpaRegionService.findByRegionName(region);
        if (regionEntity == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        Long region_id = Long.valueOf(regionEntity.getRegionId());

        List<StatisticEntity> statisticEntityList = jpaStatService.getStatByArgs(region_id, startDate, endDate, step);
        List<Long[]> statList = new ArrayList<>();

        for (int i = 1; i < statisticEntityList.size(); ++i) {
            Long[] data = new Long[3];

            StatisticEntity newStat = statisticEntityList.get(i);
            StatisticEntity oldStat = statisticEntityList.get(i - 1);
            data[0] = (long) (newStat.getExistingConfirmedCnt() - oldStat.getExistingConfirmedCnt());
            data[1] = (long) (newStat.getDeathCnt() - oldStat.getDeathCnt());
            data[2] = (long) (newStat.getCuredCnt() - oldStat.getCuredCnt());

            statList.add(data);
        }

        return Result.resultFactory(EResult.SUCCESS, statList);
    }
}
