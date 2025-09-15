package com.bluepal.service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bluepal.config.JwtProvider;
import com.bluepal.dto.AuthRequest;
import com.bluepal.dto.UserRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.ResetPasswordTokenEntity;
import com.bluepal.model.USER_ROLE;
import com.bluepal.model.UserModel;
import com.bluepal.properties.AuthProperties;
import com.bluepal.repository.IResetPasswordRepository;
import com.bluepal.repository.IUserRepository;
import com.bluepal.response.ApiResponse;
import com.bluepal.response.AuthResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AuthServiceImpl implements IAuthService {


    @Autowired
    private AuthProperties appProperties;

    @Autowired
    private IResetPasswordRepository resetRepository;

    @Autowired
    private IUserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserServiceImpl serviceImpl;
    
    @Override
    @CacheEvict(value = "users", key = "#result.id",allEntries = true)
    public AuthResponse registerUser(UserRequest createUserReq) throws UserException {
        log.info("Received signup request for email: {}", createUserReq.getEmail());

        UserModel isEmailExist = userRepo.findByEmail(createUserReq.getEmail());

        if (isEmailExist != null) {
            log.error(appProperties.getSignupEmailExist(), createUserReq.getEmail());
            throw new UserException(appProperties.getSignupEmailExist());
        }

        log.info("Creating new user with email: {}", createUserReq.getEmail());

        UserModel createdUser = new UserModel();
        createdUser.setEmail(createUserReq.getEmail());
        createdUser.setEmail2(createUserReq.getEmail2());
        createdUser.setFirstName(createUserReq.getFirstName());
        createdUser.setMiddleName(createUserReq.getMiddleName());
        createdUser.setLastName(createUserReq.getLastName());
        createdUser.setMobileNo1(createUserReq.getMobileNo1());
        createdUser.setMobileNo2(createUserReq.getMobileNo2());
        createdUser.setPassword(passwordEncoder.encode(createUserReq.getPassword()));
        createdUser.setRole(createUserReq.getRole());

        UserModel savedUser = userRepo.save(createdUser);

        createdUser.setCreatedBy(savedUser.getId());
        userRepo.save(createdUser);

        log.info(appProperties.getSignupUserCreated(), savedUser.getEmail());

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        log.info(String.format(appProperties.getJwtGenerated(), savedUser.getEmail()));

        AuthResponse response = new AuthResponse();
        response.setJwt(token);
        response.setMessage(appProperties.getSignupSuccess());
        response.setRole(savedUser.getRole());

        return response;
    }

    @Override
  //  @CacheEvict(value = "users",allEntries = true)
    public AuthResponse loginUser(AuthRequest request) {
        log.info("Received signin request for email: {}", request.getEmail());

        String username = request.getEmail();
        String password = request.getPassword();

        Authentication authentication = authenticate(username, password);

        log.info(String.format(appProperties.getLoginSuccess(), username));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = JwtProvider.generateToken(authentication);
        log.info(String.format(appProperties.getJwtGenerated(), username));

        AuthResponse response = new AuthResponse();
        response.setJwt(token);
        response.setMessage(String.format(appProperties.getSigninSuccess()));
        response.setRole(USER_ROLE.valueOf(role));

        return response;
    }

    private Authentication authenticate(String username, String password) {
        log.info("Authenticating user: {}", username);

        // Load user details
        UserDetails userDetails = serviceImpl.loadUserByUsername(username);

        if (userDetails == null) {
            log.error(appProperties.getInvalidUsername(), username);
            throw new BadCredentialsException(appProperties.getInvalidUsername());
        }

        // Check if the password matches the encrypted one or the plain text
        if (!passwordEncoder.matches(password, userDetails.getPassword()) && !password.equals(userDetails.getPassword())) {
            log.error(appProperties.getInvalidPassword(), username);
            throw new BadCredentialsException(appProperties.getInvalidPassword());
        }

        log.info(appProperties.getLoginSuccess(), username);

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    

    @Override
    //@CacheEvict(value = "users", key = "#result.id",allEntries = true)
    public void createPasswordResetToken(Optional<UserModel> user, String token) throws UserException,Exception {
        log.info("Creating or updating password reset token for user: {}", user.get());
        ResetPasswordTokenEntity existingToken = resetRepository.findByUserId(user.get().getId());

        if (existingToken != null) {
            log.info("Updating existing reset token for user: {}", user.get());
            existingToken.setToken(token);
            existingToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));
            resetRepository.save(existingToken);
        } else {
            log.info("Creating new reset token for user: {}", user.get());
            ResetPasswordTokenEntity newToken = new ResetPasswordTokenEntity();
            newToken.setUser(user);
            newToken.setToken(token);
            newToken.setExpiryDate(LocalDateTime.now().plusMinutes(10));
            resetRepository.save(newToken);
        }
        log.info("Password reset token created or updated successfully for user: {}", user.get());
    }

    @Override
  //  @CacheEvict(value = "users", key = "#result.id",allEntries = true)
    public void updatePassword(UserModel user, String newPassword) throws UserException {
        log.info("Updating password for user: {}", user.getId());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
        log.info("Password updated successfully for user: {}", user.getId());
    }
    
  @Override
  @Cacheable(value = "users", key = "#jwt")
  public UserModel findUserProfileByJwt(String jwt) throws UserException {
      log.info("Finding user profile by JWT: {}", jwt);

      String email = JwtProvider.getEmailFromJwtToken(jwt);
      UserModel userEntity = userRepo.findByEmail(email);

      log.info("User profile retrieved for JWT: {}", jwt);
      return userEntity;
  }
  
  @Override
  public ApiResponse changePassword(String email, String oldPassword, String newPassword, String confirmPassword) throws UserException {
      // Check if the new password and confirm password match
      if (!newPassword.equals(confirmPassword)) {
          throw new IllegalArgumentException("New password and confirm password do not match");
      }

      // Check if the user exists
      UserModel isUserExist = userRepo.findByEmail(email);
      if (isUserExist == null) {
          throw new UsernameNotFoundException("User not found with the email: " + email);
      }

      // Check if the old password matches
      if (!passwordEncoder.matches(oldPassword, isUserExist.getPassword())) {
          throw new IllegalArgumentException("Old password is incorrect");
      }

      // Update the password
      isUserExist.setPassword(passwordEncoder.encode(newPassword));
      userRepo.save(isUserExist);
      
      ApiResponse response = new ApiResponse();
      response.setMessage("Password updated successfully");

      return response;
  }


}
