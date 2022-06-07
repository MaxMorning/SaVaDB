package org.savadb.backend.controller;

import org.savadb.backend.entity.ApiInfoEntity;
import org.savadb.backend.service.JPA.Data.JpaAPIInfoService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class APIInfoController {
    @Resource
    private JpaAPIInfoService jpaAPIInfoService;

    @GetMapping("/other/getAllAPIDetail")
    public Result<List<String[]>> getAllAPIDetail(@RequestParam String lang) {
        List<ApiInfoEntity> apiInfoEntityList = jpaAPIInfoService.getAllAPI();
        List<String[]> resultList = new ArrayList<>();

        for (ApiInfoEntity apiInfo : apiInfoEntityList) {
            String[] singleEntity = new String[4];

            singleEntity[0] = apiInfo.getUrl();
            if ("en-us".equals(lang)) {
                singleEntity[1] = apiInfo.getDescEnUs();
            }
            else {
                singleEntity[1] = apiInfo.getDescZhCn();
            }

            singleEntity[2] = apiInfo.getRequest();
            singleEntity[3] = apiInfo.getResponse();

            resultList.add(singleEntity);
        }

        return Result.resultFactory(EResult.SUCCESS, resultList);
    }
}
