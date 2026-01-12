import React from 'react';
import LowerFooter from '../Components/LowerFooter';
import './Contact.css';
const Contact = () => {
  const clinic_data = [
    {
      id: 1,
      c_day: 'Monday',
      c_time: ' 10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 2,
      c_day: 'Tuesday',
      c_time: '10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 3,
      c_day: 'Wednesday',
      c_time: '10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 4,
      c_day: 'Thursday',
      c_time: '10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 5,
      c_day: 'Friday',
      c_time: '10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 6,
      c_day: 'Saturday',
      c_time: '10:30 AM-1:30 PM  and  6:00 PM-9:30 PM',
    },
    {
      id: 7,
      c_day: 'Sunday',
      c_time: 'Closed',
    },
  ];
  return (
    <>
      <div className="contact_section_container" id="contact-us">
        <div className="container_container">
          <div className="google_map_location">
            <div className="gmap">
              <iframe
                title="gmap_location"
                class="gmap_iframe"
                width="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.8743208397154!2d77.07911550912542!3d28.7015240808462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d041e2d695f61%3A0x58c3b7b9db7da9c4!2sDr%20Bharat%20Gautam!5e1!3m2!1sen!2sin!4v1756053186356!5m2!1sen!2sin"
              ></iframe>
            </div>
          </div>
          <div className="basic_contact_user_form">
            <div className="clinic_time_table">
              <h2 style={{ fontFamily: 'Poppins' }}>
                <span>
                  <i className="fa-solid fa-angles-right"></i>
                </span>
                OPD Hours
              </h2>
            </div>
            <hr />
            {clinic_data.map((e, index) => (
              <div className="clinic_timing" key={index}>
                <p className="current_day">{e.c_day}</p>
                <p className="current_day_timing">{e.c_time}</p>
              </div>
            ))}
            <div className="d_and_c">
              <div className="direction_to_clinic">
                <a
                  href="https://www.google.com/maps/place/Dr+Bharat+Gautam/@28.7015241,77.0791155,560m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390d041e2d695f61:0x58c3b7b9db7da9c4!8m2!3d28.7015194!4d77.0816958!16s%2Fg%2F124t1y1fl?hl=en-IN&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Clinic Direction
                </a>
              </div>
              <div className="call_to_clinic">
                <a href="tel:9892729909">Call Clinic</a>
              </div>
            </div>
          </div>
        </div>
        <LowerFooter />

        <div className="copyright_footer">
          <p>
            <span>
              <i className="fa-regular fa-copyright"></i>
            </span>
            2025
            <a href="/" id="clinic_name">
             Dr. Gautam's Dental Clinic.
            </a>
            All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;
