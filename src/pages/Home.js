import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(list);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Available Catering Items</h2>

      {products.length === 0 ? (
        <p>No products available. Please check back later.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '200px',
              textAlign: 'center'
            }}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <h4 style={{ margin: '10px 0' }}>{product.name}</h4>
              <p>₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  background: '#28a745',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
