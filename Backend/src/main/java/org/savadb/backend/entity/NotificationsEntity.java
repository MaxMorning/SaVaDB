package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "notifications", schema = "sava")
public class NotificationsEntity {
    @Id
    @Column(name = "idx", nullable = false)
    private Integer idx;

    @Basic
    @Column(name = "title", nullable = false, length = 64)
    private String title;

    @Basic
    @Column(name = "content", nullable = false, length = 1024)
    private String content;

    public Integer getIdx() {
        return idx;
    }

    public void setIdx(Integer idx) {
        this.idx = idx;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NotificationsEntity that = (NotificationsEntity) o;

        if (!Objects.equals(idx, that.idx)) return false;
        if (!Objects.equals(title, that.title)) return false;
        if (!Objects.equals(content, that.content)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idx != null ? idx.hashCode() : 0;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }
}
