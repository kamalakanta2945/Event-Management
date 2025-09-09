package com.bluepal.config;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http
				// Stateless session management because we're using JWT
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

				// Securing API endpoints for AuthenticationServiceAPI and UserServiceAPI
				.authorizeHttpRequests(auth -> auth.requestMatchers("/api/v1/admin/**").hasAnyRole("ADMIN") // Admin-specific
																											// endpoints
						.requestMatchers("/api/v1/user/**").hasAnyRole("ADMIN", "USER") // UserServiceAPI
																						// endpoints for
																						// multiple
																						// roles
						.requestMatchers("/api/v1/bookings/**").hasAnyRole("ADMIN","USER") // Sales Manager endpoints
						.requestMatchers("/api/v1/events/**").hasAnyRole("USER", "ADMIN") // Purchasing Manager
																								// endpoints
						.requestMatchers("/api/v1/payments/**").hasAnyRole("USER", "ADMIN") // Inventory Manager
																	
						.requestMatchers("/api/v1/auth/**",
				                 "/v3/api-docs/**",
				                 "/swagger-ui/**",
				                 "/swagger-ui.html",
				                 "/swagger-resources/**")

						
						.permitAll() // AuthenticationServiceAPI endpoints
						.anyRequest().authenticated() // Other endpoints need authentication
				)

				// Adding JWT token validation filter before basic authentication
				.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)

				// Disable CSRF as we're relying on JWT for security
				.csrf(csrf -> csrf.disable())

				// CORS configuration
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))

				// Allow basic authentication and form login (optional)
				.httpBasic(Customizer.withDefaults()).formLogin(Customizer.withDefaults());

		return http.build();
	}

	private CorsConfigurationSource corsConfigurationSource() {

		return new CorsConfigurationSource() {

			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

				CorsConfiguration cfg = new CorsConfiguration();
				cfg.setAllowedOrigins(Arrays.asList(

						"http://localhost:3000"));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowCredentials(true);
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setExposedHeaders(Arrays.asList("Authorization"));
				cfg.setMaxAge(3600L);

				return cfg;
			}
		};
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.components(new Components().addSecuritySchemes("bearerAuth",
						new SecurityScheme().type(SecurityScheme.Type.HTTP).scheme("bearer").bearerFormat("JWT")))
				.addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
	}
}
