package com.foodbox.config;

import java.util.Arrays;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.google.common.collect.ImmutableList;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService jwtUserDetailsService;

	@Autowired
	private JwtRequestFilter jwtRequestFilter;

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// configure AuthenticationManager so that it knows from where to load
		// user for matching credentials
		// Use BCryptPasswordEncoder
		auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean	
    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
////        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4302"));
////        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE"));
////        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
////        source.registerCorsConfiguration("/**", configuration);
////        return source CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(Arrays.asList("**"));
//        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
//        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        
        final CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(ImmutableList.of("*"));//YOLO Allow all origins, we can change this once we go to prod
        configuration.setAllowedOriginPatterns(ImmutableList.of("*"));//YOLO Allow all origins, we can change this once we go to prod
        configuration.setAllowedMethods(ImmutableList.of("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS"));//Allowed Methods
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type","Access-Control-Request-Headers","Access-Control-Request-Method",
               "Accept","Access-Control-Allow-Headers"));//Allowed Headers
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
        

//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
        
        
    }

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		// We don't need CSRF for this example
		

		// Enable CORS and disable CSRF
		httpSecurity = httpSecurity.cors().and().csrf().disable();

		        // Set session management to stateless
		httpSecurity = httpSecurity
		            .sessionManagement()
		            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		            .and();

		 // Set unauthorized requests exception handler
		httpSecurity = httpSecurity
		            .exceptionHandling()
		            .authenticationEntryPoint(
		                (request, response, ex) -> {
		                    response.sendError(
		                        HttpServletResponse.SC_UNAUTHORIZED,
		                        ex.getMessage()
		                    );
		                }
		            )
		            .and();

						httpSecurity
						// dont authenticate this particular request
						.authorizeRequests().antMatchers("/authenticate", "/register").permitAll().
						// all other requests need to be authenticated
						anyRequest().authenticated().and().
						// make sure we use stateless session; session won't be used to
						// store user's state.
						exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
						
						 // Set permissions on endpoints
//						httpSecurity.authorizeRequests()
//				            // Our public endpoints
//				            .antMatchers("/authenticate", "/register").permitAll()
//				            .antMatchers(HttpMethod.GET, "/product/*").permitAll()
////				            .antMatchers(HttpMethod.POST, "/api/author/search").permitAll()
////				            .antMatchers(HttpMethod.GET, "/api/book/**").permitAll()
////				            .antMatchers(HttpMethod.POST, "/api/book/search").permitAll()
////				            // Our private endpoints
////				            .antMatchers("/api/admin/user/**").hasRole(Role.USER_ADMIN)
////				            .antMatchers("/api/author/**").hasRole(Role.AUTHOR_ADMIN)
////				            .antMatchers("/api/book/**").hasRole(Role.BOOK_ADMIN)
//				            .anyRequest().authenticated().and().
//				            exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
//							.sessionCreationPolicy(SessionCreationPolicy.STATELESS);;
//				        

				// Add a filter to validate the tokens with every request
				httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
	}
}