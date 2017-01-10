module.exports = function (sequelize, DataTypes) {
  const Class = sequelize.define('Class', {
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
    tableName: 'class',

    classMethods: {
      associate: function (models) {
        Class.Students = Class.belongsToMany(models.Student, {through: 'student_class'});
      }
    }
  });
  return Class;
};
