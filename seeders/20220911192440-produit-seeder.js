'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Produits', [
      {
    nomProd: 'mirroir1updated',
    description: 'testest',
    fichesDescription: 'ffftyuy',
    image: 'fyty',
    images: 'ggggg',
    marque: 'marque1',
    quantité: 10,
    rating: 1,
    numReviews: 2,
    couleur: 'blanc',
    etat: false,
    poids: 1,
    prix: 200,
    tva: 10,
    hauteur: 100,
    largeur: 50,
    volume: 50,
    public: 'homme',
    articleEnVedette: false,
    optionExpedition: 'livraison',
    createdAt: new Date(),
    updatedAt: new Date(),
    sousCategorie_id: 1,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Produits', null, {});
  }
};