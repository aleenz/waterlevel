const { DataTypes } = require('sequelize');
const db = require('../db').db; // Import the Sequelize instance

// Define the Device model
const Device = db.define('Device', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    serial: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      defaultValue: null
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '0=new,1=registered'
    },
    user: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  }, {
    tableName: 'device', // Specify the table name if it's different from the model name
    timestamps: false // Disable Sequelize's default timestamps (created_at, updated_at)
  });
// Sync the model with the database (this creates the table if it doesn't exist)
Device.sync()
  .then(() => {
    console.log('Device table created successfully.');
  })
  .catch(err => {
    console.error('Unable to create Device table:', err);
  });

module.exports = Device;