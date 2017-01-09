const fs        = require("fs");
const path      = require("path");
const env       = process.env.NODE_ENV || "development";
const config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

const Sequelize = require("sequelize");

const db        = {};
let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL,config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

if (typeof config.schema  !== 'undefined') {
  sequelize.custom_schema = config.schema;
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;