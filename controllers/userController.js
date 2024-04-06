const service = require('../services/userService');

function getDevice(uid){
    return Promise((resolve,reject)=>{
        service.getDevice(JSON.stringify(uid))
        .then(device=>{
            resolve(device);
        })
    })
}

async function getUser(uid,correo){
    const [user, created] = await service.getUser(uid,correo);
    return [user, created];
}

module.exports = {getDevice,getUser}