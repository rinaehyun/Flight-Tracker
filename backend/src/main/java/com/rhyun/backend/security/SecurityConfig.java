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

        final String ROLE_PREFIX = "ROLE_";
        String adminRole = ROLE_PREFIX + AppUserRole.ADMIN.name();
        String employeeRole = ROLE_PREFIX + AppUserRole.EMPLOYEE.name();
        String userRole = ROLE_PREFIX + AppUserRole.USER.name();

        String airportEndpoint = "/api/airport/**";


        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/flight").hasAnyAuthority(adminRole, employeeRole, userRole)
                        .requestMatchers(HttpMethod.POST, "/api/flight").hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.DELETE, "/api/flight/**").hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.PUT, "/api/flight/**").hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.GET, "/api/airport").hasAnyAuthority(adminRole, employeeRole, userRole)
                        .requestMatchers(HttpMethod.GET, airportEndpoint).hasAnyAuthority(adminRole, employeeRole, userRole)
                        .requestMatchers(HttpMethod.POST, "/api/airport").hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.DELETE, airportEndpoint).hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.PUT, airportEndpoint).hasAnyAuthority(adminRole, employeeRole)
                        .requestMatchers(HttpMethod.GET, "/api/airline/options-for-input").hasAnyAuthority(adminRole, employeeRole, userRole)
                        .anyRequest().authenticated()
                )
               .httpBasic(httpSecurityHttpBasicConfigurer ->
                       httpSecurityHttpBasicConfigurer.authenticationEntryPoint(((request, response, authException) -> response.sendError(401))));

        return httpSecurity.build();
    }
}
