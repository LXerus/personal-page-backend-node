const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    title: String,
    path: String
});

const model = mongoose.model("Photo", photoSchema);

module.exports = model;