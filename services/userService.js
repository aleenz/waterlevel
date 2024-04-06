const db = require('../db').db;
const User = require('../models/user');
const Device = require('../models/deviceModel');

async function getUser(uid,correo){
  //find user, if not exists create it 
  const [user, created] = await User.findOrCreate({
    where: { uid: uid },
    defaults: {
      uid: uid,
      correo: correo
    }
  }


);
  
  if(user !== null && !created){
      getDevice(user.uid).then(d => {
        return [user, created,d];

      });
  }

  return [user, created];
}

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
module.exports = {getDevice,getUser}