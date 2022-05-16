package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "GeneInfo", schema = "SaVa")
public class GeneInfoEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id")
    private int vId;

    @Basic
    @Column(name = "cDNA_sequence_path")
    private String cDnaSequencePath;

    public int getvId() {
        return vId;
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
}
