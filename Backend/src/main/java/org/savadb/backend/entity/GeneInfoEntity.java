package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "GeneInfo", schema = "SaVa")
public class GeneInfoEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id", nullable = false)
    private int vId;

    @Basic
    @Column(name = "cDNA_sequence_path", nullable = true, length = 128)
    private String cDnaSequencePath;

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

    public String getcDnaSequencePath() {
        return cDnaSequencePath;
    }

    public void setcDnaSequencePath(String cDnaSequencePath) {
        this.cDnaSequencePath = cDnaSequencePath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GeneInfoEntity that = (GeneInfoEntity) o;

        if (vId != that.vId) return false;
        if (!Objects.equals(cDnaSequencePath, that.cDnaSequencePath))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId;
        result = 31 * result + (cDnaSequencePath != null ? cDnaSequencePath.hashCode() : 0);
        return result;
    }

    public VariantEntity getVariantByVId() {
        return variantByVId;
    }

    public void setVariantByVId(VariantEntity variantByVId) {
        this.variantByVId = variantByVId;
    }
}
