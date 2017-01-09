//Hãy chạy InsertOneMany.js trước để điền dữ liệu vào Project - Task

const db = require('./models');


//Demo delete cascade, xóa Project sẽ xóa tất cả các task đi theo nó
const deleteProject = db.Project.destroy({where: {} }).then(() => {
    db.Task.count().then (count => {
      console.log("Project is deleted, number of tasks should be zero ", count);
    });
  }
);
