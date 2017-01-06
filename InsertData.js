/**
 * Created by techmaster on 1/5/17.
 */
const Sequelize = require('sequelize');
const datefns = require('date-fns');  //Thư viện xử lý thời gian
//import addDays from 'date-fns/add_days'
const db = require('./config');
const {Project, Task} = require('./model_project_task');

Project
  .create({
    title: 'Smith & Nephew',
    description: 'Outsourcing Project',
    status: 'processed',
    tags: ['iOS', 'CoreData']
  })
  .then(function (project) {
    console.log(project.get('id'));
    console.log(project.get('title'));
    console.log(project.get('tags'));
  })
  .catch(function (error) {
    //console.log(error.errors);
  });

let p = Project.findOne(
  {
    where: {
      title: {
        $like: '%Smith%'
      }
    }
  });

p.then(function (project) {
  if (project) {
    project.update({description: 'Dự án gia công'});
    return project.get('id');
  } else {
    return -1;
  }
}).then(function (project_id) {
  Task.create({
      title: 'Coding',
      deadline: datefns.addDays(new Date(), 100),
      is_done: false
    }
  ).then(function (task) {
    console.log('Task is created ', task.title);
  })
});