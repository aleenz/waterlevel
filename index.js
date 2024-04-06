const express = require("express");
const app = express();
const clients = new Map();
module.exports = {clients};
const server = require('http').createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({server:server})

const db = require('./db').db;
const Device = require('./controllers/deviceController');
const User = require('./controllers/userController');

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
wss.on('connection', function connection(ws){
  ws.once('message', function incoming(clientId){
    clients.set(String(clientId), ws);
    
   
    console.log('Client %s connected', clientId)
    ws.send("Welcome, client " + clientId)


    ws.on('message', function incoming(message,isBinary){
      
      if(clientId == "TEST"){
        var content = JSON.parse(message);
        switch(content["type"]){
          case "msg":
            sendMessageToClient(content["id"],content["msg"]);
            break;
          case "map":
            printMap();
        }
      }else{
         
        const msg_str = isBinary ? message : message.toString();
        const msg=JSON.parse(msg_str);
        switch(msg.type){
          

          case "logRequest":
            Device.saveLog(msg);
            break;
        }
        

      }
    })
  
    ws.on('close', function() {
      clients.delete(clientId);
      console.log(`Client ${clientId} disconnected`);
    });
    ws.on("error", function(error) {
      // Manage error here
      console.log(error);
  });
  });
   
  
  
  
})




function sendMessageToClient(clientId, message) {
  const client = clients.get(clientId);
  if (client) {
      client.send(message);
      console.log("Sent " + message + " to client " + clientId)
  } else {
      console.log(`Client ${clientId} not found`);
     
  }
}



function printMap(){
  let array = Array.from(clients.keys());
  console.log(array);
}

var html = `
<input id="msg" type="text"/>
        <select id="target">
          <option value="0001">0001</option>
          <option value="0002">0002</option>
        </select>
        <button onclick="sendMessage()">Send Msg</button>

        <button onclick="printMap()">Print Map</button>
        <script>


        

        const socket = new WebSocket("ws://localhost:3000");
        socket.addEventListener('open',function(event){
            socket.send('TEST')
        })
        socket.addEventListener('message', function(event){
            console.log('Message from server ', event.data)
        })
    
        const sendMessage = () => {
            socket.send('{"id":"'+document.getElementById("target").value+'","msg":"'+document.getElementById("msg").value +'","type":"msg"}');
        }
        const printMap = () => {
          socket.send('{"id":"'+document.getElementById("target").value+'","msg":"'+document.getElementById("msg").value +'","type":"map"}');
      }
    </script>`

app.get('/', (req,res) => res.sendFile('./waterlevel.html', {root: __dirname }))

app.get('/getLevel/:id', async (req, res) => {
  

  const { id } = req.params;

  const client = clients.get(id);
  if(client){
    
    client.send("DistanceRequest");
    client.once('message', (msg) => {
      msg = JSON.parse(msg);
      Device.updateDistance(msg).then(level => {
          res.setHeader('Content-Type', 'application/json');
          res.json({"distance": msg.value, "percentage":level });
        })  
      
      
    });
  }
  
});

app.get('/getLogs/:id/:date', async (req, res) => {
  const { id,date } = req.params;
  
  Device.getLogs(id,date).then(logs => {
    res.setHeader('Content-Type', 'application/json');
    res.json(logs);
  })  
});

server.listen(3000, () => console.log("Listening on port 3000"));


