# Node.js Assignment: Building a Healthcare Backend

## Project Overview

This project is a backend service for a healthcare system built using **Node.js**, **Express.js**, **PostgreSQL**, and **Sequelize ORM**. It provides RESTful APIs for:

- User Authentication (Login & Signup)
- Managing Patients
- Managing Doctors
- Mapping Patients to Doctors

---

##  Technologies Used

- **Node.js** (Express.js)
- **PostgreSQL**
- **Sequelize** ORM
- **JWT** (JSON Web Token) for Authentication
- **dotenv** for environment configuration

---

##  Features

###  Authentication
- `POST /api/auth/signup` – Create a new user
- `POST /api/auth/login` – Login and receive a JWT token

###  Doctor APIs
- `POST /api/doctors` – Create a new doctor
- `GET /api/doctors` – Get all doctors
- `GET /api/doctors/:id` – Get doctor by ID
- `PUT /api/doctors/:id` – Update doctor details
- `DELETE /api/doctors/:id` – Delete a doctor

###  Patient APIs
- `POST /api/patients` – Create a new patient
- `GET /api/patients` – Get all patients
- `GET /api/patients/:id` – Get patient by ID
- `PUT /api/patients/:id` – Update patient details
- `DELETE /api/patients/:id` – Delete a patient

###  Patient-Doctor Mapping
- `POST /api/mappings` – Map a patient to a doctor
- `GET /api/mappings` – Get all mappings

---

##  Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Santhiyakn/Healthcare_Backend.git
cd Healthcare_Backend
