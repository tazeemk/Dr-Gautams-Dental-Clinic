package com.dgc.api.user.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgc.api.resetPassword.bean.ResetPasswordBean;
import com.dgc.api.user.UserEntity;
import com.dgc.api.user.repository.UserRepository;
import com.dgc.api.user.service.IUserService;

@Service
public class UserServiceImpl implements IUserService 
{

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public String addNewUsers(UserEntity user) {
	String userEmail = user.getEmail();
	Optional<UserEntity>userCheck =userRepo.findByEmail(userEmail);
	if(userCheck.isPresent()) {
		throw new IllegalArgumentException("You already have an account with this email. Try logging in.");
	}
	if(user !=null) {
		UserEntity user1 = new UserEntity();
		   user1.setAppointments(user.getAppointments());
		   user1.setConfirmPassword(user.getConfirmPassword());
		   user1.setEmail(user.getEmail());
		   user1.setMobileNumber(user.getMobileNumber());
		   user1.setPassword(user.getPassword());
		   user1.setRole("USER");
		   user1.setUserAddress(user.getUserAddress());
		   user1.setUserName(user.getUserName());
		userRepo.save(user1);
	    return "User Register Successfully :";
	}
		throw new IllegalArgumentException("No Data Found :");
	}
	
	@Override
	public UserEntity loginUser(String email, String password) {
		if(email.equals(null) || password.equals(null)) {
			throw new IllegalArgumentException("Invalid Email");
		}
		         
		UserEntity user=userRepo.findByemail(email);
		 String Userpassword =  user.getPassword();
		 if(!Userpassword.equals(password)) {
			 throw new IllegalArgumentException("Invalid Password :");
		 }	 
	 return user;
	}
	
	@Override
	public List<UserEntity> showAllUser() {
		List<UserEntity>alluser=userRepo.findAll();
		return alluser;
	}
	
	@Override
	public String resetUserPassword(ResetPasswordBean bean) {
		String email =bean.getEmail();
		Optional<UserEntity>userCheck =userRepo.findByEmail(email);
	if(userCheck.isEmpty()) {
		throw new IllegalArgumentException("Email Not Found .Please Enter a Valid email");
	}
	UserEntity user = userCheck.get();
	user.setPassword(bean.getPassword());
	user.setConfirmPassword(bean.getConfirmPassword());
	userRepo.save(user);
	return "PassWord Change Successfully .";
	}
	
}
