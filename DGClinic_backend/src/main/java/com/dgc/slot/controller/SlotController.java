package com.dgc.slot.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgc.slot.bean.SlotDto;
import com.dgc.slot.serviceImpl.SlotServiceImpl;

@RestController
@RequestMapping("/bookingSlot")
public class SlotController 
{

	@Autowired
	SlotServiceImpl slotServiceImpl;
	
	@GetMapping("/slots")
	public List<SlotDto> getSlots(@RequestParam String date) {
	    return slotServiceImpl.getSlots(LocalDate.parse(date));
	}
	
}
