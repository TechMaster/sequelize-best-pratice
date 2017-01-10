/*
Bảng trung gian đững giữa Pupil và Class
 */
module.exports = function (sequelize, DataTypes) {
  const Pupil_Class = sequelize.define('Pupil_Class', {
    id: {                     //Thêm primary key ở bảng trung gian
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    score: DataTypes.INTEGER  //Bổ xung thêm trường ở bảng trung gian
  }, {
    schema: sequelize.custom_schema,
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'pupil_class',

    classMethods: {
      associate: function (models) {
        Pupil_Class.belongsTo(models.Pupil, { onDelete: 'CASCADE'}); //tạo foreign key pupil_id o Pupil_Class
        Pupil_Class.belongsTo(models.Class, { onDelete: 'CASCADE'}); //tạo foreign key class_id o Pupil_Class
      }
    }
  });

  return Pupil_Class;
};