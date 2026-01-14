package com.dgc.api.appointment.service.impl;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dgc.api.appointment.entity.AppointmentEntity;
import com.dgc.api.appointment.repository.AppointmentRepository;
import com.dgc.api.appointment.service.IAppointmentService;
import com.dgc.api.user.UserEntity;
import com.dgc.api.user.repository.UserRepository;
@Service
public class AppointmentServiceImpl implements IAppointmentService {
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JavaMailSender mailsender;
	
	@Override
	public AppointmentEntity addAppointment(Integer userId,AppointmentEntity appointmentRequest) {
	    UserEntity user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	        // Link user to appointment
	        AppointmentEntity appointment = new AppointmentEntity();
	        appointment.setAppointmentDate(appointmentRequest.getAppointmentDate());
	        appointment.setDescription(appointmentRequest.getDescription());
	        appointment.setTime(appointmentRequest.getTime());
	        appointment.setUser(user);
	        appointment.setBookingTiming(LocalDateTime.now());

	        return appointmentRepository.save(appointment);
	}

	@Override
	public void sendAppointmentMail(String toEmail, String patientName, String date, String time, String description) {
		 SimpleMailMessage message = new SimpleMailMessage();
		    message.setFrom("tazeem.java121@gmail.com");
	        message.setTo(toEmail);
	        message.setSubject("Appointment Confirmation - Dental Clinic");

	        message.setText(
	            "Dear " + patientName + ",\n\n"
	          + "Your appointment has been successfully booked.\n\n"
	          + "📅 Date: " + date + "\n"
	          + "⏰ Time: " + time + "\n"
	          + "📝 Description: " + description + "\n\n"
	          + "Thank you for choosing Dr. Gautam's Dental Clinic.\n\n"
	          + "Regards,\n"
	          + "Dental Clinic Team"
	        );

	        mailsender.send(message);
	    }	
	
}
