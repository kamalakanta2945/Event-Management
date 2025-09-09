package com.bluepal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bluepal.dto.UserRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.UserModel;
import com.bluepal.response.ApiResponse;
import com.bluepal.response.AppResponse;
import com.bluepal.service.IAuthService;
import com.bluepal.service.IUserService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/admin") // /api
@Slf4j
public class AdminRestController {
	
	
	    @Autowired
	    private IAuthService authService;
	 
	    @Autowired
	    private IUserService userService;
	    

	    @PostMapping("/add")
	    public ResponseEntity<AppResponse<UserModel>> addUser(@RequestHeader("Authorization") String jwt, @Valid @RequestBody UserRequest reqUser) throws Exception {
	        log.info("Attempting to add a new user with the provided JWT.");
	        UserModel userAdmin = authService.findUserProfileByJwt(jwt);
	        log.debug("Found admin user with ID: {}", userAdmin.getId());
	        UserModel user = userService.addUser(reqUser, userAdmin.getId());
	        log.info("User successfully added with ID: {}", user.getId());
	        AppResponse<UserModel> response = new AppResponse<>(user ,"User Added Successfully"); 
	        return new ResponseEntity<>(response, HttpStatus.CREATED);
	    }

	    @PostMapping("/{userId}")
	    public ResponseEntity<AppResponse<UserModel>> updateUser(@RequestHeader("Authorization") String jwt, @Valid @RequestBody UserRequest reqUser, @PathVariable String userId) throws Exception {
	        log.info("Attempting to update user with ID: {}", userId);
	        UserModel userAdmin = authService.findUserProfileByJwt(jwt);
	        log.debug("Admin user with ID: {} is updating user with ID: {}", userAdmin.getId(), userId);
	        UserModel user = userService.updateUser(reqUser, userId, userAdmin.getId());
	        log.info("User with ID: {} successfully updated.", userId);
	        AppResponse<UserModel> response = new AppResponse<>(user ,"User Updated Successfully"); 
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }

	    @PostMapping("/updateStatus/{userId}")
	    public ResponseEntity<AppResponse<UserModel>> updateUserStatus(@RequestHeader("Authorization") String jwt, @PathVariable String userId) throws UserException {
	        log.info("Attempting to update status for user with ID: {}", userId);
	        UserModel user = userService.updateUserStatus(userId);
	        log.info("Status of user with ID: {} successfully updated.", userId);
	        AppResponse<UserModel> response = new AppResponse<>(user ,"User Status Updated Successfully"); 
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }


	    @GetMapping("/profile")
	    public ResponseEntity<UserModel> getAllUserByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
	        log.info("Fetching profile of the user associated with the provided JWT.");
	        UserModel userProfileByJwt = authService.findUserProfileByJwt(jwt);
	        log.info("Successfully retrieved user profile for user with ID: {}", userProfileByJwt.getId());
	        return new ResponseEntity<>(userProfileByJwt, HttpStatus.OK);
	    }

	    @GetMapping("/all")
	    public ResponseEntity<List<UserModel>> getAllUser(@RequestHeader("Authorization") String jwt) throws UserException {
	        log.info("Fetching all users.");
	        List<UserModel> allUsers = userService.findAllUsers();
	        log.info("Successfully retrieved {} users.", allUsers.size());
	        return new ResponseEntity<>(allUsers, HttpStatus.OK);
	    }


	    @GetMapping("/byId/{id}")
	    public ResponseEntity<UserModel> getUserById(@RequestHeader("Authorization") String jwt, @PathVariable String id) throws UserException {
	        log.info("Fetching user by ID: {}", id);
	        UserModel user = userService.findUserById(id);
	        log.info("Successfully retrieved user with ID: {}", id);
	        return new ResponseEntity<>(user, HttpStatus.OK);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<ApiResponse> deleteUserById(@RequestHeader("Authorization") String jwt, @PathVariable String id) throws Exception {
	        log.info("Attempting to delete user with ID: {}", id);
	        ApiResponse res = userService.deleteUser(id);
	        log.info("User with ID: {} successfully deleted.", id);
	        return new ResponseEntity<>(res, HttpStatus.OK);
	    }
	    

	    @GetMapping("/getByPage")
	    public Page<UserModel> getUsers(
	    		@RequestHeader("Authorization") String jwt,
	            @RequestParam(required = false, defaultValue = "0") int page,             
	            @RequestParam(required = false, defaultValue = "5") int size,           
	            @RequestParam(required = false, defaultValue = "id") String sortLabel,   
	            @RequestParam(required = false, defaultValue = "") String query,         
	            @RequestParam(required = false, defaultValue = "DESC") String direction) {

	        log.info("Fetching users with page: {}, size: {}, sortLabel: {}, query: {}, direction: {}", 
	                 page, size, sortLabel, query, direction);

	        // Create Sort object
	        Sort sort = direction.equalsIgnoreCase("DESC") ? Sort.by(sortLabel).descending() : Sort.by(sortLabel).ascending();

	        // Create Pageable object
	        Pageable pageable = PageRequest.of(page, size, sort);

	        // Use the service to fetch the results
	        Page<UserModel> userPage = userService.searchAllUserByPage(query, pageable);

	        log.info("Successfully fetched {} users on page {}", userPage.getNumberOfElements(), page);

	        return userPage;
	    }


	    @GetMapping("/excel")
	    public void excelReport(@RequestHeader("Authorization") String jwt,HttpServletResponse response) throws Exception {
	        log.info("Generating Excel report.");
	        response.setContentType("application/vnd.ms-excel");
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=user_data.xls";
	        response.setHeader(headerKey, headerValue);
	        userService.generateExcel(response);
	        log.info("Excel report successfully generated.");
	    }

	    @GetMapping("/pdf")
	    public void generatePdfFile(@RequestHeader("Authorization") String jwt,HttpServletResponse response) throws Exception {
	        log.info("Generating PDF report.");
	        response.setContentType("application/pdf");
	        String headerKey = "Content-Disposition";
	        String headerValue = "attachment; filename=Report.pdf";
	        response.setHeader(headerKey, headerValue);
	        userService.generatePdf(response);
	        log.info("PDF report successfully generated.");
	    }
	

}
