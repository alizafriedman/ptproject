'use strict';
const fetch = require('node-fetch');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    let drinks = [];
    for (let i = 0; i < 45; i++) {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v2/9973533/random.php');
      const drink = await res.json()
      const info = drink.drinks[0]
      drinks.push({
        category: info.strCategory,
        imgUrl: info.strDrinkThumb,
        pinName: info.strDrink,
        description: info.strInstructions,
        boardId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Pins', drinks);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pins', null, {})
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
