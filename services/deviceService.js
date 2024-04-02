const clients = require('../index').clients;
const db = require('../db').db;
const Device = require('../models/deviceModel');
const DeviceInfo = require('../models/deviceInfo');
const DeviceLog = require('../models/deviceLog');

async function  saveLog(log){

        percentage = calcPercentage(log.id,log.value)
        const procedureName = 'createLog';
        const parameters = {
            p_serial:log.id,
            p_distance:log.value,
            p_percentage:percentage
        };

        // Call the stored procedure using the query() method
        db.query(`CALL ${procedureName}(:p_serial,:p_distance,:p_percentage)`, {
        replacements: parameters,
        // If the stored procedure returns a result set, set `type` to `sequelize.QueryTypes.SELECT`
        type: db.QueryTypes.INSERT // Adjust according to the stored procedure's behavior
        })
        .then(result => {
        // Handle the result returned by the stored procedure
        console.log("R" + result);
        })
        .catch(error => {
        // Handle errors if the stored procedure call fails
        console.error(error);
        });
      
}

function calcPercentage(id, distance){
    var height = 113;
    var separation = 27; // 27 is the og  32 seems to be 100%
    var water_height = height - (distance-separation);
    var percentage = water_height*100/height;
    if(percentage < 0) percentage = 0;
    else if(percentage>100) percentage = 100;
    return percentage;
}

function updateDistance(msg){
    
    percentage = calcPercentage(msg.id, msg.value)

    /*
    console.log("Distance: " + msg.value);
    console.log("Water Height: " + water_height);*/

        // Define the name of the stored procedure and any parameters it requires
    const procedureName = 'updateDistance';
    const parameters = {
        p_serial:msg.id,
        p_distance:msg.value,
        p_percentage:percentage
    };

    // Call the stored procedure using the query() method
    db.query(`CALL ${procedureName}(:p_serial, :p_distance, :p_percentage)`, {
    replacements: parameters,
    // If the stored procedure returns a result set, set `type` to `sequelize.QueryTypes.SELECT`
    type: db.QueryTypes.UPDATE // Adjust according to the stored procedure's behavior
    })
    .then(result => {
    // Handle the result returned by the stored procedure
    
    })
    .catch(error => {
    // Handle errors if the stored procedure call fails
    console.error(error);
    });
    
  } 


function getLevel(id){
    return new Promise((resolve,reject)=>{
        Device.findOne({
            where: {
              serial: id
            }
          }).then(device => {
           
            DeviceInfo.findOne({
                where: {
                    id: device.id
                }
                })
                .then(info => {
                // Use the retrieved information (result)
                    const res = info;
                    resolve(res);
                })
                .catch(error => {
                // Handle errors if the query fails
                console.error(error);
                });
          })
          .catch(error => {
            // Handle errors if the query fails
            console.error(error);
          });
    })
}

function getLogs(id){
    return new Promise((resolve,reject)=>{
        Device.findOne({
            where: {
              serial: id
            }
          }).then(device => {
           
            DeviceLog.findAll({
                where: {
                    device: device.id,
                    
                },
                limit: 24,
                order: [['id','DESC']]
                })
                .then(info => {
                // Use the retrieved information (result)
                    
                    const res = formatLogData(info);
                    resolve(res);
                })
                .catch(error => {
                // Handle errors if the query fails
                console.error(error);
                });
          })
          .catch(error => {
            // Handle errors if the query fails
            console.error(error);
          });
    })
}

function formatLogData(data) {
     dates = [];
     percentages = [];

    data.forEach(item => {
        // Extract date and time
        const dateTime = new Date(item.createdAt);
        // Format date-time to your liking
        const formattedDateTime = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;        dates.push(formattedDateTime);
        
        // Extract percentage
        percentages.push(item.percentage);
    });

     dates = dates.reverse();
     percentages = percentages.reverse();
    return { dates, percentages };
}
module.exports = {saveLog,updateDistance,getLevel,getLogs}