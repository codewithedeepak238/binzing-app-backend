# 🛒 BinZing - Grocery & Clothing App (MERN Stack Clone)

BinZing is a full-featured **Blinkit-inspired grocery shopping app** built with the **MERN stack** — **MongoDB**, **Express.js**, **React**, and **Node.js**. Designed for performance, scalability, and user convenience, BinZing offers a modern, intuitive platform for managing online shopping experiences.

---

## 🚀 Features

- 🛍️ **Browse a wide range of products**
- 🛒 **Add/remove items to/from shopping cart**
- 💳 **Checkout with minimal effort**
- 🧑‍💼 **User registration and login (email or phone)**
- 📦 **Order history and cart persistence**
- 🖼️ **Product image upload via Cloudinary**
- 📬 **Email verification with Brevo SMTP integration**
- 📱 **Responsive design for mobile & desktop**

---

## 🧠 Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/-MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/-Brevo-071B54?style=for-the-badge&logoColor=white&logo=data:image/svg+xml;base64," alt="Brevo" />
</div>

---

## 🧠 Tech Stack

| Frontend      | Backend         | Database   | Services   |
|---------------|------------------|------------|------------|
| React + Vite  | Node.js + Express | MongoDB    | Cloudinary (image upload), Brevo SMTP (emails) |

---

## ⚙️ Setup & Installation

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/binzing-clone.git
   cd binzing-clone
   
2. **Install server dependencies**
   ```bash
   cd server
   npm install

3. **Create .env file inside /server**
   ```bash
   MONGO_URI=your_mongo_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret

   BREVO_EMAIL=your_verified_email@gmail.com
   BREVO_SMTP_KEY=your_brevo_smtp_key
   FRONTEND_URL=http://localhost:3000
   SECRET_KEY=your_jwt_secret_key

4. **Run the server**
   ```bash
   npm run dev

5. **Frontend setup (if using a separate client): Navigate to your frontend directory and install dependencies**
   ```bash
   cd client
   npm install
   npm run dev


🧩 Project Structure
/server
├── models
├── routes
├── controllers
├── middleware
├── utils
├── .env
├── index.js

📈 Future Enhancements
✅ Razorpay/Stripe integration for real payments

✅ Product filters by category, rating, brand

✅ Admin dashboard for inventory & orders

✅ Mobile app with React Native

📫 Contact
Developer: Deepak Saraswat
Email: deepaksaraswat238@gmail.com
GitHub: codewithedeepak238
