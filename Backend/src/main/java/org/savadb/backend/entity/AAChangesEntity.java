package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "AAChanges", schema = "SaVa")
@IdClass(AAChangesEntityPK.class)
public class AAChangesEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id")
    private int vId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "AA_changes")
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

        AAChangesEntity that = (AAChangesEntity) o;

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
