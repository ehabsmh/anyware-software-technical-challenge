# Anyware Software - Full Stack Challenge

This project is a **Full Stack demo application** built for the Anyware Software technical challenge.

The goal is to simulate a small student portal where a user can log in (without username/password), view **announcements**, and take **quizzes**.

---

## 📂 Project Structure

````bash
anyware-software-technical-challenge/
│
├── backend/                  # Express + TypeScript + MongoDB
│   ├── src/
│   │   ├── controllers/      # Controllers for handling requests
│   │   ├── database/         # Database layer (connection + entity classes + seed)
│   │   ├── interfaces/       # TypeScript interfaces
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Logger and helpers
│   │   └── index.ts          # App entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # React/Next.js (to be built later)
│   ├── components/           # UI Components
│   ├── pages/                # Pages (Announcements, Quizzes, Login)
│   └── ...
│
└── README.md


---

## ⚙️ Technologies Used

### Backend

- **Node.js** + **Express.js** with **TypeScript**
- **MongoDB** with Mongoose
- **JWT** for authentication (simple demo)
- **dotenv** for environment variables
- **chalk** for colorful console logging

### Frontend

- **React.js** with TypeScript
- **TailwindCSS** for styling
- (To be implemented step by step)

---

## 🚀 Backend Progress (Done ✅)

- Setup Express + TypeScript + MongoDB connection
- Created models:
  - `Semester`
  - `Course`
  - `Announcement`
  - `Quiz`
- Added **database seeding** (`npm run seed`) with Physics 02 example data:
  - 1 Semester
  - 1 Course
  - 4 Announcements
  - 1 Quiz with 3 questions
- Added **colored logger** for clean console output
- Added health check route (`/api/health`)

---

## 🎯 Next Steps (Planned)

- Implement API endpoints:
  - **Announcements** (latest, all, by id)
  - **Quizzes** (list, details, submit answers)
  - **Auth** (dummy login, no password)
- Connect frontend with backend
- Display announcements & quizzes in UI

---

## ▶️ How to Run the Project

### 1. Backend

```bash
cd backend
npm install
npm run dev        # start backend server on http://localhost:5000
npm run seed       # seed the database with demo data
````

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # start frontend on http://localhost:3000
```
