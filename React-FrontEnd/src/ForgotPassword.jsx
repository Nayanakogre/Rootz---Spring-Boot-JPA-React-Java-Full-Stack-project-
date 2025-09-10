// src/ForgotPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/rootz/forgot-password', { email });
      setMessage(res.data.message || 'OTP sent to your email');
      navigate('/reset-password', { state: { email } }); // redirect with email
    } catch (error) {
      setMessage('Error sending reset link. Try again.');
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>Forgot Password</h2>
        <Form onSubmit={handleForgot}>
          <Form.Group controlId="formEmail">
            <Form.Label>Enter your registered email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="login-button mt-3">
            Send OTP / Reset Link
          </Button>
        </Form>
        {message && <p className="mt-3 text-info">{message}</p>}
      </div>
      <Footer />
    </div>
  );
}

export default ForgotPassword;
