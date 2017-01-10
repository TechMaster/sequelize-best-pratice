/*
 Khác với InsertManyMany.js, nay chúng ta bổ xung, cập nhật trường score ở cả bảng trung gian
 */

const db = require('./models');
const Promise = require('bluebird');

const insertClasses = db.Class.destroy({where: {}}).then(() => {  //Xóa hết các bản ghi rồi tạo lại
  db.Class.bulkCreate([
    {name: "Karate"}, {name: "Judo"}, {name: "Swim"}
  ]);
});


const insertPupils = db.Pupil.destroy({where: {}}).then(() => {
  db.Pupil.bulkCreate([
    {name: "Cuong"}, {name: "Dung"}, {name: "Minh"}, {name: "Jim"}
  ]);
});


Promise.all([insertClasses, insertPupils]).then(() => {
    db.Class.findOne({   //1. Tìm ra lớp học Karate
      where: {
        name: 'Karate'
      }
    }).then((karateClass) => {
      db.Pupil.findAll().then((pupils) => { //2. Liệt kê tất cả sinh viên
          let pupilScoreInKarateClass = [];
          pupils.forEach(pupil => {         //3. Tạo các bản ghi trung gian
            pupilScoreInKarateClass.push(
              {
                score: Math.floor(Math.random() * 10) + 1, //4. Sinh dữ liệu
                class_id: karateClass.id,   //5. Nối foreign_key vào các bảng phù hợp
                pupil_id: pupil.id
              }
            )
          });
          db.Pupil_Class.bulkCreate(pupilScoreInKarateClass);
        }
      )
    })
  }
);