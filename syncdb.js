const Promise = require("bluebird");

const Sequelize = require('sequelize');
const db = require('./db');
const {Project, Task} = require('./model_project_task');
const Person = require('./model_person');
const {Student, Class} = require('./model_student_class');

//https://github.com/sequelize/sequelize/issues/6027
//Cách này gây lỗi do bảng Task có thể tạo trước Project. Khi tạo reference sẽ gây lỗi relation does not exist
//Project.sync({force: true});
//Task.sync({force: true});


//Cần phải đồng bộ hóa theo thứ tự project trước sau đó là Task
/*
Project.sync({force: true}).then(function () {
  Task.sync({force: true});
}).catch(function (error) {
  console.log(error);
});*/

/*const models = [Person, Project, Task, Student, Class];

models.map(model => model.sync(true));
Cách này sẽ thiếu bảng trung gian ví dụ như student_class
*/

//Hoặc dùng cách này để động bộ tất cả bảng
db.sync({force: true}).then(function () {
  console.log('Database schema is synchronized successfully');
}).catch(function (error) {
  console.log('Error when synchronizing db ', error);
});
