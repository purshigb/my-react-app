import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    enquiry: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just show the data in console and set submitted
    console.log('Contact form submitted:', formData);
    setSubmitted(true);

    // Optionally reset form
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      enquiry: '',
    });
  };

  return (
    <div style={containerStyle}>
      <h2>Contact Us</h2>
      {submitted && <p style={{ color: 'green' }}>Thank you for your enquiry! We will get back to you soon.</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Your full name"
          />
        </label>

        <label style={labelStyle}>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Your email address"
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
            style={inputStyle}
            placeholder="Your mobile number"
          />
        </label>

        <label style={labelStyle}>
          Enquiry:
          <textarea
            name="enquiry"
            value={formData.enquiry}
            onChange={handleChange}
            required
            rows="5"
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="Write your message here"
          />
        </label>

        <button type="submit" style={submitBtnStyle}>Submit</button>
      </form>
    </div>
  );
}

export default Contact;

// Styles
const containerStyle = {
  maxWidth: '600px',
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

const submitBtnStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 20px',
  fontSize: '18px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  alignSelf: 'flex-start',
};

