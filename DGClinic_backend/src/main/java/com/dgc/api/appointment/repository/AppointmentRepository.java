package com.dgc.api.appointment.repository;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dgc.api.appointment.entity.AppointmentEntity;

public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Integer> 
{

	public Boolean existsByAppointmentDateAndTime(LocalDate appointmentDate, String appointmentTime);
	
}
