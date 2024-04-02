const express = require("express");
const fs = require('node:fs');
const url = require('url');

const app = express();

const port = 8080;

app.listen(port, ()=>{
    console.log("Listening on port " + port)
});

app.get('/',(req,resp)=>{
    
    resp.json('yooo')
    var datetime = new Date();
    fs.appendFile('text.txt', datetime + " : " +req.query.id+"\n", err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });
})

