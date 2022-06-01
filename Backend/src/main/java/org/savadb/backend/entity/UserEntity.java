package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "user", schema = "SaVa")
public class UserEntity {
    @Id
    @Column(name = "usr_id", nullable = false)
    private Integer usrId;

    @Basic
    @Column(name = "usr_name", nullable = false, length = 16)
    private String usrName;

    @Basic
    @Column(name = "email", nullable = false, length = 64)
    private String email;

    @Basic
    @Column(name = "passwd", nullable = false)
    private byte[] passwd;

    @Basic
    @Column(name = "salt", nullable = false)
    private byte[] salt;

    @Basic
    @Column(name = "role", nullable = false, length = 32)
    private String role;

    @OneToMany(mappedBy = "userByUsrId")
    private Collection<UserWatchingEntity> userWatchingsByUsrId;

    public Integer getUsrId() {
        return usrId;
    }

    public void setUsrId(Integer usrId) {
        this.usrId = usrId;
    }

    public String getUsrName() {
        return usrName;
    }

    public void setUsrName(String usrName) {
        this.usrName = usrName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (!Objects.equals(usrId, that.usrId)) return false;
        if (!Objects.equals(usrName, that.usrName)) return false;
        if (!Objects.equals(email, that.email)) return false;
        if (!Arrays.equals(passwd, that.passwd)) return false;
        if (!Arrays.equals(salt, that.salt)) return false;
        if (!Objects.equals(role, that.role)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = usrId != null ? usrId.hashCode() : 0;
        result = 31 * result + (usrName != null ? usrName.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(passwd);
        result = 31 * result + Arrays.hashCode(salt);
        result = 31 * result + (role != null ? role.hashCode() : 0);
        return result;
    }

    public Collection<UserWatchingEntity> getUserWatchingsByUsrId() {
        return userWatchingsByUsrId;
    }

    public void setUserWatchingsByUsrId(Collection<UserWatchingEntity> userWatchingsByUsrId) {
        this.userWatchingsByUsrId = userWatchingsByUsrId;
    }
}
