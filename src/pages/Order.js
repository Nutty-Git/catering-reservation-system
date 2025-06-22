import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function Order() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(
  collection(db, 'orders'),
  where('userId', '==', currentUser.uid),
  orderBy('createdAt', 'desc')
);
        const snapshot = await getDocs(q);
        const fetchedOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(fetchedOrders);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '8px'
          }}>
            <h4>Order ID: {order.id}</h4>
            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Date:</strong> {order.createdAt?.toDate().toLocaleString()}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ width: '150px', textAlign: 'center' }}>
                  <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
