import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const response = await axios.post('http://localhost:8080/rootz/login', {
      email,
      password,
    });

    const userData = response.data;
    alert('Login Successful');

    // ✅ Save user to localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userData));

    // ✅ Redirect to profile page
    navigate('/profile', { state: { user: userData } });

  } catch (error) {
    console.error('Login error:', error);
    alert('Invalid email or password');
  }
};


  return (
    <div className="login-page">
      <Header />
      <div className="login-fullscreen">
        <div className="login-container">
          <h2 className="login-heading">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Text className="text-muted">
  <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
</Form.Text>


          <Button type="submit" className="login-button">
            Login
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
    {/* Closing tag for login-page div added below */}
  </div>
  );
}

export default Login;
