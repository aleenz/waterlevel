const db = require('../db').db;
const User = require('../models/user');
const Device = require('../models/deviceModel');

 function getUser(uid){
  //find user, if not exists create it 
  return new Promise((resolve,reject)=>{

    User.findOne({
      where: { uid: uid },
      
    }).then(user => {
      if(user !== null){
          getDevice(user.id).then(d => {
           
            resolve([user,d])
    
          });
      }
    });
  });
    
  
}

function getDevice(id){
    return new Promise((resolve,reject)=>{
        User.findOne({
            where: {
              id: id
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
module.exports = {getDevice,getUser}