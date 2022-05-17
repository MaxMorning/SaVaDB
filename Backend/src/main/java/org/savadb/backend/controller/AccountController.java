package org.savadb.backend.controller;

import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.service.JPA.JpaUserService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.JWTUtils;
import org.savadb.backend.utils.PasswordUtils;
import org.savadb.backend.utils.Result;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AccountController {
    @Resource
    private JpaUserService jpaUserService;

    private int idCnt = 0;

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

        jpaUserService.insertUser(user);

        JWTUtils jwtUtils = new JWTUtils();
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("name", user.getUsrName());

        tokenMap.put("role", user.getRole());

        String[] roles = user.getRole().split(",");
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

        int expiredDay = keep_login ? 1 : 15;
        String token = jwtUtils.getToken(tokenMap, expiredDay);

        return Result.resultFactory(EResult.SUCCESS, token);
    }

    @GetMapping("user/getUserInfo")
    public Result<Map<String, String>> getUserInfo() {
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
            return Result.resultFactory(EResult.DATA_NULL, null);
        }

        if (userList.size() > 1) {
            return Result.resultFactory(EResult.DATA_DUPLICATE, null);
        }

        UserEntity user = userList.get(0);

        Map<String, String> userInfo = new HashMap<>();

        userInfo.put("username", user.getUsrName());
        userInfo.put("role", user.getRole());

        return Result.resultFactory(EResult.SUCCESS, userInfo);
    }
}
