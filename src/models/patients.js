import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Patient name is required.'
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Age must be a positive number.'
      },
      isInt: {
        msg: 'Age must be an integer.'
      }
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['Male', 'Female', 'Other']],
        msg: 'Gender must be Male, Female, or Other.'
      }
    }
  },
  disease: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Disease field is required.'
      }
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: {
        args: /^[0-9]{10}$/,
        msg: 'Phone number must be a valid 10-digit number.'
      }
    }
  },
  lastVisitedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: {
        msg: 'Last visited date must be a valid date.'
      }
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Patient.associate = (models) => {
  Patient.hasMany(models.PatientDoctorMapping, { foreignKey: 'patientId', onDelete: 'CASCADE' });
};


export default Patient;
