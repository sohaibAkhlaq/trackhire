<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  
  <br />
  <br />

  <h1 align="center"> TrackHire</h1>

  <p align="center">
    Manage, Track, and Optimize your Job Search beautifully.
  </p>
</div>

---

## 🌟 Overview

**TrackHire** is a modern, production-ready SaaS application built on the **MEAN Stack** (MongoDB, Express, Angular, Node.js). Designed with a stunning, premium aesthetic inspired by leading SaaS products, TrackHire helps professionals keep track of their job applications efficiently.

Say goodbye to messy spreadsheets. TrackHire offers an intuitive Kanban board, comprehensive analytics, and seamless job management with a focus on world-class UX/UI and robust performance.

## ✨ Features

- **🛡️ Secure Authentication**: JWT-based secure user authentication (Login/Register).
- **📊 Interactive Dashboard**: A comprehensive birds-eye view of your job hunt progress.
- **📋 Kanban Board Tracker**: Drag-and-drop job cards across different stages (Saved, Applied, Interview, Offer, Rejected) using Angular CDK.
- **📈 Advanced Analytics**: Real-time animated charts indicating offer rates and response rates.
- **🎨 Premium SaaS Design**: Glassmorphism visuals, smooth micro-animations, neon accents, and a fully polished modern UI powered by Tailwind CSS v4.
- **⚡ Blazing Fast Reactivity**: Built using Angular's bleeding-edge **Zoneless Change Detection** for incredibly smooth and fast rendering.
- **⚙️ RESTful API Engine**: Express 5 and Mongoose 9 backed highly-optimized CRUD operations.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Angular 19+ (Standalone Components, Zoneless Change Detection)
- **Styling**: Tailwind CSS v4, Custom UI Components
- **Routing**: Angular Router
- **Interactions**: Angular CDK (DragDropModule)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB & Mongoose (v9)
- **Security**: JSON Web Tokens (JWT), bcrypt

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas Native URI)
- Angular CLI (`npm install -g @angular/cli`)

### 1. Clone the repository

```bash
git clone https://github.com/sohaibAkhlaq/trackhire.git
cd trackhire
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trackhire
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
# The server will start on http://localhost:5000
```

### 3. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd trackhire-frontend
npm install
```

Start the Angular development server:
```bash
ng serve
# The application will run on http://localhost:4200
```

## 📸 Screenshots & UI Previews
- **Dashboard View**: <img width="1900" height="895" alt="image" src="https://github.com/user-attachments/assets/e381425b-4ed9-46d6-99f1-1fe48717fa49" />

- **Analytics View**: <img width="1869" height="884" alt="image" src="https://github.com/user-attachments/assets/d65a6fd5-b79d-4999-af15-2587729c8e13" />


## Video Link
- https://drive.google.com/file/d/13Q9E5ffqivArwiH6Gg2xkSYpYgxnRhZ1/view?usp=drive_link

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/sohaibAkhlaq/trackhire/issues).

## 📄 License
This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

---
<p align="center">Crafted with ❤️ for modern job seekers.</p>
