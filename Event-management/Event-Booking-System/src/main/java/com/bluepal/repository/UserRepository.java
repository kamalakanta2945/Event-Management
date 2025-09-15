package com.bluepal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.bluepal.model.ResetPasswordTokenEntity;
import com.bluepal.model.UserModel; // make sure the package matches your model

public interface UserRepository extends MongoRepository<UserModel, String> {
    
    Optional<UserModel> findByEmail(String email);
    
    boolean existsByEmail(String email);

	static Optional<ResetPasswordTokenEntity> findByToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}
}
