module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    "Watchlist",
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "User id cannot be empty..." },
        },
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stockId: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    }
  );
  return Watchlist;
};
