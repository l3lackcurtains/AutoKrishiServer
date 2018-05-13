const Sensor = (sequelize, DataTypes) => {
  const Model = sequelize.define('Sensor', {
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    type: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });
  /* eslint-disable */
  Model.associate = function(models) {
    this.hasMany(models.Record, { foreignKey: 'sid' });
  };

  return Model;
};

export default Sensor;
