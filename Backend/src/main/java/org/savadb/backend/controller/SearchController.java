package org.savadb.backend.controller;

import org.apache.commons.lang3.NotImplementedException;
import org.savadb.backend.entity.PangoNomenclatureEntity;
import org.savadb.backend.entity.RegionEntity;
import org.savadb.backend.entity.VariantEntity;
import org.savadb.backend.entity.WhoLabelEntity;
import org.savadb.backend.service.JPA.Data.JpaPangoNomenclatureService;
import org.savadb.backend.service.JPA.Data.JpaStatService;
import org.savadb.backend.service.JPA.JpaRegionService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SearchController {
    @Resource
    private JpaPangoNomenclatureService jpaPangoNomenclatureService;

    @Resource
    private JpaRegionService jpaRegionService;

    @Resource
    private JpaStatService jpaStatService;

    @GetMapping("/search")
    public Result<List<String[]>> search(@RequestParam String type, @RequestParam String key) {
        switch (type) {
            case "Lineage":
                return Result.resultFactory(EResult.SUCCESS, searchLineage(key));

            case "Region":
                return Result.resultFactory(EResult.SUCCESS, searchRegion(key));

            case "Notification":
                throw new NotImplementedException();
//                return Result.resultFactory(EResult.DATA_NULL, null);
//                break;

            case "API":
                throw new NotImplementedException();
//                return Result.resultFactory(EResult.DATA_NULL, null);
//                break;

            default:
                return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @GetMapping("data/searchRegionBrief")
    public Result<List<String>> searchRegionBrief(@RequestParam String key) {
        List<RegionEntity> regionList = jpaRegionService.findAllContains(key);
        List<String> result = new ArrayList<>();

        for (RegionEntity region : regionList) {
            result.add(region.getRegionName());
        }

        return Result.resultFactory(EResult.SUCCESS, result);
    }

    private List<String[]> searchLineage(String key) {
        List<PangoNomenclatureEntity> lineageList = jpaPangoNomenclatureService.findLineageContains(key);
        List<String[]> result = new ArrayList<>();

        for (PangoNomenclatureEntity pangoNomenclature : lineageList) {
            String[] singleResult = new String[2];
            singleResult[0] = pangoNomenclature.getVariant();
            VariantEntity variant = pangoNomenclature.getVariantByVId();
            WhoLabelEntity whoLabel = variant.getWhoLabelByVId();
            String whoLabelStr;
            if (whoLabel == null) {
                whoLabelStr = "None";
            }
            else {
                whoLabelStr = whoLabel.getLabel();
            }
            singleResult[1] = whoLabelStr + ' '
                    + variant.getMonitorLevel() + ' '
                    + variant.getvStatus();

            result.add(singleResult);
        }

        return result;
    }

    private List<String[]> searchRegion(String key) {
        List<RegionEntity> regionList = jpaRegionService.findAllContains(key);
        List<String[]> result = new ArrayList<>();

        for (RegionEntity region : regionList) {
            Integer[] statData = jpaStatService.getLatestStat(region.getRegionId());
            String[] singleResult = new String[2];
            singleResult[0] = region.getRegionName();
            singleResult[1] = "Total Confirmed: " + DecimalFormat.getNumberInstance().format(statData[0]) + "\tTotal Death: " + DecimalFormat.getNumberInstance().format(statData[1]) + "\tTotal Cured: " + DecimalFormat.getNumberInstance().format(statData[2]);
            result.add(singleResult);
        }

        return result;
    }
}
