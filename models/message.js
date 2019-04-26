const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    recieverId: { type: String, required: true },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    jobTitle: { type: String, default: null },
    messageBody: { type: String, required: true,  },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;