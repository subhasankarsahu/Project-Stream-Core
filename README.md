# 🎬 StreamCore — Scalable Video Platform Backend

A production-style backend for a video sharing platform, built with Node.js and Express.
This project demonstrates how to design and implement a real-world backend system with authentication, media handling, and scalable architecture.

---

## 🚀 Overview

StreamCore is a RESTful API that powers a video platform similar to YouTube.
It handles user management, video uploads, interactions (likes, comments), and subscriptions — all structured using industry-standard backend practices.

This project focuses on **clean architecture, scalability, and real-world backend patterns**.

---

## 🧠 Features

* 🔐 Authentication & Authorization (JWT-based)
* 👤 User registration & login
* 🎥 Video upload and management
* ❤️ Like / Unlike videos
* 💬 Comment system (with replies)
* 🔔 Channel subscriptions
* 📦 RESTful API design
* ⚙️ Centralized error handling
* 🧩 Modular and scalable folder structure

---

## 🏗️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (Access + Refresh Tokens)
* **File Uploads:** Multer / Cloud storage
* **Other Tools:** dotenv, bcrypt, cookie-parser

---

## 📁 Project Structure

```
src/
│
├── controllers/     # Business logic
├── models/          # Database schemas
├── routes/          # API routes
├── middlewares/     # Auth & error handling
├── utils/           # Helper functions
├── config/          # DB & app configuration
└── app.js           # App entry point
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/subhasankarsahu/Project-Stream-Core.git
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```
PORT=5000
MONGODB_URI=your_mongodb_connection
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Run the server

```
npm run dev
```

---

## 📡 API Highlights

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | /api/v1/users      | Register user    |
| POST   | /api/v1/auth/login | Login user       |
| GET    | /api/v1/videos     | Fetch all videos |
| POST   | /api/v1/videos     | Upload video     |
| POST   | /api/v1/likes      | Like a video     |
| POST   | /api/v1/comments   | Add a comment    |

---

## 🎯 Learning Goals

This project was built to:

* Understand backend architecture in depth
* Learn how real-world APIs are structured
* Practice authentication & authorization
* Work with file uploads and media handling
* Build scalable and maintainable systems

---

## 🧪 Future Improvements

* 📈 Pagination & performance optimization
* 🔍 Search & filtering
* 📊 Analytics (views, watch time)
* 🧵 Real-time notifications
* 🐳 Docker support

---

## 🤝 Contributing

Contributions are welcome.
Feel free to fork the repo and submit a pull request.

---

## 📌 Acknowledgment

Inspired by a backend development learning series and extended into a structured, production-style project.

---

## 📜 License

This project is open-source and available under the MIT License.
