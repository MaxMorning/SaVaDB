package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class UserWatchingRegionsPK implements Serializable {
    @Column(name = "usr_id", nullable = false)
    @Id
    private Integer usrId;

    @Column(name = "watching_r_id", nullable = false)
    @Id
    private Integer watchingRId;

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
}
