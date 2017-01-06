const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');  //để dùng được eventually
chai.use(chaiAsPromised);

const pgStructure = require('pg-structure');
const _ = require('lodash');

const Sequelize = require('sequelize');
const db = require('../db');
const config = require('../config');

chai.use(chaiAsPromised);


const {Project, Task} = require('../model_project_task');
const Person = require('../model_person');
const {Student, Class} = require('../model_student_class');


const sync_promise = db.sync({force: true}).then(_ => {
    return true;
}).catch(_ => {
    return false;
});

const check_table_promise = pgStructure(config, [config.schema]).then(database => {
   const tables = database.schemas.get(config.schema).tables;  // Map of Table objects.
   const table_names = Array.from(tables.keys());
   return _.difference(['person', 'project', 'task', 'student', 'class', 'student_class'], table_names).length;
});


describe('Synchronize from model to database schema', () => {
  it('It should sync successfully', () => {
    return sync_promise.should.eventually.equal(true);
  });



  it('Database after sync should have table project, task, student, class, student_class', () => {
    return check_table_promise.should.eventually.equal(0);
  })
});