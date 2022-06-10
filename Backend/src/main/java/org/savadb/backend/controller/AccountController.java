package org.savadb.backend.controller;

import org.savadb.backend.entity.*;
import org.savadb.backend.service.JPA.Account.JpaCompRecordService;
import org.savadb.backend.service.JPA.Account.JpaUserService;
import org.savadb.backend.service.JPA.Account.JpaUserWatchingRegionsService;
import org.savadb.backend.service.JPA.Account.JpaUserWatchingVariantsService;
import org.savadb.backend.service.JPA.Data.JpaPangoNomenclatureService;
import org.savadb.backend.service.JPA.JpaRegionService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.JWTUtils;
import org.savadb.backend.utils.PasswordUtils;
import org.savadb.backend.utils.Result;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.sql.Array;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api")
public class AccountController {
    @Resource
    private JpaUserService jpaUserService;

    @Resource
    private JpaUserWatchingRegionsService jpaUserWatchingRegionsService;

    @Resource
    private JpaUserWatchingVariantsService jpaUserWatchingVariantsService;

    @Resource
    private JpaCompRecordService jpaCompRecordService;

    @Resource
    private JpaPangoNomenclatureService jpaPangoNomenclatureService;

    @Resource
    private JpaRegionService jpaRegionService;

    private int idCnt = 0;

    private UserEntity currentUser;

    /**
     * 用户注册
     */
    @PostMapping("reg")
    public Result<String> register(@RequestBody Map<String, Object> reg_info) {
        String username = (String) reg_info.get("username");
        byte[] password = Base64.getDecoder().decode((String) reg_info.get("password"));
        Boolean keep_login = (Boolean) reg_info.get("keep_login");
        if (username == null || username.length() == 0 || password == null || password.length < 32 || keep_login == null) {
            return Result.resultFactory(EResult.DATA_NULL, "Invalid data.");
        }

        // check name used
        if (!jpaUserService.findAllByUsrName(username).isEmpty()) {
            return Result.resultFactory(EResult.DATA_DUPLICATE, "Invalid user name.");
        }

        UserEntity user = new UserEntity();
        user.setUsrId(idCnt);
        ++idCnt;
        user.setEmail((String) reg_info.get("email"));
        user.setUsrName(username);
        user.setRole("ROLE_USER");

        byte[] salt = PasswordUtils.genRandom512bit();
        byte[] saltedPassword = PasswordUtils.passwordHash(password, salt);
        user.setSalt(salt);
        user.setPasswd(saltedPassword);
        user.setRemainCompTime(5);

        jpaUserService.insertUser(user);

        JWTUtils jwtUtils = new JWTUtils();
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("name", user.getUsrName());

        tokenMap.put("role", user.getRole());

        String[] roles = user.getRole().split(",");
        storeRoleIntoMap(tokenMap, roles);

        int expiredDay = keep_login ? 1 : 15;
        String token = jwtUtils.getToken(tokenMap, expiredDay);

        return Result.resultFactory(EResult.SUCCESS, token);
    }

    private EResult getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        }
        else {
            username = principal.toString();
        }
        List<UserEntity> userList = jpaUserService.findAllByUsrName(username);
        if (userList.isEmpty()) {
            return EResult.DATA_NULL;
        }

        if (userList.size() > 1) {
            return EResult.DATA_DUPLICATE;
        }

        this.currentUser = userList.get(0);
        return EResult.SUCCESS;
    }

    @GetMapping("user/getUserInfo")
    public Result<Map<String, String>> getUserInfo() {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        Map<String, String> userInfo = new HashMap<>();

        userInfo.put("username", this.currentUser.getUsrName());
        userInfo.put("role", this.currentUser.getRole());

        return Result.resultFactory(EResult.SUCCESS, userInfo);
    }

    @GetMapping("user/getUserSubRegions")
    public Result<List<String>> getUserSubRegions() {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        return Result.resultFactory(EResult.SUCCESS, jpaUserWatchingRegionsService.getAllWatchingRegions(this.currentUser.getUsrId()));
    }

    @GetMapping("/user/getUserSubLineages")
    public Result<List<String>> getUserSubLineage() {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        return Result.resultFactory(EResult.SUCCESS, jpaUserWatchingVariantsService.getAllWatchingVariants(this.currentUser.getUsrId()));
    }

    @GetMapping("/user/getCompRecord")
    public Result<List<List<Object>>> getCompareRecord() {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        List<CompRecordEntity> compRecordEntityList = jpaCompRecordService.getUserRecords(this.currentUser.getUsrId());

        int index = compRecordEntityList.size() - 1;

        List<List<Object>> result = new ArrayList<>();

        for (CompRecordEntity compRecord : compRecordEntityList) {
            List<Object> singleList = new ArrayList<>();

            singleList.add(index);
            singleList.add(compRecord.getSeqSha1Value());

            int status = compRecord.getStatus();
            switch (status) {
                case 0:
                    singleList.add("Pending");
                    break;

                case 1:
                    singleList.add("Comparing");
                    break;

                default:
                    singleList.add("Done");
            }


            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            singleList.add(compRecord.getCompDate().toLocalDateTime().format(dateTimeFormatter));

            --index;
            result.add(singleList);
        }

        return Result.resultFactory(EResult.SUCCESS, result);
    }

    @GetMapping("/user/getCompResult")
    public Result<List<List<Object>>> getCompResult(@RequestParam Integer index) {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        CompRecordEntity compRecord;
        try {
            compRecord = jpaCompRecordService.getSingleRecord(index, this.currentUser.getUsrId());
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        if (compRecord == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        String resultPath = compRecord.getCompResultPath();
        if (resultPath == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        // 读取结果文件
        List<List<Object>> result = new ArrayList<>();

        try {
            FileReader reader = new FileReader(resultPath);
            BufferedReader bufferedReader = new BufferedReader(reader);

            String line;
            while ((line = bufferedReader.readLine()) != null) {
                String[] splitResult = line.split("\\s+");

                List<Object> singleResult = new ArrayList<>();

                // splitResult[0] 应该是一个空字符串
                singleResult.add(splitResult[1]);
                singleResult.add(Integer.valueOf(splitResult[2]));
                singleResult.add(splitResult[3] + '%');

                result.add(singleResult);
            }
            bufferedReader.close();
            reader.close();
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        return Result.resultFactory(EResult.SUCCESS, result);
    }


    private final String seqFileDir = "F:\\TestCode\\Java\\SaVaDB\\Backend\\seqDir\\";

    @PostMapping("/user/compareSeq")
    public Result<String> compareSequence(@RequestBody Map<String, String> body) {
        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        if (this.currentUser.getRemainCompTime() == 0) {
            return Result.resultFactory(EResult.REQUEST_REJECT, null);
        }

        // 检查序列合法性
        String seq = body.get("seq");
        if (seq == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        for (int i = 0; i < seq.length(); ++i) {
            char c = seq.charAt(i);
            if (c != 'A' && c != 'T' && c != 'C' && c != 'G' && c != 'N' && c != '\n') {
                return Result.resultFactory(EResult.BAD_REQUEST, null);
            }
        }

        // 检查通过，计算相关信息并存入数据库。具体的匹配工作由另一个单独的线程处理
        MessageDigest sha1Inst;
        try {
            sha1Inst = MessageDigest.getInstance("SHA1");
            byte[] seqBytes = seq.getBytes(StandardCharsets.UTF_8);
            byte[] sha1Result = sha1Inst.digest(seqBytes);

            StringBuilder hexValue = new StringBuilder();
            for (byte b : sha1Result) {
                int val = ((int) b) & 0xff;
                if (val < 16) {
                    hexValue.append("0");
                }
                hexValue.append(Integer.toHexString(val));
            }

            String hexSHA1 = hexValue.toString();
            List<CompRecordEntity> compRecordList = jpaCompRecordService.findSameSeq(hexSHA1);

            if (compRecordList.isEmpty()) {
                // 从未匹配过
                CompRecordEntity compRecord = new CompRecordEntity();
                compRecord.setUsrId(this.currentUser.getUsrId());
                compRecord.setIdxOfUsr(jpaCompRecordService.getUserRecords(this.currentUser.getUsrId()).size());
                compRecord.setCompDate(new Timestamp(System.currentTimeMillis()));
                compRecord.setStatus((byte) 0);
                compRecord.setSeqSha1Value(hexSHA1);

                // 将序列写入磁盘
                File file = new File(this.seqFileDir + hexSHA1);

                if(!file.exists()){
                    file.createNewFile();
                }

                FileWriter fileWriter = new FileWriter(file.getAbsolutePath(),false);
                fileWriter.write('\n' + seq);

                fileWriter.close();

                compRecord.setSeqFilePath(this.seqFileDir + hexSHA1);

                jpaCompRecordService.insertRecord(compRecord);
                jpaUserService.decCompTime(this.currentUser);
            }
            else {
                // 曾经匹配过，直接给缓存
                CompRecordEntity compRecord = compRecordList.get(0);
                CompRecordEntity newCompRecord = new CompRecordEntity();
                newCompRecord.setUsrId(this.currentUser.getUsrId());
                newCompRecord.setIdxOfUsr(jpaCompRecordService.getUserRecords(this.currentUser.getUsrId()).size());
                newCompRecord.setCompDate(new Timestamp(System.currentTimeMillis()));
                newCompRecord.setStatus(compRecord.getStatus());
                newCompRecord.setSeqSha1Value(hexSHA1);
                newCompRecord.setSeqFilePath(compRecord.getSeqFilePath());
                newCompRecord.setCompResultPath(compRecord.getCompResultPath());

                jpaCompRecordService.insertRecord(newCompRecord);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.UNKNOWN_ERROR, null);
        }
        return Result.resultFactory(EResult.SUCCESS, null);
    }

    @GetMapping("/user/subLineage")
    public Result<String> changeSubLineage(@RequestParam String lineage) {
        if (lineage == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer variantId = pangoNomenclature.getvId();

        UserWatchingEntity userWatching = jpaUserWatchingVariantsService.getUserWatchingEntity(this.currentUser.getUsrId(), variantId);

        if (userWatching == null) {
            userWatching = new UserWatchingEntity();
            userWatching.setUsrId(this.currentUser.getUsrId());
            userWatching.setWatchingVId(variantId);
            jpaUserWatchingVariantsService.saveWatchingEntity(userWatching);

            return Result.resultFactory(EResult.SUCCESS, "true");
        }
        else {
            jpaUserWatchingVariantsService.deleteEntity(userWatching);

            return Result.resultFactory(EResult.SUCCESS, "false");
        }
    }

    @GetMapping("/user/checkSubLineage")
    public Result<String> checkSubLineage(@RequestParam String lineage) {
        if (lineage == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        PangoNomenclatureEntity pangoNomenclature = jpaPangoNomenclatureService.findByVariantName(lineage);
        if (pangoNomenclature == null) {
            return Result.resultFactory(EResult.DATA_NULL, null);
        }
        Integer variantId = pangoNomenclature.getvId();

        if (jpaUserWatchingVariantsService.checkSubscribeVariant(this.currentUser.getUsrId(), variantId)) {
            return Result.resultFactory(EResult.SUCCESS, "true");
        }
        else {
            return Result.resultFactory(EResult.SUCCESS, "false");
        }
    }

    @GetMapping("/user/subRegion")
    public Result<String> changeSubRegion(@RequestParam String region) {
        if (region == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        RegionEntity regionEntity = jpaRegionService.findByRegionName(region);
        if (regionEntity == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        Integer regionId = regionEntity.getRegionId();

        UserWatchingRegionsEntity userWatchingRegions = jpaUserWatchingRegionsService.getUserWatchingEntity(this.currentUser.getUsrId(), regionId);

        if (userWatchingRegions == null) {
            userWatchingRegions = new UserWatchingRegionsEntity();
            userWatchingRegions.setUsrId(this.currentUser.getUsrId());
            userWatchingRegions.setWatchingRId(regionId);
            jpaUserWatchingRegionsService.saveWatchingEntity(userWatchingRegions);

            return Result.resultFactory(EResult.SUCCESS, "true");
        }
        else {
            jpaUserWatchingRegionsService.deleteEntity(userWatchingRegions);

            return Result.resultFactory(EResult.SUCCESS, "false");
        }
    }

    @GetMapping("/user/checkSubRegion")
    public Result<String> checkSubRegion(@RequestParam String region) {
        if (region == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        EResult getUserResult = getCurrentUser();
        if (getUserResult != EResult.SUCCESS) {
            return Result.resultFactory(getUserResult, null);
        }

        RegionEntity regionEntity = jpaRegionService.findByRegionName(region);
        if (regionEntity == null) {
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }

        Integer regionId = regionEntity.getRegionId();

        if (jpaUserWatchingRegionsService.checkSubscribeRegion(this.currentUser.getUsrId(), regionId)) {
            return Result.resultFactory(EResult.SUCCESS, "true");
        }
        else {
            return Result.resultFactory(EResult.SUCCESS, "false");
        }
    }

    @PostMapping("/user/changeUsername")
    public Result<String> changeUsername(@RequestBody Map<String, Object> requestBody) {
        try {
            String username = (String) requestBody.get("username");
            byte[] password = Base64.getDecoder().decode((String) requestBody.get("password"));

            // 验证密码
            EResult getUserResult = getCurrentUser();
            if (getUserResult != EResult.SUCCESS) {
                return Result.resultFactory(getUserResult, null);
            }

            if (Arrays.equals(PasswordUtils.passwordHash(password, this.currentUser.getSalt()), this.currentUser.getPasswd())) {
                // 密码正确
                // 检查用户名重复
                if (jpaUserService.findAllByUsrName(username).isEmpty()) {
                    this.currentUser.setUsrName(username);
                    jpaUserService.insertUser(this.currentUser);

                    // 签发新的token
                    JWTUtils jwtUtils = new JWTUtils();
                    Map<String, String> tokenMap = new HashMap<>();
                    tokenMap.put("name", username);
                    String[] roles = this.currentUser.getRole().split(",");
                    storeRoleIntoMap(tokenMap, roles);

                    String authorization = jwtUtils.getToken(tokenMap, 1);


                    return Result.resultFactory(EResult.SUCCESS, authorization);
                }
                else {
                    return Result.resultFactory(EResult.DATA_DUPLICATE, "Duplicate username");
                }

            }
            else {
                // 密码错误
                return Result.resultFactory(EResult.AUTH_FAIL, "Wrong password");
            }

        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, "Invalid data.");
        }
    }

    @PostMapping("/user/changePassword")
    public Result<String> changePassword(@RequestBody Map<String, Object> requestBody) {
        try {
            byte[] newPassword = Base64.getDecoder().decode((String) requestBody.get("newPassword"));

            // 验证密码
            EResult getUserResult = getCurrentUser();
            if (getUserResult != EResult.SUCCESS) {
                return Result.resultFactory(getUserResult, null);
            }

            byte[] newSalt = PasswordUtils.genRandom512bit();
            byte[] newHashedPassword = PasswordUtils.passwordHash(newPassword, newSalt);

            this.currentUser.setPasswd(newHashedPassword);
            this.currentUser.setSalt(newSalt);

            jpaUserService.insertUser(this.currentUser);

            // 无需重新签发token
            return Result.resultFactory(EResult.SUCCESS, "Success");
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, "Invalid request");
        }
    }

    private void storeRoleIntoMap(Map<String, String> tokenMap, String[] roles) {
        if (roles.length == 1) {
            tokenMap.put("role", roles[0]);
        }
        else {
            StringBuilder roleStr = new StringBuilder("[");
            for (String role : roles) {
                roleStr.append("ROLE_").append(role).append(", ");
            }
            roleStr.replace(roleStr.length() - 1, roleStr.length() - 1, "]");

            tokenMap.put("role", roleStr.toString());
        }
    }

    @GetMapping("/other/getVerifyCode")
    public Result<String> getVerifyCode(@RequestParam String email) {
        try {
            UserEntity user = jpaUserService.getUserByEmail(email);

            Random random = new Random();

            user.setVerifyCode(String.valueOf(random.nextInt(1000000)));

            jpaUserService.insertUser(user);

            return Result.resultFactory(EResult.SUCCESS, null);
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }

    @GetMapping("/other/verifyCode")
    public Result<String> verifyCode(@RequestParam String email, @RequestParam String code) {
        try {
            UserEntity user = jpaUserService.getUserByEmail(email);

            if (user.getVerifyCode().equals(code)) {
                // 验证通过
                // 签发一个临时的token
                JWTUtils jwtUtils = new JWTUtils();
                Map<String, String> tokenMap = new HashMap<>();
                tokenMap.put("name", user.getUsrName());

                tokenMap.put("role", user.getRole());

                String[] roles = user.getRole().split(",");
                storeRoleIntoMap(tokenMap, roles);

                String token = jwtUtils.getToken(tokenMap, 1);

                return Result.resultFactory(EResult.SUCCESS, token);
            }
            else {
                return Result.resultFactory(EResult.AUTH_FAIL, null);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return Result.resultFactory(EResult.BAD_REQUEST, null);
        }
    }
}
