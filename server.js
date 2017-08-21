const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());
const path = require('path');



const PORT = process.env.PORT || 8080;

// on start loading the client  folder
app.use('/',express.static(path.join(__dirname, 'client')));

// Each time a user selects a different menu btn a request is 
// made to the cooresponding endpoint to rettrive the aritcle 







let server;
function runServer( port=PORT) {

  return new Promise((resolve, reject) => {
    
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        
        reject(err);
      
    });
  });
}

function closeServer() {
  
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  
}



if (require.main === module) {
  runServer().catch(err => console.error(err));
};




















