package com.everydaydeals.backend.config;

import com.everydaydeals.backend.security.AdminKeyFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

/**
 * Spring Security configuration.
 *
 * Public  : all GET requests to /api/** and /actuator/health
 * Protected: POST, PUT, DELETE require a valid X-Admin-Key header
 *
 * Authentication is stateless (no session, no CSRF token needed for REST).
 * CORS is handled by the CorsConfigurationSource bean in CorsConfig.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${admin.api-key:}")
    private String adminApiKey;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                new AdminKeyFilter(adminApiKey),
                UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((request, response, e) -> {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        "{\"status\":401,\"detail\":\"Missing or invalid X-Admin-Key header.\"}");
                })
                .accessDeniedHandler((request, response, e) -> {
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    response.getWriter().write(
                        "{\"status\":403,\"detail\":\"Access denied.\"}");
                })
            );

        return http.build();
    }
}
