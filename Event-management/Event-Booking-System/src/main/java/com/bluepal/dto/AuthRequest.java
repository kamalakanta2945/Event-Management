package com.bluepal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {

    @NotBlank
    @Email
    private String email1;

    @NotBlank
    private String password;
}
