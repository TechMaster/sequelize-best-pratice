/**
 * Created by techmaster on 1/5/17.
 */
const datefns = require('date-fns');  //Thư viện xử lý thời gian
const {Project, Task} = require('./model_project_task');

Project
  .create({
    title: 'Smith & Nephew',
    description: 'Outsourcing Project',
    status: 'processed',       //Kiểu Enum
    tags: ['iOS', 'CoreData']  //Kiểu Array
  })
  .then(function (project) {
    console.log(project.get('id'));
    console.log(project.get('title'));
    console.log(project.get('tags'));
  })
  .catch(function (error) {
    console.log(error.errors);
  });

let p = Project.findOne(
  {
    where: {
      title: {
        $like: '%ssSmith%'
      }
    }
  });


//Nếu tìm được thì sẽ cập nhật trường description
p.then(function (project) {
  if (project) {
    project.update({description: 'Dự án gia công'});
    return project.get('id');  //trả về id của project
  } else {
    return -1;
  }
}).then(function (project_id) {  //tiếp đó tạo task
  Task.create({
      title: 'Coding',
      deadline: datefns.addDays(new Date(), 100),
      is_done: false,
      project_id: project_id
    }
  ).then(function (task) {
    console.log('Task is created ', task.title);
  })
});