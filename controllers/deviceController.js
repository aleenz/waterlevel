const service = require('../services/deviceService');


function saveLog(log){
    service.saveLog(log);
}

 function getLevel(id){
    return new Promise((resolve, reject)=>{
        service.getLevel(id).then(res => {
            resolve(res)
        })
    })
}

 function getLogs(id){
    return new Promise((resolve, reject)=>{
        service.getLogs(id).then(res => {
            resolve(res)
        })
    })
    
}
function updateDistance(msg){

    service.updateDistance(msg);
    
}


module.exports = {updateDistance,getLevel,getLogs,saveLog}