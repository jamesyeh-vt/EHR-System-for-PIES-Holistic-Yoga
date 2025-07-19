package com.pies.config;

import com.pies.auth.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Unified SecurityConfig: supports both dev and prod profiles.
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtFilter;

    private final CorsProperties corsProperties;

    @Autowired
    public SecurityConfig(JwtAuthFilter jwtFilter, CorsProperties corsProperties) {
        this.jwtFilter = jwtFilter;
        this.corsProperties = corsProperties;
    }

    // Both prod & dev use the same security rules
    @Bean
    @Profile({"prod", "dev"})
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html").permitAll()
                        .requestMatchers(HttpMethod.POST, "/auth/register").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/therapists/**").hasRole("ADMIN")
                        .requestMatchers("/therapists/**").hasAnyRole("ADMIN", "SENIOR")
                        .anyRequest().authenticated())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }

    // Production password encoder: BCrypt.
    @Bean
    @Profile("prod")
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Dev password encoder: plain text
    @Bean
    @Profile("dev")
    public PasswordEncoder devPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence rawPassword) {
                return rawPassword == null ? null : rawPassword.toString();
            }

            @Override
            public boolean matches(CharSequence rawPassword, String encodedPassword) {
                return rawPassword != null && rawPassword.toString().equals(encodedPassword);
            }
        };
    }

    @Bean
    @Profile("dev")
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        corsProperties.getAllowedOrigins().forEach(config::addAllowedOrigin);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
