package org.savadb.backend.entity;

import javax.persistence.*;

@Entity
@Table(name = "UserWatching", schema = "SaVa")
@IdClass(UserWatchingEntityPK.class)
public class UserWatchingEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "usr_id")
    private int usrId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "watching_v_id")
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

        UserWatchingEntity that = (UserWatchingEntity) o;

        if (usrId != that.usrId) return false;
        return watchingVId == that.watchingVId;
    }

    @Override
    public int hashCode() {
        int result = usrId;
        result = 31 * result + watchingVId;
        return result;
    }
}
