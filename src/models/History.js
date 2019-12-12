const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    userName: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true },
});

const History = mongoose.model('history', HistorySchema);

module.exports = History;
