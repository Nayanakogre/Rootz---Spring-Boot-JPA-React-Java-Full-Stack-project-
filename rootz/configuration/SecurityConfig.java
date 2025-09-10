package com.xworkz.rootz.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // ✅ Enable CORS
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/rootz/register", "/rootz/login",
                                "/rootz/forgot-password","/rootz/verify-otp",
                                "/rootz/reset-password","/rootz/change-password",
                                "/rootz/upload-profile-image","/rootz/edit-profile").permitAll()

                        .anyRequest().authenticated()
                );
        return http.build();
    }
}
