package com.bluepal.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bluepal.model.ResetPasswordTokenEntity;

@Repository
public interface IResetPasswordRepository extends MongoRepository<ResetPasswordTokenEntity, String> {

    // find token by userId
    ResetPasswordTokenEntity findByUserId(String userId);

    // find token by token string
    Optional<ResetPasswordTokenEntity> findByToken(String token);

    // delete by userId (MongoDB will generate this automatically)
    void deleteByUserId(String userId);
}
