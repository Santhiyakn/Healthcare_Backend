// models/index.js

import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Import your model definition files
import Doctor from './doctors.js';
import Patient from './patients.js';
import PatientDoctorMapping from './mappings.js';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // or whatever you're using
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.Doctor = Doctor; // ← no () call here
db.Patient = Patient;
db.PatientDoctorMapping = PatientDoctorMapping;

// Run associate methods
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
