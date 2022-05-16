package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "AAChanges", schema = "SaVa")
@IdClass(AAChangesEntityPK.class)
public class AAChangesEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id", nullable = false)
    private int vId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "AA_changes", nullable = false, length = 16)
    private String aaChanges;

    @ManyToOne
    @JoinColumn(name = "v_id", referencedColumnName = "v_id", nullable = false)
    private VariantEntity variantByVId;

    public int getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
        this.vId = vId;
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

    public VariantEntity getVariantByVId() {
        return variantByVId;
    }

    public void setVariantByVId(VariantEntity variantByVId) {
        this.variantByVId = variantByVId;
    }
}
