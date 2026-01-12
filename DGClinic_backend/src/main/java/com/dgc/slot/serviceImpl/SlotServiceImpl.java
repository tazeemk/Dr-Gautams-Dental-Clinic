package com.dgc.slot.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgc.api.appointment.repository.AppointmentRepository;
import com.dgc.slot.bean.SlotDto;

@Service
public class SlotServiceImpl {

    @Autowired
    private AppointmentRepository appointmentRepo;

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("hh:mm a");

    
    public List<SlotDto> getSlots(LocalDate date) {

        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();

        // 🔥 ALL CLINIC SLOTS (KEEP SAME AS FRONTEND)
        List<LocalTime> slotTimes = List.of(
                LocalTime.of(9, 0),
                LocalTime.of(9, 30),
                LocalTime.of(10, 0),
                LocalTime.of(10, 30),
                LocalTime.of(11, 0),
                LocalTime.of(11, 30),
                LocalTime.of(12, 0),
                LocalTime.of(12, 30),
                LocalTime.of(13, 0),
                LocalTime.of(18, 0),
                LocalTime.of(18, 30),
                LocalTime.of(19, 0),
                LocalTime.of(19, 30),
                LocalTime.of(20, 0),
                LocalTime.of(20, 30),
                LocalTime.of(21, 0),
                LocalTime.of(21, 30)
        );

        List<SlotDto> result = new ArrayList<>();

        for (LocalTime slotTime : slotTimes) {

            String formattedTime = slotTime.format(FORMATTER);

            boolean booked =
                    appointmentRepo.existsByAppointmentDateAndTime(date, formattedTime);

            boolean expired =
                    date.isEqual(today) && slotTime.isBefore(now);

            SlotDto dto = new SlotDto();
            dto.setAppointmentDate(date);
            dto.setTime(formattedTime);
            dto.setBooked(booked);
            dto.setExpired(expired);
            dto.setDisabled(booked || expired);

            result.add(dto);
        }

        for(SlotDto data:result) {
        	System.out.println(data);
        }
        return result;
    }
}
