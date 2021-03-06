const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    pubChatId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    log: { type: Boolean, default: true },
});

const Session = mongoose.model('session', SessionSchema);

module.exports = Session;
