package com.bluepal.model;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "reset_password_tokens")
public class ResetPasswordTokenEntity {

    @Id
    private String id;

    @DBRef
    private Optional<UserModel> user;

    private String token;

    private LocalDateTime expiryDate;

//	public void setUser(Optional<UserModel> user2) {
//		// TODO Auto-generated method stub
//		
//	}
}
