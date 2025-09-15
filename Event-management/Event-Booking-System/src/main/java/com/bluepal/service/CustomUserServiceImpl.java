package com.bluepal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bluepal.model.USER_ROLE;
import com.bluepal.model.UserModel;
import com.bluepal.repository.IUserRepository;




@Service
public class CustomUserServiceImpl  implements UserDetailsService{
	
	@Autowired
	private IUserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserModel user = userRepo.findByEmail(username);
		if(user==null) {
			throw new UsernameNotFoundException("User not found with the email"+username);
		}
		
		USER_ROLE role = user.getRole();
		if (role == null) {
			role = USER_ROLE.ROLE_USER;
		}
	
		List<GrantedAuthority> authorities =new ArrayList<>();
		
		authorities.add(new SimpleGrantedAuthority(role.toString()));
		
		return new User(user.getEmail(),user.getPassword(),authorities);
	}

	
	
}
