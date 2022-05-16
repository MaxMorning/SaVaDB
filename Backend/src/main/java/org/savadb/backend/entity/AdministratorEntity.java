package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "Administrator", schema = "SaVa")
public class AdministratorEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "admin_id")
    private int adminId;

    @Basic
    @Column(name = "admin_name")
    private String adminName;

    @Basic
    @Column(name = "passwd")
    private byte[] passwd;

    @Basic
    @Column(name = "salt")
    private byte[] salt;

    public int getAdminId() {
        return adminId;
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
}
