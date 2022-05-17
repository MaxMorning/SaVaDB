package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "gene_info", schema = "SaVa")
public class GeneInfoEntity {
    @Id
    @Column(name = "v_id", nullable = false)
    private Integer vId;

    @Basic
    @Column(name = "cDNA_sequence_path", nullable = true, length = 128)
    private String cDnaSequencePath;

    @OneToOne
    @JoinColumn(name = "v_id", referencedColumnName = "v_id", nullable = false, insertable = false, updatable = false)
    private VariantEntity variantByVId;

    public Integer getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
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

        if (!Objects.equals(vId, that.vId)) return false;
        if (!Objects.equals(cDnaSequencePath, that.cDnaSequencePath))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId != null ? vId.hashCode() : 0;
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
