const { DataTypes } = require('sequelize');
const db = require('../db').db; // Import the Sequelize instance

// Define the DeviceLog model
const DeviceLog = db.define('DeviceLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  device: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'device_log', // Specify the table name
  timestamps: true // Disable Sequelize's default timestamps (createdAt, updatedAt)
});
DeviceLog.sync()
  .then(() => {
    console.log('DeviceLog table created successfully.');
  })
  .catch(err => {
    console.error('Unable to create Device table:', err);
  });
module.exports = DeviceLog;