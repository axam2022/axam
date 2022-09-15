

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Promotions', [
      {
        nomPromos: 'litérature',
        description:'litérature description',
        prixPromo1:20,
        prixPromo1:15,
        image:'tt',
        produit_id:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Promotions', null, {});
  }
};
