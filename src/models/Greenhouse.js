const Greenhouse = (sequelize, DataTypes) => {
  const Model = sequelize.define('Greenhouse', {
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
    this.hasMany(models.MicroController, { foreignKey: 'gid' });
  };

  return Model;
};

export default Greenhouse;
