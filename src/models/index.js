import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

const db = {};
// Database setup
const sequelize = new Sequelize('servertest', 'madhav', 'madhav7', {
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

// Add all models in the folder
fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
