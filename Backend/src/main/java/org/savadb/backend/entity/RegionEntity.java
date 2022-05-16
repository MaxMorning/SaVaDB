package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Region", schema = "SaVa")
public class RegionEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "region_id")
    private int regionId;

    @Basic
    @Column(name = "region_name")
    private String regionName;

    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
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

        if (regionId != that.regionId) return false;
        if (!Objects.equals(regionName, that.regionName)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = regionId;
        result = 31 * result + (regionName != null ? regionName.hashCode() : 0);
        return result;
    }
}
