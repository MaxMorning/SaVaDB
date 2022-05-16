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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vId;

    @Column(name = "AA_changes", nullable = false, length = 16)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String aaChanges;

    public int getvId() {
        return vId;
    }

    public void setvId(int vId) {
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

        if (vId != that.vId) return false;
        if (!Objects.equals(aaChanges, that.aaChanges)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId;
        result = 31 * result + (aaChanges != null ? aaChanges.hashCode() : 0);
        return result;
    }
}
