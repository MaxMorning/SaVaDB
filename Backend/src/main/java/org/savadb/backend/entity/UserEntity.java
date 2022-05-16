package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "User", schema = "SaVa")
public class UserEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "usr_id")
    private int usrId;

    @Basic
    @Column(name = "usr_name")
    private String usrName;

    @Basic
    @Column(name = "email")
    private String email;

    @Basic
    @Column(name = "passwd")
    private byte[] passwd;

    @Basic
    @Column(name = "salt")
    private byte[] salt;

    public int getUsrId() {
        return usrId;
    }

    public void setUsrId(int usrId) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserEntity that = (UserEntity) o;

        if (usrId != that.usrId) return false;
        if (!Objects.equals(usrName, that.usrName)) return false;
        if (!Objects.equals(email, that.email)) return false;
        if (!Arrays.equals(passwd, that.passwd)) return false;
        if (!Arrays.equals(salt, that.salt)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = usrId;
        result = 31 * result + (usrName != null ? usrName.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + Arrays.hashCode(passwd);
        result = 31 * result + Arrays.hashCode(salt);
        return result;
    }
}
