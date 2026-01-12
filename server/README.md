# Backend – Remittance Corridor Engine

This is the backend API for the Remittance Corridor Engine project.  
It handles CRUD operations for countries, corridors, rates, transactions, and user authentication.

---

## Tech Stack

- Python
- Flask
- SQLAlchemy
- Flask-Migrate
- Flask-Bcrypt
- SQLite (development)

---

## Features

- Manage Countries, Corridors, Rates, and Transactions (CRUD)
- User registration and authentication
- Email validation and password hashing
- RESTful API endpoints
- Data relationships enforced with foreign keys
- Seed script to populate sample data

---

## Project Structure
server/
│
├── .venv/ # Python virtual environment
├── instance/ # Optional Flask instance folder (config files)
├── migrations/ # Database migrations
├── app.py # Flask app entry point
├── models.py # SQLAlchemy models
├── seed.py # Script to populate sample data
├── Pipfile # Python dependencies
├── Pipfile.lock # Locked versions of dependencies
├── README.md # This file

---

## Setup Instructions

### Initial dependencies
```bash
cd server
pipenv install
pipenv shell
```

### Environmental variables
```bash
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
```

### Database setup
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### Seed the database
```bash
python seed.py
```

### Run the server
```bash
python app.py
```

the API runs at:
http://127.0.0.1:5555

---

## API Endpoints(Sample)
- GET /countries – list all countries

- POST /countries – add a new country

- PATCH /countries/:id – update a country

- DELETE /countries/:id – delete a country

(Similar endpoints exist for corridors, rates, and transactions.)

---

## Deployment
This application is fully deployed and live on the internet:

### Live Applications
- **Backend API (Render):** https://remittance-corridor-engine.onrender.com

## Author
Cheryl Mbani
Junior Software Developer

## License
MIT License © 2026 Cheryl Mbani
You are free to use, copy, modify, and distribute this project.
The software is provided “as is” without any warranty

