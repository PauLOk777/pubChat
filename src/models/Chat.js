const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true },
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;
