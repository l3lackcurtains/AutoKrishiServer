const Record = (sequelize, DataTypes) => {
  const Model = sequelize.define('Record', {
    name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    attribute: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    value: {
      type: DataTypes.STRING,
      notEmpty: true
    }
  });

  return Model;
};

export default Record;
