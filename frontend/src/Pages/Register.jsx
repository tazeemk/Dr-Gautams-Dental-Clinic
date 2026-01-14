import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import Spinner from "../Components/Spinner";
import axios from "axios";

const Register = () => {
  const url = "http://localhost:9090/user/register";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    userAddress: "",
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      // navigate("/login_user");
    }
  }, []);

  const handleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
  const { password, confirmPassword, userName, email, mobileNumber } = user;

  // Name validation (letters only)
  const nameRegex = /^[A-Za-z ]{3,}$/;

  // Mobile: exactly 10 digits
  const mobileRegex = /^\d{10}$/;

  // Password: exactly 8 digits (same as reset password)
  const passwordRegex = /^\d{8}$/;

  if (!nameRegex.test(userName)) {
    toast.error("Name must contain only letters and at least 3 characters", toastOptions);
    return false;
  }

  if (!email) {
    toast.error("Email is required", toastOptions);
    return false;
  }

  if (!mobileRegex.test(mobileNumber)) {
    toast.error("Mobile number must be exactly 10 digits", toastOptions);
    return false;
  }

  if (!passwordRegex.test(password)) {
    toast.error("Password must contain exactly 8 digits", toastOptions);
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password and Confirm Password must match", toastOptions);
    return false;
  }

  return true;
};

  const PostData = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    try {
      setLoading(true);

      const response = await axios.post(url, user);

      toast.success("User registered successfully!", toastOptions);

      setUser({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        userAddress: "",
      });

      setTimeout(() => {
        navigate("/login_user");
      }, 2000);
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Registration failed",
          toastOptions
        );
      } else {
        toast.error("Server not responding", toastOptions);
      }
    } finally {
      setLoading(false); // ⭐ MOST IMPORTANT FIX
    }
  };

  return (
    <>
      <div className="register_form_section">
        <FormContainer className="form_container_register">
          <form
            className="register_u_form"
            onSubmit={PostData}
            data-aos="fade-right"
          >
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h1>Gautam Dental Clinic</h1>
            </div>

            <input
  type="text"
  placeholder="Enter Your Name"
  name="userName"
  value={user.userName}
  onChange={(e) => {
    const value = e.target.value.replace(/[^A-Za-z ]/g, "");
    setUser({ ...user, userName: value });
  }}
  required
/>

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              required
            />

           <input
  type="tel"
  placeholder="Mobile Number"
  name="mobileNumber"
  value={user.mobileNumber}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setUser({ ...user, mobileNumber: value });
  }}
  required
/>


            <input
              type="text"
              placeholder="Address"
              name="userAddress"
              value={user.userAddress}
              onChange={handleInputs}
              required
            />

          <input
  type="password"
  placeholder="Password (8 digits)"
  name="password"
  value={user.password}
  maxLength={8}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setUser({ ...user, password: value });
  }}
  required
/>


      <input
  type="password"
  placeholder="Confirm Password"
  name="confirmPassword"
  value={user.confirmPassword}
  maxLength={8}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    setUser({ ...user, confirmPassword: value });
  }}
  required
/>


            <button
              className="submit_register_btn"
              type="submit"
              disabled={loading}
            >
              {loading ? <Spinner /> : "SIGN UP"}
            </button>

            <span className="lower_title_register">
              Already have an account?
              <Link to="/login_user">Login</Link>
            </span>
          </form>
        </FormContainer>

        <ToastContainer />
      </div>
    </>
  );
};

const FormContainer = styled.div``;

export default Register;
