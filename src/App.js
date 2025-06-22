// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Order from './pages/Order';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
