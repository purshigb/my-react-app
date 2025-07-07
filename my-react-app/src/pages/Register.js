import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
  
    const payload = {
      full_name: formData.fullName,
      username: formData.username,
      email: formData.email,
      mobile_number: formData.mobile,
      password: formData.password,
    };
  
    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      // if (response.ok) {
      //   setSuccess(true);
      //   setError('');
      //   console.log('Registered successfully:', await response.json());
  
      //   // Reset form
      //   setFormData({
      //     fullName: '',
      //     username: '',
      //     email: '',
      //     mobile: '',
      //     password: '',
      //     confirmPassword: '',
      //   });
      if (response.ok) {
        setSuccess(true);
        setError('');
        await response.json(); // optional: handle data if needed
      
        // Show success alert and redirect to login
        alert('Registration successful! Click OK to proceed to login.');
      
        // Redirect to login page
        window.location.href = '/login'; // or use react-router navigate if using routes
      }
      else {
        const data = await response.json();
        setError(data.detail || 'Registration failed. Please check your input.');
        setSuccess(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setSuccess(false);
      console.error('Error:', err);
    }
  };
  

  return (
    <div style={containerStyle}>
      <h2>Register</h2>
      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>Registration successful!</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Your full name"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose a username"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Email Address:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Mobile Number:
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            pattern="[0-9]{10,15}"
            placeholder="Enter your mobile number"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter a password"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Re-enter Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
            style={inputStyle}
          />
        </label>

        <button type="submit" style={btnStyle}>Register</button>
      </form>
    </div>
  );
}

export default Register;

// Styles
const containerStyle = {
  maxWidth: '500px',
  margin: '40px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  marginBottom: '15px',
  fontWeight: '600',
  color: '#333',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '16px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #aaa',
  marginTop: '5px',
};

const btnStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 20px',
  fontSize: '18px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  marginBottom: '15px',
};

const successStyle = {
  color: 'green',
  marginBottom: '15px',
};
