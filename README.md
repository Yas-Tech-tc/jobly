# Jobly — Full Stack Job Board

A full-stack job board application where employers post jobs and candidates browse, search, filter, and apply. Built with React, Node.js, Express, MongoDB, and JWT authentication.

🔗 **Live demo:** *(coming soon)*

---

## Features

- 🔍 Real-time job search by title or company
- 🏷️ Filter jobs by category (Tech, Finance, Marketing, Healthcare)
- 🔐 User authentication with JWT — signup and login
- 👔 Role-based access — employers and job seekers have separate permissions
- 📝 Employers can post new job listings through a protected form
- 📄 Job detail page with full description and application form
- 📱 Fully responsive — works on desktop and mobile
- ☁️ Data persists in MongoDB Atlas

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 / CSS3 | Semantic markup, Flexbox, CSS Grid |
| JavaScript ES6+ | DOM manipulation, Fetch API |
| React | UI components, hooks, routing |
| React Router | Client-side navigation |
| Vite | Build tool and dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | Schema modeling and queries |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |

### Infrastructure
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| Vercel | Frontend hosting *(coming soon)* |
| Railway | Backend hosting *(coming soon)* |

---

## Project Structure

```
jobly/
├── v1-html/                  # Plain HTML/CSS/JS version
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── images/
│
├── v2-react/                 # React frontend
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── components/
│       │   ├── JobCard.jsx
│       │   ├── JobList.jsx
│       │   ├── FilterBar.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── JobDetailPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── SignupPage.jsx
│       │   └── PostJobPage.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── v3-server/                # Express backend
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── Job.js
    │   └── User.js
    ├── routes/
    │   └── auth.js
    ├── seed.js
    └── server.js
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/jobly.git
cd jobly
```

### 2. Setup the backend

```bash
cd v3-server
npm install
cp .env.example .env
```

Fill in your values in `.env`, then seed the database:

```bash
node seed.js
```

Start the server:

```bash
node server.js
```

Backend runs on `http://localhost:3001`

### 3. Setup the frontend

```bash
cd ../v2-react
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API Reference

### Jobs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | Get all jobs | No |
| `GET` | `/api/jobs?category=Tech` | Filter by category | No |
| `GET` | `/api/jobs?search=developer` | Search by title or company | No |
| `GET` | `/api/jobs/:id` | Get one job | No |
| `POST` | `/api/jobs` | Create a job | Employer only |
| `DELETE` | `/api/jobs/:id` | Delete a job | Yes |

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and get JWT token | No |
| `GET` | `/api/auth/me` | Get current user | Yes |

### Authentication header format

```
Authorization: Bearer <your_jwt_token>
```

---

## Architecture

```
Browser (React)
      ↓  HTTP requests
Express Server (Node.js) — Port 3001
      ↓  Mongoose queries
MongoDB Atlas (Cloud database)
```

React never communicates with MongoDB directly. All data goes through the Express API which handles validation, authentication, and business logic before touching the database.

---

## Environment Variables

### Backend (`v3-server/.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Server port (default: 3001) |
| `JWT_SECRET` | Secret key for signing JWT tokens |

### Frontend (`v2-react/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL |

---

## Roadmap

- [ ] Deploy to production
- [ ] Integrate real-time job listings from external API
- [ ] Saved jobs for job seekers
- [ ] Application tracking for employers
- [ ] Pagination
- [ ] Email notifications on application

---

## Author

**Yasmine**
- GitHub: [@Yas-Tech-tc](https://github.com/Yas-Tech-tc)

---

## License

MIT