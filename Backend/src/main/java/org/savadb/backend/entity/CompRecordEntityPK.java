package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

public class CompRecordEntityPK implements Serializable {
    @Column(name = "idx_of_usr", nullable = false)
    @Id
    private Integer idxOfUsr;

    @Column(name = "usr_id", nullable = false)
    @Id
    private Integer usrId;

    public Integer getIdxOfUsr() {
        return idxOfUsr;
    }

    public void setIdxOfUsr(Integer idxOfUsr) {
        this.idxOfUsr = idxOfUsr;
    }

    public Integer getUsrId() {
        return usrId;
    }

    public void setUsrId(Integer usrId) {
        this.usrId = usrId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CompRecordEntityPK that = (CompRecordEntityPK) o;

        if (idxOfUsr != null ? !idxOfUsr.equals(that.idxOfUsr) : that.idxOfUsr != null) return false;
        if (usrId != null ? !usrId.equals(that.usrId) : that.usrId != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idxOfUsr != null ? idxOfUsr.hashCode() : 0;
        result = 31 * result + (usrId != null ? usrId.hashCode() : 0);
        return result;
    }
}
