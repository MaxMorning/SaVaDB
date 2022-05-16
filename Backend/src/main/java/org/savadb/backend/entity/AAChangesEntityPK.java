package org.savadb.backend.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class AAChangesEntityPK implements Serializable {
    @Column(name = "v_id", nullable = false)
    @Id
    private Integer vId;

    @Column(name = "AA_changes", nullable = false, length = 16)
    @Id
    private String aaChanges;

    public Integer getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
        this.vId = vId;
    }

    public String getAaChanges() {
        return aaChanges;
    }

    public void setAaChanges(String aaChanges) {
        this.aaChanges = aaChanges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AAChangesEntityPK that = (AAChangesEntityPK) o;

        if (!Objects.equals(vId, that.vId)) return false;
        if (!Objects.equals(aaChanges, that.aaChanges)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId != null ? vId.hashCode() : 0;
        result = 31 * result + (aaChanges != null ? aaChanges.hashCode() : 0);
        return result;
    }
}
