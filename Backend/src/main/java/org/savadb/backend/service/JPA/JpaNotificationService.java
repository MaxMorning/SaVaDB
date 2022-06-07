package org.savadb.backend.service.JPA;

import org.savadb.backend.entity.NotificationsEntity;
import org.savadb.backend.repo.JpaNotificationRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;

@Service
public class JpaNotificationService {
    @Resource
    JpaNotificationRepo jpaNotificationRepo;

    public void createNewNotification(String title, String content) {
        NotificationsEntity notification = new NotificationsEntity();
        notification.setIdx((int) jpaNotificationRepo.getNotiCount());
        notification.setTitle(title);
        notification.setContent(content);
        notification.setCreateTime(new Timestamp(System.currentTimeMillis()));

        jpaNotificationRepo.save(notification);
    }

    public List<NotificationsEntity> getAllNotifications() {
        return jpaNotificationRepo.getAllNotifications();
    }

    public NotificationsEntity getNotificationById(Integer idx) {
        return jpaNotificationRepo.getById(idx);
    }

    public List<NotificationsEntity> searchKeyInTitle(String key) {
        return jpaNotificationRepo.searchKeyInTitle(key);
    }
}
