import React, { useEffect, useState } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const url =
      "https://dental-service.onrender.com/dental-clinic/user/profile";

    const getDatas = async () => {
      try {
        setLoading(false);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setApiData(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile details");
      } finally {
        setLoading(false); // ⭐ FIXES infinite loading
      }
    };

    getDatas();
  }, []);

  if (loading) {
    return (
      <div className="profile_section">
        <h2 className="loading_text">Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile_section">
        <h2 className="error_text">{error}</h2>
      </div>
    );
  }

  return (
    <div className="profile_section">
      <div className="user_data_container">
        {apiData.map((val, key) => (
          <div key={key} className="data_values" data-aos="fade-up">
            <p>
              <span className="your_name">Name :</span> {val.name}
            </p>
            <p>
              <span className="your_email">Email :</span> {val.email}
            </p>
            <p>
              <span className="your_phone">Phone :</span> {val.phone}
            </p>
            <p>
              <span className="your_date">Date :</span> {val.date}
            </p>
            <p>
              <span className="your_time">Time :</span> {val.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
