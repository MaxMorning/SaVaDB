package org.savadb.backend.controller;

import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.service.JPA.JpaUserService;
import org.savadb.backend.utils.EResult;
import org.savadb.backend.utils.JWTUtils;
import org.savadb.backend.utils.Result;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Resource
    private JpaUserService jpaUserService;

    /**
     * 用户注册
     */
    @PostMapping("register")
    public Result<String> register(@RequestBody UserEntity user) {
        if (user.getUsrName().length() == 0 || user.getPasswd().length < 32) {
            return Result.resultFactory(EResult.DATA_NULL, "Invalid data.");
        }

        // check name used
        if (!jpaUserService.findAllByUsrName(user.getUsrName()).isEmpty()) {
            return Result.resultFactory(EResult.DATA_DUPLICATE, "Invalid user name.");
        }

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

        String token = jwtUtils.getToken(tokenMap, 7);

        return Result.resultFactory(EResult.SUCCESS, token);
    }
}
