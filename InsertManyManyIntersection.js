/*
 Khác với InsertManyMany.js, nay chúng ta bổ xung, cập nhật trường score ở cả bảng trung gian

 Chú ý việc bóc tách ra các hàm nhỏ để không bị lồng nhau quá nhiều. Xem
 - updateScoreAtClass
 - afterPupil_Class_UpdateScore
 */

const db = require('./models');
const Promise = require('bluebird');

const insertClasses = db.Class.destroy({where: {}}).then(() => {  //Xóa hết các bản ghi rồi tạo lại
  db.Class.bulkCreate([
    {name: "Karate"}, {name: "Judo"}, {name: "Swim"}
  ]).then((instances) => {
      console.log("Create", instances.length, "classes");
    }
  );

});


const insertPupils = db.Pupil.destroy({where: {}}).then(() => {
  db.Pupil.bulkCreate([
    {name: "Cuong"}, {name: "Dung"}, {name: "Minh"}, {name: "Jim"}
  ]).then((instances) => {
      console.log("Create", instances.length, "pupils");
    }
  );
});

//Chờ 2 sự kiện insertClasses và insertPupils
Promise.all([insertClasses, insertPupils]).then(() => {
    db.Class.findOne({   //1. Tìm ra lớp học Karate
      where: {
        name: 'Karate'
      }
    }).then((karateClass) => {
      updateScoreAtClass(karateClass);
    })
  }
);

//Cập nhật score của học viên trong 1 lớp
function updateScoreAtClass(karateClass) {
  db.Pupil.findAll().then((pupils) => { //2. Liệt kê tất cả sinh viên
      let pupilScoreInKarateClass = [];
      console.log('Found ', pupils.length, ' pupils');
      pupils.forEach(pupil => {         //3. Tạo các bản ghi trung gian
        pupilScoreInKarateClass.push(
          {
            score: Math.floor(Math.random() * 10) + 1, //4. Sinh dữ liệu
            class_id: karateClass.id,   //5. Nối foreign_key vào các bảng phù hợp
            pupil_id: pupil.id
          }
        )
      });

      db.Pupil_Class.bulkCreate(pupilScoreInKarateClass).then((instances) => { //6. Insert dữ liệu vào bảng pupil_class
        afterPupil_Class_UpdateScore(instances)
      });

    }
  )
}

//Xử lý sự kiện sau khi cập nhật score
function afterPupil_Class_UpdateScore(instances) {
  console.log(instances);
}
