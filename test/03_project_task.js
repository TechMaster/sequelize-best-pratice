const chai = require('chai');
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');  //để dùng được eventually
chai.use(chaiAsPromised);

const datefns = require('date-fns');  //Thư viện xử lý thời gian

const db = require('../models');

const project_promise = db.Project
  .create({
    title: 'Space X launcher',
    description: 'R&D Project',
    status: 'processed',
    tags: ['iOS', 'CoreData'],
    Tasks: [
      {
        title: 'Coding UX',
        description: 'Design UX of app',
        deadline: datefns.addDays(new Date(), 10),
        is_done: true
      },
      {
        title: 'Coding Logic',
        description: 'Develop several moduls',
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
  }).then(project => {
    return project.Tasks.length;
  })
  .catch(function (error) {
    console.log(error.errors);
  });

/*
 Vấn đề các lệnh kiểm thử chạy bất đồng bộ
 */
describe('Insert a Project', function () {
  it('Project should have 3 tasks', function () {
    return project_promise.should.eventually.equal(3);
  });
});