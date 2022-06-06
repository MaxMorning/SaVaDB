package org.savadb.backend.controller;

import org.savadb.backend.entity.PangoNomenclatureEntity;
import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.entity.VariantEntity;
import org.savadb.backend.entity.WhoLabelEntity;
import org.savadb.backend.service.JPA.Account.JpaUserService;
import org.savadb.backend.service.JPA.Data.JpaPangoNomenclatureService;
import org.savadb.backend.service.JPA.Data.JpaVariantService;
import org.savadb.backend.service.JPA.Data.JpaWHOLabelService;
import org.savadb.backend.service.JPA.JpaNotificationService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Resource
    JpaNotificationService jpaNotificationService;

    @Resource
    private JpaUserService jpaUserService;

    @Resource
    private JpaVariantService jpaVariantService;

    @Resource
    private JpaPangoNomenclatureService jpaPangoNomenclatureService;

    @Resource
    private JpaWHOLabelService jpaWHOLabelService;

    @PostMapping("/newNoti")
    public Result<Integer> newNotification(@RequestBody Map<String, Object> requestBody) {
        try {
            String title = (String) requestBody.get("title");
            String content = (String) requestBody.get("content");

            if (title.length() > 64 || content.length() > 1024) {
                return Result.resultFactory(EResult.BAD_REQUEST, null);
            }

            jpaNotificationService.createNewNotification(title, content);

            return Result.resultFactory(EResult.SUCCESS, null);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @PostMapping("/setUserCnt")
    public Result<Integer> setUserCnt(@RequestBody Map<String, Object> requestBody) {
        try {
            String username = (String) requestBody.get("username");
            Integer compareCnt = (Integer) requestBody.get("newCnt");

            UserEntity user = jpaUserService.findByUsrName(username);
            if (user == null) {
                return Result.resultFactory(EResult.DATA_NULL, null);
            }

            user.setRemainCompTime(compareCnt);

            jpaUserService.insertUser(user);

            return Result.resultFactory(EResult.SUCCESS, null);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @PostMapping("/setMonitorLevel")
    public Result<Integer> setMonitorLevel(@RequestBody Map<String, String> requestBody) {
        try {
            String variant = requestBody.get("variant");
            String monitorLevel = requestBody.get("monitorLevel");

            PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(variant);
            if (pangoNomenclature == null) {
                return Result.resultFactory(EResult.DATA_NULL, null);
            }
            VariantEntity variantEntity = pangoNomenclature.getVariantByVId();
            variantEntity.setMonitorLevel(monitorLevel);

            jpaVariantService.saveVariant(variantEntity);

            return Result.resultFactory(EResult.SUCCESS, null);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @PostMapping("/setWHOLabel")
    public Result<Integer> setWHOLabel(@RequestBody Map<String, String> requestBody) {
        try {
            String variantName = requestBody.get("variant");
            String whoLabel = requestBody.get("label");

            PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(variantName);
            if (pangoNomenclature == null) {
                return Result.resultFactory(EResult.DATA_NULL, null);
            }

            VariantEntity variant = pangoNomenclature.getVariantByVId();

            WhoLabelEntity whoLabelEntity = variant.getWhoLabelByVId();

            if ("".equals(whoLabel)) {
                // 删除
                if (whoLabelEntity != null) {
                    jpaWHOLabelService.deleteWHOLabel(whoLabelEntity);
                }
            }
            else {
                if (whoLabelEntity == null) {
                    whoLabelEntity = new WhoLabelEntity();
                    whoLabelEntity.setvId(variant.getvId());
                }

                whoLabelEntity.setLabel(whoLabel);

                jpaWHOLabelService.saveWHOLabel(whoLabelEntity);
            }

            return Result.resultFactory(EResult.SUCCESS, null);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }
}
