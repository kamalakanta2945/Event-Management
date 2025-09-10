package com.bluepal.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
	
	@Component
	@Slf4j
	public class EmailUtils {

		@Autowired
		private JavaMailSender mailSender;
		
		public boolean sendEmail(String to,String subject,String body) {
			boolean isMailSent=false;
			try {
				MimeMessage mimemessage =mailSender.createMimeMessage();
				MimeMessageHelper helper=new MimeMessageHelper(mimemessage);
				helper.setTo(to);
				helper.setSubject(subject);
				helper.setText(body, true);
				mailSender.send( mimemessage );
				isMailSent=true;
			} catch (Exception e) {
				log.error("Exception Occured", e);
				//e.printStackTrace();
			}
			return isMailSent;
		}

		public boolean sendEmail(String to, String subject, String body, byte[] attachment, String attachmentFilename) {
			boolean isMailSent = false;
			try {
				MimeMessage mimemessage = mailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(mimemessage, true);
				helper.setTo(to);
				helper.setSubject(subject);
				helper.setText(body, true);
				helper.addAttachment(attachmentFilename, new ByteArrayResource(attachment));
				mailSender.send(mimemessage);
				isMailSent = true;
			} catch (Exception e) {
				log.error("Exception Occured", e);
			}
			return isMailSent;
		}
		
		 public void sendResetToken(String email, String token, String appUrl) {
		        String subject = "Password Reset Request";
		        String resetUrl = appUrl + "/reset-password?token=" + token;
		        String message = "Click the link below to reset your password:\n" + resetUrl;

		        SimpleMailMessage emailMessage = new SimpleMailMessage();
		        emailMessage.setTo(email);
		        emailMessage.setSubject(subject);
		        emailMessage.setText(message);
		        mailSender.send(emailMessage);
		    }
	}



