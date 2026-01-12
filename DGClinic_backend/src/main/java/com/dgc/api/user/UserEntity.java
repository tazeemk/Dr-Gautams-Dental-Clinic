package com.dgc.api.user;

import java.util.List;

import com.dgc.api.appointment.entity.AppointmentEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "DGC_USERS")
public class UserEntity 
{

	 
	
	@Id
	@SequenceGenerator(name = "user1",sequenceName = "userseq",allocationSize = 1,initialValue = 1000)
	@GeneratedValue(generator = "userseq",strategy = GenerationType.SEQUENCE)	
   private Integer userId;
	
   private String userName;
   
   private String email;
   
   private String password;
   
   private String confirmPassword;
 
   private Double mobileNumber;
   
   private String userAddress;
   
   private String role;
   
 


   
   
   @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
   @JsonIgnore
   private List<AppointmentEntity> appointments;
   
   public UserEntity() {
	   
   }
   

public UserEntity(String userName, String email, String password, String confirmPassword, Double mobileNumber,
		String userAddress ,String role) {
	super();
	this.userName = userName;
	this.email = email;
	this.password = password;
	this.confirmPassword = confirmPassword;
	this.mobileNumber = mobileNumber;
	this.userAddress = userAddress;
    this.role=role;
}


public String getRole() {
	return role;
}


public void setRole(String role) {
	this.role = role;
}


public Integer getUserId() {
	return userId;
}


public void setUserId(Integer userId) {
	this.userId = userId;
}


public List<AppointmentEntity> getAppointments() {
	return appointments;
}


public void setAppointments(List<AppointmentEntity> appointments) {
	this.appointments = appointments;
}


public String getUserName() {
	return userName;
}

public void setUserName(String userName) {
	this.userName = userName;
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

public String getConfirmPassword() {
	return confirmPassword;
}

public void setConfirmPassword(String confirmPassword) {
	this.confirmPassword = confirmPassword;
}

public Double getMobileNumber() {
	return mobileNumber;
}

public void setMobileNumber(Double mobileNumber) {
	this.mobileNumber = mobileNumber;
}

public String getUserAddress() {
	return userAddress;
}

public void setUserAddress(String userAddress) {
	this.userAddress = userAddress;
}
   

	
}
