module.exports = function (sequelize, DataTypes) {
  const Student = sequelize.define('Student', {
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
    tableName: 'student',

    classMethods: {
      associate: function (models) {
        Student.Classes = Student.belongsToMany(models.Class, {through: 'student_class'});  //tạo foreign key project_id ở Task
      }
    }
  });

  return Student;
};
