package com.rhyun.backend.security;

import com.rhyun.backend.security.model.AppUserRole;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        String adminRole = "ROLE_" + AppUserRole.ADMIN.name();
        String employeeRole = "ROLE_" + AppUserRole.EMPLOYEE.name();
        String userRole = "ROLE_" + AppUserRole.USER.name();

        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight").hasAnyAuthority(adminRole, employeeRole, userRole)
                        .requestMatchers(HttpMethod.POST, "/api/flight").hasAuthority(adminRole)
                        .requestMatchers(HttpMethod.DELETE, "/api/flight/**").hasAuthority(adminRole)
                        .requestMatchers(HttpMethod.PUT, "/api/flight/**").hasAuthority(adminRole)
                        .requestMatchers(HttpMethod.GET, "/api/airport").hasAuthority(adminRole)
                        .requestMatchers(HttpMethod.GET, "/api/airport/**").hasAuthority(adminRole)
                        .anyRequest().authenticated()
                )
               .httpBasic(httpSecurityHttpBasicConfigurer ->
                       httpSecurityHttpBasicConfigurer.authenticationEntryPoint(((request, response, authException) -> response.sendError(401))));

        return httpSecurity.build();
    }
}
