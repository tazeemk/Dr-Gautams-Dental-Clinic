package com.dgc.api.showAppointment.bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public interface ShowAppointmentBean {
    Integer   getId();
    LocalDate getAppointmentDate();
    String getDescription();
    String getTime();
    LocalDateTime getBookingTiming();
    String getUserName();
    String getEmail();
    String getMobileNumber();
    String getUserAddress();
    
    
}