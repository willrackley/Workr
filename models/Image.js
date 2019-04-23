const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imagename: {
        type: String,
        default: "no image uploaded",
        required: true
    },
    imageData: {
        type: String, 
        required: true
    }
})

const Image = mongoose.model("Image", ImageSchema);
module.exports = Image;