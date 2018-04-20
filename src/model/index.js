import Sequelize from 'sequelize'

// Database setup
const sequelize = new Sequelize('servertest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


const Transaction = sequelize.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Timestamps
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  greenhouseID: {
    type: Sequelize.INTEGER
  },
  atmTemp: {
    type: Sequelize.INTEGER
  },
  atmHumidity: {
    type: Sequelize.INTEGER
  },
  soilMoisture: {
    type: Sequelize.INTEGER
  }
});

export { Transaction }