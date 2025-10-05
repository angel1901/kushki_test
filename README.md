# 🧱 kushki_test — Backend (NestJS) & Frontend (Next.js + MUI)

This repository contains two independent yet connected applications:

- **`backend/`** — A robust API built with **NestJS 11**, written in TypeScript.
- **`frontend/`** — A modern **Next.js 15** web application built with **React 19** and **Material UI 7 (MUI)**.

You can run each application separately or in parallel for full-stack local development.

---

## 🚀 Tech Stack

### **Backend**
- **Framework:** NestJS 11  
- **Language:** TypeScript  
- **Dependencies:** RxJS, Reflect Metadata  
- **IA:** `@google/genai` integration for Google AI services

### **Frontend**
- **Framework:** Next.js 15 (Turbopack)  
- **UI Library:** Material UI 7 (MUI)  
- **Styling:** Emotion & Styled Components  
- **Language:** TypeScript  
- **HTTP Client:** Axios

---

## ⚙️ Requirements

| Dependency | Minimum Version |
|-------------|----------------|
| Node.js     | 18.18 (LTS recommended) |
| npm         | 9 or higher |
| Git         | Latest |

---

## 📁 Project Structure

```
.
├── backend/          # NestJS API
│   ├── src/
│   ├── test/
│   └── package.json
├── frontend/         # Next.js + MUI Web App
│   ├── src/
│   └── package.json
└── README.md
```

---

## 🧩 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone <repo-url>
cd <repo-name>
```

### 2️⃣ Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Create environment files

Each app should have its own `.env` file (see examples below).

---

## 🌐 Environment Variables

### **Backend (.env)**
```env
# Server
GOOGLE_API_KEY=your_google_api_key
```
The API key is provided by email for security

### **Frontend (.env)**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

---

## 🧠 Development

### **Backend (NestJS)**
```bash
cd backend
npm run start:dev
```
Runs the backend in watch mode (default port: **http://localhost:3000**).


### **Frontend (Next.js + MUI)**
```bash
cd frontend
npm run dev
```

## 🧩 Running Both Apps Together

You can run the backend and frontend simultaneously in separate terminals:

```bash
# Terminal 1
cd backend
npm run start:dev

# Terminal 2
cd frontend
npm run dev
```

Ensure the **frontend `.env`** variable `NEXT_PUBLIC_API_BASE_URL` matches your backend’s URL.


**Author:** ✨ _Angel Ramirez_  
**Version:** `0.1.0`  
**Last Updated:** _October 2025_
