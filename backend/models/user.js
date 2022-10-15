const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username : { type:String, require: true},
    email : { type:String, require: true},
    password : { type:String, require: true},
    objectifs : { type:Array, require: true},
})

module.exports = mongoose.model('User', userSchema); 

