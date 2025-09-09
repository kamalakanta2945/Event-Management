package com.bluepal.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Data;

@Data
@Document(collection = "user_model")
public class UserModel {

    @Id
    private String id;

    private String firstName;
    private String middleName;
    private String lastName;

    
    private USER_ROLE role;

    private String email1;
    private String email2;

    private Long mobileNo1;
    private Long mobileNo2;

    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    private boolean active = true;

    private String createdBy;
    private String updatedBy;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public String fullName() {
        return ((firstName != null ? firstName : "") + " " +
                (middleName != null ? middleName : "") + " " +
                (lastName != null ? lastName : "")).trim();
    }

    public void setRole(String role2) {
        try {
            this.role = USER_ROLE.valueOf(role2);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + role2);
        }
    }
    
    public USER_ROLE getRole() {
        return this.role;
    }
}
