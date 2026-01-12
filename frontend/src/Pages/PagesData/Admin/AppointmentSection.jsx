import React from "react";
import "./AppointmentSection.css";
import ap_img from "../../images/admin_images/appointment_admin_img.png";
import { useNavigate, useLocation } from "react-router-dom";

function AppointmentSection() {
    const navigate = useNavigate();
    const location = useLocation();

    // Log current location for debugging
    console.log("Current location:", location.pathname);

    const goToAppointments = () => {
        console.log("🔵 Clicking All Appointments");
        console.log("🔵 Navigating to: /dental-clinic/all-Appointment");
        navigate("/dental-clinic/all-Appointment");
    };

    const goToUsers = () => {
        console.log("🟢 Clicking All Users");
        console.log("🟢 Navigating to: /dental-clinic/all-User");
        navigate("/dental-clinic/all-User");
    };

    const goToUpcomingAppointments = () => {
        console.log("🔴 Clicking Upcoming Appointments");
        console.log("🔴 Current location before navigation:", window.location.pathname);
        console.log("🔴 Navigating to: /dental-clinic/upcoming-appointment");
        
        try {
            navigate("/dental-clinic/upcoming-appointment");
            console.log("🔴 Navigate function called successfully");
            
            // Check if navigation worked after a short delay
            setTimeout(() => {
                console.log("🔴 Location after navigation:", window.location.pathname);
            }, 100);
        } catch (error) {
            console.error("🔴 Navigation error:", error);
        }
    };

    return (
        <div className="appointment-section">
            <div className="card" onClick={goToAppointments}>
                <img src={ap_img} alt="Appointments" />
                <h3>Show All Appointments</h3>
            </div>
            
            <div className="card" onClick={goToUsers}>
                <img src={ap_img} alt="Users" />
                <h3>Show All Users</h3>
            </div>

            <div 
                className="card" 
                onClick={goToUpcomingAppointments}
                style={{ cursor: 'pointer' }}
            >
                <img src={ap_img} alt="Upcoming Appointments" />
                <h3>Show Upcoming Appointment</h3>
            </div>
        </div>
    );
}

export default AppointmentSection;