module.exports = function (sequelize, DataTypes) {
  const Project = sequelize.define('Project', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        defaultValue: sequelize.fn('util.id_generator')
      },

      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true  //Tạo unique constrain
      },

      description: DataTypes.TEXT,

      status: DataTypes.ENUM('create', 'pending', 'processed', 'rejected'),

      tags: DataTypes.ARRAY(DataTypes.TEXT),

    }, {
      schema: sequelize.custom_schema,
      timestamps: false,
      paranoid: true,
      underscored: true,
      tableName: 'project',

      classMethods: {
        associate: function (models) {
          Project.Tasks = Project.hasMany(models.Task, { //Project.Tasks chứ không phải Project.tasks
            onDelete: 'CASCADE' //Nếu xóa project thì xóa cả Task
          });
        }
      }
    }
  );
  return Project;
};