const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    title: String,
    text: String,
    image: {type: Schema.Types.ObjectId, ref: "Photo"}
});

const model = mongoose.model("Skill", skillSchema);

module.exports = model;