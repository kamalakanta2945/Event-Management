package com.bluepal.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "auth")
@Data
public class AuthProperties {

	    private String signupSuccess;
	    private String signupEmailExist;
	    private String signupUserCreated;
	    private String signinSuccess;
	    private String forgotEmailSent;
	    private String forgotTokenGenerated;
	    private String resetSuccess;
	    private String resetInvalidToken;
	    private String loginSuccess;
	    private String jwtGenerated;
	    private String invalidUsername;
	    private String invalidPassword;

}
