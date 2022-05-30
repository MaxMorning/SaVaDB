package org.savadb.backend.repo.Data;

import org.savadb.backend.entity.StatisticEntity;
import org.savadb.backend.entity.StatisticEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Map;


public interface JpaStatRepo  extends JpaRepository<StatisticEntity, StatisticEntityPK> {
    @Query(value = "select existing_confirmed_cnt, death_cnt, cured_cnt from cached_world_stat_info where stat_date = (select max(stat_date) from cached_world_stat_info)", nativeQuery = true)
    Map<String, Object> getCurrentWorldStat();

    @Query(value = "select existing_confirmed_cnt, death_cnt, cured_cnt from cached_world_stat_info where (stat_date + 1) = (select max(stat_date) from cached_world_stat_info)", nativeQuery = true)
    Map<String, Object> getYesterdayWorldStat();

    @Query(value = "select * from statistic where (region_id = ?1) and (datediff(stat_date, ?2) % ?4 = 0) and (datediff(stat_date, ?3) < 0) order by stat_date", nativeQuery = true)
    List<StatisticEntity> getStatByArgs(Long regionId, Date startDate, Date endDate, Long step);
}
