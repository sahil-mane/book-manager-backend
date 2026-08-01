# 📚 Personal Book Manager – Backend

Backend API for the **Personal Book Manager**, built with **Node.js, Express.js, and MongoDB**. It provides secure user authentication and allows each user to manage their own personal book collection.

## 🚀 Features

* User Registration & Login (JWT Authentication)
* Secure Password Hashing with bcrypt
* Create, Update, Delete (Soft Delete) Books
* Get User's Books
* Filter Books by Status and Tags
* Protected Routes using JWT Middleware
* Centralized Error Handling
* MongoDB with Mongoose

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcryptjs

---

## 📂 Project Structure

```text
├── controllers
├── middleware
├── models
├── routes
├── utils
├── index.js
├── package.json
└── .env
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/sahil-mane/book-manager-backend.git
cd backend
```

### Install dependencies

```bash
npm install
```

### Create `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Start development server

```bash
npm run dev
```

Server runs at:

```text
http://localhost:5000
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Books

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| POST   | `/api/books/addBook`    | Add a new book               |
| POST   | `/api/books/getBooks`   | Get books (supports filters) |
| PATCH  | `/api/books/updateBook` | Update book details          |
| PATCH  | `/api/books/deleteBook` | Soft delete a book           |

---

## 📖 Book Object

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "tags": ["self-help"],
  "status": "reading"
}
```

---

## 🔍 Filtering Books

Example request:

```json
{
  "filterBy": {
    "status": "reading",
    "tags": ["self-help"]
  }
}
```

Supported filters:

* `status`
* `tags`

---

## 🔐 Authentication

Pass the JWT token in the Authorization header:

```text
Authorization: Bearer <your_token>
```

---

## 📌 Available Scripts

```bash
npm run dev
```

Starts the development server using Nodemon.

```bash
npm start
```

Starts the production server.

---

## 📄 License

This project is created for learning and portfolio purposes.
