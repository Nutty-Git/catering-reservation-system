import React, { useState } from 'react';
import { uploadImageToFirebase } from '../utils/uploadImage';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function AddProduct() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !name.trim() || !price.trim()) {
      alert('Please fill in all fields and select an image.');
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      // Upload image to Firebase Storage
      const imageUrl = await uploadImageToFirebase(file);

      // Save product data to Firestore
      await addDoc(collection(db, 'products'), {
        name: name.trim(),
        price: parseFloat(price),
        imageUrl,
        createdAt: serverTimestamp(),
      });

      // Update UI state
      setName('');
      setPrice('');
      setFile(null);
      setImageURL(imageUrl);
      setMessage('✅ Product added successfully!');
      console.log('Product added to Firestore.');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('❌ Failed to upload product.');
    }

    setUploading(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: 'auto' }}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '15px' }}
        />
        <br />
        <button
          type="submit"
          disabled={uploading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {uploading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>

      {message && <p style={{ marginTop: '20px' }}>{message}</p>}

      {imageURL && (
        <div style={{ marginTop: '30px' }}>
          <p><strong>Uploaded Image:</strong></p>
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ width: '100%', maxWidth: '300px' }}
          />
        </div>
      )}
    </div>
  );
}

export default AddProduct;
