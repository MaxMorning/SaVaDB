package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "region", schema = "SaVa")
public class RegionEntity {
    @Id
    @Column(name = "region_id", nullable = false)
    private Integer regionId;

    @Basic
    @Column(name = "region_name", nullable = false, length = 16)
    private String regionName;

    @OneToMany(mappedBy = "regionByRegionId")
    private Collection<StatisticEntity> statisticsByRegionId;

    public Integer getRegionId() {
        return regionId;
    }

    public void setRegionId(Integer regionId) {
        this.regionId = regionId;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        RegionEntity that = (RegionEntity) o;

        if (!Objects.equals(regionId, that.regionId)) return false;
        if (!Objects.equals(regionName, that.regionName)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = regionId != null ? regionId.hashCode() : 0;
        result = 31 * result + (regionName != null ? regionName.hashCode() : 0);
        return result;
    }

    public Collection<StatisticEntity> getStatisticsByRegionId() {
        return statisticsByRegionId;
    }

    public void setStatisticsByRegionId(Collection<StatisticEntity> statisticsByRegionId) {
        this.statisticsByRegionId = statisticsByRegionId;
    }
}
