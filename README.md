# Remittance Corridor Engine

A full-stack web application for managing and visualizing remittance corridors between countries.  
The system allows users to create, view, update, and delete countries, corridors, rates, and transactions.

This project was built as part of a technical challenge to demonstrate:
- Data modeling and relationships
- RESTful API design
- Full CRUD operations
- Frontend–backend integration

---

## Tech Stack

### Backend
- Python
- Flask
- SQLAlchemy
- Flask-Migrate
- Flask-Bcrypt
- SQLite (development)

### Frontend
- React
- React Router
- Fetch API

---

## Features

- Manage Countries (CRUD)
- Manage Corridors (from one country to another)
- Assign Rates to Corridors
- Record Transactions per Corridor
- User model with secure password hashing
- RESTful API
- Clean component-based React frontend
- Navigation with React Router
- Basic Authentication
  - User registration with email validation
  - Secure password hashing using Flask-Bcrypt
  - Login via password verification
  - Foundation for protecting API routes

---

## Project Structure

remittance-corridor-engine/
│
├── server/
│ ├── app.py
│ ├── models.py
│ ├── routes.py
│ ├── seed.py
│ └── migrations/
│
└── client/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
└── package.json

---

## Setup Instructions

### Backend
```bash
cd server
pipenv install
pipenv shell
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
python seed.py
python app.py
```
The API will run at:
http://127.0.0.1:5555

### Frontend
```bash
cd client
npm install
npm start
```
The frontend will run at:
http://localhost:5173

---

## API Endpoints
- GET /countries

- POST /countries

- PATCH /countries/:id

- DELETE /countries/:id
(Similar endpoints exist for corridors, rates, and transactions.)

---

## Deployment
This application is fully deployed and live on the internet:

### Live Applications
- **Frontend (Vercel):** https://remittance-corridor-frontend.vercel.app
- **Backend API (Render):** https://remittance-corridor-engine.onrender.com

### Project Structure
- `/client` - React frontend (deployed to Vercel)
- `/server` - Flask backend (deployed to Render)

### Deployment Details
- **Frontend:** React app deployed on Vercel
- **Backend:** Flask API with SQLite database deployed on Render
- **Database:** SQLite (for demo), ready for PostgreSQL upgrade

### Environment Variables (Production)
- `DATABASE_URL`: SQLite database connection
- `SECRET_KEY`: Secure secret for sessions
EOF

## MIT License
MIT License © 2026 Cheryl Mbani  

You are free to use, copy, modify, and distribute this project for any purpose.  
This software is provided “as is”, without warranty of any kind.  
The author is not liable for any damages arising from its use.





## Deployment Verification
- ✅ Frontend: Auto-deploy from main branch via Vercel
- ✅ Backend: Manual deploy from main branch via Render
- ✅ CI/CD: Vercel auto-deploys on git push to main
- Test timestamp: Mon Jan 12 05:13:21 PM EAT 2026
