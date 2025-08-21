# 📖 Library Management API  

A Library Management System built with **Express.js, TypeScript, and MongoDB (Mongoose)**.  
This project follows the **MVC architecture** and provides full CRUD operations for managing books, as well as borrowing functionality with proper validations, business logic, and aggregation features.  

---

## 🎯 Objective  

The main objective of this project is to:  
- Manage library books (create, read, update, delete).  
- Allow borrowing of books with availability control.  
- Provide a summary of borrowed books using MongoDB’s **aggregation pipeline**.  
- Enforce schema validation and business logic using **Mongoose methods and middleware**.  

---

## 🛠 Tech Stack  

- **Backend Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose ODM)  
- **Architecture:** MVC (Model-View-Controller)  

---

## 📂 Project Structure  

📦 library-management-api
┣ 📂 src
┃ ┣ 📂 models # Book & Borrow Schemas
┃ ┣ 📂 controllers # Business logic
┃ ┣ 📂 routes # API routes
┃ ┣ 📂 middlewares # Error handling, validations
┃ ┗ server.ts # Entry point
┣ 📜 package.json
┣ 📜 tsconfig.json
┗ 📜 README.md



---

## 📚 Models  

### 📘 Book Model  
- `title` (string, required)  
- `author` (string, required)  
- `genre` (enum: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)  
- `isbn` (string, required, unique)  
- `description` (string, optional)  
- `copies` (number, required, must be ≥ 0)  
- `available` (boolean, defaults to true)  

### 📖 Borrow Model  
- `book` (ObjectId reference, required)  
- `quantity` (number, required, must be > 0)  
- `dueDate` (Date, required)  

**Business Logic:**  
- Borrow only if copies are available.  
- Deduct borrowed quantity from available copies.  
- If copies reach 0, automatically set `available = false`.  
- Implemented via **static/instance methods and middleware**.  

---

## ⚡ API Endpoints  

### 1. Create Book  
`POST /api/books`  
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}

---

## 📚 Models  

### 📘 Book Model  
- `title` (string, required)  
- `author` (string, required)  
- `genre` (enum: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY)  
- `isbn` (string, required, unique)  
- `description` (string, optional)  
- `copies` (number, required, must be ≥ 0)  
- `available` (boolean, defaults to true)  

### 📖 Borrow Model  
- `book` (ObjectId reference, required)  
- `quantity` (number, required, must be > 0)  
- `dueDate` (Date, required)  

**Business Logic:**  
- Borrow only if copies are available.  
- Deduct borrowed quantity from available copies.  
- If copies reach 0, automatically set `available = false`.  
- Implemented via **static/instance methods and middleware**.  

---

## ⚡ API Endpoints  

### 1. Create Book  
`POST /api/books`  
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
7. Borrow Summary (Aggregation)

GET /api/borrow

{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": { "title": "The Theory of Everything", "isbn": "9780553380163" },
      "totalQuantity": 5
    }
  ]
}

❌ Error Handling

Example response when validation fails:

{
  "message": "Validation failed",
  "success": false,
  "error": {
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}

🚀 Getting Started
1️⃣ Clone Repository
git clone https://github.com/your-username/library-management-api.git
cd library-management-api

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_connection_string

4️⃣ Run the Server

For development:

npm run dev


For production build:

npm run build
npm start
