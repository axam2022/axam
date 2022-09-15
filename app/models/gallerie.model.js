module.exports = (sequelize, Sequelize) => {
    const Gallerie = sequelize.define("gallerie", {
      nomImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
    },{
      timestamps: true
    });
  
    return Gallerie;
  };
  