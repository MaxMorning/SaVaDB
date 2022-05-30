package org.savadb.backend.repo;

import org.savadb.backend.entity.StatisticEntity;
import org.savadb.backend.entity.StatisticEntityPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;


public interface JpaStatRepo  extends JpaRepository<StatisticEntity, StatisticEntityPK> {
    @Query(value = "select existing_confirmed_cnt, death_cnt, cured_cnt from cached_world_stat_info where stat_date = (select max(stat_date) from cached_world_stat_info)", nativeQuery = true)
    Map<String, Object> getCurrentWorldStat();

    @Query(value = "select existing_confirmed_cnt, death_cnt, cured_cnt from cached_world_stat_info where (stat_date + 1) = (select max(stat_date) from cached_world_stat_info)", nativeQuery = true)
    Map<String, Object> getYesterdayWorldStat();
}
