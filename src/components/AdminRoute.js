import React from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const ADMIN_UID = 'zaB5qaqYSxVapIwXypW5Uypsv7Q2'; 

function AdminRoute({ children }) {
  const [user, setUser] = React.useState(null);
  const [authChecked, setAuthChecked] = React.useState(false);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsub();
  }, []);

  if (!authChecked) return null;

  return user && user.uid === ADMIN_UID ? children : <Navigate to="/login" />;
}

export default AdminRoute;
