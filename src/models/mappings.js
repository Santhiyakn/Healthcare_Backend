import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PatientDoctorMapping = sequelize.define('PatientDoctorMapping', {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'patientId field is required.'
      }
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'doctorId field is required.'
      }
    }
  }
});

// Associations
PatientDoctorMapping.associate = (models) => {
  PatientDoctorMapping.belongsTo(models.Patient, {
    foreignKey: 'patientId',
    onDelete: 'CASCADE'
  });
  PatientDoctorMapping.belongsTo(models.Doctor, {
    foreignKey: 'doctorId',
    onDelete: 'CASCADE'
  });
};

export default PatientDoctorMapping;
