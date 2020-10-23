const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: String,
    description:String,
    photos: [{type: Schema.Types.ObjectId, ref: "Photo"}]
});

const albumModel = mongoose.model("Album", albumSchema);

module.exports = albumModel;