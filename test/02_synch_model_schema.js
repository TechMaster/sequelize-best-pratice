const pgStructure = require('pg-structure');
const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');  //để dùng được eventually
chai.use(chaiAsPromised);

const _ = require('lodash');
const db = require('../models');
const datefns = require('date-fns');  //Thư viện xử lý thời gian

chai.use(chaiAsPromised);


//Synchronize from model to database schema
/*const sync_promise = db.sequelize.sync({force: true}).then(_ => {
  return true;
}).catch(_ => {
  return false;
});*/

const config = db.sequelize.config;

//Check tables in database if it is created correctly

describe('Synchronize from model to database schema', function () {

  // before (function (done) {
    
  // });

  it('vao day', () => {
    return db.sequelize.sync({force: true}).then(() => {
      console.log('sucessed');
    }).catch((err) => {
      console.log(err);
    });
  });

 /* it('It should sync successfully', function () {
    return sync_promise.should.eventually.equal(true);
  });*/

  it('Database after sync should have table project, task, student, class, student_class', function () {
    const check_table_promise = pgStructure({
      database: config.database,
      user: config.username,
      password: config.password,
      host: config.host,
      port: config.port
    }, db.sequelize.custom_schema).then(database => {
      const tables = database.schemas.get(db.sequelize.custom_schema).tables;  // Map of Table objects.
      const table_names = Array.from(tables.keys());
      return _.difference(['person', 'project', 'task', 'student', 'class', 'student_class'], table_names).length;
    });
    check_table_promise.should.eventually.equal(0);
  });

});