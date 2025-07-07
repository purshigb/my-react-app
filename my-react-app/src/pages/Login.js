import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn,setUsername }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    acceptTerms: false,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.acceptTerms) {
      setError('You must accept the Terms and Conditions to continue.');
      return;
    }
  
    setError('');
  
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login success:', data);
  
        // ✅ Store session info
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', data.username);
  
        setIsLoggedIn(true);
        setUsername(data.username);
        navigate('/', { replace: true }); // ✅ avoids back navigation to login
      } else {
        const errData = await response.json();
        setError(errData.detail || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Network error. Please try again later.');
    }
  };
  
  

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username or email"
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
            placeholder="Enter your password"
            style={inputStyle}
          />
        </label>

        <label style={checkboxLabel}>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          I accept the Terms and Conditions
        </label>

        <button type="submit" style={btnStyle}>Login</button>
      </form>
    </div>
  );
}

export default Login;

// Styles
const containerStyle = {
  maxWidth: '400px',
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

const checkboxLabel = {
  marginBottom: '15px',
  fontSize: '15px',
  display: 'flex',
  alignItems: 'center',
  color: '#333',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #aaa',
  marginTop: '5px',
};

const btnStyle = {
  backgroundColor: '#2196F3',
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
