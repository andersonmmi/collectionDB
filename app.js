const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const Videogames = require("./model");

const app = express();
mongoose.connect('mongodb://localhost:27017/games_list');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//build app.get root here
app.get('/', function(req, res){
   res.render('index');
 })

// build app.get /new/ here
app.get('/new/', function (req, res) {
  res.render('new_videogame');
});

// build app.post /new/ here
app.post('/new/', function (req, res) {
  console.log("attempting add");
  Videogames.create(req.body)
  .then(function (videogames) {
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
app.post('/videogame_details/', function (req, res) {
  Videogames.create(req.body)
  .then(function (videogames) {
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

// build app.post /details/ here

//build app.listen here
 app.listen(3000, function() {
   console.log('Example listening on port 3000')
 })
