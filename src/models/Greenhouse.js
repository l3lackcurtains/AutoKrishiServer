const Greenhouse = (sequelize, DataTypes) => {
  const Model = sequelize.define('Greenhouse', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
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

  return Model;
};

export default Greenhouse;
