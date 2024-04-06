const db = require('../db').db;
const User = require('../models/userModel');
const Device = require('../models/deviceModel');


function getDevice(uid){
    return new Promise((resolve,reject)=>{
        User.findOne({
            where: {
              uid: uid
            }
          }).then(user => {
           
            Device.findOne({
                where: {
                    user: user.id
                }
                })
                .then(device => {
                // Use the retrieved information (result)
                    
                    resolve(device);
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
module.exports = {getDevice}