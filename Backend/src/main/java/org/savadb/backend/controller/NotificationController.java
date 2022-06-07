package org.savadb.backend.controller;

import org.savadb.backend.entity.NotificationsEntity;
import org.savadb.backend.service.JPA.JpaNotificationService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {
    @Resource
    private JpaNotificationService jpaNotificationService;

    @GetMapping("/other/notificationList")
    public Result<List<String[]>> getNotificationList() {
        List<NotificationsEntity> notificationsEntityList = jpaNotificationService.getAllNotifications();

        List<String[]> resultList = new ArrayList<>();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        for (NotificationsEntity notification : notificationsEntityList) {
            String[] singleEntity = new String[3];
            singleEntity[0] = notification.getIdx().toString();
            singleEntity[1] = notification.getTitle();
            singleEntity[2] = dateFormat.format(notification.getCreateTime());

            resultList.add(singleEntity);
        }

        return Result.resultFactory(EResult.SUCCESS, resultList);
    }

    @GetMapping("/other/getNotiContent")
    public Result<String[]> getNotiContent(@RequestParam String idx) {
        try {
            NotificationsEntity notification = jpaNotificationService.getNotificationById(Integer.valueOf(idx));
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

            String[] resultString = new String[2];
            resultString[0] = notification.getContent();
            resultString[1] = dateFormat.format(notification.getCreateTime());
            return Result.resultFactory(EResult.SUCCESS, resultString);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }
}
