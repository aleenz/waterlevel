const service = require('../services/userService');

function getDevice(uid){
    return Promise((resolve,reject)=>{
        service.getDevice(JSON.stringify(uid))
        .then(device=>{
            resolve(device);
        })
    })
}

module.exports = {getDevice}