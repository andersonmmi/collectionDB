const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/games_list';
// const db = db('localhost:27017/games_list')

const Videogame = require("./models/model");

const DUPLICATE_RECORD_ERROR = 11000;

const app = express();
MongoClient.connect(mongoURL, function(err,db){
  const videogames = db.collection('videogames');
});
mongoose.Promise = require('bluebird')

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//build app.get root here
app.get('/', function(req, res){
    MongoClient.connect(mongoURL, function(err,db){
      const videogames = db.collection('videogames');
      videogames.find({}).toArray(function (err, docs){
      res.render('index',{Videogame: videogames});
    })
  })
});

// build app.get /new_videogame/ here
app.get('/new_videogame/', function (req, res) {
  res.render('new_videogame');
});

// build app.post /new_videogame/ here
app.post('/new_videogame/', function (req, res) {
  console.log("attempting add");
  console.log(req.body.name);
  Videogame.create({name: req.body.name})
  .then(function (videogame) {
    res.redirect('/');
  })
  .catch(function (error) {
    let errorMsg;
    if (error.code === DUPLICATE_RECORD_ERROR) {
      // make message about duplicate
      errorMsg = `This video game "${req.body.name}" has already been added.`
    } else {
      errorMsg = "You have encountered an unknown error."
    }
    res.render('new_videogame', {errorMsg: errorMsg});
  })
  });

// build app.get /details/ here
// app.post('/videogame_details/', function (req, res) {
//   Videogames.create(req.body)
//   .then(function (videogames) {
//     res.redirect('/');
//   })
//   .catch(function (error) {
//     let errorMsg;
//     if (error.code === DUPLICATE_RECORD_ERROR) {
//       // make message about duplicate
//       errorMsg = `This video game "${req.body.name}" has already been added.`
//     } else {
//       errorMsg = "You have encountered an unknown error."
//     }
//     res.render('new_videogame', {errorMsg: errorMsg});
//   })
// });

// build app.post /details/ here

//build app.listen here
 app.listen(3000, function() {
   console.log('Listening on port 3000')
 });
