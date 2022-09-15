const dbConfig = require("../config/db.config.js");
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.univers = require("./univers.model.js")(sequelize, Sequelize);
db.sousCategorie = require('./sousCategorie.model.js')(sequelize, Sequelize)
db.produit = require('./produit.model.js')(sequelize, Sequelize)
db.promotion = require('./promotion.model.js')(sequelize, Sequelize)
db.gallerie = require('./gallerie.model.js')(sequelize, Sequelize)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})


// 1 to Many Relation univers->sousCategorie

db.univers.hasMany(db.sousCategorie, {
    foreignKey: 'univers_id',
    as: 'sousCategorie'
})

db.sousCategorie.belongsTo(db.univers, {
    foreignKey: 'univers_id',
    as: 'univers'
})


// 1 to Many Relation sousCategorie->produit

db.sousCategorie.hasMany(db.produit, {
  foreignKey: 'sousCategorie_id',
  as: 'produit'
})

db.produit.belongsTo(db.sousCategorie, {
  foreignKey: 'sousCategorie_id',
  as: 'sousCategorie'
})


// 1 to Many Relation Produit->gallerie
db.produit.hasMany(db.gallerie, {
  foreignKey: 'produit_id',
  as: 'gallerie'
}) 
db.gallerie.belongsTo(db.produit, {
  foreignKey: 'produit_id',
  as: 'produit'
}) 


// 1 to Many Relation Produit->promotion

 db.produit.hasMany(db.promotion, {
  foreignKey: 'produit_id',
  as: 'promotion'
})

db.promotion.belongsTo(db.produit, {
  foreignKey: 'produit_id',
  as: 'produit'
}) 

module.exports = db;
