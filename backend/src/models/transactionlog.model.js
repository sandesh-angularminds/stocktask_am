module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    action: {
      type: DataTypes.ENUM("deposit", "withdraw"),
      validate: {
        notEmpty: { msg: "Action type cannot be empty" },
      },
    },
    bankId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Userid cannot be empty" },
      },
    },
    accountNo: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNum: false,
    },
  });
  return Transaction;
};
