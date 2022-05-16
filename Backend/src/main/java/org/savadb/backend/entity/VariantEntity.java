package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "Variant", schema = "SaVa")
public class VariantEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "v_id")
    private int vId;

    @Basic
    @Column(name = "earliest_date")
    private Date earliestDate;

    @Basic
    @Column(name = "monitor_level")
    private Object monitorLevel;

    @Basic
    @Column(name = "R0")
    private double r0;

    @Basic
    @Column(name = "avg_incubation")
    private double avgIncubation;

    @Basic
    @Column(name = "descript")
    private String descript;

    @Basic
    @Column(name = "add_admin")
    private int addAdmin;

    @Basic
    @Column(name = "v_status")
    private Object vStatus;

    @Basic
    @Column(name = "update_time")
    private Timestamp updateTime;

    public int getvId() {
        return vId;
    }

    public void setvId(int vId) {
        this.vId = vId;
    }

    public Date getEarliestDate() {
        return earliestDate;
    }

    public void setEarliestDate(Date earliestDate) {
        this.earliestDate = earliestDate;
    }

    public Object getMonitorLevel() {
        return monitorLevel;
    }

    public void setMonitorLevel(Object monitorLevel) {
        this.monitorLevel = monitorLevel;
    }

    public double getR0() {
        return r0;
    }

    public void setR0(double r0) {
        this.r0 = r0;
    }

    public double getAvgIncubation() {
        return avgIncubation;
    }

    public void setAvgIncubation(double avgIncubation) {
        this.avgIncubation = avgIncubation;
    }

    public String getDescript() {
        return descript;
    }

    public void setDescript(String descript) {
        this.descript = descript;
    }

    public int getAddAdmin() {
        return addAdmin;
    }

    public void setAddAdmin(int addAdmin) {
        this.addAdmin = addAdmin;
    }

    public Object getvStatus() {
        return vStatus;
    }

    public void setvStatus(Object vStatus) {
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

        if (vId != that.vId) return false;
        if (Double.compare(that.r0, r0) != 0) return false;
        if (Double.compare(that.avgIncubation, avgIncubation) != 0) return false;
        if (addAdmin != that.addAdmin) return false;
        if (!Objects.equals(earliestDate, that.earliestDate)) return false;
        if (!Objects.equals(monitorLevel, that.monitorLevel)) return false;
        if (!Objects.equals(descript, that.descript)) return false;
        if (!Objects.equals(vStatus, that.vStatus)) return false;
        if (!Objects.equals(updateTime, that.updateTime)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result;
        long temp;
        result = vId;
        result = 31 * result + (earliestDate != null ? earliestDate.hashCode() : 0);
        result = 31 * result + (monitorLevel != null ? monitorLevel.hashCode() : 0);
        temp = Double.doubleToLongBits(r0);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(avgIncubation);
        result = 31 * result + (int) (temp ^ (temp >>> 32));
        result = 31 * result + (descript != null ? descript.hashCode() : 0);
        result = 31 * result + addAdmin;
        result = 31 * result + (vStatus != null ? vStatus.hashCode() : 0);
        result = 31 * result + (updateTime != null ? updateTime.hashCode() : 0);
        return result;
    }
}
