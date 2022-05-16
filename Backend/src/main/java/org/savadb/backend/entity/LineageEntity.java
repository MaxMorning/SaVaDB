package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Lineage", schema = "SaVa")
public class LineageEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "child_variant_id")
    private int childVariantId;

    @Basic
    @Column(name = "parent_variant_id")
    private Integer parentVariantId;

    public int getChildVariantId() {
        return childVariantId;
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
}
