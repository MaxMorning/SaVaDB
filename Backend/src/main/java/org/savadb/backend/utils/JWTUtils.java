package org.savadb.backend.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.savadb.backend.service.JPA.Account.JpaUserService;

import javax.annotation.Resource;
import java.util.*;


public class JWTUtils {
    @Resource
    private JpaUserService jpaUserService;

    private final String SIGN = "com.morning.han"; // 密钥

    public String getToken(Map<String, String> map, int expired_days) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, expired_days); // 定义过期时间
        Date date = calendar.getTime();

        JWTCreator.Builder builder = JWT.create();

        map.forEach(builder::withClaim);

        return builder.withExpiresAt(date) // 为token设置过期时间
                .sign(Algorithm.HMAC256(SIGN));
    }

    public DecodedJWT verifyToken(String token) {
        return JWT.require(Algorithm.HMAC256(SIGN)).build().verify(token);
    }

    public String getUsername(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getClaim("name").asString();
    }

    public String getUserRole(String token) {
        DecodedJWT decodedJWT = verifyToken(token);
        return decodedJWT.getClaim("role").asString();
    }
}
