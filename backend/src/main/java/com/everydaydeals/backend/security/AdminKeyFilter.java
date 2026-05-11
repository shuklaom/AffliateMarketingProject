package com.everydaydeals.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Checks for the X-Admin-Key header on every request.
 * If the header value matches the configured admin.api-key, the request is
 * granted the ROLE_ADMIN authority so Spring Security allows write operations.
 *
 * If the key is blank (not configured), no request can ever authenticate —
 * failing securely rather than opening the API.
 */
public class AdminKeyFilter extends OncePerRequestFilter {

    static final String HEADER = "X-Admin-Key";

    private final String adminApiKey;

    public AdminKeyFilter(String adminApiKey) {
        this.adminApiKey = adminApiKey;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String provided = request.getHeader(HEADER);

        if (provided != null
                && !adminApiKey.isBlank()
                && adminApiKey.equals(provided)) {

            PreAuthenticatedAuthenticationToken auth =
                    new PreAuthenticatedAuthenticationToken(
                            "admin", null,
                            List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));

            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}
