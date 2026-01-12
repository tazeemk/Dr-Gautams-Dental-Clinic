import React from "react";
import profile_one_img from "./images/Profile_images/male_profile_img.png";
import profile_two_img from "./images/Profile_images/female_profile_img.png";
import "./Profile.css";
const Profile = () => {
  const your_profile_details = [
    {
      id: 1,
      photo: profile_one_img,
      name: "Dr.D.R. Gautam",
      occupation: "Senior Consultant ",
      description:
        "Our clinic's Chief Medical Officer, Dr.D.R Gautam has been working in this field of medical specialization since 2002.",
    },
    {
      id: 2,
      photo: profile_one_img,
      name: "Dr. Bharat Gautam",
      occupation: "Dental Surgeon B.D.S .M.I.D.A",
      description:
        "Our clinic's Chief Medical Officer, Dr. Bharat Gautam has been working in this field of medical specialization since 2002.",
    },
  ];
  return (
    <>
      <div className="profile_section_container">
        <h2 style={{ marginTop: "45px" }}>
          <span>
            <i className="fa-solid fa-angles-right "></i>
          </span>
          Meet Our Teem
        </h2>
        <div className="p_info_container">
          {your_profile_details.map((e, index) => (
            <div className="profile_details" key={index}>
              <img src={e.photo} alt="profile_image" id="your_profile_image" />
              <div className="profile_info">
                <h3 className="profile_name">{e.name}</h3>
                <h4 className="profile_occupation">{e.occupation}</h4>
              </div>
              <p className="profile_description">{e.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
