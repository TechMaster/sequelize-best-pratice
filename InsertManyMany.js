const db = require('./models');
const Promise = require('bluebird');

const insertOneClass = db.Class
  .create({
    name: 'Math',
    Students: [
      {
        name: "Bill Gates"
      },
      {
        name: "Jack London"
      },
      {
        name: "Steve Jobs"
      },
      {
        name: "Jen Leman"
      }
    ]
  }, {
    include: [db.Student]
  }).then( insertClass => {
    return insertClass.Students;
  }).catch(function (error) {
  console.log(error.errors);
});

const insertManyClass = db.Class.bulkCreate([
  {name: "Music"}, {name: "English"}, {name:"Sport"}
]);

//Chờ cả 2 hành động trên xong mới truy vấn tất cả các class !
Promise.all([insertOneClass, insertManyClass]).then(
  function () {
    db.Class.findAll().then(classes => {
      classes.forEach( aClass => {
        console.log(aClass.name);
      });

      //Tìm student có tên là Steve Jobs nhập anh ta vào các lớp
      db.Student.findOne({ where: {name: 'Steve Jobs'} }).then(student => {
        student.setClasses(classes);
      });
    });
  }
);