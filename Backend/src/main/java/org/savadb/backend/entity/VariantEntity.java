package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "variant", schema = "SaVa")
public class VariantEntity {
    @Id
    @Column(name = "v_id", nullable = false)
    private Integer vId;

    @Basic
    @Column(name = "earliest_date", nullable = false)
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

    @OneToMany(mappedBy = "variantByVId")
    private Collection<AAChangesEntity> aaChangesByVId;

    @OneToOne(mappedBy = "variantByVId")
    private GeneInfoEntity geneInfoByVId;

    @OneToOne(mappedBy = "variantByChildVariantId")
    private LineageEntity lineageByVId;

    @OneToMany(mappedBy = "variantByParentVariantId")
    private Collection<LineageEntity> lineagesByVId;

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

    public Integer getSeqCnt() {
        return seqCnt;
    }

    public void setSeqCnt(Integer seqCnt) {
        this.seqCnt = seqCnt;
    }

    public void setAvgIncubation(Double avgIncubation) {
        this.avgIncubation = avgIncubation;
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

    public Collection<AAChangesEntity> getAaChangesByVId() {
        return aaChangesByVId;
    }

    public void setAaChangesByVId(Collection<AAChangesEntity> aaChangesByVId) {
        this.aaChangesByVId = aaChangesByVId;
    }

    public GeneInfoEntity getGeneInfoByVId() {
        return geneInfoByVId;
    }

    public void setGeneInfoByVId(GeneInfoEntity geneInfoByVId) {
        this.geneInfoByVId = geneInfoByVId;
    }

    public LineageEntity getLineageByVId() {
        return lineageByVId;
    }

    public void setLineageByVId(LineageEntity lineageByVId) {
        this.lineageByVId = lineageByVId;
    }

    public Collection<LineageEntity> getLineagesByVId() {
        return lineagesByVId;
    }

    public void setLineagesByVId(Collection<LineageEntity> lineagesByVId) {
        this.lineagesByVId = lineagesByVId;
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
}
