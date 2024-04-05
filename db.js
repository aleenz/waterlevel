const { Sequelize } = require('sequelize');
const config = require('./config'); // Import your database configuration

// Initialize Sequelize with the appropriate configuration
const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: true,
  dialectOptions: {
    multipleStatements: true
  }
  // Additional options...
});
module.exports = {db};