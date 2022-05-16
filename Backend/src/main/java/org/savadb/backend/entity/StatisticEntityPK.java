package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Date;
import java.util.Objects;

public class StatisticEntityPK implements Serializable {
    @Column(name = "region_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int regionId;
    @Column(name = "stat_date")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Date statDate;

    public int getRegionId() {
        return regionId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StatisticEntityPK that = (StatisticEntityPK) o;

        if (regionId != that.regionId) return false;
        if (!Objects.equals(statDate, that.statDate)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = regionId;
        result = 31 * result + (statDate != null ? statDate.hashCode() : 0);
        return result;
    }
}
