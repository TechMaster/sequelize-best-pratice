const Sequelize = require('sequelize');

module.exports =  new Sequelize('payroll', 'postgres', 'abc', {
    host: 'payroll',
    dialect: 'postgres',
   // searchPath: 'cms',  //Set to schema named cms
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});