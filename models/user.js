const { DataTypes } = require('sequelize');
const db = require('../db').db; // Import the Sequelize instance

// Define the User model
const User = db.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
  }, {
    tableName: 'user', // Specify the table name if it's different from the model name
    timestamps: true // Disable Sequelize's default timestamps (created_at, updated_at)
  });
// Sync the model with the database (this creates the table if it doesn't exist)
User.sync()
  .then(() => {
    console.log('User table created successfully.');
  })
  .catch(err => {
    console.error('Unable to create User table:', err);
  });

module.exports = User;