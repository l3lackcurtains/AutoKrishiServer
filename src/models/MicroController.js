const MicroController = (sequelize, DataTypes) => {
  const Model = sequelize.define('MicroController', {
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    locationLat: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    locationLng: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });

  /* eslint-disable */
  Model.associate = function(models) {
    this.hasMany(models.Sensor, { foreignKey: 'mid' });
  };

  return Model;
};

export default MicroController;
