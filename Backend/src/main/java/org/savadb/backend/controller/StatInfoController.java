package org.savadb.backend.controller;

import org.savadb.backend.service.JPA.JpaStatService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StatInfoController {
    @Resource
    private JpaStatService jpaStatService;

    @GetMapping("/stat/getCurrentWorldStat")
    public Result<Map<String, Integer>> getCurrentWorldStat() {
        return Result.resultFactory(EResult.SUCCESS, jpaStatService.getCurrentWorldStat());
    }
}
