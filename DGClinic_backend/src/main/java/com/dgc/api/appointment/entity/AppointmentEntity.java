package com.dgc.api.appointment.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.dgc.api.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "DC_APPOINTMENT")
public class AppointmentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private LocalDate appointmentDate;

	private String description;

	private String time;

	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime bookingTiming;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private UserEntity user;

	public AppointmentEntity() {

	}

	public AppointmentEntity(Integer id, LocalDate appointmentDate, String description, String time, UserEntity user) {
		super();
		this.id = id;
		this.appointmentDate = appointmentDate;
		this.description = description;
		this.time = time;
		this.user = user;
	}

	public LocalDateTime getBookingTiming() {
		return bookingTiming;
	}

	public void setBookingTiming(LocalDateTime bookingTiming) {
		this.bookingTiming = bookingTiming;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

}
