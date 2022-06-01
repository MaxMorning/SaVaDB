package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "lineage", schema = "sava")
@IdClass(LineageEntityPK.class)
public class LineageEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "child_variant_id", nullable = false)
    private Integer childVariantId;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Basic
    @Column(name = "parent_variant_id", nullable = false)
    private Integer parentVariantId;

    @OneToOne
    @JoinColumn(name = "child_variant_id", referencedColumnName = "v_id", nullable = false, insertable = false, updatable = false)
    private VariantEntity variantByChildVariantId;

    @ManyToOne
    @JoinColumn(name = "parent_variant_id", referencedColumnName = "v_id", insertable = false, updatable = false)
    private VariantEntity variantByParentVariantId;

    public Integer getChildVariantId() {
        return childVariantId;
    }

    public void setChildVariantId(Integer childVariantId) {
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

        if (!Objects.equals(childVariantId, that.childVariantId))
            return false;
        if (!Objects.equals(parentVariantId, that.parentVariantId))
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = childVariantId != null ? childVariantId.hashCode() : 0;
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
