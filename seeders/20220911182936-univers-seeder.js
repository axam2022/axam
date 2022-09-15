


'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Univers', [
      {
        nomUnivers: 'litérature',
        description:'litérature description',
        image:'tt',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Univers', null, {});
  }
};