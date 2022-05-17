package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "statistic", schema = "SaVa")
@IdClass(StatisticEntityPK.class)
public class StatisticEntity {
    @Id
    @Column(name = "region_id", nullable = false)
    private Integer regionId;

    @Id
    @Column(name = "stat_date", nullable = false)
    private Date statDate;

    @Basic
    @Column(name = "existing_confirmed_cnt", nullable = false)
    private Integer existingConfirmedCnt;

    @Basic
    @Column(name = "death_cnt", nullable = false)
    private Integer deathCnt;

    @Basic
    @Column(name = "cured_cnt", nullable = false)
    private Integer curedCnt;

    @ManyToOne
    @JoinColumn(name = "region_id", referencedColumnName = "region_id", nullable = false, insertable = false, updatable = false)
    private RegionEntity regionByRegionId;

    public Integer getRegionId() {
        return regionId;
    }

    public void setRegionId(Integer regionId) {
        this.regionId = regionId;
    }

    public Date getStatDate() {
        return statDate;
    }

    public void setStatDate(Date statDate) {
        this.statDate = statDate;
    }

    public Integer getExistingConfirmedCnt() {
        return existingConfirmedCnt;
    }

    public void setExistingConfirmedCnt(Integer existingConfirmedCnt) {
        this.existingConfirmedCnt = existingConfirmedCnt;
    }

    public Integer getDeathCnt() {
        return deathCnt;
    }

    public void setDeathCnt(Integer deathCnt) {
        this.deathCnt = deathCnt;
    }

    public Integer getCuredCnt() {
        return curedCnt;
    }

    public void setCuredCnt(Integer curedCnt) {
        this.curedCnt = curedCnt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StatisticEntity that = (StatisticEntity) o;

        if (!Objects.equals(regionId, that.regionId)) return false;
        if (!Objects.equals(statDate, that.statDate)) return false;
        if (!Objects.equals(existingConfirmedCnt, that.existingConfirmedCnt))
            return false;
        if (!Objects.equals(deathCnt, that.deathCnt)) return false;
        if (!Objects.equals(curedCnt, that.curedCnt)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = regionId != null ? regionId.hashCode() : 0;
        result = 31 * result + (statDate != null ? statDate.hashCode() : 0);
        result = 31 * result + (existingConfirmedCnt != null ? existingConfirmedCnt.hashCode() : 0);
        result = 31 * result + (deathCnt != null ? deathCnt.hashCode() : 0);
        result = 31 * result + (curedCnt != null ? curedCnt.hashCode() : 0);
        return result;
    }

    public RegionEntity getRegionByRegionId() {
        return regionByRegionId;
    }

    public void setRegionByRegionId(RegionEntity regionByRegionId) {
        this.regionByRegionId = regionByRegionId;
    }
}
