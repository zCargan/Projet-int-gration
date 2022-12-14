const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
//id, type, objectif
    idUser : { type:mongoose.ObjectId, require: true},
    time : {type:Date, require: true}
})

module.exports = mongoose.model('Session', sessionSchema); 