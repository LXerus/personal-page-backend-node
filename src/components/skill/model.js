const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    image: {type: Schema.Types.ObjectId, ref: "Photo"},
    title: String,
    text: String
});

const model = mongoose.model("Skill", skillSchema);

module.exports = model;