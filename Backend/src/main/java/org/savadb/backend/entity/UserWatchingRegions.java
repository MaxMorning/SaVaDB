package org.savadb.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "user_watching_region", schema = "SaVa")
@IdClass(UserWatchingRegionsPK.class)
public class UserWatchingRegions {
    @Id
    @Column(name = "usr_id", nullable = false)
    private Integer usrId;

    @Id
    @Column(name = "watching_r_id", nullable = false)
    private Integer watchingRId;

    @ManyToOne
    @JoinColumn(name = "usr_id", referencedColumnName = "usr_id", nullable = false, insertable = false, updatable = false)
    private UserEntity userByUsrId;

    @ManyToOne
    @JoinColumn(name = "watching_r_id", referencedColumnName = "region_id", nullable = false, insertable = false, updatable = false)
    private RegionEntity regionByWatchingRId;

    public Integer getUsrId() {
        return usrId;
    }

    public void setUsrId(Integer usrId) {
        this.usrId = usrId;
    }

    public Integer getWatchingRId() {
        return watchingRId;
    }

    public void setWatchingRId(Integer watchingRId) {
        this.watchingRId = watchingRId;
    }

    public UserEntity getUserByUsrId() {
        return userByUsrId;
    }

    public RegionEntity getRegionByWatchingRId() {
        return regionByWatchingRId;
    }
}
