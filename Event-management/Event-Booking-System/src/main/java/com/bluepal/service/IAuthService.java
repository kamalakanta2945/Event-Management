package com.bluepal.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bluepal.dto.AuthRequest;
import com.bluepal.dto.UserRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.UserModel;
import com.bluepal.response.AuthResponse;
import com.bluepal.response.ApiResponse;

public interface IAuthService {

    AuthResponse registerUser(UserRequest createUserReq) throws UserException, Exception;

    AuthResponse loginUser(AuthRequest request) throws UserException, Exception;

    void createPasswordResetToken(Optional<UserModel> user, String token) throws UserException, Exception;

    void updatePassword(UserModel user, String newPassword) throws UserException;

    UserModel findUserProfileByJwt(String jwt) throws UserException, Exception;

    ApiResponse changePassword(String email, String oldPassword, String newPassword, String confirmPassword)
            throws UserException, Exception;
}
