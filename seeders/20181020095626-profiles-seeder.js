'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fakeUsers = [];
    let fakeLoop = 10;

    while (fakeLoop > 0) {
      fakeUsers.push({
        name: faker.name.findName(),
        address: faker.address.streetAddress() + ' ' + faker.address.city() + ' ' + faker.address.country(),
        mobile: faker.phone.phoneNumber(),
        gender: 'Secret',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      fakeLoop--;
    }

    return queryInterface.bulkInsert('profiles', fakeUsers, {});
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
