import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db.js';


const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'User name is required.'
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail:  {
        msg: 'Email must be valid.'
      } ,
      notEmpty: {
        msg: 'User  email is required.'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'User password is required.'
      }
    }
  }
}, {
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        if (user.password.length > 15 || user.password.length < 8) {
          throw new Error('Password must be between 8 and 15 characters.');
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
}
);

export default User;
