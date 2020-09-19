const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    title: String,
    url  : String
});

const model = mongoose.model("Photo", photoSchema, "photos");

module.exports = model;