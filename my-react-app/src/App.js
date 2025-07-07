  import React, { useState, useEffect } from 'react';
  import { HashRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
  import Home from './pages/Home';
  import Contact from './pages/Contact';
  import Login from './pages/Login';
  import Register from './pages/Register';
  import Product from './pages/Product';
  import ProductDetails from './pages/ProductDetails';
  import Profile from './pages/Profile';
  import Footer from './components/Footer';
  import ProtectedRoute from './components/ProtectedRoute';
  import logo from './assets/logo.png';

  function AppWrapper() {
    return (
      <Router>
        <App />
      </Router>
    );
  }

  function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
      setUsername('');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      setShowDropdown(false);
      navigate('/login', { replace: true });
    };

    useEffect(() => {
      const handlePopState = () => {
        if (!localStorage.getItem('isLoggedIn')) {
          navigate('/login', { replace: true });
        }
      };
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }, [navigate]);

    return (
      <div>
        <nav style={navContainer}>
          <div style={logoWrapper}>
            <img src={logo} alt="Logo" style={logoStyle} />
            <span style={companyNameStyle}>Om Sri Agronomists</span>
          </div>
          <ul style={navListStyle}>
            <li>
              <Link to="/" style={linkStyle}><button style={btnStyle('#607d8b')}>Home</button></Link>
            </li>
            <li>
              <Link to="/product" style={linkStyle}><button style={btnStyle('#9C27B0')}>Products</button></Link>
            </li>
            <li>
              <Link to="/contact" style={linkStyle}><button style={btnStyle('#f44336')}>Contact</button></Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li><Link to="/login" style={linkStyle}><button style={btnStyle('#2196F3')}>Login</button></Link></li>
                <li><Link to="/register" style={linkStyle}><button style={btnStyle('#4CAF50')}>Register</button></Link></li>
              </>
            ) : (
              <li style={{ position: 'relative' }}>
                <div onClick={toggleDropdown} style={{ cursor: 'pointer', textAlign: 'center', color: 'white' }}>
                  👤
                  <div style={{ fontSize: '14px' }}>{username}</div>
                  {showDropdown && (
                    <ul style={dropdownMenuStyle}>
                      <li style={dropdownItemStyle} onClick={() => { setShowDropdown(false); navigate('/profile'); }}>Profile</li>
                      <li style={dropdownItemStyle} onClick={handleLogout}>Logout</li>
                    </ul>
                  )}
                </div>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    );
  }

  export default AppWrapper;

  // Styles
  const navContainer = {
    backgroundColor: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    height: '70px',
  };

  const logoWrapper = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyle = {
    width: '100px',
    marginRight: '10px',
  };

  const companyNameStyle = {
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const navListStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    listStyle: 'none',
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  const btnStyle = (bg) => ({
    backgroundColor: bg,
    color: 'white',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
  });

  const dropdownMenuStyle = {
    position: 'absolute',
    top: '50px',
    right: 0,
    backgroundColor: '#222',
    borderRadius: '6px',
    width: '140px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 1000,
  };

  const dropdownItemStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '14px',
    borderBottom: '1px solid #444',
  };
