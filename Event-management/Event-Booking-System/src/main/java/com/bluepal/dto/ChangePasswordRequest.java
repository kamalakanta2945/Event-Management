package com.bluepal.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {

	@NotBlank(message = "Email is required")
	@Email(message = "Email should be valid")
	private String email;

	@NotBlank(message = "Old password is required")
	@Size(min = 8, message = "Old password must be at least 8 characters")
	private String oldPassword;

	@NotBlank(message = "New password is required")
	@Size(min = 8, message = "New password must be at least 8 characters")
	private String newPassword;

	@NotBlank(message = "Confirm password is required")
	@Size(min = 8, message = "Confirm password must be at least 8 characters")
	private String confirmPassword;
}
