module.exports = function (sequelize, DataTypes) {

  const Task = sequelize.define('Task', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        defaultValue: sequelize.fn('util.id_generator')
      },
      title: DataTypes.TEXT,

      description: DataTypes.TEXT,

      deadline: DataTypes.DATE,

      is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      schema: sequelize.custom_schema,
      timestamps: false,
      paranoid: true,
      underscored: true,
      tableName: 'task',

      classMethods: {
        associate: function (models) {
          Task.Project = Task.belongsTo(models.Project, {
              foreignKey: {     //Mặc định foreign key là Nullable
                name: 'project_id',  //Nếu muốn bắt buộc foreign_key not null thì phải đổi tên foreign key mặc định
                allowNull: false
              }
            }
          );
        }
      }
    }
  );

  return Task;
};

