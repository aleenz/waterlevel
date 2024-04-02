// deviceInfoModel.js

const { DataTypes } = require('sequelize');
const db = require('../db').db; // Import the Sequelize instance

// Define the DeviceInfo model
const DeviceInfo = db.define('DeviceInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  device: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  changes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'device_info', // Specify the table name if it's different from the model name
  timestamps: false // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

DeviceInfo.sync()
  .then(() => {
    console.log('DeviceInfo table created successfully.');
  })
  .catch(err => {
    console.error('Unable to create Device table:', err);
  });
module.exports = DeviceInfo;
