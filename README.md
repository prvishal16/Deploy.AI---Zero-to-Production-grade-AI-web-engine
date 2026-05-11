# 🚀 AI Website Builder (Full SaaS Platform)

A powerful AI-driven website builder built with the MERN stack that allows users to generate, edit, manage, and deploy websites using AI.

---

## 🌟 Overview

This is a complete SaaS-based AI platform where users can:

* Generate websites using AI prompts
* Edit websites in real-time
* Save and manage projects
* Authenticate securely using Google
* Deploy websites live

---

## ⚡ Core Features

### 🧠 AI Features

* AI-based website generation (OpenRouter / Groq)
* Prompt-to-website conversion
* Smart content generation

---

### 🔐 Authentication & User System

* Google Authentication (OAuth 2.0)
* Secure Login / Signup system
* JWT-based session management

---

### 👤 User Dashboard

* Personal dashboard for each user
* View all created websites
* Manage & edit projects

---

### 💾 Project Management

* Save generated websites
* Update / delete projects
* Persistent storage (MongoDB)

---

### 🌐 Deployment System

* Deploy generated websites live
* Instant preview & hosting capability

---

### 📊 Analytics & Tracking

* Track user activity
* Usage analytics
* API usage monitoring

---

### 💳 Payment Integration

* Stripe / Razorpay integration
* Pricing plans system
* Subscription-based access

---

## 🛠️ Tech Stack

### 💻 Frontend

* React.js
* JavaScript (ES6+)
* Tailwind CSS / CSS
* React Icon
* Google Auth
* 


### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB (Mongoose)

### 🔐 Authentication

* Google OAuth 2.0
* JWT (JSON Web Tokens)

### 🧠 AI APIs

* OpenRouter API
* Groq API

### 💳 Payments

* Stripe / Razorpay

---

## 🧩 Project Architecture

project1/
├── Backend/
│   ├── config/
│   ├── controller/
│   ├── routes/
│   ├── models/
│   └── index.js
│
└── Frontend/
└── React App

---

## 🔄 Application Flow

1. User logs in via Google Authentication
2. User enters a prompt
3. Frontend sends request to backend
4. Backend calls AI API (OpenRouter/Groq)
5. AI generates website
6. User edits website in real-time
7. User saves project to database
8. User deploys website live

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/shekhbasir/AI-website-Builder-final-project
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm start
```

Create `.env` file:

```env
OPENROUTER_API_KEY=your_api_key_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
cd basir
npm install
npm run dev or npm start
```

---

## 🔐 Environment Variables

| Variable             | Description                 |
| -------------------- | --------------------------- |
| OPENROUTER_API_KEY   | AI API key                  |
| GOOGLE_CLIENT_ID     | Google OAuth Client ID      |
| GOOGLE_CLIENT_SECRET | Google OAuth Secret         |
| JWT_SECRET           | Authentication token secret |

---

## 📸 Screenshots
<img width="1920" height="1008" alt="Screenshot 2026-03-15 210409" src="https://github.com/user-attachments/assets/bbe24eca-d4d8-48a1-b7b7-a6b98bd846a0" /> </br>
<img width="960" height="478" alt="Screenshot 2026-03-15 210533" src="https://github.com/user-attachments/assets/ee4d6b0e-439f-437c-9176-67f7b1435e20" />
</br>
<img width="274" height="298" alt="Screenshot 2026-03-15 210602" src="https://github.com/user-attachments/assets/2168c7d3-de44-410a-a237-2b40d7353baa" />
</br>
<img width="960" height="478" alt="Screenshot 2026-03-15 210514" src="https://github.com/user-attachments/assets/305e7840-3869-4057-9143-ff307678c792" />
</br>
<img width="960" height="479" alt="Screenshot 2026-03-15 210802" src="https://github.com/user-attachments/assets/ddc5ca3c-49ba-4754-8366-b89fc25d7c1e" />
</br>
<img width="941" height="477" alt="Screenshot 2026-03-15 210634" src="https://github.com/user-attachments/assets/33b99f14-0430-4740-b20c-a88ff9892eaa" />
</br>
<img width="960" height="479" alt="Screenshot 2026-03-15 210920" src="https://github.com/user-attachments/assets/da5c8ada-d25f-4a40-9484-327ae8a32de5" />



---

## 🚀 Future Scope

* Drag-and-drop website builder
* AI design suggestions
* Multi-user collaboration
* Custom domain support

---

## 👨‍💻 Author

**Sheikh Basir**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
