const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  gameName: {type: String, required: true, unique: true},
  release_date: Number,
  genre: String,
  esrbRating: String,
  publisher: String,
  platform: String,
  ignRating: Number,
  price: Number,
  players: {
    min: {type: Number, default: 1},
    max: Number,
    multiPlayer: Boolean
  },
  characters: [{characterName: String, npc: Boolean, enemy: Boolean}],
})

const Videogame = mongoose.model('Videogame', schema);

module.exports = Videogame;
