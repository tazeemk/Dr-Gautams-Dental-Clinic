package com.dgc.api.appointment.service;

import org.springframework.stereotype.Repository;

import com.dgc.api.appointment.entity.AppointmentEntity;

@Repository
public interface IAppointmentService 
{

	public AppointmentEntity addAppointment(Integer userId,AppointmentEntity appointment);
	

	public void sendAppointmentMail( String toEmail, String patientName,String date, String time,String description);
}
