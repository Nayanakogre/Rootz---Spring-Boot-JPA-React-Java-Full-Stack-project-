import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import Header from './Header';
import Footer from './Footer';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    password: '', confirmPassword: '', role: 'user'
  });

  const [errors, setErrors] = useState({});
  const [emailAvailable, setEmailAvailable] = useState(true);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Contact must be 10 digits';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    if (!emailAvailable) newErrors.email = 'Email is already registered';
    return newErrors;
  };

  const checkEmailExists = async (email) => {
    try {
      const res = await axios.get('http://localhost:8080/rootz/check-email', {
        params: { email }
      });
      setEmailAvailable(!res.data.exists); // true if available
      if (res.data.exists) {
        setErrors(prev => ({ ...prev, email: 'Email is already registered' }));
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));

    // Reset email availability on every change
    if (name === 'email') setEmailAvailable(true);
  };

  const handleBlur = (e) => {
    if (e.target.name === 'email' && e.target.value.includes('@')) {
      checkEmailExists(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/rootz/register', formData, {
        headers: { "Content-Type": "application/json" }
      });

      alert("Registration successful!");
      console.log("Registered successfully", response.data);

      setFormData({
        name: '', email: '', phone: '',
        password: '', confirmPassword: '', role: 'user'
      });
    } catch (error) {
      console.error("Network error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-fullscreen">
      <Header />
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <label htmlFor="phone">Contact</label>
          <input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}

          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="confirmPassword">Re-enter Password</label>
          <input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

          <label htmlFor="role">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input type="submit" value="Register" />
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
