package com.dgc.slot.bean;

import java.time.LocalDate;

public class SlotDto {

	private String time;
	private boolean booked;
	private boolean expired;
	private boolean disabled;
	private LocalDate appointmentDate;
	public SlotDto(){
		
	}
	
	public SlotDto(String time, boolean booked, boolean expired, boolean disabled) {
		super();
		this.time = time;
		this.booked = booked;
		this.expired = expired;
		this.disabled = disabled;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public boolean isBooked() {
		return booked;
	}

	public void setBooked(boolean booked) {
		this.booked = booked;
	}

	public boolean isExpired() {
		return expired;
	}

	public void setExpired(boolean expired) {
		this.expired = expired;
	}

	public boolean isDisabled() {
		return disabled;
	}

	public void setDisabled(boolean disabled) {
		this.disabled = disabled;
	}

	public LocalDate getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(LocalDate appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	@Override
	public String toString() {
		return "SlotDto [time=" + time + ", booked=" + booked + ", expired=" + expired + ", disabled=" + disabled
				+ ", appointmentDate=" + appointmentDate + "]";
	}
	
	
	
}
