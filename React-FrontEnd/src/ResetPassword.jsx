// src/ResetPassword.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import Footer from "./Footer";

function ResetPassword() {
  const location = useLocation();
  const { email } = location.state || {}; // email passed from ForgotPassword
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1 = Verify OTP, 2 = Reset Password
  const [message, setMessage] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/rootz/verify-otp", {
        email,
        otp,
      });
      setMessage(res.data.message);
      setStep(2); // move to password reset form
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/rootz/reset-password", {
        email,
        newPassword,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Password reset failed. Try again."
      );
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>Reset Password</h2>

        {step === 1 && (
          <Form onSubmit={handleVerifyOtp}>
            <Form.Group controlId="formOtp">
              <Form.Label>Enter OTP sent to {email}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="login-button mt-3">
              Verify OTP
            </Button>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleResetPassword}>
            <Form.Group controlId="formNewPassword">
              <Form.Label>Enter New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="login-button mt-3">
              Reset Password
            </Button>
          </Form>
        )}

        {message && <p className="mt-3 text-info">{message}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
