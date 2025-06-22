import React from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

function PrivateRoute({ children }) {
  const [user, setUser] = React.useState(null);
  const [authChecked, setAuthChecked] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) return null; // or loading spinner

  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
