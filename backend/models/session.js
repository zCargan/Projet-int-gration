const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
//id, type, objectif
    idUser : { type:mongoose.ObjectId, require: true},
    time : {type:Date, require: true}
})

sessionSchema.index({time:1}, {expireAfterSeconds: 600})

module.exports = mongoose.model('Session', sessionSchema); 