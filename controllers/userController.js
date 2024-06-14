const service = require('../services/userService');

function getDevice(uid){
    return Promise((resolve,reject)=>{
        service.getDevice(JSON.stringify(uid))
        .then(device=>{
            resolve(device);
        })
    })
}

async function getUser(uid){
    
    return new Promise((resolve,reject)=>{
        service.getUser(uid)
        .then(array=>{
            resolve(array);
        })
    });
    
}

module.exports = {getDevice,getUser}