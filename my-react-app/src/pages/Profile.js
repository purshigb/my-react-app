import React, { useState } from 'react';

function Profile() {
  // Dummy user info
  const user = {
    fullName: 'John Doe',
    username: 'john123',
    mobile: '+91 9876543210',
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dummy order history
  const orders = [
    { id: 1, product: 'Organic Fertilizer', date: '2024-06-01', amount: '₹850' },
    { id: 2, product: 'Compost', date: '2024-06-10', amount: '₹500' },
  ];

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      alert('Password changed successfully!');
      setPassword('');
      setConfirmPassword('');
      setShowChangePassword(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Profile</h2>
      <div style={cardStyle}>
        <p><strong>Full Name:</strong> {user.fullName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Mobile Number:</strong> {user.mobile}</p>
        <button onClick={() => setShowChangePassword(!showChangePassword)} style={buttonStyle}>
          {showChangePassword ? 'Cancel' : 'Change Password'}
        </button>

        {showChangePassword && (
          <div style={{ marginTop: '10px' }}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={inputStyle}
            />
            <button onClick={handleChangePassword} style={buttonStyle}>
              Submit
            </button>
          </div>
        )}
      </div>

      <div style={cardStyle}>
        <h3>Order History</h3>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id} style={{ marginBottom: '6px' }}>
                {order.date} - <strong>{order.product}</strong> - {order.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;

// ======= Styles =======
const containerStyle = {
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
};

const cardStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginTop: '10px',
};

const inputStyle = {
  display: 'block',
  margin: '8px 0',
  padding: '10px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc',
};
