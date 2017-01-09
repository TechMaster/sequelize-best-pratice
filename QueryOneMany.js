/*
1- syncdb.js
2- InsetOneMany.js
3- QueryOneMany.js
 */
const db = require('./models');

db.Project.findOne({
  where: {title: {$like: 'Space X%'}},
  include: [db.Task]
}).then(project => {
    if (project) {
      console.log("Demo 1");
      project.Tasks.forEach(task => {
        console.log(task.title, ' - ', task.description);
      })
    } else {
      console.log('Project is not found');
    }
  }
).catch(error => {
  console.log(error);
});

db.Task.findOne({
  where: {title: {$like: 'Task 1%'}},
  include: [db.Project]
}).then(task => {
    if (task) {
      console.log("\nDemo 2");
      console.log(task.Project.title);
    } else {
      console.log('Task is not found');
    }
  }
).catch(error => {
  console.log(error);
});
