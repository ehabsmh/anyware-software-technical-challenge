# Anyware Software - Full Stack Challenge

This project is a **Full Stack demo application** built for the Anyware Software technical challenge.

The goal is to simulate a small student portal where a user can log in (without username/password), view **announcements**, and take **quizzes**.

---

## 📂 Project Structure

```bash
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
```

---

✨ Strengths & Highlights

## Backend

- **Clean architecture**: Separated into controllers, services, models, and routes for maintainability.

- **Service layer (OOP approach)**: Business logic is encapsulated in service classes (e.g., AnnouncementService) with clear responsibilities.

- **Centralized models**: Collected in a single models/index.ts file to avoid Mongoose schema registration errors and simplify imports.

- **Custom error handling**: Implemented AppError class + global errorHandler middleware for consistent error responses.

- **Async error wrapper**: Added asyncHandler utility to remove repetitive try/catch in controllers and keep them clean.

- **Database seeding**: Automatic seeding with realistic demo data (Semester, Course, Announcements, Quiz).

- **Scalable structure**: Easy to extend with new entities (e.g., Users, Auth) without breaking the current design.

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
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # start frontend on http://localhost:3000
```
