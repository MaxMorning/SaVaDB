package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_watching", schema = "SaVa")
@IdClass(UserWatchingEntityPK.class)
public class UserWatchingEntity {
    @Id
    @Column(name = "usr_id", nullable = false)
    private Integer usrId;

    @Id
    @Column(name = "watching_v_id", nullable = false)
    private Integer watchingVId;

    @ManyToOne
    @JoinColumn(name = "usr_id", referencedColumnName = "usr_id", nullable = false, insertable = false, updatable = false)
    private UserEntity userByUsrId;

    @ManyToOne
    @JoinColumn(name = "watching_v_id", referencedColumnName = "v_id", nullable = false, insertable = false, updatable = false)
    private VariantEntity variantByWatchingVId;

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

        UserWatchingEntity that = (UserWatchingEntity) o;

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

    public UserEntity getUserByUsrId() {
        return userByUsrId;
    }

    public void setUserByUsrId(UserEntity userByUsrId) {
        this.userByUsrId = userByUsrId;
    }

    public VariantEntity getVariantByWatchingVId() {
        return variantByWatchingVId;
    }

    public void setVariantByWatchingVId(VariantEntity variantByWatchingVId) {
        this.variantByWatchingVId = variantByWatchingVId;
    }
}
