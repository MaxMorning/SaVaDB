package org.savadb.backend.service.JPA;

import org.savadb.backend.entity.NotificationsEntity;
import org.savadb.backend.repo.JpaNotificationRepo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class JpaNotificationService {
    @Resource
    JpaNotificationRepo jpaNotificationRepo;

    public void createNewNotification(String title, String content) {
        NotificationsEntity notification = new NotificationsEntity();
        notification.setIdx((int) jpaNotificationRepo.getNotiCount());
        notification.setTitle(title);
        notification.setContent(content);

        jpaNotificationRepo.save(notification);
    }
}
