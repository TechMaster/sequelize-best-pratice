const Sequelize = require('sequelize');
const config = require('./config.js');


module.exports = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    schema: config.schema
  });
