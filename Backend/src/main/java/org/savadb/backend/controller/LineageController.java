package org.savadb.backend.controller;

import org.savadb.backend.entity.LineageEntity;
import org.savadb.backend.entity.PangoNomenclatureEntity;
import org.savadb.backend.entity.VariantEntity;
import org.savadb.backend.entity.WhoLabelEntity;
import org.savadb.backend.service.JPA.Data.*;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/api")
public class LineageController {
    @Resource
    private JpaPangoNomenclatureService jpaPangoNomenclatureService;

    @Resource
    private JpaVariantService jpaVariantService;

    @Resource
    private JpaLineageService jpaLineageService;

    @Resource
    private JpaGeneInfoService jpaGeneInfoService;

    @Resource
    private JpaWHOLabelService jpaWHOLabelService;

    @GetMapping("/data/lineageBrief")
    public Result<Map<String, Object>> getVariant(@RequestParam String lineage) {
        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer targetId = pangoNomenclature.getvId();

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
        result.put("childCount", jpaLineageService.getChildrenCnt(variant.getvId()));

        Timestamp updateTime = variant.getUpdateTime();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        result.put("updateTime", dateFormat.format(updateTime));

        return result;
    }

    @GetMapping("/data/getAllChild")
    public Result<Map<String, Object>> getAllChildrenOfA(@RequestParam String lineage) {
        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer indexOfParent = pangoNomenclature.getvId();

        return Result.resultFactory(EResult.SUCCESS, processLineageNode(indexOfParent));
    }

    private Map<String, Object> processLineageNode(Integer lineageId) {
        Map<String, Object> result = new HashMap<>();
        result.put("name", jpaPangoNomenclatureService.getById(lineageId).getVariant());

        List<Map<String, Object>> childList = new ArrayList<>();

        List<LineageEntity> childInstList = jpaLineageService.getAllChildren(lineageId);

        for (LineageEntity child : childInstList) {
            childList.add(processLineageNode(child.getChildVariantId()));
        }

        result.put("children", childList);

        return result;
    }

    @GetMapping("/data/getRefSeq")
    public Result<String> getRefSeq(@RequestParam String lineage) {
        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer index = pangoNomenclature.getvId();

        String seqPath = jpaGeneInfoService.getPath(index);

        if (seqPath == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        try {
            String content = "";
            StringBuilder builder = new StringBuilder();

            File file = new File(seqPath);
            InputStreamReader streamReader = new InputStreamReader(new FileInputStream(file), StandardCharsets.UTF_8);
            BufferedReader bufferedReader = new BufferedReader(streamReader);

            while ((content = bufferedReader.readLine()) != null) {
                builder.append(content).append('\n');
            }

            return Result.resultFactory(EResult.SUCCESS, builder.toString());
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
    }

    @GetMapping("/data/getParentLineage")
    public Result<String> getParentLineage(@RequestParam String lineage) {
        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer index = pangoNomenclature.getvId();

        String parentName = jpaLineageService.getParentLineage(index);

        if (parentName == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        return Result.resultFactory(EResult.SUCCESS, parentName);
    }

    @GetMapping("/data/getMonitorVariants")
    public Result<List<String[]>> getMonitorVariants(@RequestParam String None,
                                                     @RequestParam String VOC,
                                                     @RequestParam String VOI,
                                                     @RequestParam String VUM,
                                                     @RequestParam String FMV) {
        try {
            List<VariantEntity> resultVariantsList = new ArrayList<>();

            if ("0".equals(None)) {
                resultVariantsList.addAll(jpaVariantService.getAllMonitor("None"));
            }

            if ("0".equals(VOC)) {
                resultVariantsList.addAll(jpaVariantService.getAllMonitor("VOC"));
            }

            if ("0".equals(VOI)) {
                resultVariantsList.addAll(jpaVariantService.getAllMonitor("VOI"));
            }

            if ("0".equals(VUM)) {
                resultVariantsList.addAll(jpaVariantService.getAllMonitor("VUM"));
            }

            if ("0".equals(FMV)) {
                resultVariantsList.addAll(jpaVariantService.getAllMonitor("FMV"));
            }


            List<String[]> result = new ArrayList<>();

            for (VariantEntity variant : resultVariantsList) {
                String[] singleVariant = new String[2];
                singleVariant[0] = variant.getPangoNomenclatureByVId().getVariant();

                WhoLabelEntity whoLabel = variant.getWhoLabelByVId();
                String whoLabelStr;
                if (whoLabel == null) {
                    whoLabelStr = "None";
                }
                else {
                    whoLabelStr = whoLabel.getLabel();
                }
                singleVariant[1] = whoLabelStr + ' '
                        + variant.getMonitorLevel() + ' '
                        + variant.getvStatus();

                result.add(singleVariant);
            }

            return Result.resultFactory(EResult.SUCCESS, result);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @GetMapping("/data/searchWHOLabel")
    public Result<List<String[]>> searchWHOLabel(@RequestParam String key) {
        List<WhoLabelEntity> whoLabelEntityList = jpaWHOLabelService.findAllLabelContains(key);

        List<String[]> result = new ArrayList<>();
        for (WhoLabelEntity whoLabel : whoLabelEntityList) {
            String[] singleVariant = new String[2];
            VariantEntity variant = whoLabel.getVariantByVId();

            singleVariant[0] = variant.getPangoNomenclatureByVId().getVariant();

            String whoLabelStr;
            whoLabelStr = whoLabel.getLabel();
            singleVariant[1] = whoLabelStr + ' '
                    + variant.getMonitorLevel() + ' '
                    + variant.getvStatus();

            result.add(singleVariant);
        }
        return Result.resultFactory(EResult.SUCCESS, result);
    }
}
