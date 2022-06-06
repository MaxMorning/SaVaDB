package org.savadb.backend.repo;

import org.savadb.backend.entity.NotificationsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JpaNotificationRepo extends JpaRepository<NotificationsEntity, Integer> {
    @Query("select count(n) from NotificationsEntity n")
    long getNotiCount();

}
