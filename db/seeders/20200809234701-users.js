'use strict';
const bcrypt = require("bcryptjs");

function newPassword() {
  return bcrypt.hashSync("password");
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "Lizzie",
        email: "test123@gmail.com",
        hashedPassword: "$2a$10$3igwtULs6DsDTcCachlgkuX37VfcUeYR3p1qCiezuXta.4DLmkfrm",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester1",
        email: "test1@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester2",
        email: "test2@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester3",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester4",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester5",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester6",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester7",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester8",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester9",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "tester10",
        email: "test3@gmail.com",
        hashedPassword: newPassword(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
