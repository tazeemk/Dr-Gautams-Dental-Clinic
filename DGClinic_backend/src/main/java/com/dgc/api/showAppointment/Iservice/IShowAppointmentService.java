package com.dgc.api.showAppointment.Iservice;

import java.util.List;
import com.dgc.api.showAppointment.bean.ShowAppointmentBean;

public interface IShowAppointmentService 
{

	public List<ShowAppointmentBean> showAllAppointment();
	
	public String removeAppointment(Integer Id);
	
	public List<ShowAppointmentBean> getUpcomingAppointment();
	
}
