/*
 Quan hệ giữa Class và Pupil là nhiều nhiều như Class và Student.

 Ở đây chúng ta định rõ bảng trung gian Intersection Table Pupil_Class
 */
module.exports = function (sequelize, DataTypes) {
  const Pupil = sequelize.define('Pupil', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true  //Tạo unique constrain
    }
  }, {
    schema: sequelize.custom_schema,
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'pupil',
  });

  return Pupil;
};