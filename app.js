// app.js
import express, { json } from 'express';
import { config } from 'dotenv';
import sequelize from './config/db.js'; // no need for .js extension
import authRoutes  from './routes/auth.js';
import patientRoutes from './routes/patient.js';
import doctorRoutes from './routes/doctor.js';
import mappingRoutes from './routes/mapping.js'




config();

const app = express();
app.use(json());


app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors',doctorRoutes);
app.use('/api/mappings',mappingRoutes)

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Unable to connect to DB:', err);
  });
