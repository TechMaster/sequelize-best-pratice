/**
 * Created by techmaster on 1/9/17.
 */
const db = require('./models');

const Promise = require('bluebird');

const deleteClass = db.Class.destroy({where: {} });

const deleteStudent = db.Student.destroy({where: {} });


//Promise.all đảm bảo 2 Promise deleteClass và deleteStudent chạy xong thì mới chạy lệnh tiếp theo
Promise.all([deleteClass, deleteStudent]).then(
  () => {
    db.sequelize.query("SELECT COUNT(*) FROM cms.student_class", {raw: true, type: db.Sequelize.QueryTypes.SELECT}).then(
      function(result){
        console.log('Number of rows in student_class should be Zero ', result[0].count);
      });
  }
);