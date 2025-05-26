module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define("Bank", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Userid cannot be empty" },
      },
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    ifsc: {
      type: DataTypes.STRING,
    },
    accountNo: {
      type: DataTypes.STRING,
    },
    totalBalance: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });
  return Bank;
};
