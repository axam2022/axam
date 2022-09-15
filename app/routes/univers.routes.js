module.exports = app => {
  const univers = require("../controllers/ApiCategorie/univers.controller");
  const sousCategorie = require("../controllers/ApiCategorie/sousCategorie.controller.js");
  const produit = require("../controllers/ApiCategorie/produit.controller");
  const gallerie = require("../controllers/ApiCategorie/gallerie.controller");
  const promotion = require("../controllers/ApiCategorie/promotion.controller");
  var router = require("express").Router();

// Univers router  
//router.post('/addUnivers', univers.upload , univers.addUnivers);
router.post('/addUnivers', univers.upload, univers.addUnivers);
router.get('/allUnivers', univers.getAllUnivers);
router.get('/getOneUnivers/:id', univers.getOneUnivers);
router.put('/updateUnivers/:id', univers.upload , univers.updateUnivers);
router.delete('/deleteUnivers/:id', univers.deleteUnivers);
// get Univers SousCategories
router.get('/getUniversSousCategorie/:id', univers.getUniversSousCategorie);


// SousCategorie router  
router.post('/addSousCategorie', sousCategorie.upload , sousCategorie.addSousCategorie);
router.get('/allSousCategorie', sousCategorie.getAllSousCategories);
router.get('/getOneSousCategorie/:id', sousCategorie.getOneSousCategorie);
router.put('/updateSousCategorie/:id', sousCategorie.upload , sousCategorie.updateSousCategorie);
router.delete('/deleteSousCategorie/:id', sousCategorie.deleteSousCategorie);
// get SousCategories Univers
router.get('/getSousCategorieUnivers/:id', sousCategorie.getSousCategorieUnivers);

// Produit router  

router.post('/addProduit', produit.upload , produit.addProduit);
router.get('/allProduit', produit.getAllProduits);
router.get('/getOneProduit/:id', produit.getOneProduit);
router.put('/updateProduit/:id', produit.upload , produit.updateProduit);
router.delete('/deleteProduit/:id', produit.deleteProduit);
// get Produit SousCategories 
router.get('/getProduitSousCategorie/:id', produit.getProduitSousCategorie);


// Image router  
router.post('/addImage', gallerie.upload , gallerie.addImage);
router.get('/allImage', gallerie.getAllImages);
router.get('/getOneImage/:id', gallerie.getOneImage);
router.put('/updateImage/:id', gallerie.upload , gallerie.updateImage);
router.delete('/deleteImage/:id', gallerie.deleteImage);
// get Image Produit
router.get('/getImageProduit/:id', gallerie.getImageProduct);


// Promotion router  
router.post('/addPromotion', promotion.upload , promotion.addPromotion);
router.get('/allPromotion', promotion.getAllPromotions);
router.get('/getOnePromotion/:id', promotion.getOnePromotion);
router.put('/updatePromotion/:id', promotion.upload , promotion.updatePromotion);
router.delete('/deletePromotion/:id', promotion.deletePromotion);
// get Promotion Produit
router.get('/getPromotionProduit/:id', promotion.getPromotionProduit);



app.use('/api/univers', router);
};







