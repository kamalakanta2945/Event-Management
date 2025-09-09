package com.bluepal.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "razorpay")
public class RazorPayConfig {
    private String key;
    private String secret;
}