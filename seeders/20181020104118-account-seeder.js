'use strict';

const faker = require('faker');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fakeAccounts = [];
    let fakeLoop = 1;

    while (fakeLoop <= 10) {
      const salt = bcrypt.genSaltSync();
      const username = faker.internet.userName();

      fakeAccounts.push({
        user_id: fakeLoop,
        username: username,
        salt: salt,
        password: bcrypt.hashSync('asdasd123', salt),
        token: jwt.sign({username}, salt, {expiresIn: 60 * 60 * 24 * 14}),
        email: faker.internet.email(),
        last_login: new Date(),
        last_login_ip: '127.0.0.1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      fakeLoop++;
    }

    return queryInterface.bulkInsert('accounts', fakeAccounts, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
