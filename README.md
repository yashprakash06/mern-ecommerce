# MERN E-Commerce Platform

A full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React, Node.js) with a modern, SaaS-style frontend.

## Features

*   **Modern User Interface:** A recently overhauled SaaS-style UI built with Tailwind CSS.
*   **Authentication & Authorization:** Secure user authentication using Firebase and JWT.
*   **Product Management:** View, add, and manage products.
*   **Image Uploads:** Cloudinary integration with Multer for handling product images.
*   **Payments:** Integrated with Razorpay for secure checkout and payment processing.
*   **State Management & Routing:** React Router for seamless navigation.

## Tech Stack

### Frontend (Client)
*   React 18
*   React Router DOM v6
*   Tailwind CSS (Styling)
*   Axios (HTTP client)
*   Firebase (Auth/Storage)

### Backend (Server)
*   Node.js & Express.js (v5)
*   MongoDB & Mongoose
*   JSON Web Tokens (JWT) & bcryptjs (Authentication)
*   Cloudinary & Multer (Image storage)
*   Razorpay (Payment Gateway)

## Getting Started

### Prerequisites
*   Node.js installed on your machine
*   MongoDB instance (local or Atlas)
*   Cloudinary account
*   Razorpay account
*   Firebase project setup

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yashprakash06/mern-ecommerce.git
    cd mern-ecommerce
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

4.  **Environment Variables:**
    Create a `.env` file in the `server` directory and add your keys (e.g., MongoDB URI, JWT Secret, Cloudinary keys, Razorpay keys).
    Create a `.env` file in the `client` directory for Firebase and other frontend variables.

### Running the App Locally

Start the backend server (runs on `http://localhost:5000` typically):
```bash
cd server
npm run dev
```

Start the frontend development server (runs on `http://localhost:3000`):
```bash
cd client
npm start
```

The application will now be running.
