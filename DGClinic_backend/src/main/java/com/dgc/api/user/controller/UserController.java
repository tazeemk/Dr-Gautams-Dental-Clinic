package com.dgc.api.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dgc.api.dto.LoginRequest;
import com.dgc.api.resetPassword.bean.ResetPasswordBean;
import com.dgc.api.user.UserEntity;
import com.dgc.api.user.service.IUserService;

@Controller
@RequestMapping("user")
public class UserController 
{
    @Autowired
	private IUserService userService;
	
	
    @PostMapping("/register")
    public ResponseEntity<String> RegisterNewUser(@RequestBody UserEntity user) {
    	String msg=userService.addNewUsers(user);
    	return  ResponseEntity.ok(msg);
    }
    
    @PostMapping("/login")
    public ResponseEntity<UserEntity> loginUser(@RequestBody LoginRequest login) 
    {
    	String email =login.getEmail();
    	String password =login.getPassword();
             UserEntity user=userService.loginUser(email, password);
    	return ResponseEntity.ok(user);
    }
    
    @GetMapping("/showAllUser")
    public ResponseEntity<List<UserEntity>> getAllUsers(){
    	   List<UserEntity>users=userService.showAllUser();
            return ResponseEntity.ok(users);
    }
    
    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetUserPasskey(@RequestBody ResetPasswordBean bean){
    	
    		String msg=userService.resetUserPassword(bean);
    	    return ResponseEntity.ok(msg);
    	
}
    }
