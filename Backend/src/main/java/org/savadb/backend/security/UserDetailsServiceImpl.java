package org.savadb.backend.security;

import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.service.JPA.Account.JpaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private JpaUserService jpaUserService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        if (s == null || "".equals(s))
        {
            throw new RuntimeException("用户不能为空");
        }
        // 调用方法查询用户
        UserEntity user = jpaUserService.findAllByUsrName(s).get(0);
        if (user == null)
        {
            throw new RuntimeException("用户不存在");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // 分割多个role
        String[] roles = user.getRole().split(",");
        for (String roleStr : roles) {
            authorities.add(new SimpleGrantedAuthority(roleStr));
        }

        return new org.springframework.security.core.userdetails.User(user.getUsrName(), "{noop}" + Base64.getEncoder().encodeToString(user.getPasswd()), authorities);
    }
}
