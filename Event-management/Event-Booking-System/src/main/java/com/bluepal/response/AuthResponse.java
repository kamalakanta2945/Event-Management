package com.bluepal.response;



import com.bluepal.model.USER_ROLE;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

	private String message;
	private String jwt;
	private USER_ROLE role;
}
