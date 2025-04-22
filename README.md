# 🗳️ MERN Polling App

A full-stack polling application built using the **MERN stack (MongoDB, Express, React, Node.js)** that allows users to create and participate in various types of polls. The app includes user authentication, a clean dashboard, and interactive UI components to enhance user experience.

## 🌐 Live Demo

🔗 [View Live Demo](https://poll-it-rust.vercel.app)

## 🚀 Features

- 🔐 **Authentication System**
  - Login and Signup functionality to access the home dashboard.
  - Protected routes to secure user data.

- 🧠 **Poll Types**
  - 🖼️ **Image Based Polls** – Vote by choosing from images.
  - 💬 **Open Ended Polls** – Users submit their own responses.
  - ⭐ **Rating Polls** – Rate items on a scale (e.g., 1 to 5).
  - ✅ **Yes/No Polls** – Simple binary choice.
  - 🔘 **Single Option Polls** – Choose one option from a list.

- 📊 **Poll Voting and Visualization**
  - Dynamic results update after voting.
  - Prevention of multiple votes by the same user.

- 🧩 **Tech Stack**
  - **Frontend:** React, Context API for state management, Toaster for notifications.
  - **Backend:** Node.js, Express.js
  - **Database:** MongoDB (Mongoose)

- 🔔 **Real-Time Feedback**
  - Toast notifications for success, error, and alerts using `react-hot-toast`.

## 📂 Project Structure

client/ │ ├── components/ # Reusable UI components │ ├── context/ # Context API for global state │ ├── pages/ # React pages (Login, Signup, Dashboard) │ ├── App.js # Root component │ └── index.js # React entry point

server/ │ ├── controllers/ # Route logic │ ├── models/ # MongoDB models (User, Poll) │ ├── routes/ # API route definitions │ ├── middleware/ # Auth middleware │ └── server.js # Express server setup


🙌 Author
Made with ❤️ by Himanshu Pr. Mishra

📜 License
This project is open-source and available under the MIT Lice

