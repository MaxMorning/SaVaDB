package org.savadb.backend.security;

import org.savadb.backend.entity.UserEntity;
import org.savadb.backend.service.JPA.JpaUserService;
import org.savadb.backend.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Component
public class MyAuthenticationProvider implements AuthenticationProvider {

    @Resource
    private JpaUserService jpaUserService;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    //自定义密码验证
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();     //表单提交的用户名
        String presentedPassword = (String)authentication.getCredentials();     //表单提交的密码
        List<UserEntity> usersInDB = jpaUserService.findAllByUsrName(username); // 根据用户名获取用户信息
        if (usersInDB.isEmpty()) {
            throw new BadCredentialsException("用户名不存在");
        }
        else {
            UserEntity userInDB = usersInDB.get(0);

            UserDetails userDetails = userDetailsService.loadUserByUsername(userInDB.getUsrName());

            if (authentication.getCredentials() == null) {
                throw new BadCredentialsException("凭证为空");
            }
            else {
                // check password valid
                if (!Arrays.equals(userInDB.getPasswd(), PasswordUtils.passwordHash(Base64.getDecoder().decode(presentedPassword), userInDB.getSalt()))) {
                    System.out.println("encodedPassword:" + presentedPassword);
                    System.out.println("password:" + Base64.getEncoder().encodeToString(userInDB.getPasswd()));
                    throw new BadCredentialsException("密码错误");
                }
                else {
                    UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(userDetails, authentication.getCredentials(), userDetails.getAuthorities());
                    result.setDetails(authentication.getDetails());
                    return result;
                }
            }
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }


    //获取用户权限
    public List<GrantedAuthority> getUserAuthority(int userId){

        // 角色(ROLE_admin)、菜单操作权限 sys:user:list
        String authority = jpaUserService.findById(userId).getRole();  // ROLE_admin,ROLE_normal,sys:user:list,....

        return AuthorityUtils.commaSeparatedStringToAuthorityList(authority);
    }
}
