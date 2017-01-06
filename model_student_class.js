/**
 * Created by techmaster on 1/5/17.
 */
const Sequelize = require('sequelize');
const db = require('./config');

const Student = db.define('student', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true},
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true  //Tạo unique constrain
  }
},{
  schema: 'cms',
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});


const Class = db.define('class', {
  id: {   //Sequelize không hỗ trợ kiểu Serial
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true},
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true  //Tạo unique constrain
  }
},{
  schema: 'cms',
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});


//Define relationships
Student.belongsToMany(Class, {through: 'student_class'});
Class.belongsToMany(Student, {through: 'student_class'});  //tạo foreign key project_id ở Task

module.exports = {Student, Class};