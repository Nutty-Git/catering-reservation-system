import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
      console.log("✅ Admin UID:", currentUser.uid); 
    }
    setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!authChecked) return null; // Prevent flickering before auth is checked

  return (
    <nav style={{
      background: 'linear-gradient(to right, #1e3c72, #2a5298)',
      color: 'white',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CateringHub</Link>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>

        {user ? (
          <>
            <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>Add Product</Link>
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</Link>
            <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
            <Link to="/orders" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Orders</Link>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Admin Panel</Link>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Dashboard</Link>
            <span style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
              Hello, <strong>{user.displayName || user.email.split('@')[0]}</strong>
            </span>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: '10px',
                backgroundColor: '#ff4d4d',
                border: 'none',
                padding: '6px 12px',
                color: 'white',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
