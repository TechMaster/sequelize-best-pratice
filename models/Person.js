module.exports = function (sequelize, DataTypes) {

  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      defaultValue: sequelize.fn('util.id_generator')
    },
    name: DataTypes.TEXT
  }, {
    schema: sequelize.custom_schema,
    timestamps: false,
    paranoid: true,
    underscored: true,
    tableName: 'person'
  });

  return Person;
};