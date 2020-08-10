'use strict';
const fetch = require('node-fetch');
const faker = require('faker')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    let boards = [];
    for (let i = 0; i < 8; i++) {
      const res = await fetch(
        "https://www.thecocktaildb.com/api/json/v2/9973533/latest.php"
      );
      const board = await res.json()
      const info = board.drinks[i]
      boards.push({
        boardName: info.strIngredient1,
        img: info.strDrinkThumb,
        // userId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Boards", boards)

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Boards', null, {});
  }
};
