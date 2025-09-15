package com.bluepal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    private String middleName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotNull(message = "Role is required")
    private String role; // This should map to your enum USER_ROLE in service layer

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Email(message = "Email2 should be valid")
    private String email2;

    private Long mobileNo1;
    private Long mobileNo2;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;
}
