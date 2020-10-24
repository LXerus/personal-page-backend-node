const mongoose = require("mongoose");
const Album = require("../album/albumModel");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: String,
  url: String,
});

const photoModel = mongoose.model("Photo", photoSchema, "photos");

module.exports = photoModel;
