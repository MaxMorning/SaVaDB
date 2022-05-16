package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "Statistic", schema = "SaVa")
@IdClass(StatisticEntityPK.class)
public class StatisticEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "region_id", nullable = false)
    private int regionId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "stat_date", nullable = false)
    private Date statDate;

    @Basic
    @Column(name = "existing_confirmed_cnt", nullable = false)
    private int existingConfirmedCnt;

    @Basic
    @Column(name = "death_cnt", nullable = false)
    private int deathCnt;

    @Basic
    @Column(name = "cured_cnt", nullable = false)
    private int curedCnt;

    @ManyToOne
    @JoinColumn(name = "region_id", referencedColumnName = "region_id", nullable = false)
    private RegionEntity regionByRegionId;

    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(Integer regionId) {
        this.regionId = regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    public Date getStatDate() {
        return statDate;
    }

    public void setStatDate(Date statDate) {
        this.statDate = statDate;
    }

    public int getExistingConfirmedCnt() {
        return existingConfirmedCnt;
    }

    public void setExistingConfirmedCnt(Integer existingConfirmedCnt) {
        this.existingConfirmedCnt = existingConfirmedCnt;
    }

    public void setExistingConfirmedCnt(int existingConfirmedCnt) {
        this.existingConfirmedCnt = existingConfirmedCnt;
    }

    public int getDeathCnt() {
        return deathCnt;
    }

    public void setDeathCnt(Integer deathCnt) {
        this.deathCnt = deathCnt;
    }

    public void setDeathCnt(int deathCnt) {
        this.deathCnt = deathCnt;
    }

    public int getCuredCnt() {
        return curedCnt;
    }

    public void setCuredCnt(Integer curedCnt) {
        this.curedCnt = curedCnt;
    }

    public void setCuredCnt(int curedCnt) {
        this.curedCnt = curedCnt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StatisticEntity that = (StatisticEntity) o;

        if (regionId != that.regionId) return false;
        if (existingConfirmedCnt != that.existingConfirmedCnt) return false;
        if (deathCnt != that.deathCnt) return false;
        if (curedCnt != that.curedCnt) return false;
        if (!Objects.equals(statDate, that.statDate)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = regionId;
        result = 31 * result + (statDate != null ? statDate.hashCode() : 0);
        result = 31 * result + existingConfirmedCnt;
        result = 31 * result + deathCnt;
        result = 31 * result + curedCnt;
        return result;
    }

    public RegionEntity getRegionByRegionId() {
        return regionByRegionId;
    }

    public void setRegionByRegionId(RegionEntity regionByRegionId) {
        this.regionByRegionId = regionByRegionId;
    }
}
