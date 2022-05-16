package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "Variant", schema = "SaVa")
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
    @Column(name = "descript", nullable = true, length = 256)
    private String descript;

    @Basic
    @Column(name = "add_admin", nullable = false)
    private Integer addAdmin;

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

    @ManyToOne
    @JoinColumn(name = "add_admin", referencedColumnName = "usr_id", nullable = false, insertable = false, updatable = false)
    private UserEntity userByAddAdmin;

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

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public Integer getAddAdmin() {
        return addAdmin;
    }

    public void setAddAdmin(Integer addAdmin) {
        this.addAdmin = addAdmin;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VariantEntity that = (VariantEntity) o;

        if (!Objects.equals(vId, that.vId)) return false;
        if (!Objects.equals(earliestDate, that.earliestDate)) return false;
        if (!Objects.equals(monitorLevel, that.monitorLevel)) return false;
        if (!Objects.equals(r0, that.r0)) return false;
        if (!Objects.equals(avgIncubation, that.avgIncubation))
            return false;
        if (!Objects.equals(descript, that.descript)) return false;
        if (!Objects.equals(addAdmin, that.addAdmin)) return false;
        if (!Objects.equals(vStatus, that.vStatus)) return false;
        if (!Objects.equals(updateTime, that.updateTime)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = vId != null ? vId.hashCode() : 0;
        result = 31 * result + (earliestDate != null ? earliestDate.hashCode() : 0);
        result = 31 * result + (monitorLevel != null ? monitorLevel.hashCode() : 0);
        result = 31 * result + (r0 != null ? r0.hashCode() : 0);
        result = 31 * result + (avgIncubation != null ? avgIncubation.hashCode() : 0);
        result = 31 * result + (descript != null ? descript.hashCode() : 0);
        result = 31 * result + (addAdmin != null ? addAdmin.hashCode() : 0);
        result = 31 * result + (vStatus != null ? vStatus.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
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

    public UserEntity getUserByAddAdmin() {
        return userByAddAdmin;
    }

    public void setUserByAddAdmin(UserEntity userByAddAdmin) {
        this.userByAddAdmin = userByAddAdmin;
    }

    public WhoLabelEntity getWhoLabelByVId() {
        return whoLabelByVId;
    }

    public void setWhoLabelByVId(WhoLabelEntity whoLabelByVId) {
        this.whoLabelByVId = whoLabelByVId;
    }
}
