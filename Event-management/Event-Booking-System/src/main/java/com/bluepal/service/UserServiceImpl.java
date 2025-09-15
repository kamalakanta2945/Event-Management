package com.bluepal.service;

import java.awt.Color;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.List;
import java.util.Optional;

import org.apache.poi.hpsf.DocumentSummaryInformation;
import org.apache.poi.hpsf.SummaryInformation;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bluepal.dto.UserRequest;
import com.bluepal.dto.UserProfileUpdateRequest;
import com.bluepal.exception.UserException;
import com.bluepal.model.UserModel;
import com.bluepal.properties.UserProperties;
import com.bluepal.repository.IResetPasswordRepository;
import com.bluepal.repository.IUserRepository;
import com.bluepal.response.ApiResponse;
import com.bluepal.util.EmailUtils;
import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements IUserService {

	@Autowired
	private IUserRepository userRepo;

	@Autowired
	private IResetPasswordRepository resetRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EmailUtils emailUtils;

	@Autowired
	private UserProperties appProperties;

	@CacheEvict(value = "users", key = "#result.id", allEntries = true)
	public UserModel addUser(UserRequest addUser, String id) throws UserException {
		log.info("Adding user with email: {} by admin with id: {}", addUser.getEmail(), id);

		UserModel isEmailExist = userRepo.findByEmail(addUser.getEmail());

		if (isEmailExist != null) {
			log.error(appProperties.getAddUserEmailExist(), addUser.getEmail());
			throw new UserException(appProperties.getAddUserEmailExist());
		}
		UserModel createdUser = new UserModel();
		createdUser.setEmail(addUser.getEmail());
		createdUser.setEmail2(addUser.getEmail2());
		createdUser.setFirstName(addUser.getFirstName());
		createdUser.setMiddleName(addUser.getMiddleName());
		createdUser.setLastName(addUser.getLastName());
		createdUser.setMobileNo1(addUser.getMobileNo1());
		createdUser.setMobileNo2(addUser.getMobileNo2());
		createdUser.setPassword(passwordEncoder.encode(addUser.getPassword()));
		createdUser.setRole(addUser.getRole());

		UserModel user = findUserById(id);
		createdUser.setCreatedBy(user.getId());

		UserModel saveUser = userRepo.save(createdUser);

		String subject = appProperties.getRegistrationSuccessSubject();
		String fileName = "REG-EMAIL-BODY.txt";
		String body = readEmailBody(saveUser.fullName(), saveUser.getEmail(), addUser.getPassword(), fileName);
		emailUtils.sendEmail(addUser.getEmail(), subject, body);

		log.info(appProperties.getAddedSuccessMessage(), addUser.getEmail(), saveUser.getId());
		return saveUser;
	}

	@Override
	@Cacheable(value = "users", key = "#email")
	public UserModel findUserByEmail(String email) throws UserException {
		log.info("Finding user by email: {}", email);

		UserModel entity = userRepo.findByEmail(email);
		if (entity == null) {
			log.error(appProperties.getNotFoundMessage(), email);
			throw new UserException(appProperties.getNotFoundMessage() + email);
		}

		log.info("User found with email: {}", email);
		return entity;
	}

	@Override
	@Cacheable(value = "users", key = "#userId")
	public UserModel findUserById(String userId) throws UserException {
		log.info("Finding user by ID: {}", userId);

		Optional<UserModel> opt = userRepo.findById(userId);
		if (opt.isEmpty()) {
			log.error(appProperties.getNotFoundMessage(), userId);
			throw new UserException(appProperties.getNotFoundMessage() + userId);
		}

		log.info("User found with ID: {}", userId);
		return opt.get();
	}

	@Override
	@Cacheable(value = "users")
	public List<UserModel> findAllUsers() throws UserException {
		log.info("Finding all users");

		List<UserModel> allUsers = userRepo.findAll();

		log.info("All users retrieved successfully");
		return allUsers;
	}

	@Override
	@Cacheable(value = "users")
	public Page<UserModel> searchAllUserByPage(String query, Pageable pageable) throws UserException {
		return userRepo.findBySearchQuery(query, pageable);
	}

	@Override
	@CacheEvict(value = "users", key = "#userId", allEntries = true)
	public UserModel updateUser(UserRequest updateRequest, String userId,String adminId) throws UserException {
		log.info("Updating user with ID: {} by admin with ID: {}", userId, adminId);

		UserModel existingUser = findUserById(userId);

		if (updateRequest.getFirstName() != null) {
			existingUser.setFirstName(updateRequest.getFirstName());
		}

		if (updateRequest.getMiddleName() != null) {
			existingUser.setMiddleName(updateRequest.getMiddleName());
		}

		if (updateRequest.getLastName() != null) {
			existingUser.setLastName(updateRequest.getLastName());
		}

		if (updateRequest.getEmail() != null) {
			existingUser.setEmail(updateRequest.getEmail());
		}

		if (updateRequest.getEmail2() != null) {
			existingUser.setEmail2(updateRequest.getEmail2());
		}

		if (updateRequest.getPassword() != null) {
			existingUser.setPassword(updateRequest.getPassword());
		}

		if (updateRequest.getMobileNo1() != null) {
			existingUser.setMobileNo1(updateRequest.getMobileNo1());
		}

		if (updateRequest.getMobileNo2() != null) {
			existingUser.setMobileNo2(updateRequest.getMobileNo2());
		}

		if (updateRequest.getRole() != null) {
			existingUser.setRole(updateRequest.getRole());
		}

		UserModel user = findUserById(adminId);
		existingUser.setUpdatedBy(user.getId());

		UserModel updateUser = userRepo.save(existingUser);

		log.info("User with ID: {} updated successfully", userId);
		return updateUser;
	}

	@Override
	@CacheEvict(value = "users", key = "#userId", allEntries = true)
	public UserModel updateUserProfile(UserProfileUpdateRequest updateRequest, String userId) throws UserException {
		log.info("Updating user profile for user with ID: {}", userId);

		UserModel existingUser = findUserById(userId);

		if (updateRequest.getFirstName() != null) {
			existingUser.setFirstName(updateRequest.getFirstName());
		}
		if (updateRequest.getMiddleName() != null) {
			existingUser.setMiddleName(updateRequest.getMiddleName());
		}
		if (updateRequest.getLastName() != null) {
			existingUser.setLastName(updateRequest.getLastName());
		}
		if (updateRequest.getEmail2() != null) {
			existingUser.setEmail2(updateRequest.getEmail2());
		}
		if (updateRequest.getMobileNo1() != null) {
			existingUser.setMobileNo1(updateRequest.getMobileNo1());
		}
		if (updateRequest.getMobileNo2() != null) {
			existingUser.setMobileNo2(updateRequest.getMobileNo2());
		}
		if (updateRequest.getAddress() != null) {
			existingUser.setAddress(updateRequest.getAddress());
		}
		if (updateRequest.getBio() != null) {
			existingUser.setBio(updateRequest.getBio());
		}
		if (updateRequest.getProfilePictureUrl() != null) {
			existingUser.setProfilePictureUrl(updateRequest.getProfilePictureUrl());
		}

		existingUser.setUpdatedBy(userId); // User is updating their own profile

		UserModel updatedUser = userRepo.save(existingUser);

		log.info("User profile updated successfully for user with ID: {}", userId);
		return updatedUser;
	}

	private String readEmailBody(String fullName, String userName, String pwd, String fileName) {
		log.info("Reading email body from file: {}", fileName);

		String url = "";
		String mailBody = null;

		try (FileReader reader = new FileReader(fileName); BufferedReader br = new BufferedReader(reader)) {
			StringBuilder builder = new StringBuilder();
			String line = br.readLine();
			while (line != null) {
				builder.append(line);
				line = br.readLine();
			}
			mailBody = builder.toString();
			mailBody = mailBody.replace("{FULLNAME}", fullName);
			mailBody = mailBody.replace("{USERNAME}", userName);
			mailBody = mailBody.replace("{TEMP-PWD}", pwd);
			// mailBody = mailBody.replace("{URL}", url);
			mailBody = mailBody.replace("{PWD}", pwd);
		} catch (Exception e) {
			log.error("Exception occurred while reading email body from file: {}", fileName, e);
		}

		log.info("Email body read successfully from file: {}", fileName);
		return mailBody;
	}

	@Override
	@CacheEvict(value = "users", key = "#id", allEntries = true)
	public UserModel updateUserStatus(String id) throws UserException {
		log.info("Updating user status with ID: {}", id);

		UserModel existingUser = findUserById(id);
		existingUser.setActive(!existingUser.isActive());

		UserModel updateStatusUser = userRepo.save(existingUser);

		log.info("User status updated successfully for ID: {}", id);
		return updateStatusUser;
	}

	@Override
	@Transactional
	@CacheEvict(value = "users", key = "#userId", allEntries = true)
	public ApiResponse deleteUser(String userId) throws UserException {

		log.info("Deleting user with ID: {}", userId);

		// Delete any related ResetPasswordTokenEntity
		resetRepository.deleteByUserId(userId);

		// Check if the user exists
		Optional<UserModel> userOptional = userRepo.findById(userId);
		if (!userOptional.isPresent()) {
			log.error(appProperties.getNotFoundMessage(), userId);
			throw new UserException(appProperties.getNotFoundMessage() + userId);
		}

		// Delete the user
		userRepo.deleteById(userId);

		ApiResponse res = new ApiResponse();
		res.setMessage(appProperties.getDeletedSuccessMessage());

		log.info(appProperties.getDeletedSuccessMessage(), userId);
		return res;
	}

	@Override
	public void generateExcel(HttpServletResponse response) throws Exception {
		log.info("Starting Excel generation");
		List<UserModel> entities = userRepo.findAll();
		log.info("Fetched {} users from the database", entities.size());

		HSSFWorkbook workbook = new HSSFWorkbook();
		workbook.createInformationProperties();

		DocumentSummaryInformation dsi = workbook.getDocumentSummaryInformation();
		dsi.setCompany("Mediplus");
		log.debug("Document Summary Information set");

		SummaryInformation si = workbook.getSummaryInformation();
		si.setAuthor("Mediplus People");
		si.setTitle("User Reports");
		log.debug("Summary Information set");

		HSSFSheet sheet = workbook.createSheet("User Data");
		log.debug("Created sheet: User Data");

		HSSFRow headerRow = sheet.createRow(0);
		headerRow.createCell(0).setCellValue("Name");
		headerRow.createCell(1).setCellValue("EMAIL");
		headerRow.createCell(2).setCellValue("EMAIL2");
		headerRow.createCell(3).setCellValue("MOBILE_NO1");
		headerRow.createCell(4).setCellValue("MOBILE_NO2");
		headerRow.createCell(7).setCellValue("ROLE");
		headerRow.createCell(8).setCellValue("STATUS");
		log.debug("Header row created");

		int i = 1;
		for (UserModel entity : entities) {
			HSSFRow dataRow = sheet.createRow(i);

			dataRow.createCell(0).setCellValue(entity.fullName() != null ? entity.fullName() : "");
			dataRow.createCell(1).setCellValue(entity.getEmail() != null ? entity.getEmail() : "");
			dataRow.createCell(2).setCellValue(entity.getEmail2() != null ? entity.getEmail2() : "");

			// Handle mobileNo1 (numeric type) safely
			if (entity.getMobileNo1() != null) {
				dataRow.createCell(3).setCellValue(entity.getMobileNo1()); // Pass directly as long or double
			} else {
				dataRow.createCell(3).setCellValue(""); // Fallback to empty string
			}

			// Handle mobileNo2 (numeric type) safely
			if (entity.getMobileNo2() != null) {
				dataRow.createCell(4).setCellValue(entity.getMobileNo2()); // Pass directly as long or double
			} else {
				dataRow.createCell(4).setCellValue(""); // Fallback to empty string
			}

			dataRow.createCell(5).setCellValue(entity.getRole() != null ? entity.getRole().toString() : "N/A");
			dataRow.createCell(6).setCellValue(entity.isActive() ? "Active" : "Inactive");

			i++;
		}

		log.info("Populated Excel sheet with user data");

		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename=User_Reports.xls");

		try (ServletOutputStream outputStream = response.getOutputStream()) {
			workbook.write(outputStream);
			log.info("Excel file successfully written to the response");
		}

		workbook.close();
		log.info("Excel generation completed");
	}

	@Override
	public void generatePdf(HttpServletResponse response) throws Exception {
		log.info("Starting PDF generation");
		List<UserModel> entities = userRepo.findAll();
		log.info("Fetched {} users from the database", entities.size());

		Document document = new Document(PageSize.A4);
		PdfWriter.getInstance(document, response.getOutputStream());
		document.open();
		log.debug("PDF document opened");

		Font fontTiltle = FontFactory.getFont(FontFactory.TIMES_ROMAN);
		fontTiltle.setSize(20);
		Paragraph paragraph1 = new Paragraph("User Reports", fontTiltle);
		paragraph1.setAlignment(Paragraph.ALIGN_CENTER);
		document.add(paragraph1);
		log.debug("Added title to the PDF");

		PdfPTable table = new PdfPTable(7);
		table.setWidthPercentage(100f);
		table.setWidths(new int[] { 3, 3, 3, 3, 3, 3, 3 });
		table.setSpacingBefore(5);

		PdfPCell cell = new PdfPCell();
		cell.setBackgroundColor(Color.BLUE);
		cell.setPadding(5);
		Font font = FontFactory.getFont(FontFactory.TIMES_ROMAN);
		font.setColor(Color.WHITE);

		cell.setPhrase(new Phrase("Name", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("EMAIL", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("EMAIL2", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("MobileNo1", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("MobileNo2", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("ROLE", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("STATUS", font));
		table.addCell(cell);
		log.debug("Header row added to the PDF table");

		for (UserModel entity : entities) {
			table.addCell(entity.fullName());
			table.addCell(entity.getEmail());
			table.addCell(entity.getEmail2());
			table.addCell(String.valueOf(entity.getMobileNo1()));
			table.addCell(entity.getMobileNo2() != null ? String.valueOf(entity.getMobileNo2()) : "");
			table.addCell(String.valueOf(entity.getRole()));
			table.addCell(String.valueOf(entity.isActive() ? "Active" : "Inactive"));
		}
		log.info("Populated PDF table with user data");

		document.add(table);
		document.close();
		log.info("PDF generation completed");
	}

}
