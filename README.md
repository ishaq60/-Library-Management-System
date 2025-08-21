# 📚 Library Management API (Express + TypeScript + MongoDB)

A complete **Library Management System API** built with **Express, TypeScript, and MongoDB (Mongoose)**.  
This project follows the **MVC pattern** and implements schema validation, business logic, aggregation pipelines, and middleware.

---

## 🚀 Features
- ✅ **Book Management**
  - Create, Read, Update, Delete books
  - Filtering, Sorting, and Pagination
- ✅ **Borrow Management**
  - Borrow books with quantity & due date
  - Business logic: availability check, auto-update on stock
  - Borrow summary using **MongoDB Aggregation**
- ✅ **Mongoose Features**
  - Schema Validation
  - Static & Instance Methods
  - Middleware (`pre` / `post` hooks)
- ✅ **Error Handling**
  - Consistent error response format
- ✅ **Clean MVC Structure**
  - `controllers/`, `models/`, `routes/`, `middlewares/`

---

## 🛠 Tech Stack
- **Backend Framework:** Express.js (TypeScript)
- **Database:** MongoDB with Mongoose
- **Language:** TypeScript
- **Architecture:** MVC Pattern

---

## 📂 Project Structure
📦 library-management-api
┣ 📂 src
┃ ┣ 📂 controllers
┃ ┣ 📂 models
┃ ┣ 📂 routes
┃ ┣ 📂 middlewares
┃ ┣ 📂 utils
┃ ┣ 📜 app.ts
┃ ┗ 📜 server.ts
┣ 📜 package.json
┣ 📜 tsconfig.json
┣ 📜 README.md


---

## ⚡ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Setup Environment
Create a .env file:


PORT=5000
MONGO_URI=mongodb://localhost:27017/libraryDB
4️⃣ Run the Project

npm run dev
