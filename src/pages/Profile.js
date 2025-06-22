import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { uploadImageToFirebase } from '../utils/uploadImage';

function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleUpload = async () => {
    if (!image || !user) return;
    try {
      const imageUrl = await uploadImageToFirebase(image, `profile-pictures/${user.uid}`);
      await updateProfile(user, { photoURL: imageUrl });
      setUser({ ...user, photoURL: imageUrl });
      setMessage('✅ Profile image updated!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to upload image');
    }
  };

  if (!user) {
    return <div style={{ padding: '40px' }}><h2>Please log in to view your profile.</h2></div>;
  }

  return (
    <div style={{
      padding: '50px',
      maxWidth: '500px',
      margin: 'auto',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px' }}>My Profile</h2>

      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          style={{ width: '150px', borderRadius: '50%', marginBottom: '20px' }}
        />
      )}

      <p><strong>Name:</strong> {user.displayName || 'Not set'}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div style={{ marginTop: '20px' }}>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleUpload} style={{ marginTop: '10px', padding: '6px 12px' }}>
          Upload Profile Image
        </button>
        <p style={{ marginTop: '10px' }}>{message}</p>
      </div>
    </div>
  );
}

export default Profile;
