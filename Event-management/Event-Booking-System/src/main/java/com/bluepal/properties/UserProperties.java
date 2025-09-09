package com.bluepal.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "user")
@Data
public class UserProperties {
    private String registrationSuccessSubject;
    private String addUserEmailExist ;
    private String notFoundMessage;
    private String addedSuccessMessage;
    private String deletedSuccessMessage;
}
