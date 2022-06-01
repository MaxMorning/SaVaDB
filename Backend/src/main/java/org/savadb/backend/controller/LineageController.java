package org.savadb.backend.controller;

import org.savadb.backend.entity.VariantEntity;
import org.savadb.backend.entity.WhoLabelEntity;
import org.savadb.backend.service.JPA.Data.JpaPangoNomenclatureService;
import org.savadb.backend.service.JPA.Data.JpaVariantService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LineageController {
    @Resource
    private JpaPangoNomenclatureService jpaPangoNomenclatureService;

    @Resource
    private JpaVariantService jpaVariantService;

    @GetMapping("/data/lineageBrief")
    public Result<Map<String, Object>> getVariant(@RequestParam String lineage) {
        Integer targetId = jpaPangoNomenclatureService.findByVariantName(lineage).getvId();

        VariantEntity variant = jpaVariantService.findVariantById(targetId);

        if (variant == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        else {
            return Result.resultFactory(EResult.SUCCESS, convertVariantToMap(variant));
        }
    }

    private Map<String, Object> convertVariantToMap(VariantEntity variant) {
        Map<String, Object> result = new HashMap<>();

        WhoLabelEntity whoLabel = variant.getWhoLabelByVId();
        if (whoLabel == null) {
            result.put("WHOLabel", "None");
        }
        else {
            result.put("WHOLabel", whoLabel.getLabel());
        }

        result.put("monitorLevel", variant.getMonitorLevel());
        result.put("status", variant.getvStatus());
        result.put("earliestDate", variant.getEarliestDate());
        result.put("R0", variant.getR0());
        result.put("avgIncubation", variant.getAvgIncubation());
        result.put("seqCount", variant.getSeqCnt());

        Timestamp updateTime = variant.getUpdateTime();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        result.put("updateTime", dateFormat.format(updateTime));

        return result;
    }

}
