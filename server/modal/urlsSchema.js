const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const urlSchema = new mongoose.Schema({
    originUrl: {
        type: String,
        required: true,
        unique: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    creatorDate: {
        type: Date,
        require: true
    },
    views: {
        type: Number,
        require: false,
    } , 


})

urlSchema.plugin(uniqueValidator)
const Url = mongoose.model("urls" , urlSchema);

module.exports = Url;