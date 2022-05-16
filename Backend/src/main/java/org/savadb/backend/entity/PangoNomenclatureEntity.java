package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "PangoNomenclature", schema = "SaVa")
public class PangoNomenclatureEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id")
    private int vId;

    @Basic
    @Column(name = "variant")
    private String variant;

    public int getvId() {
        return vId;
    }

    public void setvId(int vId) {
        this.vId = vId;
    }

    public String getVariant() {
        return variant;
    }

    public void setVariant(String variant) {
        this.variant = variant;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PangoNomenclatureEntity that = (PangoNomenclatureEntity) o;

        if (vId != that.vId) return false;
        if (!Objects.equals(variant, that.variant)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId;
        result = 31 * result + (variant != null ? variant.hashCode() : 0);
        return result;
    }
}
