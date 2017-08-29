const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const Videogames = require("model");

const app = express();
mongoose.connect('mongodb://localhost:27017/games_list');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')
app.set('layout', 'layout')

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/new/:name', function(req, res){
   const game = new Boardgame({name: req.param.name})
   game.save
 })

 app.listen(port, function() {
   console.log('Example listening on port 3000')
 })
