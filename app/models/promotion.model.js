module.exports = (sequelize, Sequelize) => {
    const Promotion = sequelize.define("promotion", {
      nomPromos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      prixPromo1: {
        type: Sequelize.INTEGER
      },
      prixPromo2: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
    },{
      timestamps: true
    });
  
    return Promotion;
  };
  