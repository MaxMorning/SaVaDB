package org.savadb.backend.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "comp_record", schema = "sava")
@IdClass(CompRecordEntityPK.class)
public class CompRecordEntity {
    @Id
    @Column(name = "idx_of_usr", nullable = false)
    private Integer idxOfUsr;

    @Id
    @Column(name = "usr_id", nullable = false)
    private Integer usrId;

    @Basic
    @Column(name = "comp_date", nullable = false)
    private Timestamp compDate;

    @Basic
    @Column(name = "seq_sha1_value", nullable = false, length = 40)
    private String seqSha1Value;

    @Basic
    @Column(name = "status", nullable = false)
    private Byte status;

    @Basic
    @Column(name = "comp_result_path", nullable = true, length = 256)
    private String compResultPath;

    @Basic
    @Column(name = "seq_file_path", length = 256)
    private String seqFilePath;

    public Integer getIdxOfUsr() {
        return idxOfUsr;
    }

    public void setIdxOfUsr(Integer idxOfUsr) {
        this.idxOfUsr = idxOfUsr;
    }

    public Integer getUsrId() {
        return usrId;
    }

    public void setUsrId(Integer usrId) {
        this.usrId = usrId;
    }

    public Timestamp getCompDate() {
        return compDate;
    }

    public void setCompDate(Timestamp compDate) {
        this.compDate = compDate;
    }

    public String getSeqSha1Value() {
        return seqSha1Value;
    }

    public void setSeqSha1Value(String seqSha1Value) {
        this.seqSha1Value = seqSha1Value;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getCompResultPath() {
        return compResultPath;
    }

    public void setCompResultPath(String compResultPath) {
        this.compResultPath = compResultPath;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CompRecordEntity that = (CompRecordEntity) o;

        if (idxOfUsr != null ? !idxOfUsr.equals(that.idxOfUsr) : that.idxOfUsr != null) return false;
        if (usrId != null ? !usrId.equals(that.usrId) : that.usrId != null) return false;
        if (compDate != null ? !compDate.equals(that.compDate) : that.compDate != null) return false;
        if (seqSha1Value != null ? !seqSha1Value.equals(that.seqSha1Value) : that.seqSha1Value != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (compResultPath != null ? !compResultPath.equals(that.compResultPath) : that.compResultPath != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idxOfUsr != null ? idxOfUsr.hashCode() : 0;
        result = 31 * result + (usrId != null ? usrId.hashCode() : 0);
        result = 31 * result + (compDate != null ? compDate.hashCode() : 0);
        result = 31 * result + (seqSha1Value != null ? seqSha1Value.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (compResultPath != null ? compResultPath.hashCode() : 0);
        return result;
    }

    public String getSeqFilePath() {
        return seqFilePath;
    }

    public void setSeqFilePath(String seqFilePath) {
        this.seqFilePath = seqFilePath;
    }
}
