package com.dgc.api.appointment.controller;

import java.time.format.DateTimeFormatter;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dgc.api.appointment.entity.AppointmentEntity;
import com.dgc.api.appointment.service.IAppointmentService;
import com.dgc.api.user.UserEntity;
import com.dgc.api.user.repository.UserRepository;

@Controller
@RequestMapping("appointment")
public class AppointmentController {
	
	
	@Autowired
	private IAppointmentService appointmentService;
	
	@Autowired
	private UserRepository userRepo;
	
	@PostMapping("/addAppointment/{userId}")
	public ResponseEntity<AppointmentEntity>addNewAppointment(@PathVariable Integer userId,@RequestBody AppointmentEntity entity){
		Optional<UserEntity>user  = userRepo.findByUserId(userId);
		  if(user.isEmpty()) {
			  throw new IllegalArgumentException("User Not Found .Please Register");
		  }
		String email= user.get().getEmail();
		String pName =user.get().getUserName();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String bDate =entity.getAppointmentDate().format(formatter);
		String slotTime= entity.getTime();
		String description=entity.getDescription();
		
		AppointmentEntity appointment = appointmentService.addAppointment(userId, entity);
		
		//appointmentService.sendAppointmentMail(email, pName, bDate, slotTime, description);
		return ResponseEntity.ok(appointment);
		
	}

}
