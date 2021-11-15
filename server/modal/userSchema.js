const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
uniqueValidator.defaults.message = 'Error, expected {PATH} to be unique.'

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})


userSchema.plugin(uniqueValidator)
const User = mongoose.model("User" , userSchema);

module.exports = User;