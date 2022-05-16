package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "Administrator", schema = "SaVa")
public class AdministratorEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "admin_id", nullable = false)
    private int adminId;

    @Basic
    @Column(name = "admin_name", nullable = false, length = 16)
    private String adminName;

    @Basic
    @Column(name = "passwd", nullable = false)
    private byte[] passwd;

    @Basic
    @Column(name = "salt", nullable = false)
    private byte[] salt;

    @OneToMany(mappedBy = "administratorByAddAdmin")
    private Collection<VariantEntity> variantsByAdminId;

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public byte[] getPasswd() {
        return passwd;
    }

    public void setPasswd(byte[] passwd) {
        this.passwd = passwd;
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AdministratorEntity that = (AdministratorEntity) o;

        if (adminId != that.adminId) return false;
        if (!Objects.equals(adminName, that.adminName)) return false;
        if (!Arrays.equals(passwd, that.passwd)) return false;
        if (!Arrays.equals(salt, that.salt)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = adminId;
        result = 31 * result + (adminName != null ? adminName.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(passwd);
        result = 31 * result + Arrays.hashCode(salt);
        return result;
    }

    public Collection<VariantEntity> getVariantsByAdminId() {
        return variantsByAdminId;
    }

    public void setVariantsByAdminId(Collection<VariantEntity> variantsByAdminId) {
        this.variantsByAdminId = variantsByAdminId;
    }
}
