const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carouselSchema = new Schema({
    photos = [{type: Schema.Types.ObjectId, ref: "Photo"}]
});

const model = mongoose.model("Carousel", carouselSchema);

module.exports = model;