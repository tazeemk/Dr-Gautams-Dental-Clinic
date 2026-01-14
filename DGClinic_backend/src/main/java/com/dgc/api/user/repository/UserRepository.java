package com.dgc.api.user.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.dgc.api.showAppointment.bean.ShowAppointmentBean;
import com.dgc.api.user.UserEntity;

@Repository	
public interface UserRepository extends JpaRepository<UserEntity, Integer> 
{

   public UserEntity findByemail(String email);
   
   @Query(value = "SELECT a.id,a.appointment_date as appointmentDate, " +
           "a.description as description, " +
           "a.time as time, " +
           "a.booking_timing as bookingTiming, " +
           "u.user_name as userName, " +
           "u.email as email, " +
           "u.mobile_number as mobileNumber, " +
           "u.user_address as userAddress " +
           "FROM dgclinic.dc_appointment a " +
           "JOIN dgclinic.dgc_users u ON a.user_id = u.user_id", 
      nativeQuery = true)
    List<ShowAppointmentBean> getAllAppontment();
   
   
    @Query(value="SELECT a.*, u.*\r\n" + 
   		"FROM dgclinic.dc_appointment a\r\n" + 
   		"JOIN dgclinic.dgc_users u \r\n" + 
   		"    ON a.user_id = u.user_id\r\n" + 
   		"WHERE STR_TO_DATE(CONCAT(a.appointment_date, ' ', a.time), '%Y-%m-%d %h:%i %p') >= NOW();"
   		,nativeQuery=true)
     List<ShowAppointmentBean> getAllUpcomingAppointment();

    Optional<UserEntity> findByUserId(Integer id);
    
    Optional<UserEntity> findByEmail(String  email);
   
	
}
