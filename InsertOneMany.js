/*
Project, Task quan hệ một nhiều
 */
const datefns = require('date-fns');  //Thư viện xử lý thời gian
const db = require('./models');

db.Project
  .create({
    title: 'Space X launcher',
    description: 'R&D Project',
    status: 'processed',
    tags: ['iOS', 'CoreData'],
    Tasks: [   //Tạo các Task ngay bên trong Project
      {
        title: 'Coding UX',
        description: 'Design UX of app',
        deadline: datefns.addDays(new Date(), 10),
        is_done: true
      },
      {
        title: 'Coding Logic',
        description: 'Develop several modules',
        deadline: datefns.addDays(new Date(), 50),
        is_done: false
      },
      {
        title: 'Test Integration',
        description: 'Write unit test',
        deadline: datefns.addDays(new Date(), 5),
        is_done: false
      }
    ]
  }, {
    include: [db.Task]
  }).then( project => {
    console.log('Number of tasks', project.Tasks.length);
  }
).catch(function (error) {
  console.log(error.errors);
});

//----------Demo tao Project, sau đó tạo danh sách các Task, sau đó set Foreign Key
db.Project
  .create({
    title: 'Develop web site for local school',
    description: 'Charity project',
    status: 'create',
    tags: ['PHP', 'MySQL']
  }).then( project => {
      db.Task.bulkCreate([
        {
          title: "Task 1",
          description: "This is task 1",
          deadline: datefns.addDays(new Date(), 1),
          is_done: false,
          project_id: project.id   //Set foreign key
        },
        {
          title: "Task 2",
          description: "This is task 2",
          deadline: datefns.addDays(new Date(), 2),
          is_done: true,
          project_id: project.id   //Set foreign key
        },
      ]).then((tasks) => {
          tasks.forEach(task => {
            console.log(project.title, ' ', task.title);
          })
        }
      );

    }
  );