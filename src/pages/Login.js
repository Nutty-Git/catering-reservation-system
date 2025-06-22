import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('✅ Logged in!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err.message);
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: '10px' }} />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '15px' }}>{message}</p>
    </div>
  );
}

export default Login;
