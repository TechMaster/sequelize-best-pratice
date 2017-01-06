const Sequelize = require('sequelize');
const db = require('./config');
const {Project, Task} = require('./model_project_task');
const Person = require('./model_person');

const {Student, Class} = require('./model_student_class');

//https://github.com/sequelize/sequelize/issues/6027
//Cách này gây lỗi do bảng Task có thể tạo trước Project. Khi tạo reference sẽ gây lỗi relation does not exist
//Project.sync({force: true});
//Task.sync({force: true});


//Cần phải đồng bộ hóa theo thứ tự project trước sau đó là Task
/*
Project.sync({force: false}).then(function () {
  Task.sync({force: false});
}).catch(function (error) {
  console.log(error);
});*/



//Hoặc dùng cách này để động bộ tất cả bảng
db.sync({force: true});