package org.savadb.backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "api_info", schema = "sava")
public class ApiInfoEntity {
    @Id
    @Basic
    @Column(name = "url", nullable = false, length = 64)
    private String url;

    @Basic
    @Column(name = "desc_zh_cn", nullable = false, length = 256)
    private String descZhCn;

    @Basic
    @Column(name = "desc_en_us", nullable = false, length = 256)
    private String descEnUs;

    @Basic
    @Column(name = "request", nullable = false, length = 256)
    private String request;

    @Basic
    @Column(name = "response", nullable = false, length = 256)
    private String response;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescZhCn() {
        return descZhCn;
    }

    public void setDescZhCn(String descZhCn) {
        this.descZhCn = descZhCn;
    }

    public String getDescEnUs() {
        return descEnUs;
    }

    public void setDescEnUs(String descEnUs) {
        this.descEnUs = descEnUs;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ApiInfoEntity that = (ApiInfoEntity) o;

        if (!Objects.equals(url, that.url)) return false;
        if (!Objects.equals(descZhCn, that.descZhCn)) return false;
        if (!Objects.equals(descEnUs, that.descEnUs)) return false;
        if (!Objects.equals(request, that.request)) return false;
        if (!Objects.equals(response, that.response)) return false;

        return true;
    }
}
