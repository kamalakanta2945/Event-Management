package com.bluepal.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bluepal.dto.UserRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.UserModel;
import com.bluepal.response.ApiResponse;

import jakarta.servlet.http.HttpServletResponse;

public interface IUserService {

	public UserModel addUser(UserRequest addUser, String id) throws UserException;

	public UserModel findUserByEmail(String email) throws UserException;

	public UserModel findUserById(String userId) throws UserException;

	public List<UserModel> findAllUsers() throws UserException;

	public UserModel updateUser(UserRequest updateRequest, String userId, String adminId) throws UserException;

	public UserModel updateUserProfile(UserProfileUpdateRequest updateRequest, String userId) throws UserException;

	public UserModel updateUserStatus(String userId) throws UserException;

	public Page<UserModel> searchAllUserByPage(String query, Pageable pageable) throws UserException;

	public ApiResponse deleteUser(String userId) throws UserException;

	public void generateExcel(HttpServletResponse response) throws Exception;

	public void generatePdf(HttpServletResponse response) throws Exception;

}
