package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "variant", schema = "sava")
public class VariantEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id", nullable = false)
    private Integer vId;

    @Basic
    @Column(name = "earliest_date")
    private Date earliestDate;

    @Basic
    @Column(name = "monitor_level", nullable = false)
    private String monitorLevel;

    @Basic
    @Column(name = "R0", nullable = false, precision = 0)
    private Double r0;

    @Basic
    @Column(name = "avg_incubation", nullable = false, precision = 0)
    private Double avgIncubation;

    @Basic
    @Column(name = "seq_cnt", nullable = false)
    private Integer seqCnt;

    @Basic
    @Column(name = "descript", nullable = true, length = 256)
    private String descript;

    @Basic
    @Column(name = "v_status", nullable = false)
    private String vStatus;

    @Basic
    @Column(name = "update_time", nullable = false)
    private Timestamp updateTime;

    @OneToOne(mappedBy = "variantByVId")
    private GeneInfoEntity geneInfoByVId;

    @OneToMany(mappedBy = "variantByChildVariantId")
    private Collection<LineageEntity> childrenLineageByVId;

    @OneToMany(mappedBy = "variantByParentVariantId")
    private Collection<LineageEntity> parentLineagesByVId;

    @OneToOne(mappedBy = "variantByVId")
    private PangoNomenclatureEntity pangoNomenclatureByVId;

    @OneToMany(mappedBy = "variantByWatchingVId")
    private Collection<UserWatchingEntity> userWatchingsByVId;

    @OneToOne(mappedBy = "variantByVId")
    private WhoLabelEntity whoLabelByVId;

    public Integer getvId() {
        return vId;
    }

    public void setvId(Integer vId) {
        this.vId = vId;
    }

    public Date getEarliestDate() {
        return earliestDate;
    }

    public void setEarliestDate(Date earliestDate) {
        this.earliestDate = earliestDate;
    }

    public String getMonitorLevel() {
        return monitorLevel;
    }

    public void setMonitorLevel(String monitorLevel) {
        this.monitorLevel = monitorLevel;
    }

    public Double getR0() {
        return r0;
    }

    public void setR0(Double r0) {
        this.r0 = r0;
    }

    public Double getAvgIncubation() {
        return avgIncubation;
    }

    public void setAvgIncubation(Double avgIncubation) {
        this.avgIncubation = avgIncubation;
    }

    public Integer getSeqCnt() {
        return seqCnt;
    }

    public void setSeqCnt(Integer seqCnt) {
        this.seqCnt = seqCnt;
    }

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public String getvStatus() {
        return vStatus;
    }

    public void setvStatus(String vStatus) {
        this.vStatus = vStatus;
    }

    public Timestamp getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Timestamp updateTime) {
        this.updateTime = updateTime;
    }

    public GeneInfoEntity getGeneInfoByVId() {
        return geneInfoByVId;
    }

    public void setGeneInfoByVId(GeneInfoEntity geneInfoByVId) {
        this.geneInfoByVId = geneInfoByVId;
    }

    public Collection<LineageEntity> getChildrenLineageByVId() {
        return childrenLineageByVId;
    }

    public void setChildrenLineageByVId(Collection<LineageEntity> lineageByVId) {
        this.childrenLineageByVId = lineageByVId;
    }

    public Collection<LineageEntity> getParentLineagesByVId() {
        return parentLineagesByVId;
    }

    public void setParentLineagesByVId(Collection<LineageEntity> lineagesByVId) {
        this.parentLineagesByVId = lineagesByVId;
    }

    public PangoNomenclatureEntity getPangoNomenclatureByVId() {
        return pangoNomenclatureByVId;
    }

    public void setPangoNomenclatureByVId(PangoNomenclatureEntity pangoNomenclatureByVId) {
        this.pangoNomenclatureByVId = pangoNomenclatureByVId;
    }

    public Collection<UserWatchingEntity> getUserWatchingsByVId() {
        return userWatchingsByVId;
    }

    public void setUserWatchingsByVId(Collection<UserWatchingEntity> userWatchingsByVId) {
        this.userWatchingsByVId = userWatchingsByVId;
    }

    public WhoLabelEntity getWhoLabelByVId() {
        return whoLabelByVId;
    }

    public void setWhoLabelByVId(WhoLabelEntity whoLabelByVId) {
        this.whoLabelByVId = whoLabelByVId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VariantEntity variant = (VariantEntity) o;

        if (!Objects.equals(vId, variant.vId)) return false;
        if (!Objects.equals(earliestDate, variant.earliestDate))
            return false;
        if (!Objects.equals(monitorLevel, variant.monitorLevel))
            return false;
        if (!Objects.equals(r0, variant.r0)) return false;
        if (!Objects.equals(avgIncubation, variant.avgIncubation))
            return false;
        if (!Objects.equals(seqCnt, variant.seqCnt)) return false;
        if (!Objects.equals(descript, variant.descript)) return false;
        if (!Objects.equals(vStatus, variant.vStatus)) return false;
        if (!Objects.equals(updateTime, variant.updateTime)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId != null ? vId.hashCode() : 0;
        result = 31 * result + (earliestDate != null ? earliestDate.hashCode() : 0);
        result = 31 * result + (monitorLevel != null ? monitorLevel.hashCode() : 0);
        result = 31 * result + (r0 != null ? r0.hashCode() : 0);
        result = 31 * result + (avgIncubation != null ? avgIncubation.hashCode() : 0);
        result = 31 * result + (seqCnt != null ? seqCnt.hashCode() : 0);
        result = 31 * result + (descript != null ? descript.hashCode() : 0);
        result = 31 * result + (vStatus != null ? vStatus.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
