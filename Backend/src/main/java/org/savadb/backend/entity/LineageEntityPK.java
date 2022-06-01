package org.savadb.backend.entity;

import javax.persistence.*;
import java.io.Serializable;

public class LineageEntityPK implements Serializable {
    @Column(name = "child_variant_id", nullable = false)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer childVariantId;
    @Column(name = "parent_variant_id", nullable = false)
    @Basic
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer parentVariantId;

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

        LineageEntityPK that = (LineageEntityPK) o;

        if (childVariantId != null ? !childVariantId.equals(that.childVariantId) : that.childVariantId != null)
            return false;
        if (parentVariantId != null ? !parentVariantId.equals(that.parentVariantId) : that.parentVariantId != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = childVariantId != null ? childVariantId.hashCode() : 0;
        result = 31 * result + (parentVariantId != null ? parentVariantId.hashCode() : 0);
        return result;
    }
}
