package com.bluepal.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bluepal.model.UserModel;

@Repository
public interface IUserRepository extends MongoRepository<UserModel, String> {
    

	@Query("{ '$or': [ " +
		       "{ 'firstName': { $regex: ?0, $options: 'i' } }, " +
		       "{ 'middleName': { $regex: ?0, $options: 'i' } }, " +
		       "{ 'lastName': { $regex: ?0, $options: 'i' } }, " +
		       "{ 'email1': { $regex: ?0, $options: 'i' } }, " +
		       "{ 'role': { $regex: ?0, $options: 'i' } } " +
		       "] }")
		Page<UserModel> findBySearchQuery(String query, Pageable pageable);

	UserModel findByEmail1(String email1);

	Optional<UserModel> findById(String userId);
	
	void deleteById(String userId);


}
	

