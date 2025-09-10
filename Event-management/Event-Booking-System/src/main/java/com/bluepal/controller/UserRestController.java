package com.bluepal.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bluepal.dto.UserRequest;
import com.bluepal.dto.UserProfileUpdateRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.USER_ROLE;
import com.bluepal.model.UserModel;
import com.bluepal.response.ApiResponse;
import com.bluepal.response.AppResponse;
import com.bluepal.service.IAuthService;
import com.bluepal.service.IUserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class UserRestController {

    @Autowired
    private IUserService userService;
    
    @Autowired
    private IAuthService authService;
    

    @PostMapping("/{userId}")
    public ResponseEntity<AppResponse<UserModel>> updateUser(@RequestHeader("Authorization") String jwt, 
                                                @Valid  @RequestBody UserRequest reqUser, 
                                                  @PathVariable String userId) throws Exception {
        log.info("Attempting to update user with ID: {}", userId);
        
        UserModel userAdmin = authService.findUserProfileByJwt(jwt);
        log.debug("Admin user with ID: {} is attempting to update user with ID: {}", userAdmin.getId(), userId);
        
        UserModel existingUser = userService.findUserById(userId);
        
        UserModel user = null;
        
        // Allow update if userAdmin is updating their own profile or if userAdmin has role ADMIN
        if (userAdmin.getId().equals(existingUser.getId()) || userAdmin.getRole().equals(USER_ROLE.ROLE_ADMIN)) {
            // Perform the update if conditions are met
            user = userService.updateUser(reqUser, userId, userAdmin.getId());
            log.info("User with ID: {} successfully updated.", userId);
            AppResponse<UserModel> response = new AppResponse<>(user ,"User Updated Successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            // If userAdmin is not the same user and not an ADMIN, throw an exception
            log.warn("Unauthorized attempt to update user with ID: {}", userId);
            throw new UserException("Only the user or ADMIN users can update this user.");
        }
    }

    
    @GetMapping("/profile")
    public ResponseEntity<UserModel> getAllUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        log.info("Fetching profile of the user associated with the provided JWT.");
        UserModel userProfileByJwt = authService.findUserProfileByJwt(jwt);
        log.info("Successfully retrieved user profile for user with ID: {}", userProfileByJwt.getId());
        return new ResponseEntity<>(userProfileByJwt, HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<AppResponse<UserModel>> updateUserProfile(@RequestHeader("Authorization") String jwt,
                                                                    @Valid @RequestBody UserProfileUpdateRequest req) throws Exception {
        log.info("Attempting to update user profile.");

        UserModel user = authService.findUserProfileByJwt(jwt);
        log.debug("User with ID: {} is attempting to update their own profile.", user.getId());

        UserModel updatedUser = userService.updateUserProfile(req, user.getId());
        log.info("User profile with ID: {} successfully updated.", user.getId());

        AppResponse<UserModel> response = new AppResponse<>(updatedUser, "User Profile Updated Successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<UserModel> getUserById(@RequestHeader("Authorization") String jwt, @PathVariable String id) throws UserException {
        log.info("Fetching user by ID: {}", id);
        UserModel user = userService.findUserById(id);
        log.info("Successfully retrieved user with ID: {}", id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUserById(@RequestHeader("Authorization") String jwt, 
                                                       @PathVariable String id) throws Exception {
        log.info("Attempting to delete user with ID: {}", id);
        
        // Get the user details from the JWT
        UserModel userAdmin = authService.findUserProfileByJwt(jwt);
        log.debug("Admin user with ID: {} is attempting to delete user with ID: {}", userAdmin.getId(), id);
        
        UserModel existingUser = userService.findUserById(id);
        
        // Allow deletion if userAdmin is deleting their own account or if userAdmin is an ADMIN
        if (userAdmin.getId().equals(existingUser.getId()) || userAdmin.getRole().equals(USER_ROLE.ROLE_ADMIN)) {
            // Proceed with deleting the user
        	ApiResponse res = userService.deleteUser(id);
            log.info("User with ID: {} successfully deleted.", id);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } else {
            // If not an ADMIN and not the same user, return an unauthorized response
            log.warn("Unauthorized attempt to delete user with ID: {}", id);
            throw new UserException("Only the user or ADMIN users can delete this user.");
        }
    }

    

}
