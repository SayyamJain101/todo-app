# MERN Todo App

A full-stack Todo application built using MongoDB, Express.js, React, and Node.js.

## Features

- Add, edit, delete tasks
- Mark tasks as completed
- Persistent storage using MongoDB Atlas
- Fully responsive UI with Tailwind CSS

## Tech Stack

Frontend: React, Axios, Tailwind CSS  
Backend: Node.js, Express.js, MongoDB, Mongoose  
Database: MongoDB Atlas

## Installation

### 1. Clone the repository

git clone https://github.com/SayyamJain101/todo-app.git
cd todo-app

### 2. Install frontend dependencies

npm install

### 3. Setup backend

cd server
npm install

Create `.env` file in /server:
MONGO_URI=YOUR_CONNECTION_STRING
PORT=5000

### 4. Run project

# Terminal 1:

cd server
npm start

# Terminal 2:

cd ..
npm run dev
