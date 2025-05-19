module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define("Bank", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Userid cannot be empty" },
      },
    },
    ifsc: {
      type: DataTypes.STRING,
    },
    totalBalance: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });
  return Bank;
};
