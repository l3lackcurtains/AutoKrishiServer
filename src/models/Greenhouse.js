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

  // TODO: Association with user
  /* 
  Model.associate = models => {
    this.Companies = this.belongsToMany(models.Company, { through: 'GreenhouseCompany' });
  };
  */

  return Model;
};

export default Greenhouse;
