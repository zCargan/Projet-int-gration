const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const userTestSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserTest', userTestSchema);