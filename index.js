// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const db = {};



db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = require('./employee.js')(sequelize, Sequelize);

module.exports = db;
