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

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    }
    if (userName.length < 3) {
      toast.error("Enter your full name", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters", toastOptions);
      return false;
    }
    if (!email) {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits", toastOptions);
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
              onChange={handleInputs}
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
              type="number"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={user.mobileNumber}
              onChange={handleInputs}
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
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputs}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleInputs}
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
