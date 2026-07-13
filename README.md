# 🚀 Job Tracker Pro

<p align="center">
  <b>A Full-Stack Job Application Tracking System built with React, Django REST Framework, and PostgreSQL.</b>
  <br><br>
  Track applications • Manage interviews • Upload resumes • Analyze progress
</p>

---

## 🌐 Live Demo

### Frontend
👉 https://YOUR-VERCEL-URL.vercel.app

### Backend API
👉 https://YOUR-RENDER-URL.onrender.com

---

## 📌 Overview

Job Tracker Pro is a modern web application designed to help job seekers organize and manage their job search efficiently.

The application allows users to securely manage job applications, upload resumes, monitor interview schedules, analyze application statistics, and keep all job-related information in one place.

---

# ✨ Features

### 🔐 Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes

### 💼 Job Management
- Add Job Applications
- Edit Job Details
- Delete Applications
- View Complete Job History

### 📊 Dashboard
- Total Applications
- Applied Jobs
- Interview Count
- Upcoming Interviews
- Rejected Jobs
- Offers Received

### 🔍 Search & Filter
- Search by Company
- Search by Job Title
- Filter by Status

### 📄 Resume Management
- Upload Resume
- Preview Resume
- Download Resume

### 📈 Analytics
- Application Statistics
- Status Summary
- Recent Applications

### 🎨 UI Features
- Responsive Design
- Mobile Friendly
- Loading Spinner
- Toast Notifications
- Custom Favicon
- Dynamic Browser Titles

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- React Icons
- React Toastify
- CSS3

## Backend

- Django
- Django REST Framework
- Simple JWT Authentication

## Database

- PostgreSQL

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📂 Folder Structure

```
Job-Tracker-Pro
│
├── frontend
│   ├── public
│   ├── src
│   ├── components
│   ├── pages
│   ├── services
│   ├── styles
│   └── package.json
│
├── backend
│   ├── config
│   ├── jobs
│   ├── media
│   ├── requirements.txt
│   └── manage.py
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/BellamGuruSrikar/Job-Tracker-Pro.git
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
DJANGO_SECRET_KEY=your_secret_key

DEBUG=True

DATABASE_URL=your_database_url

ALLOWED_HOSTS=127.0.0.1,localhost
```

---

## Frontend (.env)

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register/` | Register User |
| POST | `/api/token/` | Login |
| POST | `/api/token/refresh/` | Refresh Token |
| GET | `/api/jobs/` | Get Jobs |
| POST | `/api/jobs/` | Create Job |
| PUT | `/api/jobs/{id}/` | Update Job |
| DELETE | `/api/jobs/{id}/` | Delete Job |

---

# 📸 Screenshots

> Screenshots will be added after the final deployment.

---

# 🎥 Demo Video

Demo video will be added soon.

---

# 🚀 Future Improvements

- Email Notifications
- Calendar Integration
- AI Resume Analyzer
- Interview Reminders
- Dark Mode
- Company Insights
- Job Recommendation System

---

# 👨‍💻 Author

**Bellam Guru Srikar**

GitHub

https://github.com/BellamGuruSrikar

LinkedIn

(Add your LinkedIn Profile URL)

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It motivates me to build more open-source projects.