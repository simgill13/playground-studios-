const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json());
const path = require('path');
const {blogPost} = require('./model');
const {PORT, DATABASE_URL} = require('./config');
app.use('/',express.static(path.join(__dirname, 'client')));



app.get('/post', (req, res) => {
    blogPost
        .find()
        .exec()
        .then(posts => {
            res.json(posts)
      	})
      	.catch(err => {
      		res.status(500).json({ message:'server error'});
      	})
})


app.get('/post/:id', (req, res) => {
	blogPost
	.findById(req.params.id)
	.exec()
	.then(posts => {
		res.json(posts)
	})
	.catch(err => {
		res.status(500).json({error: 'something went bad'})
	});
});




app.post('/post', (req, res) => {
	blogPost
	.create({
		name: req.body.name,
		email: req.body.email,
		subject: req.body.subject,
		message: req.body.message
	})
	.then(newPost =>{
		res.status(201).json(newPost)
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({message:'internal server error'});
	})

})

app.put('/post/:id', (req, res) => {

	const toUpdate = {};
    const updateableFields = ['name', 'email', 'subject','message'];
    updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
  }
    });
 	blogPost
 	.findByIdAndUpdate (req.params.id, {$set: toUpdate})
 	.exec()
 	.then(updatedPost => res.status(204).end())
 	.catch(err => res.status(500).json({message: 'Internal server error'}));
  })






app.delete('/post/:id', (req , res) =>{
	blogPost
	.findByIdAndRemove(req.params.id)
	.exec()
	.then(post => res.status(204).end())
	.catch(err => res.status(500).json({message: 'Internal server error'}));
});





let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}



if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};


















