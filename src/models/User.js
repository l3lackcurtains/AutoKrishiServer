import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import config from '../utils/config';

const User = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      notEmpty: true,
      allowNull: true,
      unique: true
    }
  });

  /* eslint-disable */
  Model.associate = function(models) {
    this.hasMany(models.Greenhouse, { foreignKey: 'uid' });
  };

  Model.beforeSave(async user => {
    if (user.changed('password')) {
      bcrypt.hash(user.password, null, null, (err, hash) => {
        if (err) throw new Error(err);
        user.password = hash; // eslint-disable-line
        return this;
      });
    }
  });
  Model.prototype.comparePassword = async function(pass) {
    if (!this.password) throw new Error('Password not set.');
    const compare = bcrypt.compareSync(pass, this.password);
    return compare;
  };

  Model.prototype.getJWT = function() {
    return `JWT ${jwt.sign({ uid: this.id, firstname: this.firstname }, config.secret, {
      expiresIn: 1204800
    })}`;
  };

  Model.prototype.toWeb = () => {
    const json = this.toJSON();
    return json;
  };

  /* eslint-enable */

  return Model;
};

export default User;
