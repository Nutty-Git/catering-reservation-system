import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const productSnap = await getDocs(collection(db, 'products'));
      setProductCount(productSnap.size);

      const orderSnap = await getDocs(collection(db, 'orders'));
      setOrderCount(orderSnap.size);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h2>📊 Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={cardStyle}>
          <h3>📦 Products</h3>
          <p>{productCount}</p>
        </div>
        <div style={cardStyle}>
          <h3>📬 Orders</h3>
          <p>{orderCount}</p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '20px',
  width: '200px',
  textAlign: 'center',
  background: '#f7f7f7',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

export default Dashboard;
