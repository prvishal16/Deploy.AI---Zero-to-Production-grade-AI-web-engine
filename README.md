<div align="center">

# ⚡ Deploy.AI

### Zero to Production AI Web Forge & Launch Engine

[![React](https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Describe your idea → AI generates → You deploy. In seconds.**

[Live Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🚀 What is Deploy.AI?

**Deploy.AI** is a full-stack AI SaaS platform that transforms natural language prompts into fully functional, production-ready websites — complete with a VS Code-style live editor and one-click deployment powered by the Netlify REST API.

> *"You type. AI builds. You deploy."*

---

## ✨ Core Features

### 🤖 AI Website Generation
- Converts natural language prompts into complete HTML/CSS/JS websites
- Powered by **OpenRouter LLM API** (Mistral, LLaMA, and more)
- Generates fully responsive, production-ready code instantly

### 🖥️ VS Code-Style Live Editor
- **Monaco Editor** — the same engine powering VS Code
- Real-time live preview panel updates as you type
- AI chat panel — ask AI to modify your website on the fly
- File explorer sidebar, syntax highlighting, minimap

### 🚀 3-Tier Deployment Pipeline
| Priority | Method | Requirement |
|----------|--------|-------------|
| 1st | Backend API deploy | Backend running |
| 2nd | **Netlify REST API** with SHA-1 file digest | `VITE_NETLIFY_TOKEN` |
| 3rd | Blob URL instant preview | Nothing — always works! |

### 💳 Credit-Based SaaS System
- Free plan: 10 credits, 2 websites
- Pro plan: 50 credits, 4 websites
- Usage tracked per user

### 🔐 Authentication
- Google OAuth 2.0 via Firebase
- JWT-based session management
- Secure credential handling

### 📊 User Dashboard
- View all generated websites with live iframe previews
- Deploy, edit, and manage projects
- Plan badge and credit display

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **AI** | OpenRouter LLM API |
| **Editor** | Monaco Editor |
| **Deployment** | Netlify REST API, Web Crypto API (SHA-1) |
| **Auth** | Firebase OAuth 2.0, JWT |

---

## 📁 Project Structure

```
Deploy.AI/
├── Frontend/
│   └── basir/
│       ├── src/
│       │   ├── components/       # Login, Profile
│       │   ├── pages/            # Home, Dashboard, Editor, Pricing, Profile
│       │   ├── redux/            # userSlice (state management)
│       │   └── services/         # mockData, mockInterceptor
│       ├── hooks/
│       │   └── Fetchdata.jsx
│       └── index.html
│
└── Backend/
    ├── config/                   # OpenRouter config
    ├── controllers/              # Auth, Website controllers
    ├── models/                   # User, Website schemas
    ├── routes/                   # API routes
    └── index.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenRouter API key → [openrouter.ai](https://openrouter.ai)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/deploy-ai.git
cd deploy-ai
```

---

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
MONGO_URI=your_mongodb_atlas_uri
OPENROUTER_API_KEY=your_openrouter_key
JWT_SECRET=your_jwt_secret_here
PORT=8000
```

Start backend:
```bash
node index.js
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend/basir
npm install
```

Create `Frontend/basir/.env`:

```env
VITE_NETLIFY_TOKEN=your_netlify_token   # optional — for live deploy
VITE_MOCK_MODE=true                      # enable offline testing
```

Start frontend:
```bash
npm run dev
```

---

### 4️⃣ Test Without Backend (Mock Mode)

The app includes a **complete mock system** — login, dashboard, editor all work without any backend:

| Account | Email | Password | Plan |
|---------|-------|----------|------|
| 🟢 Free User | alex@test.com | (click card) | Free |
| 🟣 Pro User | sara@test.com | (click card) | Pro |

Just click the test account cards on the login screen!

---

## 🔄 Application Flow

```
User enters prompt
      ↓
Frontend → Backend → OpenRouter LLM API
      ↓
AI generates HTML/CSS/JS
      ↓
Monaco Editor (live edit)
      ↓
Deploy → Netlify REST API → Live URL 🌐
```

---

## 🌐 Deployment

### Frontend → Vercel
```bash
cd Frontend/basir
# Add vercel.json with rewrites for React Router
vercel deploy
```

Add environment variable on Vercel:
```
VITE_NETLIFY_TOKEN = your_netlify_token
```

### Backend → Render / Railway
Set environment variables:
```
MONGO_URI, OPENROUTER_API_KEY, JWT_SECRET, PORT
```

---

## 🔐 Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `MONGO_URI` | Backend | MongoDB Atlas connection string |
| `OPENROUTER_API_KEY` | Backend | LLM API key |
| `JWT_SECRET` | Backend | JWT signing secret |
| `VITE_NETLIFY_TOKEN` | Frontend | Netlify personal access token |
| `VITE_MOCK_MODE` | Frontend | Enable offline mock mode |

---

## 🚀 Future Scope

- [ ] Drag-and-drop website builder
- [ ] Multi-page website generation
- [ ] Custom domain support
- [ ] Team collaboration
- [ ] Export as ZIP download
- [ ] AI design suggestions

---

## 👨‍💻 Author

**P R Vishal**

> *Built with ❤️ using MERN Stack + OpenRouter LLM API*

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub — it means a lot!

---

<div align="center">
  <sub>© 2026 P R Vishal — Zero to Production AI Web Forge & Launch Engine. All rights reserved.</sub>
</div>
