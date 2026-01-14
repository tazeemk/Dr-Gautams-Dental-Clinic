import React, { useState } from "react";
import axios from "axios";
import "./ResetPassword.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { properties } from "./properties";
export function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }

    if (!/^\d{8}$/.test(formData.password)) {
      setError("Password must contain exactly 8 digits");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  // 🔹 BACKEND API HANDLER
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      // 👉 CHANGE API URL AS PER BACKEND
      await axios.post(properties.url+"/user/resetPassword", {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setSuccess("Password reset successfully. Please login.");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
       setTimeout(() => {
        navigate("/login_user");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <form className="reset-card" onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
        <p>Enter your registered email and new password</p>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="New Password (8 digits)"
          value={formData.password}
          maxLength={8}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, password: value });
          }}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          maxLength={8}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, confirmPassword: value });
          }}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
