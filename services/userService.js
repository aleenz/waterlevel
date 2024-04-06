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
  });

  console.log(user.uid); // 'sdepold'
  console.log(user.correo); // This may or may not be 'Technical Lead JavaScript'
  console.log(created); // The boolean indicating whether this instance was just created
  if (created) {
    console.log(user.correo); // This will certainly be 'Technical Lead JavaScript'
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