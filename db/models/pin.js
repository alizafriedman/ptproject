'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pin = sequelize.define('Pin', {
    category: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    pinName: DataTypes.STRING,
    description: DataTypes.TEXT,
    boardId: DataTypes.INTEGER
  }, {});
  Pin.associate = function (models) {
    Pin.belongsTo(models.Board, { foreignKey: 'boardId' })
  };

  return Pin;
};