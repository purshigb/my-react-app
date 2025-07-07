import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <p>© 2025 Om Sri Agronomists. All rights reserved.</p>
        <div style={linksStyle}>
          <a href="/" style={linkStyle}>Home</a>
          <a href="/product" style={linkStyle}>Product</a>
          <a href="/contact" style={linkStyle}>Contact</a>
          {/* <a href="/login" style={linkStyle}>Login</a>
          <a href="/register" style={linkStyle}>Register</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Styles

const footerStyle = {
  backgroundColor: '#222',
  color: '#eee',
  padding: '20px 10px',
  width: '100%',
  boxShadow: '0 -2px 5px rgba(0,0,0,0.3)',
  fontSize: '14px',
  // no position property so it flows naturally
};

const contentStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  textAlign: 'center',
};

const linksStyle = {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  flexWrap: 'wrap',
};

const linkStyle = {
  color: '#aaa',
  textDecoration: 'none',
  transition: 'color 0.3s',
};

