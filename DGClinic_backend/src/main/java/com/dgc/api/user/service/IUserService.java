package com.dgc.api.user.service;

import java.util.List;

import com.dgc.api.user.UserEntity;

public interface IUserService 
{

	public String addNewUsers(UserEntity user);
	
	public UserEntity loginUser(String email,String password);
	
	public List<UserEntity> showAllUser();
	
	
}
