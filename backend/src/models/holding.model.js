module.exports = (sequelize, DataTypes) => {
    const Holdings = sequelize.define(
      "Holdings",
      {
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {msg: "Userid cannot be empty"}
          }
        },
        symbol: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        averageBuyPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        currentPrice: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        // Virtual fields for derived values
        paranoid: true,
        timestamps: true,
        virtuals: {
          totalValue: {
            get() {
              return this.quantity * this.currentPrice; // Derived value: Quantity * Current Price
            },
          },
          pnl: {
            get() {
              // Derived value: (Current Price - Average Buy Price) * Quantity
              return (this.currentPrice - this.averageBuyPrice) * this.quantity;
            },
          },
        },
      }
    );
  
    return Holdings;
  };
  