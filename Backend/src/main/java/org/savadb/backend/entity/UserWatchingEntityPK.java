package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

public class UserWatchingEntityPK implements Serializable {
    @Column(name = "usr_id", nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int usrId;

    @Column(name = "watching_v_id", nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int watchingVId;

    public int getUsrId() {
        return usrId;
    }

    public void setUsrId(int usrId) {
        this.usrId = usrId;
    }

    public int getWatchingVId() {
        return watchingVId;
    }

    public void setWatchingVId(int watchingVId) {
        this.watchingVId = watchingVId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserWatchingEntityPK that = (UserWatchingEntityPK) o;

        if (usrId != that.usrId) return false;
        if (watchingVId != that.watchingVId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = usrId;
        result = 31 * result + watchingVId;
        return result;
    }
}
