const mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
    dept: String,
    designation: String,
    email: String,
    games: [],
    otherGames:String,
    gender: String,
    hobbies: Object,
    name: String,
    password: String,
});

mongoose.model('FromData', FormSchema);