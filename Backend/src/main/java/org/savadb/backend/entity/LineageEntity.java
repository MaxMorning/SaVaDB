package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Lineage", schema = "SaVa")
public class LineageEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "child_variant_id", nullable = false)
    private int childVariantId;

    @Basic
    @Column(name = "parent_variant_id", nullable = true)
    private Integer parentVariantId;

    @OneToOne
    @JoinColumn(name = "child_variant_id", referencedColumnName = "v_id", nullable = false)
    private VariantEntity variantByChildVariantId;

    @ManyToOne
    @JoinColumn(name = "parent_variant_id", referencedColumnName = "v_id")
    private VariantEntity variantByParentVariantId;

    public int getChildVariantId() {
        return childVariantId;
    }

    public void setChildVariantId(Integer childVariantId) {
        this.childVariantId = childVariantId;
    }

    public void setChildVariantId(int childVariantId) {
        this.childVariantId = childVariantId;
    }

    public Integer getParentVariantId() {
        return parentVariantId;
    }

    public void setParentVariantId(Integer parentVariantId) {
        this.parentVariantId = parentVariantId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        LineageEntity that = (LineageEntity) o;

        if (childVariantId != that.childVariantId) return false;
        if (!Objects.equals(parentVariantId, that.parentVariantId))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = childVariantId;
        result = 31 * result + (parentVariantId != null ? parentVariantId.hashCode() : 0);
        return result;
    }

    public VariantEntity getVariantByChildVariantId() {
        return variantByChildVariantId;
    }

    public void setVariantByChildVariantId(VariantEntity variantByChildVariantId) {
        this.variantByChildVariantId = variantByChildVariantId;
    }

    public VariantEntity getVariantByParentVariantId() {
        return variantByParentVariantId;
    }

    public void setVariantByParentVariantId(VariantEntity variantByParentVariantId) {
        this.variantByParentVariantId = variantByParentVariantId;
    }
}
