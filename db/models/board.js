'use strict';
module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    boardName: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Board.associate = function (models) {
    Board.belongsTo(models.User, { foreignKey: 'userId' }),
      Board.hasMany(models.Pin, { foreignKey: 'boardId' })
  };
  return Board;
};