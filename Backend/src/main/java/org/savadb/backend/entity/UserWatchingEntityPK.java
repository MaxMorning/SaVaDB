package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class UserWatchingEntityPK implements Serializable {
    @Column(name = "usr_id", nullable = false)
    @Id
    private Integer usrId;

    @Column(name = "watching_v_id", nullable = false)
    @Id
    private Integer watchingVId;

    public Integer getUsrId() {
        return usrId;
    }

    public void setUsrId(Integer usrId) {
        this.usrId = usrId;
    }

    public Integer getWatchingVId() {
        return watchingVId;
    }

    public void setWatchingVId(Integer watchingVId) {
        this.watchingVId = watchingVId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserWatchingEntityPK that = (UserWatchingEntityPK) o;

        if (!Objects.equals(usrId, that.usrId)) return false;
        if (!Objects.equals(watchingVId, that.watchingVId)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = usrId != null ? usrId.hashCode() : 0;
        result = 31 * result + (watchingVId != null ? watchingVId.hashCode() : 0);
        return result;
    }
}
