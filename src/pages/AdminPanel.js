import React, { useEffect, useState } from 'react';
import { db, storage } from '../firebase/config';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '' });
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(list);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (product) => {
    try {
      await deleteDoc(doc(db, 'products', product.id));
      const url = new URL(product.imageUrl);
      const decodedPath = decodeURIComponent(url.pathname.split('/o/')[1].split('?')[0]);
      const imageRef = ref(storage, decodedPath);
      await deleteObject(imageRef);
      setMessage('✅ Product deleted');
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to delete');
    }
  };

  const handleEditClick = (product) => {
    setEditId(product.id);
    setEditData({ name: product.name, price: product.price });
  };

  const handleUpdate = async () => {
    try {
      const productRef = doc(db, 'products', editId);
      await updateDoc(productRef, {
        name: editData.name,
        price: parseFloat(editData.price)
      });
      setMessage('✅ Product updated');
      setEditId(null);
      setEditData({ name: '', price: '' });
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update');
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2>Admin Panel – Manage Products</h2>
      {message && <p style={{ margin: '10px 0' }}>{message}</p>}

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map(product => (
            <div key={product.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              width: '250px'
            }}>
              <img src={product.imageUrl} alt={product.name}
                style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>

              {editId === product.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="New name"
                    style={{ width: '100%', marginBottom: '5px' }}
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    placeholder="New price"
                    style={{ width: '100%', marginBottom: '5px' }}
                  />
                  <button onClick={handleUpdate} style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', marginRight: '5px' }}>
                    Save
                  </button>
                  <button onClick={() => setEditId(null)} style={{ background: '#888', color: 'white', border: 'none', padding: '6px 12px' }}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleDelete(product)} style={{ background: 'red', color: 'white', border: 'none', padding: '6px 12px', marginBottom: '5px' }}>
                    Delete
                  </button>
                  <br />
                  <button onClick={() => handleEditClick(product)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '6px 12px' }}>
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
