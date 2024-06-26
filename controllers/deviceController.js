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

 function getLogs(id, date){
    return new Promise((resolve, reject)=>{
        service.getLogs(id,date).then(res => {
            resolve(res)
        })
    })
    
}
function updateDistance(msg){
    return new Promise((resolve, reject)=>{
        service.updateDistance(msg).then(res => {
            resolve(res)
        })
    })
    
}


module.exports = {updateDistance,getLevel,getLogs,saveLog}