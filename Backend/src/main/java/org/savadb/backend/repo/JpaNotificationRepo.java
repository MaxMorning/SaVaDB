package org.savadb.backend.repo;

import org.savadb.backend.entity.NotificationsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaNotificationRepo extends JpaRepository<NotificationsEntity, Integer> {
    @Query("select count(n) from NotificationsEntity n")
    long getNotiCount();

    @Query("select n from NotificationsEntity n order by n.createTime DESC")
    List<NotificationsEntity> getAllNotifications();

    @Query("select n from NotificationsEntity n " +
            "where upper(n.title) like upper(concat('%', ?1, '%')) " +
            "order by n.createTime DESC")
    List<NotificationsEntity> searchKeyInTitle(String title);


}
