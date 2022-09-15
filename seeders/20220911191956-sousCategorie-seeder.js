'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SousCategories', [
      {
        nomSousCat: 'litérature',
        description:'litérature description',
        image:'tt',
        createdAt: new Date(),
        updatedAt: new Date(),
        univers_id:1
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SousCategories', null, {});
  }
};