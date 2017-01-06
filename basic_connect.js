/**
 * Created by techmaster on 1/5/17.
 */

const sequelize = require('./config');
sequelize.authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });