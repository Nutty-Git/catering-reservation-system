import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);

    const unsub = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });

    return () => unsub();
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      setMessage('You must be logged in to place an order.');
      return;
    }
    if (cartItems.length === 0) {
      setMessage('Your cart is empty.');
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        items: cartItems,
        total,
        createdAt: serverTimestamp()
      });

      localStorage.removeItem('cart');
      setCartItems([]);
      setMessage('✅ Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      console.error('Order failed:', err);
      setMessage('❌ Failed to place order.');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>My Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px'
            }}>
              <h4>{item.name}</h4>
              <img src={item.imageUrl} alt={item.name} style={{ width: '150px' }} />
              <p>₹{item.price}</p>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
          <button
            onClick={handlePlaceOrder}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Place Order
          </button>
        </>
      )}

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

export default Cart;
