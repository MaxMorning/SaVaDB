package org.savadb.backend.security;

import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.service.JPA.JpaUserService;
import org.savadb.backend.utils.JWTUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Base64;

public class AuthInterceptor implements HandlerInterceptor {
    @Resource
    private JpaUserService jpaUserService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            String token = request.getHeader("Authorization");
            JWTUtils jwtUtils = new JWTUtils();
            DecodedJWT decodedJWT = jwtUtils.verifyToken(token);

            String userName = decodedJWT.getClaim("name").asString();
            byte[] userToken = Base64.getDecoder().decode(decodedJWT.getClaim("token").asString());

            UserEntity userInDB = jpaUserService.findAllByUsrName(userName).get(0);

            if (Arrays.equals(userInDB.getToken(), userToken)) {
                System.out.println("Authorized.");
                return true;
            }
            else {
                System.out.println("Auth error.");
                return false;
            }
        }
        catch (SignatureVerificationException e) {
            System.out.println("Signature verification failed.");
            e.printStackTrace();
        }
        catch (TokenExpiredException e) {
            System.out.println("Token expired time out.");
            e.printStackTrace();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
