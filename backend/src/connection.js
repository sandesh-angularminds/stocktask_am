const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config/db.config"); // assuming you have DB config in .env or config.js

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

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

const User = require('./models/user.model')(sequelize, DataTypes);

// Sync the model (creates table if it doesn't exist)
sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ User table created (if not exists)');
  })
  .catch((err) => {
    console.error('❌ Error creating User table:', err);
  });
  
  async function createUser(){
    try {
      User.create({
        username: 'demo_user2',
        email: 'demo@example2 .com',
        password: 'secure123',
      });
      
    } catch (err) {
      next(err);
    }
  }
  createUser();

module.exports = { sequelize, connectToDatabase };
