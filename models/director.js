const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    name: String,
    age: Number
})

const Director = mongoose.model('Director', directorSchema, 'directors');
module.exports = Director;