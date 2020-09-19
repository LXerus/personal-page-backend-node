const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    photos: [{type: Schema.Types.ObjectId, ref: "Photo"}]
});

const model = mongoose.model("Gallery", gallerySchema);

module.exports = model;