const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/db.config"); // assuming you have DB config in .env or config.js

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST || "localhost",
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Accept self-signed certs
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, DataTypes);
db.Holdings = require("./holding.model")(sequelize, DataTypes);
db.Watchlist = require("./watchlist.model")(sequelize, DataTypes);
// Sync the database
sequelize
  .sync()
  .then(() => console.log("✅ Synced database"))
  .catch((err) => console.log("❌ Failed to sync database:", err));

module.exports = db;
