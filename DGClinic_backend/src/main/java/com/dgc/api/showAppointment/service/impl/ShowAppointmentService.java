package com.dgc.api.showAppointment.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgc.api.appointment.entity.AppointmentEntity;
import com.dgc.api.appointment.repository.AppointmentRepository;
import com.dgc.api.appointment.service.IAppointmentService;
import com.dgc.api.showAppointment.Iservice.IShowAppointmentService;
import com.dgc.api.showAppointment.bean.ShowAppointmentBean;
import com.dgc.api.user.UserEntity;
import com.dgc.api.user.repository.UserRepository;

@Service
public class ShowAppointmentService implements IShowAppointmentService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	
	
	@Override
	public List<ShowAppointmentBean> showAllAppointment() {
	   List<ShowAppointmentBean>users=userRepository.getAllAppontment();
		
	   if(users.isEmpty()) {
		   throw new IllegalArgumentException("Something went wrong :");
	   }
		return users;
	}
	
	@Override
	public String removeAppointment(Integer Id) {
	   	
	              Optional<AppointmentEntity> removeEntity =appointmentRepository.findById(Id);
	  if(removeEntity.isEmpty()) {
		  throw new IllegalArgumentException("Invalid Appointment");
	  }
  
	            appointmentRepository.delete(removeEntity.get());
		
		return "Appointment Removed Successfully";
	}
	
	@Override
	public List<ShowAppointmentBean> getUpcomingAppointment() {
	   List<ShowAppointmentBean>getUpcoming=userRepository.getAllUpcomingAppointment();
		return getUpcoming;
	}
	

}
