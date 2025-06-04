import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Doctor = sequelize.define('Doctor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'Doctor name is required.' } }
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: { msg: 'Specialization is required.' } }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9]{10}$/,
        msg: 'Phone number must be 10 digits.'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Doctor email is required.' },
      isEmail: {
        msg: 'Email must be valid.'
      }
    }
  }
});

Doctor.associate = (models) => {
  Doctor.hasMany(models.PatientDoctorMapping, { foreignKey: 'doctorId', onDelete: 'CASCADE' });
};
export default Doctor;
