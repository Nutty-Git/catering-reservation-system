# 🍽️ Catering Reservation and Ordering System

A full-stack catering reservation and online ordering platform built using **ReactJS** and **Firebase**.

---

## 🚀 Features

### 👥 User Module
- Register & Login with Firebase Authentication
- Browse available catering items
- Add items to cart
- Place orders
- View order history
- Profile with image upload

### 🧑‍💼 Admin Module
- Upload products with images
- Edit product name and price
- Delete products (Firestore + Storage)
- View dashboard with product/order count

### 🔐 Security
- Route protection (private routes)
- Admin-only access to admin panel & dashboard

---

## ⚙️ Tech Stack

- **Frontend**: ReactJS, HTML, CSS, JavaScript
- **Backend**: Firebase Auth, Firestore, Firebase Storage
- **Deployment**: GitHub (Firebase Hosting optional)

---

## 📁 Folder Structure

src/
├── components/
│ └── Navbar.js, PrivateRoute.js, AdminRoute.js
├── pages/
│ └── Home.js, Login.js, Register.js, Cart.js, Profile.js
│ └── AddProduct.js, AdminPanel.js, Dashboard.js, Order.js
├── firebase/
│ └── config.js
└── utils/
└── uploadImage.js, logger.js


---

## 🛠️ Local Setup

```bash
git clone https://github.com/Nutty-Git/catering-reservation-system.git
cd catering-reservation-system
npm install
npm start

🔐 Firebase Setup
Create a project at https://console.firebase.google.com
Enable:
Authentication (Email/Password)
Firestore Database
Firebase Storage
Add your Firebase config in firebase/config.js

✨ Credits
Developed by: Shruti Hedau

