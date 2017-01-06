/**
 * Created by techmaster on 1/5/17.
 */
const Sequelize = require('sequelize');
const db = require('./config');
const {Project, _} = require('./model_project_task');

const Person = db.define('person', {
  id: {type: Sequelize.BIGINT, primaryKey: true, defaultValue: Sequelize.fn('util.id_generator')},
  name: Sequelize.TEXT
},{
  schema: 'cms',
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});

Person.hasOne(Project);  //Tạo foreign_key person_id ở bảng project

module.exports = Person;