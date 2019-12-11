const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true },
});

const Message = mongoose.model('message', MessageSchema);

module.exports = Message;
