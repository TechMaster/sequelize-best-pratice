/**
 * Created by techmaster on 1/5/17.
 */
const Sequelize = require('sequelize');
const db = require('./config');


const Project = db.define('project', {
  id: {type: Sequelize.BIGINT, primaryKey: true, defaultValue: Sequelize.fn('util.id_generator')},
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true  //Tạo unique constrain
  },
  description: Sequelize.TEXT,
  status: Sequelize.ENUM('create', 'pending', 'processed', 'rejected'),
  tags: Sequelize.ARRAY(Sequelize.TEXT),
},{
  schema: 'cms',
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});



const Task = db.define('task', {
  id: {type: Sequelize.BIGINT, primaryKey: true, defaultValue: Sequelize.fn('util.id_generator')},
  title: Sequelize.TEXT,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE,
  is_done: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
},{
  schema: 'cms',
  timestamps: false,
  paranoid: true,
  underscored: true,
  freezeTableName: true,
});

//Define relationships
Project.hasOne(Task);
Task.belongsTo(Project);  //tạo foreign key project_id ở Task


module.exports = {Project, Task};
