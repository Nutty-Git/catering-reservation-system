import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      setMessage('✅ Registered successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMessage('❌ ' + err.message);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text" placeholder="Name" value={name}
          onChange={e => setName(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: '15px' }}>{message}</p>
    </div>
  );
}

export default Register;
