module.exports = (sequelize, Sequelize) => {
  const Univers = sequelize.define("univers", {
    nomUnivers: {
      type: Sequelize.STRING,
      CallowNull: false
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

  return Univers;
};
