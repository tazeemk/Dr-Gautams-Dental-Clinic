package com.dgc.api.showAppointment.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.dgc.api.showAppointment.Iservice.IShowAppointmentService;
import com.dgc.api.showAppointment.bean.ShowAppointmentBean;

@Controller
@RequestMapping("showAppointment")
public class ShowAppointmentController 
{
	
	@Autowired
	private IShowAppointmentService showAppointment;
	
    @GetMapping("/All")
	public ResponseEntity<List<ShowAppointmentBean>> showAllAppointment(){
		           
    	List<ShowAppointmentBean>showall=showAppointment.showAllAppointment();
		    	return ResponseEntity.ok(showall);                 
    }
    
    @DeleteMapping("/remove/{Id}")
    public ResponseEntity<String> removeAppointment(@PathVariable Integer Id) {
    	      String msg=showAppointment.removeAppointment(Id);
    	return ResponseEntity.ok(msg);
    }
    
    @GetMapping("/upcomingAppointment")
    public ResponseEntity<List<ShowAppointmentBean>> getUpcomingAppointment(){
    List<ShowAppointmentBean>getAllUpcoming=showAppointment.getUpcomingAppointment();
     return ResponseEntity.ok(getAllUpcoming);
    }
	
}
