const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: String,
    genre: String,
    directorId: String,
    rate: Number,
    watched: Boolean
})

const Movie = mongoose.model('Movie', movieSchema, 'movies')
module.exports = Movie;