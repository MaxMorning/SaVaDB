package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "WHOLabel", schema = "SaVa")
public class WhoLabelEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id", nullable = false)
    private int vId;
    
    @Basic
    @Column(name = "label", nullable = false, length = 16)
    private String label;

    @OneToOne
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

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WhoLabelEntity that = (WhoLabelEntity) o;

        if (vId != that.vId) return false;
        if (!Objects.equals(label, that.label)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId;
        result = 31 * result + (label != null ? label.hashCode() : 0);
        return result;
    }

    public VariantEntity getVariantByVId() {
        return variantByVId;
    }

    public void setVariantByVId(VariantEntity variantByVId) {
        this.variantByVId = variantByVId;
    }
}
