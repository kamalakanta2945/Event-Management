package com.bluepal.dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserProfileUpdateRequest {

    private String firstName;
    private String middleName;
    private String lastName;

    @Email(message = "Email2 should be valid")
    private String email2;

    private Long mobileNo1;
    private Long mobileNo2;

    private String address;
    private String bio;
    private String profilePictureUrl;
}
