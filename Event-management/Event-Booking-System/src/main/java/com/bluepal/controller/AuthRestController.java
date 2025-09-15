package com.bluepal.controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.bluepal.response.ApiResponse;

import com.bluepal.dto.AuthRequest;
import com.bluepal.dto.ChangePasswordRequest;
import com.bluepal.dto.UserRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.ResetPasswordTokenEntity;
import com.bluepal.model.UserModel;
import com.bluepal.properties.AuthProperties;
import com.bluepal.repository.IResetPasswordRepository;
import com.bluepal.repository.IUserRepository;
import com.bluepal.response.AuthResponse;
import com.bluepal.service.IAuthService;
import com.bluepal.util.EmailUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
//@CrossOrigin(origins="http://localhost:3000") 
public class AuthRestController {

    @Autowired
    private AuthProperties appProperties;

    @Autowired
    private IResetPasswordRepository resetRepository;

    @Autowired
    private EmailUtils emailUtils;

    @Autowired
    private IAuthService authService;

    @Autowired
    private IUserRepository userRepo;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@Valid @RequestBody UserRequest createUserReq) throws Exception {
        AuthResponse response = authService.registerUser(createUserReq);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@Valid @RequestBody AuthRequest request) throws UserException, Exception {
        AuthResponse response = authService.loginUser(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/profile")
    public ResponseEntity<UserModel> getUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        log.info("Fetching profile of the user associated with the provided JWT.");
        UserModel userProfileByJwt = authService.findUserProfileByJwt(jwt);
        if (userProfileByJwt == null) {
            log.warn("No user found for the provided JWT");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        log.info("Successfully retrieved user profile for user with ID: {}", userProfileByJwt.getId());
        return new ResponseEntity<>(userProfileByJwt, HttpStatus.OK);
    }
    

    @PostMapping("/forgot")
    public ResponseEntity<ApiResponse> forgotPassword(@RequestParam String email, HttpServletRequest request) throws Exception {
        log.info("Received forgot password request for email: {}", email);

        Optional<UserModel> user = userRepo.findById(email);

        
        String token = UUID.randomUUID().toString();
        authService.createPasswordResetToken(user, token);

        String appUrl = request.getRequestURL().toString().replace(request.getServletPath(), "");
        emailUtils.sendResetToken(email, token, appUrl);

        log.info(appProperties.getForgotTokenGenerated(), email);

        ApiResponse res = new ApiResponse();
        res.setMessage(String.format(appProperties.getForgotEmailSent(), email));

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PostMapping("/reset")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam String token, @RequestParam String newPassword) throws UserException {
        log.info("Received password reset request with token: {}", token);

        Optional<ResetPasswordTokenEntity> tokenOptional = resetRepository.findByToken(token);

        if (!tokenOptional.isPresent() || tokenOptional.get().getExpiryDate().isBefore(LocalDateTime.now())) {
            log.error(appProperties.getResetInvalidToken(), token);
            ApiResponse res = new ApiResponse();
            res.setMessage(appProperties.getResetInvalidToken());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }

        UserModel user = tokenOptional.get().getUser().get();
        authService.updatePassword(user, newPassword);

        log.info(appProperties.getResetSuccess(), user.getEmail());

        ApiResponse res = new ApiResponse();
        res.setMessage(appProperties.getResetSuccess());

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
    
    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequest request)throws Exception {
    	ApiResponse response = authService.changePassword(request.getEmail(), request.getOldPassword(), request.getNewPassword(),request.getConfirmPassword());
        return ResponseEntity.ok(response);
    }

}
